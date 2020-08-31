import { Engine } from "src/engine";
import { Hertz } from 'src/units';
import ChainNode from 'src/ChainNode';

export function sineFactory(engine) {
    return function (freq: Hertz) {
        return new Sine(engine, freq);
    };
}

export class Sine extends ChainNode {
    readonly node: OscillatorNode;

    constructor(engine: Engine, freq: Hertz) {
        super();
        this.node = engine.audioContext.createOscillator();
        this.node.type = 'sine';
        this.node.frequency.value = freq.value;
    }
}