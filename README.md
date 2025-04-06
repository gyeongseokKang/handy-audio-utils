# handy-audio-utils

<div align="center">
  <img src="./public/logo.png" alt="handy-audio-utils logo" width="150" />
</div>

<div align="center">
  <a href="https://www.npmjs.com/package/handy-audio-utils">
    <img src="https://img.shields.io/npm/v/handy-audio-utils.svg" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/handy-audio-utils">
    <img src="https://img.shields.io/npm/dm/handy-audio-utils.svg" alt="downloads" />
  </a>
  <a href="https://bundlephobia.com/package/handy-audio-utils">
    <img src="https://img.shields.io/bundlephobia/minzip/handy-audio-utils" alt="bundle size" />
  </a>
  <a href="https://github.com/gyeongseokKang/handy-audio-utils/actions">
    <img src="https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/gyeongseokKang/dbb8025d3d6b67d74782a2b5db994ce9/raw/coverage.json" alt="Test Coverage" />
  </a>
</div>

## Installation

```bash
npm i handy-audio-utils

yarn add handy-audio-utils

pnpm install handy-audio-utils
```

## Split

- [`splitAudioBufferByDuration`](./docs/splitAudioBufferByDuration.md) &mdash; splits an AudioBuffer into segments of a specified duration.

## Key Features

- Support for all audio channel formats (mono, stereo, multi-channel)
- Works in both web browsers and Node.js environments
- Written in TypeScript with complete type definitions
- Lightweight bundle size with minimal dependencies
- Preserves audio quality and original properties during processing

## Supported Environments

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Node.js (environments with Web Audio API support)

## Related Resources

- [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [AudioBuffer MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
