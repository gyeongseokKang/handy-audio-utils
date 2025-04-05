# `splitAudioByDuration`

A utility function that splits an AudioBuffer into segments of a specified duration.

## Usage

```javascript
import { splitAudioByDuration } from 'handy-audio-utils';

// Create or obtain an AudioBuffer
const audioBuffer = /* your AudioBuffer */;

// Split the audio into 5-second segments
const segments = await splitAudioByDuration(audioBuffer, 5);

// Process the segments
segments.forEach((segment, index) => {
  console.log(`Segment ${index + 1} duration: ${segment.duration} seconds`);
  // Process each audio segment...
});
```

## API

```typescript
async function splitAudioByDuration(
  audioBuffer: AudioBuffer,
  splitTime: number
): Promise<AudioBuffer[]>
```

### Parameters

- **`audioBuffer`**_`: AudioBuffer`_ - The source AudioBuffer to be split.
- **`splitTime`**_`: number`_ - The duration (in seconds) of each segment.

### Returns

- **`Promise<AudioBuffer[]>`** - A promise that resolves to an array of AudioBuffer segments.

### Constraints

- The minimum allowed split time is 0.1 seconds.
- The split time cannot exceed the total duration of the input AudioBuffer.

## Features

- Preserves original audio properties (sample rate, channel count) in each segment
- Handles mono, stereo, and multi-channel audio
- Maintains audio data integrity with precise sample copying
- Efficiently handles audio of any length, creating partial segments as needed

## Error Handling

The function will throw an error in the following cases:

- If the AudioBuffer is null or undefined
- If the split time is less than 0.1 seconds
- If the split time exceeds the total duration of the audio buffer

## Examples

### Splitting a 30-second audio into 10-second segments

```javascript
const audioBuffer = /* a 30-second AudioBuffer */;
const segments = await splitAudioByDuration(audioBuffer, 10);
// Results in 3 segments of 10 seconds each
```

### Handling uneven splits

```javascript
const audioBuffer = /* a 32-second AudioBuffer */;
const segments = await splitAudioByDuration(audioBuffer, 10);
// Results in 4 segments: 3 segments of 10 seconds each and 1 segment of 2 seconds
```

### Working with different audio formats

```javascript
// High-quality audio (48kHz, stereo)
const highQualityBuffer = /* 48kHz stereo AudioBuffer */;
const highQualitySegments = await splitAudioByDuration(highQualityBuffer, 5);

// Mono audio
const monoBuffer = /* mono AudioBuffer */;
const monoSegments = await splitAudioByDuration(monoBuffer, 2);

// Multi-channel audio (e.g., 5.1 surround)
const surroundBuffer = /* 5.1 channel AudioBuffer */;
const surroundSegments = await splitAudioByDuration(surroundBuffer, 3);
```

```
