import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Result = (props: RouteComponentProps): JSX.Element => {
  const { location } = props;
  const download = () => {
    const link = document.createElement('a');
    link.download = 'filename.png';
    link.href = location.state.dataURL;
    document.body.appendChild(link);
    link.click();
  };
  return (
    <>
      <img src={location.state.dataURL} alt="edit result" />
      <button type="button" onClick={download}>
        Download
      </button>
    </>
  );
};

export default Result;
