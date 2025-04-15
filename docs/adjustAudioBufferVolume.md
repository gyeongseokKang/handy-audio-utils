# adjustAudioBufferVolume

Adjusts the volume of an AudioBuffer by multiplying all samples by a specified ratio.

## Syntax

```typescript
function adjustAudioBufferVolume(audioBuffer: AudioBuffer, ratio: number): AudioBuffer
```

### Parameters

- `audioBuffer`: The input AudioBuffer to adjust the volume of.
- `ratio`: A number between 0 and 1 representing the volume ratio (e.g., 0.5 = 50% volume).

### Return Value

Returns a new AudioBuffer with the adjusted volume. The original AudioBuffer remains unchanged.

## Description

The `adjustAudioBufferVolume` function creates a new AudioBuffer with the same properties (number of channels, length, and sample rate) as the input buffer, but with all sample values multiplied by the specified ratio. This effectively adjusts the volume of the audio while preserving the relative relationships between samples.

## Examples

```typescript
import { adjustAudioBufferVolume } from 'handy-audio-utils';

// Reduce volume to 50%
const quieterBuffer = adjustAudioBufferVolume(audioBuffer, 0.5);

// Reduce volume to 80%
const slightlyQuieterBuffer = adjustAudioBufferVolume(audioBuffer, 0.8);

// Mute the audio
const mutedBuffer = adjustAudioBufferVolume(audioBuffer, 0);
```

## Notes

- The function preserves the original audio buffer and returns a new one
- Works with any number of channels (mono, stereo, etc.)
- The ratio must be between 0 and 1 (inclusive)
- A ratio of 0 will result in silence
- A ratio of 1 will result in no change to the volume

## Errors

Throws an error if:

- The AudioBuffer is null or undefined
- The ratio is less than 0 or greater than 1
