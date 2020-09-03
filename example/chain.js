(function () {
    'use strict';

    class ChainNode {
        pipe(...nodes) {
            let prevNode = this;
            nodes.forEach(chainNode => {
                prevNode.connect(chainNode);
                prevNode = chainNode;
            });
            return prevNode;
        }
        connect(chainNode) {
            this.node.connect(chainNode.node);
        }
    }

    function sineFactory(engine) {
        return function (freq) {
            return new Sine(engine, freq);
        };
    }
    class Sine extends ChainNode {
        constructor(engine, freq) {
            super();
            this.node = engine.audioContext.createOscillator();
            this.node.type = 'sine';
            this.node.frequency.value = freq.hertz();
        }
    }

    function gainFactory(engine) {
        return function (spl) {
            return new Gain(engine, spl);
        };
    }
    class Gain extends ChainNode {
        constructor(engine, spl) {
            super();
            this.node = engine.audioContext.createGain();
            this.node.gain.value = spl.coefficient();
        }
    }

    function mixFactory(engine) {
        return function (...sources) {
            return new Mix(engine, ...sources);
        };
    }
    class Mix extends ChainNode {
        constructor(engine, ...sources) {
            super();
            this.node = engine.audioContext.createGain();
            sources.forEach(source => {
                source.connect(this);
            });
        }
    }

    class Toolkit {
        constructor(engine) {
            this.engine = engine;
        }
        get sine() {
            return sineFactory(this.engine);
        }
        get gain() {
            return gainFactory(this.engine);
        }
        get mix() {
            return mixFactory(this.engine);
        }
    }

    function engine(setup) {
        // create the environment structure
        const engine = new Engine();
        const toolkit = new Toolkit(engine);
        // let the user fill in the environment
        const out = setup(toolkit);
        // hookup the final output
        out.node.connect(engine.audioContext.destination);
        return engine;
    }
    class Engine {
        constructor() {
            this.audioContext = new AudioContext();
        }
    }

    function dB(value) {
        return new Decibel(value);
    }
    class Decibel {
        constructor(value) {
            this.value = value;
        }
        decibels() {
            return this.value;
        }
        coefficient() {
            return Math.pow(10, (this.value / 20));
        }
    }

    function Hz(value) {
        return new Hertz(value);
    }
    class Hertz {
        constructor(value) {
            this.value = value;
        }
        hertz() {
            return this.value;
        }
    }

    engine(tools => {
        const { sine, gain, mix } = tools;
        const low = sine(Hz(300)).pipe(
        // gate(-30, 10, 0.5), // -30dB gate, with 10ms attack and 0.5ms release
        // highPassFilter(300), // HPF filter at 300Hz
        // compressor(-20, 0.25), // compress anything above -20dB at a 4:1 ratio
        gain(dB(-8)));
        const hi = sine(Hz(800)).pipe(
        // gate(-30, 10, 0.5), // -30dB gate, with 10ms attack and 0.5ms release
        // highPassFilter(300), // HPF filter at 300Hz
        // compressor(-20, 0.25), // compress anything above -20dB at a 4:1 ratio
        gain(dB(-15)));
        return mix(low, hi);
    });

}());
