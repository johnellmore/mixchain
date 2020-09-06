# Mixchain: Fluent JS audio effects chaining

Mixchain is an **experimental** declarative format for defining a Web Audio signal chain. A Mixchain config looks like this:

```js
const singer = pipe(
    input(0),
    gain(dB(20)),
    noiseGate(dB(-40), ms(10), ms(100), ms(40)), // thres, attack, hold, release
    highPassFilter(Hz(300)),
    compressor(dB(-20), ratio(4, 1)),
    gain(dB(15))
);

const guitar = pipe(
    input(1)
    gain(dB(10))
    noiseGate(dB(-30), ms(10), ms(100), ms(40)),
);

const output = mix(
    pipe(singer, gain(dB(-5))),
    pipe(guitar, gain(dB(-2))),
);
```

This example implements a rudimentary signal chain that might be used in a live audio setup.

## Try it

There's no hosted example just yet. But you can spin up the in-repository example from the `examples/` directory:

1. Clone the repo locally.
2. Install dependencies: `npm i`
3. Build the example: `npm run build-example`
4. Open `example/index.html` in a browser.

## Basis

Mixchain leans on the idea that audio signal chains are essentially just _function composition_; for example:

```
voiceChain(voiceSignal) = compressor(eq(noiseGate(gain(voiceSignal))))
```

In Mixchain, each node in the chain is a different effect or transformer--which is roughly equivalent to a function that just operates on a continuous audio signal.

### Uses

This format gives lots of flexibility. For example, here's how you'd implement a monitor mix bus in a live environment:

```js
const singer = input(0);
const guitar = input(1);
const crowd = input(2);

const main = mix(
    pipe(singer, gain(dB(-3))),
    pipe(guitar, gain(dB(-6)))
);
const inEarMix = mix(
    pipe(singer, gain(dB(-3))),
    pipe(guitar, gain(dB(-6))),
    pipe(crowd, gain(dB(10)))
);
```

Or a simple setup for a panel of speakers at a conference:

```js
const makeSpeakerGate = () => noiseGate(dB(-20), ms(50), ms(2000), ms(1000));

const jeanLuc = pipe(input(0), makeSpeakerGate());
const will = pipe(input(1), makeSpeakerGate());
const data = pipe(input(2), makeSpeakerGate());
const geordi = pipe(input(0), makeSpeakerGate());

const main = mix(jeanLuc, will, data, geordi)
```

Or even create rudimentary effects:

```js
const voice = input(0);

// Send the voice/effects output into a delay, attenuate it, and pipe it back
// into the mix. Now our node graph is cyclic--it feeds back into itself.
const voiceAndEchoMix = mix(voice);
pipe(
    voiceAndEchoMix,
    delay(ms(1000)),
    gain(dB(-6)),
    voiceAndEchoMix
);
const output = voiceAndEchoMix;
```

This format can flexibly define almost any signal chain used in the real-world. The inputs, outputs, effects, and chaining is only limited by the computer's performance.

## Usage

Every chain must be defined inside of a single `Engine`. The chain is configured inside a callback when constructing the engine. In that callback, you have access to `tools`, which contains all of the factory methods and glue functions that you need to assemble a chain. The properties of the `tools` object are specifically bound to the `Engine` instance that you're creating. Under the hood, an `Engine` is essentially just a native `AudioContext` instance along with some other properties.

```js
const eng = engine((tools) => {
  const { pipe, sine, mix, gain } = tools;
  const lowSignal = sine(Hz(300));
  const highSignal = sine(Hz(800));
  return pipe(
    mix(lowSignal, highSignal),
    gain(dB(-3))
  );
});
```

### Units

Nodes accept unit types specific to the nature of their properties. For example, a `gain()` node accepts the decibel value of the adjustment that you want to make.

Units of the same domain and usage can be converted between one another. For example, `Second`s and `BPM` are both instances of `TimeInterval`. You can pass either one to nodes which accept `TimeInterval`s.

When constructing nodes, you can create a value with a particular unit by using the factory functions:

```js
import { Hz } from "src/units";

engine((tools) => {
    return sine(Hz(440));
});
```

### Dynamic parameters

Most nodes expose parameters that can be modified dynamically. Each modifiable parameter is a `Parameter` subclass which exposes a `value` property. Changing this value will affect the underlying node.

```js
const eng = engine((tools) => {
    return sine(Hz(440));
});
const sineNode = eng.nodes[0];
const sineParam = sineNode.params; // a Map<string, Parameter>
const freqParam = sineParam.get('Frequency');
console.log(freqParam.value); // get a `Hertz` instance of 440Hz
freqParam.value = Hz(880); // change the value
```

## Currently missing

Because this is experimental, it's not much use for anything in the real-world. Here are some things that it can't currently do, but which would be nice to introduce.

- **More source nodes.** Currently there's only support for a sine wave generator. I'd like to add support for other wave types (should be trivial), white/pink noise, live audio input, and sample playback.
- **Multichannel support.** I haven't tested anything except mono signals so far. Native Web Audio APIs support multichannel signals out of the box, but piping them together in a fluent way is more complicated. I'll likely proceed with a mono-first approach, and possibly some add some helpers to support common multichannel operations.
- **Input/output patching.** Need to allow live and prerecorded audio sources to be piped into the signal chain. This will probably be a separate patching layer that happens outside the engine, which maps and splits out the various sources to a numbered list of mono inputs. And same with output.
- **More effects.** Only some of the basics are supported right now. I'd like to implement at least a noise gate, multiband EQ, compressor, basic reverb, and delay.
- **Node graph generation.** A flowchart of the signal chain across all nodes.
- **Node tagging.** This would allow UI code to fetch nodes from the signal graph in a simpler way--you could tag all regular "channel" nodes and their immediate effects with a tag, and then UI code could pull all nodes with the same tag and display controls for their parameters.
