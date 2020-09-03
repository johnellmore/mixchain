# Mixchain: Fluent JS audio effects chaining

Mixchain is an **experimental** declarative format for defining an audio effects chain in TypeScript/JavaScript. A Mixchain config looks like this:

```js
const singer = input(0).pipe(
    gain(dB(20)),
    noiseGate(dB(-40), ms(10), ms(100), ms(40)), // thres, attack, hold, release
    highPassFilter(Hz(300)),
    compressor(dB(-20), ratio(4, 1)),
    gain(dB(15))
);

const guitar = input(1).pipe(
    gain(dB(10))
    noiseGate(dB(-30), ms(10), ms(100), ms(40)),
);

const output = mix(
    singer.pipe(gain(dB(-5))),
    guitar.pipe(gain(dB(-2))),
);
```

This example implements a rudimentary signal chain that might be used in a live audio setup.

## Basis

Mixchain leans on the idea that audio effects chains are basically just _function composition_; for example:

```
voiceChain(voiceSignal) = compressor(eq(noiseGate(gain(voiceSignal))))
```

In Mixchain, each node in the chain is a different effect or transformer--which is roughly equivalent to a function that just operates on a continuous audio signal.

## Uses

This format gives lots of flexibility. For example, here's how you'd implement a monitor mix bus in a live environment:

```js
const singer = input(0);
const guitar = input(1);
const crowd = input(2);

const main = mix(
    singer.pipe(gain(dB(-3))),
    guitar.pipe(gain(dB(-6)))
);
const inEarMix = mix(
    singer.pipe(gain(dB(-3))),
    guitar.pipe(gain(dB(-6))),
    crowd.pipe(gain(dB(10)))
);
```

Or a simple setup for a panel of speakers at a conference:

```js
const speakerGate = () => noiseGate(dB(-20), ms(50), ms(2000), ms(1000));

const jeanLuc = input(0).pipe(speakerGate());
const will = input(1).pipe(speakerGate());
const data = input(2).pipe(speakerGate());
const geordi = input(0).pipe(speakerGate());

const main = mix(jeanLuc, will, data, geordi)
```

Or even rudimentary effects:

```js
const voice = input(0);
const echo = voice.pipe(
    delay(ms(1000)),
    gain(dB(-6)),
);
const echoedVoice = mix(voice, echo)
```

This format can flexibly define almost any signal chain used in the real-world. The inputs, outputs, effects, and chaining is only limited by the computer's performance.

## Currently missing

Because this is experimental, it's not much use for anything in the real-world. Here are some things that it can't do, but which might be nice to introduce:

- Dynamic (changeable) parameters for effects
- Input/output patching
- More effects (only bare basics are supported right now)
- Node graph generation (visualizing)
- Node tagging (could be useful to auto-generate a UI in the future)
- Multi-channel support (haven't tested anything except mono signals)
- Recursive effects chains (like have an echo feedback into itself)
