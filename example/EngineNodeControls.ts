import ChainNode from "src/ChainNode";
import { Engine } from "src/engine";
import { html } from "htm/preact";
import { Component } from "preact";
import { useState, useCallback } from "preact/hooks";
import {
  DecibelParameter,
  HertzParameter,
  ToggleParameter,
} from "src/parameters";

function DecibelControl(props) {
  const param = props.param as DecibelParameter;
  const [decibelValue, setDecibelValue] = useState(param.value);

  const handleChange = useCallback(
    (event) => {
      const input = event.target as HTMLInputElement;
      const db = parseFloat(input.value);
      param.value = db;
      setDecibelValue(db);
    },
    [decibelValue]
  );

  return html`<div>
    <label>
      ${param.label}
      <br />
      <input
        type="range"
        min="-100"
        max="20"
        step="0.1"
        value=${decibelValue}
        onInput=${handleChange} />
      ${decibelValue.toFixed(2)} dB
    </label>
  </div>`;
}

function ToggleControl(props) {
  const param = props.param as ToggleParameter;
  const [isOn, setIsOn] = useState(param.value);

  const handleChange = useCallback(() => {
    const newIsOn = !param.value;
    param.value = newIsOn;
    setIsOn(newIsOn);
  }, [isOn]);

  return html`<div>
    ${param.label}
    <br />
    <button onClick=${handleChange}>Toggle</button>
    ${isOn ? "ON" : "OFF"}
  </div>`;
}

function HertzControl(props) {
  const [min, max] = [20, 20000];
  const intervalToFreq = (pos) =>
    10 **
    ((Math.log10(max) - Math.log10(min)) * (pos / 1000) + Math.log10(min));
  const freqToInterval = (freq) =>
    ((Math.log10(freq) - Math.log10(min)) /
      (Math.log10(max) - Math.log10(min))) *
    1000;

  const param = props.param as DecibelParameter;
  const [intervalValue, setIntervalValue] = useState(
    freqToInterval(param.value)
  );

  const handleChange = useCallback(
    (event) => {
      const input = event.target as HTMLInputElement;
      const intervalVal = parseFloat(input.value);
      setIntervalValue(intervalVal);
      const hz = intervalToFreq(intervalVal);
      param.value = hz;
    },
    [intervalValue]
  );

  return html`<div>
    <label>
      ${param.label}
      <br />
      <input
        type="range"
        min="0"
        max="1000"
        step="1"
        value=${intervalValue}
        onInput=${handleChange} />
      ${intervalToFreq(intervalValue).toFixed(1)} Hz
    </label>
  </div>`;
}

class NodeControls extends Component {
  render(props, state) {
    const node: ChainNode = props.node;
    return html`
      <h2>${node.constructor.name}</h2>
      ${[...node.params.values()].map((param) => {
        console.log(param);
        if (param.constructor === DecibelParameter) {
          return html`<${DecibelControl} param=${param} />`;
        } else if (param.constructor === HertzParameter) {
          return html`<${HertzControl} param=${param} />`;
        } else if (param.constructor === ToggleParameter) {
          return html`<${ToggleControl} param=${param} />`;
        } else {
          return html`<em>No param control available</em>`;
        }
      })}
    `;
  }
}

export default class EngineNodeControls extends Component {
  render(props, state) {
    const engine: Engine = props.engine;
    return html`
      <h1>Chain Nodes:</h1>
      <ul>
        ${engine.nodes.map((node) => {
          return html`
          <li>
          <${NodeControls} node=${node} />
          </li>
        `;
        })}
      </ul>
    `;
  }
}
