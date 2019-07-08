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

interface AllImages {
  imageName: string;
  image: string;
  _id: number;
}

const Gallery = props => {
  const { onFetchImages, images } = props;

  const [allImages, setAllImages] = useState<AllImages[]>([
    { imageName: '', image: '', _id: 0 },
  ]);
  const [animating, setAnimating] = useState<boolean>(false);

  const [activeIndex, setActiveIndex] = useState<number>(
    allImages ? allImages.length - 1 : 0,
  );

  useEffect(() => {
    // console.log('Gallery');
    onFetchImages();
    setAllImages(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onExiting = () => {
    setAnimating(true);
  };

  const onExited = () => {
    setAnimating(false);
  };

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === allImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? allImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const carouselStyle = {
    backgroundColor: 'gray',
  };

  const slides = allImages.map(
    (image: { image: string; imageName: string; _id: number }) => {
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
    },
  );

  return (
    <div data-testid="galleryComponent">
      {allImages && (
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={allImages}
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
