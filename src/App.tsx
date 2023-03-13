import { Provider } from 'react-redux';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Switcher } from './components/Switcher';
import { store } from './store';


export const App = () => {
  window.addEventListener('selectstart', (e) => e.preventDefault());

  return(
    <>
      <Provider store={store}>
        <Sidebar />
        <Switcher />
      </Provider>
    </>
  );
};