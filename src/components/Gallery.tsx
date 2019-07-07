import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';
import { doFetchImages } from '../redux/actions';

const Gallery = props => {
  const { onFetchImages, images } = props;

  const [activeIndex, setActiveIndex] = useState<number>(
    images ? images.length - 1 : 0,
  );
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    console.log('Gallery');
    onFetchImages();
  }, [onFetchImages]);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const carouselStyle = {
    backgroundColor: 'gray',
  };

  const slides = images.map(image => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        // eslint-disable-next-line no-underscore-dangle
        key={image._id}
        onExiting={onExiting}
        onExited={onExited}
      >
        <img src={image.image} alt={image.imageName} style={carouselStyle} />
        <CarouselCaption
          captionText={image.imageName}
          className="text-warning"
        />
      </CarouselItem>
    );
  });

  return (
    <div>
      {images && (
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={images}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  images: state.images,
  state,
});

const mapDispatchToProps = dispatch => ({
  onFetchImages: query => dispatch(doFetchImages(query)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Gallery),
);
