const doRotate = rotation => ({
  type: 'ROTATE',
  payload: rotation,
});

const doScale = scale => ({
  type: 'SCALE',
  payload: scale,
});

const doSetImage = imageData => ({
  type: 'SET_IMAGE',
  payload: imageData,
});

const doSetPosition = position => ({
  type: 'SET_POSITION',
  payload: position,
});

const doUploadImage = imageData => ({
  type: 'UPLOAD_IMAGE',
  payload: imageData,
});

export { doRotate, doScale, doSetImage, doSetPosition, doUploadImage };
