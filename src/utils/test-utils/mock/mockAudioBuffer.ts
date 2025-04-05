class MockAudioBuffer implements AudioBuffer {
  private _channelData: Float32Array[];
  private _sampleRate: number;
  private _length: number;

  constructor(options: {
    length: number;
    numberOfChannels: number;
    sampleRate: number;
  }) {
    this._length = options.length;
    this._sampleRate = options.sampleRate;
    this._channelData = Array.from(
      { length: options.numberOfChannels },
      () => new Float32Array(options.length)
    );
  }

  // Required properties
  get duration(): number {
    return this._length / this._sampleRate;
  }

  get length(): number {
    return this._length;
  }

  get numberOfChannels(): number {
    return this._channelData.length;
  }

  get sampleRate(): number {
    return this._sampleRate;
  }

  // Required methods
  getChannelData(channel: number): Float32Array {
    if (channel >= this.numberOfChannels) {
      throw new Error("Channel index out of bounds");
    }
    return this._channelData[channel];
  }

  copyFromChannel(
    destination: Float32Array,
    channelNumber: number,
    bufferOffset: number = 0
  ): void {
    const source = this.getChannelData(channelNumber);
    destination.set(
      source.slice(bufferOffset, bufferOffset + destination.length)
    );
  }

  copyToChannel(
    source: Float32Array,
    channelNumber: number,
    bufferOffset: number = 0
  ): void {
    const destination = this.getChannelData(channelNumber);
    destination.set(source, bufferOffset);
  }
}

// 전역 객체에 MockAudioBuffer 주입
global.AudioBuffer = MockAudioBuffer as any;

export { MockAudioBuffer };
