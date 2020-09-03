import engine from "src/engine";
import { dB, Hz, ms } from "src/units";

engine((tools) => {
  const { sine, gain, mix, noiseGate } = tools;

  const low = sine(Hz(300)).pipe(
    noiseGate(dB(-30), ms(10), ms(100), ms(40)), // threshold/attack/hold/release
    // highPassFilter(300), // HPF filter at 300Hz
    // compressor(-20, 0.25), // compress anything above -20dB at a 4:1 ratio
    gain(dB(-3)) // drop volume by -15dB
  );

  const hi = sine(Hz(800)).pipe(
    // highPassFilter(300), // HPF filter at 300Hz
    // compressor(-20, 0.25), // compress anything above -20dB at a 4:1 ratio
    gain(dB(-15)) // drop volume by -15dB
  );

  return mix(low, hi);
});
