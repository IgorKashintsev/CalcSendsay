import style from './Switcher.module.scss';
import imgRuntime from 'images/eye.svg';
import imgRuntimeBlue from 'images/eyeBlue.svg';
import imgConstructor from 'images/selector.svg';
import imgConstructorBlue from 'images/selectorBlue.svg';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSwitcher } from 'src/store/switcher/slice';

export const Switcher = () => {
  const [imgRun, setImgRun] = useState(imgRuntime);
  const [imgCons, setImgCons] = useState(imgConstructorBlue);

  const runtimeRef = useRef<HTMLButtonElement>(null);
  const constructorRef = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();

  const handleClickRun = () => {
    runtimeRef.current?.classList.add(`${style.switcher__runtime__active}`);
    constructorRef.current?.classList.remove(`${style.switcher__constructor__active}`);
    dispatch(changeSwitcher({runtime: true, constructor: false}));
    setImgRun(imgRuntimeBlue);
    setImgCons(imgConstructor);
  };

  const handleClickCons = () => {
    runtimeRef.current?.classList.remove(`${style.switcher__runtime__active}`);
    constructorRef.current?.classList.add(`${style.switcher__constructor__active}`);
    dispatch(changeSwitcher({runtime: false, constructor: true}));
    setImgRun(imgRuntime);
    setImgCons(imgConstructorBlue);
  };

  return(
    <div className={style.switcher}>
      <button
        ref={runtimeRef}
        className={style.switcher__runtime}
        onClick={handleClickRun}
      >
        <img src={imgRun}></img>
        <span>Runtime</span>
      </button>
      <button
        ref={constructorRef}
        className={`${style.switcher__constructor} ${style.switcher__constructor__active}`}
        onClick={handleClickCons}
      >
        <img src={imgCons}></img>
        <span>Constructor</span>
      </button>
    </div>  
  );
};