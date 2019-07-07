const initialState = {
  image: null,
  imageName: '',
  rotation: 0,
  scale: 1,
  position: { x: 0, y: 0 },
  images: [{ image: '', imageName: '', _id: 0, imageProps: {} }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ROTATE':
      return {
        ...state,
        rotation: action.payload,
      };
    case 'SCALE':
      return {
        ...state,
        scale: action.payload,
      };
    case 'SET_POSITION':
      return {
        ...state,
        position: action.payload,
      };
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload.image,
        imageName: action.payload.imageName,
      };
    case 'SET_IMAGES_ALL':
      console.log('set_images_all =>', action.payload);
      return {
        ...state,
        images: action.payload,
      };
    default:
      return state;
  }
};

export { initialState, reducer };
