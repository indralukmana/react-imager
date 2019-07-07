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

const store = createStore(reducer, initialState);
const leftClick = { button: 0 };

const renderWithRedux = ui => {
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
