# `splitAudioBufferAtTimePoints`

A utility function that splits an AudioBuffer at specific time points.

## Usage

```javascript
import { splitAudioBufferAtTimePoints } from 'handy-audio-utils';

// Create or obtain an AudioBuffer
const audioBuffer = /* your AudioBuffer */;

// Split the audio at specific time points (in seconds)
const timePoints = [2, 5, 7];
const segments = await splitAudioBufferAtTimePoints(audioBuffer, timePoints);

// Process the segments
// 0~2s, 2~5s, 7~
segments.forEach((segment, index) => {
  console.log(`Segment ${index + 1} duration: ${segment.duration} seconds`);
  // Process each audio segment...
});
```

## API

```typescript
async function splitAudioBufferAtTimePoints(
  audioBuffer: AudioBuffer,
  timePoints: number[]
): Promise<AudioBuffer[]>
```

### Parameters

- **`audioBuffer`**_`: AudioBuffer`_ - The source AudioBuffer to be split.
- **`timePoints`**_`: number[]`_ - An array of time points (in seconds) at which to split the audio.

### Returns

- **`Promise<AudioBuffer[]>`** - A promise that resolves to an array of AudioBuffer segments.

### Constraints

- Time points must be positive numbers.
- Time points must not exceed the total duration of the input AudioBuffer.
- Segments shorter than 1ms will be ignored.

## Features

- Splits audio at precisely defined time points
- Automatically sorts time points and removes duplicates
- Adds start (0s) and end (audio duration) points automatically
- Preserves original audio properties (sample rate, channel count) in each segment
- Handles mono, stereo, and multi-channel audio
- Maintains audio data integrity with precise sample copying

## Error Handling

The function will throw an error in the following cases:

- If the AudioBuffer is null or undefined
- If the timePoints parameter is not an array
- If any time point is negative
- If any time point exceeds the total duration of the audio buffer

## Examples

### Splitting a song at verse/chorus transitions

```javascript
const songBuffer = /* a song AudioBuffer */;
// Split at verse and chorus transitions
const transitions = [30.5, 65.2, 95.8, 125.3];
const segments = await splitAudioBufferAtTimePoints(songBuffer, transitions);
// Results in 5 segments: intro, verse, chorus, verse, outro
```

### Creating sound samples from a single recording

```javascript
const drumLoop = /* a drum loop AudioBuffer */;
// Split at each drum hit
const hitPoints = [0.2, 0.5, 0.8, 1.1, 1.4];
const drumHits = await splitAudioBufferAtTimePoints(drumLoop, hitPoints);
// Results in 6 segments with individual drum hits
```

### Working with different audio formats

```javascript
// Processing a podcast recording
const podcast = /* podcast AudioBuffer */;
const chapterMarks = [120, 360, 720, 1200];
const chapters = await splitAudioBufferAtTimePoints(podcast, chapterMarks);

// Extracting specific sections from a field recording
const fieldRecording = /* field recording AudioBuffer */;
const interestingMoments = [14.3, 27.8, 42.1, 56.7];
const highlights = await splitAudioBufferAtTimePoints(fieldRecording, interestingMoments);
```
