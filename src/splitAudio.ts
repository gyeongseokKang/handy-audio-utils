/**
 * AudioBuffer를 지정된 시간 간격으로 분할하는 함수
 * @param audioBuffer - 분할할 AudioBuffer
 * @param segmentDuration - 각 세그먼트의 길이 (초 단위)
 * @returns Promise<AudioBuffer[]> - 분할된 AudioBuffer 배열
 */
export async function splitAudio(
  audioBuffer: AudioBuffer,
  segmentDuration: number
): Promise<AudioBuffer[]> {
  const sampleRate = audioBuffer.sampleRate;
  const channels = audioBuffer.numberOfChannels;
  const samplesPerSegment = Math.floor(segmentDuration * sampleRate);
  const totalSamples = audioBuffer.length;
  const segments: AudioBuffer[] = [];

  for (
    let startSample = 0;
    startSample < totalSamples;
    startSample += samplesPerSegment
  ) {
    const segmentLength = Math.min(
      samplesPerSegment,
      totalSamples - startSample
    );
    const segmentBuffer = new AudioBuffer({
      length: segmentLength,
      numberOfChannels: channels,
      sampleRate: sampleRate,
    });

    for (let channel = 0; channel < channels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      const segmentData = segmentBuffer.getChannelData(channel);

      for (let i = 0; i < segmentLength; i++) {
        segmentData[i] = channelData[startSample + i];
      }
    }

    segments.push(segmentBuffer);
  }

  return segments;
}
