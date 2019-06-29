import React from 'react';
import './App.css';
import sampleImage from './sample.jpg';

interface Props {
  [n: string]: never;
}

const App: React.FunctionComponent<
  Props
> = (): JSX.Element => (
  <div className="app">
    <header className="app-header">React Imager</header>

    <img
      src={sampleImage}
      alt="sample"
      style={{ width: '50%' }}
    />

    <div className="btn-groups-manipulate">
      <button type="button">Rotate Left</button>
      <button type="button">Rotate Right</button>
      <button type="button">Scale Up</button>
      <button type="button">Scale Down</button>
    </div>

    <button type="button">Finish</button>
  </div>
);

export default App;
