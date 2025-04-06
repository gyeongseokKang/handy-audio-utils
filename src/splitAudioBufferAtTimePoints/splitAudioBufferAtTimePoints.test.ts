import { describe, expect, it } from "vitest";
import { createDiscreteAudioBuffer } from "../utils/test-utils/createDiscreteAudioBuffer";
import { splitAudioBufferAtTimePoints } from "./splitAudioBufferAtTimePoints";

describe("splitAudioBufferAtTimePoints", () => {
  describe("Basic Functionality", () => {
    it("should split audio at specified time points", async () => {
      // Create a 5-second audio buffer (values 0,1,2,3,4 at each second)
      const buffer = createDiscreteAudioBuffer(5, 44100, 2);
      // Split at 2 seconds and 4 seconds
      const timePoints = [2, 4];

      const segments = await splitAudioBufferAtTimePoints(buffer, timePoints);

      // Should create 3 segments: 0-2s, 2-4s, 4-5s
      expect(segments).toHaveLength(3);

      // Validate first segment (0-2s)
      expect(segments[0].duration).toBeCloseTo(2);
      expect(segments[0].numberOfChannels).toBe(2);
      expect(segments[0].sampleRate).toBe(44100);

      // Validate second segment (2-4s)
      expect(segments[1].duration).toBeCloseTo(2);
      expect(segments[1].getChannelData(0)[1]).toBeCloseTo(2 * 0.000001);
      expect(segments[1].getChannelData(1)[1]).toBeCloseTo(2 * 0.000001);
      expect(segments[1].getChannelData(1)[44100 + 1]).toBeCloseTo(
        3 * 0.000001
      );

      // Validate third segment (4-5s)
      expect(segments[2].duration).toBeCloseTo(1);
      expect(segments[2].getChannelData(0)[1]).toBeCloseTo(4 * 0.000001);
    });

    it("should handle splitting at mid-time points accurately", async () => {
      const buffer = createDiscreteAudioBuffer(2, 44100, 2);
      // Split at 0.5s, 1s, 1.5s
      const timePoints = [0.5, 1, 1.5];

      const segments = await splitAudioBufferAtTimePoints(buffer, timePoints);

      // Should create 4 segments: 0-0.5s, 0.5-1s, 1-1.5s, 1.5-2s
      expect(segments).toHaveLength(4);

      // Validate segment lengths
      expect(segments[0].duration).toBeCloseTo(0.5); // 0-0.5s
      expect(segments[1].duration).toBeCloseTo(0.5); // 0.5-1s
      expect(segments[2].duration).toBeCloseTo(0.5); // 1-1.5s
      expect(segments[3].duration).toBeCloseTo(0.5); // 1.5-2s

      // Validate segment data values
      // 0-0.5s segment: all values are 0 * 0.000001
      const firstSegmentData = segments[0].getChannelData(0);
      expect(firstSegmentData[0]).toBeCloseTo(0 * 0.000001);

      // 1.5-2s segment: all values are 1 * 0.000001
      const fourthSegmentData = segments[3].getChannelData(0);
      expect(fourthSegmentData[0]).toBeCloseTo(1 * 0.000001);
    });

    it("should return the original buffer if time points are empty", async () => {
      const buffer = createDiscreteAudioBuffer(3, 44100, 2);
      const segments = await splitAudioBufferAtTimePoints(buffer, []);

      expect(segments).toHaveLength(1);
      expect(segments[0].duration).toBeCloseTo(buffer.duration);
      expect(segments[0].length).toBe(buffer.length);
    });

    it("should handle unsorted time points correctly", async () => {
      const buffer = createDiscreteAudioBuffer(5, 44100, 2);
      // Specify time points out of order
      const timePoints = [4, 1, 3];

      const segments = await splitAudioBufferAtTimePoints(buffer, timePoints);

      // Should create 4 segments: 0-1s, 1-3s, 3-4s, 4-5s
      expect(segments).toHaveLength(4);

      // Validate lengths
      expect(segments[0].duration).toBeCloseTo(1); // 0-1s
      expect(segments[1].duration).toBeCloseTo(2); // 1-3s
      expect(segments[2].duration).toBeCloseTo(1); // 3-4s
      expect(segments[3].duration).toBeCloseTo(1); // 4-5s
    });
  });

  describe("Channel Handling", () => {
    it("should handle mono audio correctly", async () => {
      const buffer = createDiscreteAudioBuffer(3, 44100, 1);
      const timePoints = [1, 2];

      const segments = await splitAudioBufferAtTimePoints(buffer, timePoints);

      segments.forEach((segment) => {
        expect(segment.numberOfChannels).toBe(1);
      });
    });

    it("should handle multi-channel audio correctly", async () => {
      const channels = 5;
      const buffer = createDiscreteAudioBuffer(3, 44100, channels);
      const timePoints = [1, 2];

      const segments = await splitAudioBufferAtTimePoints(buffer, timePoints);

      segments.forEach((segment) => {
        expect(segment.numberOfChannels).toBe(channels);
      });
    });
  });

  describe("Error Handling", () => {
    it("should throw an error if AudioBuffer is null", async () => {
      await expect(
        splitAudioBufferAtTimePoints(null as any, [1])
      ).rejects.toThrow("AudioBuffer is required");
    });

    it("should throw an error if timePoints is not an array", async () => {
      const buffer = createDiscreteAudioBuffer(3);
      await expect(
        splitAudioBufferAtTimePoints(buffer, null as any)
      ).rejects.toThrow("timePoints must be an array");
    });

    it("should throw an error for negative time points", async () => {
      const buffer = createDiscreteAudioBuffer(3);
      await expect(splitAudioBufferAtTimePoints(buffer, [-1])).rejects.toThrow(
        "Time points must be positive"
      );
    });

    it("should throw an error for time points exceeding audio duration", async () => {
      const buffer = createDiscreteAudioBuffer(3);
      await expect(splitAudioBufferAtTimePoints(buffer, [5])).rejects.toThrow(
        "Time point 5 exceeds audio duration"
      );
    });
  });

  describe("Edge Cases", () => {
    it("should ignore very short intervals", async () => {
      const buffer = createDiscreteAudioBuffer(3, 44100, 2);
      // 0.0005s interval is smaller than MIN_SPLIT_TIME (0.001s) and should be ignored
      const timePoints = [1, 1.0005, 2];

      const segments = await splitAudioBufferAtTimePoints(buffer, timePoints);

      // 1-1.0005 is too short and ignored, so 3 segments are created
      expect(segments).toHaveLength(3);
    });

    it("should handle duplicate time points correctly", async () => {
      const buffer = createDiscreteAudioBuffer(3, 44100, 2);
      const timePoints = [1, 1, 2];

      const segments = await splitAudioBufferAtTimePoints(buffer, timePoints);

      // Duplicate time points are removed, so 3 segments are created
      expect(segments).toHaveLength(3);
    });

    it("should handle time points exactly at the end of the audio", async () => {
      const buffer = createDiscreteAudioBuffer(3, 44100, 2);
      const timePoints = [1, 3];

      const segments = await splitAudioBufferAtTimePoints(buffer, timePoints);

      // 3s is exactly the end, so no empty segment is created
      expect(segments).toHaveLength(2);
      expect(segments[0].duration).toBeCloseTo(1);
      expect(segments[1].duration).toBeCloseTo(2);
    });
  });
});
