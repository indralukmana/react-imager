import React from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'reactstrap';
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
      <Container>
        <Row style={{ justifyContent: 'center' }}>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button type="button" onClick={download}>
              Download
            </Button>
          </Col>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Button type="button" onClick={upload}>
              Upload
            </Button>
          </Col>
        </Row>
      </Container>
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
