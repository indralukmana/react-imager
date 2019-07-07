import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Stage } from 'react-konva';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Input } from 'reactstrap';
import KonvaImage from './KonvaImage';
import { doRotate, doScale, doSetImage } from '../redux/actions';

const Editor = (props): JSX.Element => {
  // const [rotation, setRotation] = useState<number>(0);
  // const [scale, setScale] = useState<number>(1);
  const [finish, setFinish] = useState<boolean>(false);
  // const [dataURL, setDataURL] = useState<string>('');
  const [container, setContainer] = useState<Stage | null>(null);
  const [imageName, setImageName] = useState<string>('');

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

      const imageData = {
        imageName,
        image: imageCanvas,
      };

      props.onSetImage(imageData);

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
      const imageData = {
        image: reader.result,
        imageName: file.name,
      };
      setImageName(imageData.imageName);
      // props.onSetImage(reader.result);
      props.onSetImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    props.onSetImage({ imageName: '', image: null });
    setImageName('');
    props.onSetScale(1);
    props.onSetRotation(0);
  };

  if (finish) {
    return <Redirect to={{ pathname: '/result/' }} />;
  }

  return (
    <>
      {/* <div className="image-container"> */}
      <div
        style={{
          width: 600,
          height: 'auto',
          // border: '1px solid gray',
        }}
      >
        {!imageName && <Input type="file" onChange={handleFileLoad} />}
        {imageName && (
          <KonvaImage
            setContainer={setContainer}
            canvasWidth={600}
            rotationDegree={rotation}
            scale={scale}
            // image={image}
          />
        )}
      </div>

      <ButtonGroup>
        <Button color="secondary" type="button" onClick={() => rotate(-10)}>
          Rotate Left
        </Button>
        <Button color="secondary" type="button" onClick={() => rotate(10)}>
          Rotate Right
        </Button>
        <Button color="secondary" type="button" onClick={() => zoom(0.1)}>
          Zoom In
        </Button>
        <Button color="secondary" type="button" onClick={() => zoom(-0.1)}>
          Zoom Out
        </Button>
        <Button color="warning" type="button" onClick={reset}>
          Reset
        </Button>
      </ButtonGroup>

      <Button color="primary" type="button" onClick={process}>
        Finish
      </Button>
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
