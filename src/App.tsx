import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Canvas } from './components/Canvas/Canvas';
import { Sidebar } from './components/Sidebar/Sidebar';
import { store } from './store';


export const App = () => {
  window.addEventListener('selectstart', (e) => e.preventDefault());

  return(
    <>
      <Provider store={store}>
        <Sidebar />
        <Canvas />
      </Provider>
    </>
  );
};