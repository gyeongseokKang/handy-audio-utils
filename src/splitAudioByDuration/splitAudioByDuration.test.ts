import { describe, expect, it } from "vitest";
import { createTestAudioBuffer } from "../utils/test-utils/createTestAudioBuffer";
import { splitAudioByDuration } from "./splitAudioByDuration";

describe("splitAudioByDuration", () => {
  describe("Basic Functionality", () => {
    it("should split 30 second audio into 10 second segments", async () => {
      const audioBuffer = createTestAudioBuffer(30); // 30초
      const segments = await splitAudioByDuration(audioBuffer, 10); // 10초 단위 분할

      expect(segments).toHaveLength(3);
      segments.forEach((segment) => {
        expect(segment.length).toBe(10 * audioBuffer.sampleRate);
      });
    });

    it("should split 32 second audio into 10 second segments", async () => {
      const audioBuffer = createTestAudioBuffer(32); // 32초
      const segments = await splitAudioByDuration(audioBuffer, 10); // 10초 단위 분할

      expect(segments).toHaveLength(4);
      // 마지막 세그먼트는 2초
      expect(segments[3].length).toBe(2 * audioBuffer.sampleRate);
    });

    it("should create single segment when duration equals audio length", async () => {
      const audioBuffer = createTestAudioBuffer(10);
      const segments = await splitAudioByDuration(audioBuffer, 10);

      expect(segments).toHaveLength(1);
      expect(segments[0].length).toBe(audioBuffer.length);
    });
  });

  describe("Time Handling", () => {
    it("should handle minimum split time (0.1 seconds)", async () => {
      const audioBuffer = createTestAudioBuffer(1); // 1초
      const segments = await splitAudioByDuration(audioBuffer, 0.1);

      expect(segments).toHaveLength(10);
      segments.forEach((segment) => {
        expect(segment.length).toBe(0.1 * audioBuffer.sampleRate);
      });
    });

    it("should handle decimal split times correctly", async () => {
      const audioBuffer = createTestAudioBuffer(5); // 5초
      const segments = await splitAudioByDuration(audioBuffer, 2.5);

      expect(segments).toHaveLength(2);
      segments.forEach((segment) => {
        expect(segment.length).toBe(2.5 * audioBuffer.sampleRate);
      });
    });
  });

  describe("Audio Data Integrity", () => {
    it("should preserve audio properties in segments", async () => {
      const sampleRate = 48000;
      const channels = 2;
      const audioBuffer = createTestAudioBuffer(10, sampleRate, channels);
      const segments = await splitAudioByDuration(audioBuffer, 5);

      segments.forEach((segment) => {
        expect(segment.sampleRate).toBe(sampleRate);
        expect(segment.numberOfChannels).toBe(channels);
      });
    });

    it("should maintain audio data accuracy", async () => {
      const audioBuffer = createTestAudioBuffer(2);
      const segments = await splitAudioByDuration(audioBuffer, 1);

      // 첫 번째 세그먼트의 첫 번째 채널 데이터 검증
      const originalData = audioBuffer.getChannelData(0);
      const segmentData = segments[0].getChannelData(0);

      // 샘플 데이터 비교
      for (let i = 0; i < segmentData.length; i++) {
        expect(segmentData[i]).toBe(originalData[i]);
      }
    });
  });

  describe("Channel Processing", () => {
    it("should process mono audio correctly", async () => {
      const audioBuffer = createTestAudioBuffer(10, 44100, 1);
      const segments = await splitAudioByDuration(audioBuffer, 5);

      segments.forEach((segment) => {
        expect(segment.numberOfChannels).toBe(1);
      });
    });

    it("should process stereo audio correctly", async () => {
      const audioBuffer = createTestAudioBuffer(10, 44100, 2);
      const segments = await splitAudioByDuration(audioBuffer, 5);

      segments.forEach((segment) => {
        expect(segment.numberOfChannels).toBe(2);
      });
    });

    it("should handle 5 channel audio correctly", async () => {
      const audioBuffer = createTestAudioBuffer(10, 44100, 5);
      const segments = await splitAudioByDuration(audioBuffer, 2);

      expect(segments).toHaveLength(5);
      segments.forEach((segment) => {
        expect(segment.numberOfChannels).toBe(5);
      });
    });
  });

  describe("Error Handling", () => {
    it("should throw error for null AudioBuffer", async () => {
      await expect(splitAudioByDuration(null as any, 1)).rejects.toThrow(
        "AudioBuffer is required"
      );
    });

    it("should throw error for invalid split time", async () => {
      const audioBuffer = createTestAudioBuffer(10);
      await expect(splitAudioByDuration(audioBuffer, 0)).rejects.toThrow(
        "Split time must be at least"
      );
    });

    it("should throw error when split time exceeds audio length", async () => {
      const audioBuffer = createTestAudioBuffer(5);
      await expect(splitAudioByDuration(audioBuffer, 10)).rejects.toThrow(
        "Split time is greater than"
      );
    });
  });
});
