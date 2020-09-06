import engine from "src/engine";
import { dB, Hz, ms } from "src/units/index";
import EngineNodeControls from "./EngineNodeControls";
import { render } from "preact";
import { html } from "htm/preact";

const eng = engine((tools) => {
  const { pipe, sine, gain, mute, mix, noiseGate } = tools;

  const lowSignal = pipe(
    sine(Hz(300)),
    noiseGate(dB(-30), ms(10), ms(100), ms(40)), // thres, attack, hold, release
    // highPassFilter(300), // HPF filter at 300Hz
    // compressor(-20, 0.25), // compress anything above -20dB at a 4:1 ratio
    gain(dB(-3)) // drop volume by -15dB
  );

  const highSignal = pipe(
    sine(Hz(800)),
    // highPassFilter(300), // HPF filter at 300Hz
    // compressor(-20, 0.25), // compress anything above -20dB at a 4:1 ratio
    gain(dB(-5)) // drop volume by -15dB
  );

  return pipe(mix(lowSignal, highSignal), gain(dB(-20)), mute(false));
});

// mount the engine to the root of the page
const app = html`<${EngineNodeControls} engine=${eng} />`;
render(app, document.body);
