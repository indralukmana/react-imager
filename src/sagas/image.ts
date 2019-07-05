import { call, takeEvery, all } from 'redux-saga/effects';

const url = 'http://localhost:5555/image/uploadbase';

const uploadImage = payload => {
  console.log(JSON.stringify(payload));
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    console.log(res);
    return res.json();
  });
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
