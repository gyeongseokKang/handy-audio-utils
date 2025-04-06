/**
 * Function to split an AudioBuffer at specific time points
 * @param audioBuffer - The AudioBuffer to be split
 * @param timePoints - Array of time points (in seconds) at which to split the audio
 * @returns Promise<AudioBuffer[]> - An array of split AudioBuffers
 */

const MIN_SPLIT_TIME = 0.001; // 1ms

export async function splitAudioBufferAtTimePoints(
  audioBuffer: AudioBuffer,
  timePoints: number[]
): Promise<AudioBuffer[]> {
  if (!audioBuffer) throw new Error("AudioBuffer is required");
  if (!Array.isArray(timePoints))
    throw new Error("timePoints must be an array");
  if (timePoints.length === 0) return [audioBuffer];

  const { sampleRate, numberOfChannels, duration } = audioBuffer;

  // Ensure timePoints are sorted and valid
  const sortedTimePoints = [...timePoints].sort((a, b) => a - b);

  // Validate time points
  for (const timePoint of sortedTimePoints) {
    if (timePoint < 0) {
      throw new Error("Time points must be positive");
    }
    if (timePoint > duration) {
      throw new Error(
        `Time point ${timePoint} exceeds audio duration ${duration}`
      );
    }
  }

  // Create a complete list of split points including start and end
  const allTimePoints = [0, ...sortedTimePoints, duration];

  // Remove duplicates
  const uniqueTimePoints = [...new Set(allTimePoints)].sort((a, b) => a - b);

  const segments: AudioBuffer[] = [];
  const channelDataArray = new Array(numberOfChannels);

  for (let channel = 0; channel < numberOfChannels; channel++) {
    channelDataArray[channel] = audioBuffer.getChannelData(channel);
  }

  // Process each segment
  for (let i = 0; i < uniqueTimePoints.length - 1; i++) {
    const startTime = uniqueTimePoints[i];
    const endTime = uniqueTimePoints[i + 1];

    // Skip segments with zero or very small duration
    if (endTime - startTime < MIN_SPLIT_TIME) {
      continue;
    }

    const startSample = Math.floor(startTime * sampleRate);
    const endSample = Math.floor(endTime * sampleRate);
    const segmentLength = endSample - startSample;

    const segment = new AudioBuffer({
      length: segmentLength,
      numberOfChannels,
      sampleRate,
    });

    for (let channel = 0; channel < numberOfChannels; channel++) {
      const segmentData = segment.getChannelData(channel);
      segmentData.set(
        channelDataArray[channel].subarray(startSample, endSample)
      );
    }

    segments.push(segment);
  }

  return segments;
}
