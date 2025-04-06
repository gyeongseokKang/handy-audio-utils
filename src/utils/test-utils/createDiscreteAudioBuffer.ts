import { MockAudioBuffer } from "./mock/mockAudioBuffer";

/**
 * 초 단위로 변화하는 이산적 값을 가진 테스트용 오디오 버퍼를 생성한다.
 * sampleRate 갯수마다 값이 1씩 증가하는 계단 함수 형태의 신호를 생성한다.
 */
export const createDiscreteAudioBuffer = (
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
      // t=0~0.999초: 0, t=1~1.999초: 1, t=2~2.999초: 2, ...
      channelData[i] = Math.floor(i / sampleRate) * 0.000001;
    }
  }
  return buffer;
};
