import React, { useState } from 'react';
import './App.css';
import AvatarEditor from 'react-avatar-editor';
import sampleImage from './sample.jpg';

const App = (): JSX.Element => {
  const [rotation, setRotation] = useState<number>(0);

  const rotate = (degree: number) => {
    if (rotation > -360 && rotation < 360) {
      setRotation(rotation + degree);
    } else {
      setRotation(degree);
    }
  };

  return (
    <div className="app">
      <header className="app-header">React Imager</header>
      <div className="image-container">
        <AvatarEditor image={sampleImage} rotate={rotation} />
      </div>

      <div className="btn-groups-manipulate">
        <button type="button" onClick={() => rotate(-10)}>
          Rotate Left
        </button>
        <button type="button" onClick={() => rotate(10)}>
          Rotate Right
        </button>
        <button type="button">Scale Up</button>
        <button type="button">Scale Down</button>
      </div>

      <button type="button">Finish</button>
    </div>
  );
};

export default App;
