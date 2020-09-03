import engine from "src/engine";
import { dB, Hz } from "src/units";

engine((tools) => {
  const { sine, gain, mix } = tools;

  const low = sine(Hz(300)).pipe(
    // gate(-30, 10, 0.5), // -30dB gate, with 10ms attack and 0.5ms release
    // highPassFilter(300), // HPF filter at 300Hz
    // compressor(-20, 0.25), // compress anything above -20dB at a 4:1 ratio
    gain(dB(-8)) // drop volume by -15dB
  );

  const hi = sine(Hz(800)).pipe(
    // gate(-30, 10, 0.5), // -30dB gate, with 10ms attack and 0.5ms release
    // highPassFilter(300), // HPF filter at 300Hz
    // compressor(-20, 0.25), // compress anything above -20dB at a 4:1 ratio
    gain(dB(-15)) // drop volume by -15dB
  );

  return mix(low, hi);
});
