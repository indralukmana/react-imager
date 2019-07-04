import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Transformer, Image } from 'react-konva';
import useImage from 'use-image';
import { Transformer as TransformerType } from 'konva/types/shapes/Transformer';
import Konva from 'konva';
import { connect } from 'react-redux';
import { doSetPosition } from '../redux/actions';
// import sampleImage from './sample.jpg';

interface KonvaImageProps {
  setContainer?;
  canvasWidth: number;
  rotationDegree: number;
  scale: number;
  sampleImage?;
  position?;
  onSetPosition?;
}

const KonvaImage: React.FunctionComponent<KonvaImageProps> = props => {
  const {
    setContainer = null,
    canvasWidth = 300, // We only need the canvas width, the height will be calculated
    rotationDegree = 0,
    scale = 1,
    position,
    sampleImage,
    onSetPosition,
  } = props;

  const [image, status] = useImage(sampleImage);
  const [imageSize, setImageSize] = useState({
    imageHeight: 0,
    imageWidth: 0,
  });
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const imageRef = useRef(image);
  const transformRef = useRef<TransformerType>(null);

  // x and y for the image
  // const [position, setPosition] = useState({
  //   x: 600,
  //   y: 300,
  // });

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.target.to({
      scaleX: scale,
      scaleY: scale,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
    // dispatch({
    //   type: 'SET_POSITION',
    //   payload: { x: e.target.attrs.x, y: e.target.attrs.y },
    // });
    onSetPosition({
      x: e.target.attrs.x,
      y: e.target.attrs.y,
    });
  };

  // This will set the x and y for the image it is used for
  // draggable setting https://github.com/konvajs/react-konva/issues/256
  // useEffect(() => {
  //   setPosition({ x: width, y: height });
  // }, [width, height]);

  /*
  This hook is for handling the image loading. When the image
  successfully loaded the original image height and width will be
  stored in imageHeight and imageWidth
  */
  useEffect(() => {
    if (status === 'loaded') {
      setImageSize({
        imageHeight: image.height,
        imageWidth: image.width,
      });

      /*
      This would enable the in canvas rotation and resize
      I'm turning it off because we have the rotate and zoom buttons.
      But they might be usefull if we incorporate rotation and resizing
      on the canvas. I'm also still trying to figure out how to turn off the
      transform on image result.
      */
      // if (transformRef.current) {
      // transformRef.current.setNode(imageRef.current);
      // transformRef.current.getLayer().batchDraw();
      // }
    }
  }, [status, image]);

  /* This hook will set the height and width of picture
    in the canvas they are calculated by the original
    picture aspect ratio
   */
  useEffect(() => {
    const { imageHeight, imageWidth } = imageSize;
    setHeight(
      (imageHeight / imageWidth) * canvasWidth -
        ((imageHeight / imageWidth) * canvasWidth) / 2,
    );
    setWidth(canvasWidth - canvasWidth / 2);

    // dispatch({
    //   type: 'SET_POSITION',
    //   payload: {
    //     y:
    //       (imageHeight / imageWidth) * canvasWidth -
    //       ((imageHeight / imageWidth) * canvasWidth) / 2,
    //     x: canvasWidth - canvasWidth / 2,
    //   },
    // });
    onSetPosition({
      y:
        (imageHeight / imageWidth) * canvasWidth -
        ((imageHeight / imageWidth) * canvasWidth) / 2,
      x: canvasWidth - canvasWidth / 2,
    });
  }, [imageSize, canvasWidth, onSetPosition]);

  /*
    This hook will set the container on parent with image ref from Konva.
    This is used for image output result
  */
  useEffect(() => {
    setContainer(imageRef.current);
  }, [imageRef, setContainer]);

  return (
    <Stage
      /*
      We can set the container with Stage ref if we want to save the whole canvas.
      I think we want to save only the image, so I set the container on the Image component
      */
      // ref={ref => {
      //   setContainer(ref);
      // }}
      width={canvasWidth}
      height={(imageSize.imageHeight / imageSize.imageWidth) * canvasWidth || 0}
      style={{ border: '1px solid gray' }}
    >
      <Layer>
        <Image
          ref={ref => {
            setContainer(ref);
            return imageRef;
          }}
          image={image}
          onClick={() => {
            console.log(image);
          }}
          height={height || 0}
          width={width || 0}
          rotation={rotationDegree || 0}
          scale={{ x: scale, y: scale }}
          x={position.x || 0}
          y={position.y || 0}
          offset={{
            x: width / 2,
            y: height / 2,
          }}
          draggable
          onDragEnd={handleDragEnd}
        />
        <Transformer ref={transformRef} centeredScaling />
      </Layer>
    </Stage>
  );
};

const mapStateToProps = state => ({
  position: state.position,
  sampleImage: state.image,
});

const mapDispatchToProps = dispatch => ({
  onSetPosition: position => dispatch(doSetPosition(position)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KonvaImage);
