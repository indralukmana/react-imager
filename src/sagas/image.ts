import { call, takeEvery, all, put } from 'redux-saga/effects';
import { create } from 'apisauce';
import { doSetImages } from '../redux/actions';

const url = 'http://localhost:5555';
const api = create({
  baseURL: url,
  headers: { Accept: '*/*' },
});

const uploadImage = async payload => {
  const data = JSON.stringify(payload);

  // fetch(url, {
  //   method: 'POST',
  //   body: JSON.stringify(payload),
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }).then(res => {
  //   console.log(res);
  //   return res.json();
  // });

  const result = await api.post('/image/uploadbase', data, {
    headers: { 'Content-Type': 'application/json' },
  });

  // console.log(result);
  return result;
};

function* handleUploadImage(action) {
  const { payload } = action;
  // console.log('handleUpload =>', action);
  console.log('imageData =>', payload);
  try {
    yield call(uploadImage, payload);
    // console.log(result);
  } catch (error) {
    // yield put(doFetchErrorStories(error));\
    console.log('Error');
    console.log(error);
  }
}

const fetchImages = async () => {
  console.log('fetchImages');
  const result = await api
    .get('/image/all', {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      return response.data;
    });
  // .then(console.log);
  // console.log(result);
  return result;
};

function* handleFetchImages() {
  console.log('handleFetchImages');
  try {
    const result = yield call(fetchImages);
    yield put(doSetImages(result));
    console.log(result);
  } catch (error) {
    console.log('Error');
    console.log(error);
  }
}

function* watchAll() {
  yield all([
    takeEvery('UPLOAD_IMAGE', handleUploadImage),
    takeEvery('IMAGES_FETCH', handleFetchImages),
  ]);
}

export default watchAll;
