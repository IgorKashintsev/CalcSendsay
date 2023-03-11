import { FC, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNumbers, selectOperators, selectResult } from 'src/store/buttons/selectors';
import { addElement } from 'src/store/sidebar/slice';
import style from './Sidebar.module.scss';

export const Sidebar: FC = () => {
  const operators = ['/', 'x', '-', '+'];
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3];
  const displayRef = useRef<HTMLDivElement>(null);
  const operatorsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const equalsRef = useRef<HTMLDivElement>(null);

  // const operators = useSelector(selectOperators);
  // const numbers = useSelector(selectNumbers);

  const dispatch = useDispatch();

  const copy = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    switch(id) {
      case 'display': {
        // const cloneDisplay = displayRef.current?.cloneNode(true) as HTMLDivElement
        // cloneDisplay.draggable = false;
        // cloneDisplay.classList.add(`${style.noDrop}`);
        dispatch(addElement({dropEl: displayRef.current}));
        displayRef.current!.draggable = false;
      }; break;
      case 'operators': {
        const cloneOperators = operatorsRef.current?.cloneNode(true) as HTMLDivElement
        cloneOperators.classList.add(`${style.drop}`);
        dispatch(addElement({dropEl: cloneOperators}));
        operatorsRef.current!.draggable = false
      }; break;
      case 'numbers': {
        const cloneNumbers = numbersRef.current?.cloneNode(true) as HTMLDivElement
        cloneNumbers.classList.add(`${style.drop}`);
        dispatch(addElement({dropEl: cloneNumbers}));      
        numbersRef.current!.draggable = false
      }; break;
      case 'equals': {
        const cloneEquals = equalsRef.current?.cloneNode(true) as HTMLDivElement
        cloneEquals.classList.add(`${style.drop}`);
        dispatch(addElement({dropEl: cloneEquals}));      
        equalsRef.current!.draggable = false
      }; break;
    }
  };

  return(
    <div className={style.sidebar}>
      <div 
        ref={displayRef}
        className={style.sidebar__display}
        id='display'
        onDragStart={(e) => copy(e, displayRef.current ? displayRef.current.id : '')}
        draggable="true" 
      >
        <div className={style.sidebar__display__in}>
          <span>0</span>
        </div>
      </div>
      <div 
        ref={operatorsRef}
        className={style.sidebar__operators}
        id='operators'
        onDragStart={(e) => copy(e, operatorsRef.current ? operatorsRef.current.id : '')}
        draggable="true" 
      >
        {operators.map((item) => (
          <button id={item.toString()} key={item}>{item}</button>
        ))}
      </div>
      <div 
        ref={numbersRef}
        className={style.sidebar__numbers}
        id='numbers'
        onDragStart={(e) => copy(e, numbersRef.current ? numbersRef.current.id : '')}
        draggable="true" 
      >
        {numbers.map((item) => (
          <button id={item.toString()} key={item}>{item}</button>
        ))}
        <button></button>
        <button></button>
      </div>
      <div 
        ref={equalsRef}
        className={style.sidebar__equals}
        id='equals'
        onDragStart={(e) => copy(e, equalsRef.current ? equalsRef.current.id : '')}
        draggable="true" 
      >
        <button id='='>=</button>
      </div>
    </div>  
  );
};