import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Stage } from 'react-konva';
import { connect } from 'react-redux';
import KonvaImage from './KonvaImage';
import { doRotate, doScale, doSetImage } from '../redux/actions';

const Editor = (props): JSX.Element => {
  // const [rotation, setRotation] = useState<number>(0);
  // const [scale, setScale] = useState<number>(1);
  const [finish, setFinish] = useState<boolean>(false);
  const [dataURL, setDataURL] = useState<string>('');
  const [container, setContainer] = useState<Stage | null>(null);

  const { rotation, scale } = props;

  const rotate = (degree: number) => {
    if (rotation > -360 && rotation < 360) {
      // setRotation(rotation + degree);

      // dispatch({
      //   type: 'ROTATE',
      //   payload: rotation + degree,
      // });
      props.onSetRotation(rotation + degree);
    } else {
      // setRotation(degree);
      // dispatch(degree);
      props.onSetRotation(degree);
    }
  };

  const zoom = (scaleChange: number) => {
    if (scale + scaleChange > 0) {
      // dispatch({
      //   type: 'SCALE',
      //   payload: scale + scaleChange,
      // });
      props.onSetScale(scale + scaleChange);
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

  const handleFileLoad = event => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // dispatch({
      //   type: 'SET_IMAGE',
      //   payload: reader.result,
      // });
      props.onSetImage(reader.result);
    };
    reader.readAsDataURL(file);
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
          // image={image}
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
      <input type="file" onChange={handleFileLoad} />
      <button type="button" onClick={process}>
        Finish
      </button>
    </>
  );
};

const mapStateToProps = state => ({
  rotation: state.rotation,
  scale: state.scale,
});

const mapDispatchToProps = dispatch => ({
  onSetRotation: rotation => dispatch(doRotate(rotation)),
  onSetScale: scale => dispatch(doScale(scale)),
  onSetImage: image => dispatch(doSetImage(image)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);
