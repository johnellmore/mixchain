import { Engine } from 'src/engine';
import { sineFactory } from 'src/sources/Sine';
import { mixFactory } from 'src/volume/Mix';

export default class Toolkit {
    private engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    get sine() {
        return sineFactory(this.engine);
    }

    get gain() {
        // TODO replace
        return sineFactory(this.engine);
    }

    get mix() {
        return mixFactory(this.engine);
    }
}
