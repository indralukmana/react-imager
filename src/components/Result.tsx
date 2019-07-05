import React from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { doUploadImage } from '../redux/actions';

const Result = (props): JSX.Element => {
  const { state, onUpload } = props;

  const { image, imageName, rotation, scale, position } = state;

  const download = () => {
    const link = document.createElement('a');
    link.download = 'filename.png';
    link.href = image;
    document.body.appendChild(link);
    link.click();
  };

  const upload = () => {
    const imageData = {
      imageName,
      image,
      imageProps: {
        rotation,
        scale,
        position,
      },
    };
    onUpload(imageData);
    // const { image };
    // const imageData = {};
  };

  return (
    <>
      <img src={image} alt="edit result" />
      <button type="button" onClick={download}>
        Download
      </button>
      <button type="button" onClick={upload}>
        Upload
      </button>
    </>
  );
};

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  onUpload: data => dispatch(doUploadImage(data)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Result),
);
