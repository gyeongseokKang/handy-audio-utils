import { describe, expect, it } from "vitest";
import { createTestAudioBuffer } from "../utils/test-utils/createTestAudioBuffer";
import { adjustAudioBufferVolume } from "./adjustAudioBufferVolume";

describe("adjustAudioBufferVolume", () => {
  describe("Basic Functionality", () => {
    it("should adjust volume to 50%", () => {
      const audioBuffer = createTestAudioBuffer(1); // 1 second
      const adjustedBuffer = adjustAudioBufferVolume(audioBuffer, 0.5);

      // Verify that all samples in all channels are multiplied by 0.5
      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const originalData = audioBuffer.getChannelData(channel);
        const adjustedData = adjustedBuffer.getChannelData(channel);

        for (let i = 0; i < audioBuffer.length; i++) {
          expect(adjustedData[i]).toBe(originalData[i] * 0.5);
        }
      }
    });

    it("should maintain original length and channels", () => {
      const audioBuffer = createTestAudioBuffer(2, 44100, 2); // 2 seconds, stereo
      const adjustedBuffer = adjustAudioBufferVolume(audioBuffer, 0.7);

      expect(adjustedBuffer.length).toBe(audioBuffer.length);
      expect(adjustedBuffer.numberOfChannels).toBe(
        audioBuffer.numberOfChannels
      );
      expect(adjustedBuffer.sampleRate).toBe(audioBuffer.sampleRate);
    });

    it("should handle zero volume", () => {
      const audioBuffer = createTestAudioBuffer(1);
      const adjustedBuffer = adjustAudioBufferVolume(audioBuffer, 0);

      // Verify that all samples are zero
      for (
        let channel = 0;
        channel < adjustedBuffer.numberOfChannels;
        channel++
      ) {
        const adjustedData = adjustedBuffer.getChannelData(channel);
        for (let i = 0; i < adjustedBuffer.length; i++) {
          expect(Math.abs(adjustedData[i])).toBeCloseTo(0);
        }
      }
    });

    it("should maintain original audio when ratio is 1", () => {
      const audioBuffer = createTestAudioBuffer(1);
      const adjustedBuffer = adjustAudioBufferVolume(audioBuffer, 1);

      const originalData = audioBuffer.getChannelData(0);
      const adjustedData = adjustedBuffer.getChannelData(0);

      for (let i = 0; i < audioBuffer.length; i++) {
        expect(adjustedData[i]).toBe(originalData[i]);
      }
    });
  });

  describe("Multi-channel Processing", () => {
    it("should process mono audio correctly", () => {
      const audioBuffer = createTestAudioBuffer(1, 44100, 1);
      const adjustedBuffer = adjustAudioBufferVolume(audioBuffer, 0.5);

      expect(adjustedBuffer.numberOfChannels).toBe(1);
    });

    it("should process stereo audio correctly", () => {
      const audioBuffer = createTestAudioBuffer(1, 44100, 2);
      const adjustedBuffer = adjustAudioBufferVolume(audioBuffer, 0.5);

      expect(adjustedBuffer.numberOfChannels).toBe(2);

      // Verify that both channels are processed identically
      const leftChannel = adjustedBuffer.getChannelData(0);
      const rightChannel = adjustedBuffer.getChannelData(1);

      expect(leftChannel[0]).toBe(rightChannel[0]);
    });
  });

  describe("Error Handling", () => {
    it("should throw error for null AudioBuffer", () => {
      expect(() => adjustAudioBufferVolume(null as any, 0.5)).toThrow(
        "AudioBuffer is required"
      );
    });

    it("should throw error for negative ratio", () => {
      const audioBuffer = createTestAudioBuffer(1);
      expect(() => adjustAudioBufferVolume(audioBuffer, -0.5)).toThrow(
        "Volume ratio must be between 0 and 1"
      );
    });

    it("should throw error for ratio greater than 1", () => {
      const audioBuffer = createTestAudioBuffer(1);
      expect(() => adjustAudioBufferVolume(audioBuffer, 1.5)).toThrow(
        "Volume ratio must be between 0 and 1"
      );
    });
  });
});
