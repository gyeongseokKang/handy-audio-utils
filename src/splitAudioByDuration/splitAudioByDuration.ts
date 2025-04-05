/**
 * Function to split an AudioBuffer into segments of a specified duration
 * @param audioBuffer - The AudioBuffer to be split
 * @param splitTime - The time duration for each segment
 * @returns Promise<AudioBuffer[]> - An array of split AudioBuffers
 */

const MIN_SPLIT_TIME = 0.1; // seconds

export async function splitAudioByDuration(
  audioBuffer: AudioBuffer,
  splitTime: number
): Promise<AudioBuffer[]> {
  if (!audioBuffer) throw new Error("AudioBuffer is required");
  if (splitTime < MIN_SPLIT_TIME) {
    throw new Error(`Split time must be at least ${MIN_SPLIT_TIME} seconds`);
  }

  const { sampleRate, numberOfChannels, length } = audioBuffer;
  const splitSamples = splitTime * sampleRate;
  const totalSamples = length;

  if (splitSamples > totalSamples) {
    throw new Error(
      "Split time is greater than the total duration of the audio buffer"
    );
  }

  const segments: AudioBuffer[] = [];
  const channelDataArray = new Array(numberOfChannels);

  for (let channel = 0; channel < numberOfChannels; channel++) {
    channelDataArray[channel] = audioBuffer.getChannelData(channel);
  }

  const segmentCount = Math.ceil(totalSamples / splitSamples);
  for (let i = 0; i < segmentCount; i++) {
    const startSample = i * splitSamples;
    const segmentLength = Math.min(splitSamples, totalSamples - startSample);
    const segment = new AudioBuffer({
      length: segmentLength,
      numberOfChannels,
      sampleRate,
    });

    for (let channel = 0; channel < numberOfChannels; channel++) {
      const segmentData = segment.getChannelData(channel);
      segmentData.set(
        channelDataArray[channel].subarray(
          startSample,
          startSample + segmentLength
        )
      );
    }

    segments.push(segment);
  }

  return segments;
}
