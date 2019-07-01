import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Stage } from 'react-konva';
import KonvaImage from './KonvaImage';

const Editor = (): JSX.Element => {
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [finish, setFinish] = useState<boolean>(false);
  const [dataURL, setDataURL] = useState<string>('');
  const [container, setContainer] = useState<Stage | null>(null);

  const rotate = (degree: number) => {
    if (rotation > -360 && rotation < 360) {
      setRotation(rotation + degree);
    } else {
      setRotation(degree);
    }
  };

  const zoom = (scaleChange: number) => {
    if (scale + scaleChange > 0) {
      setScale(scale + scaleChange);
    }
  };

  const process = () => {
    if (container) {
      const imageCanvas = container
        .getStage()
        .toDataURL({ mimeType: 'image/png' });
      setDataURL(imageCanvas);
      setFinish(true);
      console.log(container);
    }
  };

  if (finish) {
    return <Redirect to={{ pathname: '/result/', state: { dataURL } }} />;
  }

  return (
    <>
      <div className="image-container">
        <KonvaImage
          setContainer={setContainer}
          canvasWidth={600}
          rotationDegree={rotation}
          scale={scale}
        />
      </div>

      <div className="btn-groups-manipulate">
        <button type="button" onClick={() => rotate(-10)}>
          Rotate Left
        </button>
        <button type="button" onClick={() => rotate(10)}>
          Rotate Right
        </button>
        <button type="button" onClick={() => zoom(0.1)}>
          Zoom In
        </button>
        <button type="button" onClick={() => zoom(-0.1)}>
          Zoom Out
        </button>
      </div>

      <button type="button" onClick={process}>
        Finish
      </button>
    </>
  );
};

export default Editor;
