import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Redirect } from 'react-router-dom';
import sampleImage from './sample.jpg';

const Editor = (): JSX.Element => {
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [finish, setFinish] = useState<boolean>(false);
  const [dataURL, setDataURL] = useState<string>('');
  const imageResult = useRef<AvatarEditor>(null);

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
    if (imageResult.current) {
      const imageCanvas = imageResult.current.getImageScaledToCanvas();
      // const dataURL = imagecanvas.todataurl('image/png');
      // const link = document.createElement('a');
      // link.download = 'filename.png';
      // link.href = dataURL;
      // document.body.appendChild(link);
      // link.click();
      setDataURL(imageCanvas.toDataURL('image/png'));
      setFinish(true);
      console.log(dataURL);
    }
  };

  if (finish) {
    return <Redirect to={{ pathname: '/result/', state: { dataURL } }} />;
  }

  return (
    <>
      <div className="image-container">
        <AvatarEditor
          ref={imageResult}
          image={sampleImage}
          rotate={rotation}
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
