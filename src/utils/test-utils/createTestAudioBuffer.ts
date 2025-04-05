import { MockAudioBuffer } from "./mock/mockAudioBuffer";

export const createTestAudioBuffer = (
  duration: number,
  sampleRate = 44100,
  channels = 2
): MockAudioBuffer => {
  const length = Math.floor(duration * sampleRate);
  const buffer = new MockAudioBuffer({
    length,
    numberOfChannels: channels,
    sampleRate,
  });

  // 테스트 데이터 채우기
  for (let channel = 0; channel < channels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      // 식별 가능한 사인파 패턴 생성
      channelData[i] = Math.sin((i * 440 * Math.PI * 2) / sampleRate);
    }
  }
  return buffer;
};
