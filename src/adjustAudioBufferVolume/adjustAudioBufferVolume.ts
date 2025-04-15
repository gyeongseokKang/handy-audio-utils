/**
 * Adjusts the volume of an AudioBuffer by the specified ratio
 * @param audioBuffer - The input AudioBuffer
 * @param ratio - Volume ratio between 0 and 1 (e.g., 0.5 = 50% volume)
 * @returns A new AudioBuffer with adjusted volume
 */
export function adjustAudioBufferVolume(
  audioBuffer: AudioBuffer,
  ratio: number
): AudioBuffer {
  // Input validation
  if (!audioBuffer) {
    throw new Error("AudioBuffer is required");
  }

  if (ratio < 0 || ratio > 1) {
    throw new Error("Volume ratio must be between 0 and 1");
  }

  // Create a new AudioBuffer with the same properties
  const adjustedBuffer = new AudioBuffer({
    length: audioBuffer.length,
    numberOfChannels: audioBuffer.numberOfChannels,
    sampleRate: audioBuffer.sampleRate,
  });

  // Process each channel
  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    const inputData = audioBuffer.getChannelData(channel);
    const outputData = new Float32Array(inputData.length);

    // Adjust volume for each sample
    for (let i = 0; i < inputData.length; i++) {
      outputData[i] = inputData[i] * ratio;
    }

    adjustedBuffer.copyToChannel(outputData, channel);
  }

  return adjustedBuffer;
}
