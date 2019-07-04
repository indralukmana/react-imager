const doRotate = rotation => ({
  type: 'ROTATE',
  payload: rotation,
});

const doScale = scale => ({
  type: 'SCALE',
  payload: scale,
});

const doSetImage = image => ({
  type: 'SET_IMAGE',
  payload: image,
});

const doSetPosition = position => ({
  type: 'SET_POSITION',
  payload: position,
});

export { doRotate, doScale, doSetImage, doSetPosition };
