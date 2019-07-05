import { call, takeEvery, all } from 'redux-saga/effects';
import { create } from 'apisauce';

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

function* watchAll() {
  yield all([takeEvery('UPLOAD_IMAGE', handleUploadImage)]);
}

export default watchAll;
