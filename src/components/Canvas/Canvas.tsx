import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectListEl } from 'src/store/canvas/selectors';
import { addListEl, deleteElement, replaceElement } from 'src/store/canvas/slice';
import { selectDropEl } from 'src/store/sidebar/selectors';
import { addElement } from 'src/store/sidebar/slice';
import style from './Canvas.module.scss';
import styleSidebar from '../Sidebar/Sidebar.module.scss';
import { selectOperand1, selectOperator, selectResult } from 'src/store/buttons/selectors';

export const Canvas: FC = () => {
  let [elem, setElem] = useState<HTMLDivElement>();
  const [operand1, setOperand1] = useState<string>('0');
  const [operand2, setOperand2] = useState<string>('0');
  const [operator, setOperator] = useState<string>('');
  const [result, setResult] = useState<string>('0');

  const dropContainer = useRef<HTMLDivElement>(null);
  const dropDisplay = useRef<HTMLDivElement>(null);
  const dropOperators = useRef<HTMLDivElement>(null);

  const dropEl = useSelector(selectDropEl);
  const listEl = useSelector(selectListEl);
  // const operator = useSelector(selectOperator);
  // const operand1 = useSelector(selectOperand1);
  // const result = useSelector(selectResult);

  const dispatch = useDispatch();

  useEffect(() => {
    listEl!.map(item => dropOperators.current!.append(item))
    
    listEl.forEach(el => {
      el.ondragstart = () => {
        setElem(elem = el)
      }
      el.ondrop = () => {
        if(elem) {
          const idx1 = listEl.findIndex(item => item.id === elem?.id);
          const idx2 = listEl.findIndex(item => item.id === el.id);
          dispatch(replaceElement({idx1: idx1, idx2: idx2}));
        }
      }
      // el.ondblclick = () => {
      //   const idxDel = listEl.findIndex(item => item.id === el.id);
      //   dispatch(deleteElement(idxDel));
      //   el.parentNode?.removeChild(el)
      // }
    });
  }, [listEl]);

  // useEffect(() => {
  //   console.log(operator);
    
  //   const operatorsEls = listEl.find(item => item.id === 'operators')?.children
  //   if(operatorsEls) {
  //     for(let item of Array.from(operatorsEls!)) {
  //       item.addEventListener('click', () => dispatch(changeOperator(item.id)))
  //     }
  //   }
  //   const numbersEls = listEl.find(item => item.id === 'numbers')?.children
  //   if(numbersEls) {
  //     for(let item of Array.from(numbersEls!)) {
  //       if(!operator) {
  //         item.addEventListener('click', () => dispatch(changeOperand1(Number(item.id))));
  //       } else {
  //         item.addEventListener('click', () => dispatch(changeOperand2(Number(item.id))));
  //       }
  //     }
  //   }
  //   const equalsEls = listEl.find(item => item.id === 'equals')?.children
  //   if(equalsEls) {
  //     for(let item of Array.from(equalsEls!)) {
  //       item.addEventListener('click', () => dispatch(onResult()))
  //     }
  //   }

  // }, [listEl]);

  const changeOperand1 = (id: string) => {
    if(operand1 === '0') {
      setOperand1(id)
      setResult(id)
    } else {
      setOperand1(operand1 + id)
      setResult(operand1 + id)
    }
  };

  const changeOperand2 = (id: string) => {
    if(operand2 === '0') {
      setOperand2(id)
      setResult(id)
    } else {
      setOperand2(operand2 + id)
      setResult(operand2 + id)
    }
  };

  const onResult = () => {
    switch(operator) {
      case '+': setResult((Number(operand1) + Number(operand2)).toString()); break;
      case '-': setResult((Number(operand1) - Number(operand2)).toString()); break;
      case '/': setResult((Number(operand1) / Number(operand2)).toString()); break;
      case 'x': setResult((Number(operand1) * Number(operand2)).toString()); break;
    }
  }

  const click = () => {
    // console.log(operand1);
    
    const operatorsEls = listEl.find(item => item.id === 'operators')?.children
    if(operatorsEls) {
      for(let item of Array.from(operatorsEls!)) {
        item.addEventListener('click', () => setOperator(item.id))
      }
    }
    const numbersEls = listEl.find(item => item.id === 'numbers')?.children
    if(numbersEls) {
      for(let item of Array.from(numbersEls!)) {
        if(operator !== '+') {
          // item.addEventListener('click', () => dispatch(changeOperand1(item.id)));
          item.addEventListener('click', () => changeOperand1(item.id))
        } else {
          item.addEventListener('click', () => changeOperand2(item.id));
        }
      }
    }
    const equalsEls = listEl.find(item => item.id === 'equals')?.children
    if(equalsEls) {
      for(let item of Array.from(equalsEls!)) {
        item.addEventListener('click', () => {
          onResult()
          console.log(555);
          
        })
      }
    }
  }

  console.log(operand1);
  // console.log(operand2);
  // console.log(operator);
  // console.log(result);

  const onDrop = () => {   
    const idx = listEl.findIndex(item => item.id === dropEl?.id)
    if(dropEl!.id === 'display') {
      dropDisplay.current?.classList.remove(`${style.canvas__displayNone}`)
      // dropDisplay.current?.append(dropEl!)
      // const displayEl = (dropDisplay.current?.getElementsByClassName(`${styleSidebar.sidebar__display__in}`)[0]);
      // displayEl ?
      // displayEl.innerHTML = `<span>${operand1}</span>` :
      // ''
    } else if(idx === -1) {
      dispatch(addListEl(dropEl!))
    }
  }
  
  return(
    <div
      ref={dropContainer}
      className={style.canvas} 
      onDragOver={(ev) => ev.preventDefault()}
      onDragEnter={(ev) => ev.currentTarget.classList.add(`${style.dropZone}`)}
      onDrop={onDrop}
    >
      <div
        ref={dropDisplay}
        className={`${style.canvas__display} ${style.canvas__displayNone}`}
      >
        <div className={styleSidebar.sidebar__display__in}>
          <span>{result}</span>
        </div>
      </div>
      <div
        ref={dropOperators}
        onClick={click}
      ></div>
    </div>  
  );
};