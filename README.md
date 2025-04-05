# handy-audio-utils

[![npm version](https://img.shields.io/npm/v/handy-audio-utils.svg)](https://www.npmjs.com/package/handy-audio-utils)
[![downloads](https://img.shields.io/npm/dm/handy-audio-utils.svg)](https://www.npmjs.com/package/handy-audio-utils)
[![bundle size](https://img.shields.io/bundlephobia/minzip/handy-audio-utils)](https://bundlephobia.com/package/handy-audio-utils)
[![Test Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/gyeongseokKang/65de00768869c54d4410059dedd416e5/raw/coverage.json)](https://github.com/gyeongseokKang/handy-audio-utils/actions)

## Installation

```bash
npm i handy-audio-utils

yarn add handy-audio-utils

pnpm install handy-audio-utils
```

## Split

- [`splitAudioByDuration`](./docs/splitAudioByDuration.md) &mdash; splits an AudioBuffer into segments of a specified duration.

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
