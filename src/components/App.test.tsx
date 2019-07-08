import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  // waitForElement,
} from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { initialState, reducer } from '../redux/reducer';

const leftClick = { button: 0 };

const renderWithRedux = (ui, store = createStore(reducer, initialState)) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};
afterEach(cleanup);

test('load App', () => {
  const { getByTestId } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByTestId('appComponent')).toBeInTheDocument();
});

test('navigate to gallery', () => {
  const { getByTestId } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const galleryNavLink = getByTestId('galleryNavLink');
  expect(galleryNavLink).toBeInTheDocument();

  fireEvent.click(galleryNavLink, leftClick);
  expect(getByTestId('galleryComponent')).toBeInTheDocument();
});

test('navigate to gallery then to editor', () => {
  const { getByTestId } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const galleryNavLink = getByTestId('galleryNavLink');
  expect(galleryNavLink).toBeInTheDocument();

  fireEvent.click(galleryNavLink, leftClick);
  expect(getByTestId('galleryComponent')).toBeInTheDocument();

  const editorNavLink = getByTestId('editorNavLink');
  fireEvent.click(editorNavLink, leftClick);
  expect(getByTestId('editorComponent')).toBeInTheDocument();
});

test('test initial states', () => {
  const { store } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(store.getState()).toMatchObject(initialState);
});

test('dispatch redux rotation', () => {
  const { store } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const state = {
    image: null,
    imageName: '',
    rotation: 10,
    scale: 1,
    position: { x: 0, y: 0 },
    images: [{ image: '', imageName: '', _id: 0, imageProps: {} }],
  };

  store.dispatch({ type: 'ROTATE', payload: 10 });
  expect(store.getState()).toMatchObject(state);
});

test('dispatch redux scale', () => {
  const { store } = renderWithRedux(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const state = {
    image: null,
    imageName: '',
    rotation: 0,
    scale: 0.1,
    position: { x: 0, y: 0 },
    images: [{ image: '', imageName: '', _id: 0, imageProps: {} }],
  };

  store.dispatch({ type: 'SCALE', payload: 0.1 });
  expect(store.getState()).toMatchObject(state);
});
