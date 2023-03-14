import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectListEl } from 'src/store/sidebar/selectors';
import { 
  addListEl, 
  deleteElement, 
  replaceElement, 
  replaceElementNew 
} from 'src/store/sidebar/slice';
import style from './Sidebar.module.scss';
import imgVector from 'images/vector.svg';
import imgGroup from 'images/group.svg';
import { selectConstructor, selectRuntime } from 'src/store/switcher/selectors';

export const Sidebar: FC = () => {
  const operators = ['/', 'x', '-', '+'];
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  const [dropEl, setDropEl] = useState<HTMLDivElement | null>(null);
  const [visibleDisplayClone, setVisibleDisplayClone] = useState(false);
  const [visibleOperatorsClone, setVisibleOperatorsClone] = useState(false);
  const [visibleNumbersClone, setVisibleNumbersClone] = useState(false);
  const [visibleEqualsClone, setVisibleEqualsClone] = useState(false);
  const [visibleHelp, setVisibleHelp] = useState(true);
  const [dragEnter, setDragEnter] = useState(false);
  const [operand1, setOperand1] = useState<string>('0');
  const [operand2, setOperand2] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [prevOperand2, setPrevOperand2] = useState<string>('');
  const [prevOperator, setPrevOperator] = useState<string>('');
  const [prevResult, setPrevResult] = useState<string>('0');

  const sidebarRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const operatorsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const equalsRef = useRef<HTMLDivElement>(null);
  const displayWrapRef = useRef<HTMLDivElement>(null);
  const operatorsWrapRef = useRef<HTMLDivElement>(null);
  const numbersWrapRef = useRef<HTMLDivElement>(null);
  const equalsWrapRef = useRef<HTMLDivElement>(null);
  const dropContainer = useRef<HTMLDivElement>(null);
  const dropDisplay = useRef<HTMLDivElement>(null);
  const dropOperators = useRef<HTMLDivElement>(null);
  const imageCanvasRef = useRef<HTMLDivElement>(null);
  const imageOperatorsRef = useRef<HTMLDivElement>(null);
  const displaySpanRef = useRef<HTMLDivElement>(null);

  const listDropEl = useSelector(selectListEl);
  const runtime = useSelector(selectRuntime);
  const constructor = useSelector(selectConstructor);

  const dispatch = useDispatch();

  const onDrop = () => {   
    dropContainer.current?.classList.remove(`${style.dropZone}`);
    imageCanvasRef.current?.classList.add(`${style.canvas__imgDisplayNone}`);
    const idx = listDropEl.findIndex(item => item.id === dropEl?.id);
    if(dropEl!.id === 'display') {
      dropEl!.draggable = false;
      displayRef.current?.classList.add(`${style.sidebar__display__noDrop}`);
      dropDisplay.current?.append(dropEl!);
      setVisibleDisplayClone(true);
    } else if(idx === -1) {
      dispatch(addListEl(dropEl!));
      switch(dropEl!.id) {
      case 'operators': {
        setVisibleOperatorsClone(true);
        operatorsRef.current?.classList.add(`${style.dropElemNoShadow}`);
      }break;
      case 'numbers': {
        setVisibleNumbersClone(true);
        numbersRef.current?.classList.add(`${style.dropElemNoShadow}`);
      }break;
      case 'equals': {
        setVisibleEqualsClone(true);
        equalsRef.current?.classList.add(`${style.dropElemNoShadow}`);
      }break;
      }
    }
  };

  const onDrop2 = (ev: React.DragEvent<HTMLDivElement>) => {
    dropContainer.current?.classList.remove(`${style.dropZone}`);
    imageCanvasRef.current?.classList.add(`${style.canvas__imgDisplayNone}`);
    const idxDropEl = listDropEl.findIndex(item => item.id === dropEl?.id);
    const idx2 = listDropEl.findIndex(item => item.id === ev.currentTarget.id);
    if(dragEnter && (idxDropEl === -1) && (dropEl?.id !== 'display')) { 
      dispatch(replaceElementNew({idx1: idx2, dropEl: dropEl!}));
      switch(dropEl!.id) {
      case 'operators': {
        setVisibleOperatorsClone(true);
        operatorsRef.current?.classList.add(`${style.dropElemNoShadow}`);
      }break;
      case 'numbers': {
        setVisibleNumbersClone(true);
        numbersRef.current?.classList.add(`${style.dropElemNoShadow}`);
      }break;
      case 'equals': {
        setVisibleEqualsClone(true);
        equalsRef.current?.classList.add(`${style.dropElemNoShadow}`);
      }break;
      }
    } else if(dragEnter && (idxDropEl !== -1)) {
      dispatch(replaceElement({idx1: idxDropEl, idx2: idx2}));
    } else if(dropEl?.id === 'display') {
      dropEl!.draggable = false;
      displayRef.current?.classList.add(`${style.sidebar__display__noDrop}`);
      dropDisplay.current?.append(dropEl!);
      setVisibleDisplayClone(true);
    }
  };

  const onDragEnter = (ev: React.DragEvent<HTMLDivElement>) => {
    const idx = listDropEl.findIndex(item => item.id === ev.currentTarget.id);
    if(idx !== -1) {
      setDragEnter(true);
      switch(ev.currentTarget.id) {
      case 'operators': {
        imageOperatorsRef.current?.classList
          .remove(`${style.sidebar__operators__imgDisplayNone}`);
      } break;
      }
    } else {
      setDragEnter(false);
    }
  };

  const handleClickDelete = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(constructor) {
      const idxEl = listDropEl.findIndex(item => item.id === ev.currentTarget.id);
      switch(ev.currentTarget.id) {
      case 'display': {
        ev.currentTarget.draggable = true;
        setVisibleDisplayClone(false);
        ev.currentTarget.parentNode?.removeChild(ev.currentTarget);
        displayWrapRef.current?.prepend(ev.currentTarget);
        displayRef.current?.classList.remove(`${style.sidebar__display__noDrop}`);
        setOperand1('0');
        setOperand2('');
        setOperator('');
        setResult('0');
      } break;
      }
      if(idxEl !== -1) {
        switch(ev.currentTarget.id) {
        case 'operators': {
          const idxDelEl = listDropEl.findIndex(item => item.id === 'operators');      
          dispatch(deleteElement(idxDelEl));
          setVisibleOperatorsClone(false);
          operatorsWrapRef.current?.append(ev.currentTarget);
          operatorsRef.current?.classList.remove(`${style.dropElemNoShadow}`);
        } break;
        case 'numbers': {
          const idxDelEl = listDropEl.findIndex(item => item.id === 'numbers');      
          dispatch(deleteElement(idxDelEl));
          setVisibleNumbersClone(false);
          numbersWrapRef.current?.append(ev.currentTarget);
          numbersRef.current?.classList.remove(`${style.dropElemNoShadow}`);
        } break;
        case 'equals': {
          const idxDelEl = listDropEl.findIndex(item => item.id === 'equals');      
          dispatch(deleteElement(idxDelEl));
          setVisibleEqualsClone(false);
          equalsWrapRef.current?.append(ev.currentTarget);
          equalsRef.current?.classList.remove(`${style.dropElemNoShadow}`);
        } break;
        }
      }
    }
  };

  const handleClickOperators = (idOperator: string) => {
    if(runtime && visibleOperatorsClone && visibleDisplayClone) {
      if(operand2 !== '') {
        onResult();
      }
      setOperator(idOperator);
      setPrevOperator(idOperator);
    }
  };

  const changeOperand = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPrevOperand2('');
    setPrevOperator('');
    if(runtime && visibleNumbersClone && visibleDisplayClone) {
      if(operator === '') {
        if((ev.currentTarget.id === '.') && (operand1.indexOf('.') === -1)) {
          setOperand1(operand1 + ev.currentTarget.id);
          setResult(operand1 + ev.currentTarget.id);
        } else if((ev.currentTarget.id === '.') && (operand1.indexOf('.') !== -1)) {
          return;
        } else if(operand1 === '0' && ev.currentTarget.id === '0') {
          return;
        } else if(operand1 === '0') {
          setOperand1(ev.currentTarget.id);
          setResult(ev.currentTarget.id);
        } else if(operand1.length < 17) {
          setOperand1(operand1 + ev.currentTarget.id);
          setResult(operand1 + ev.currentTarget.id);
        }
      } else {
        if((ev.currentTarget.id === '.') && (operand2.indexOf('.') === -1)) {
          if(operand2 === '') {
            setOperand2('0' + ev.currentTarget.id);
            setResult('0' + ev.currentTarget.id);
          } else {
            setOperand2(operand2 + ev.currentTarget.id);
            setResult(operand2 + ev.currentTarget.id);
          }
        } else if((ev.currentTarget.id === '.') && (operand2.indexOf('.') !== -1)) {
          return;
        } else if(operand2 === '0' && ev.currentTarget.id === '0') {
          return;
        } else if(operand2 === '' || operand2 === '0') {
          setOperand2(ev.currentTarget.id);
          setResult(ev.currentTarget.id);
        } else if(operand2.length < 17) {
          setOperand2(operand2 + ev.currentTarget.id);
          setResult(operand2 + ev.currentTarget.id);
        }
      }
    }
  };

  const onResult = () => {
    if(runtime && visibleEqualsClone && visibleDisplayClone) {
      if(prevOperand2 !== '' && prevOperand2 !== '0') {
        switch(prevOperator) {
        case '+': {
          setResult((Number(result) + Number(prevOperand2)).toString());
          setPrevResult((Number(result) + Number(prevOperand2)).toString());
        } break;
        case '-': {
          setResult((Number(result) - Number(prevOperand2)).toString());
          setPrevResult((Number(result) - Number(prevOperand2)).toString());
        } break;
        case '/': {
          setResult((Number(result) / Number(prevOperand2)).toString());
          setPrevResult((Number(result) / Number(prevOperand2)).toString());
        } break;
        case 'x': {
          setResult((Number(result) * Number(prevOperand2)).toString());
          setPrevResult((Number(result) * Number(prevOperand2)).toString());
        } break;
        }
        return;
      }
      if(operand2 === '' && operator !== '') {
        if(operand1 === '0' && operator === '/') {
          setOperator('');
          setResult('Не определено');
        } else {
          switch(operator) {
          case '+': {
            setResult((Number(operand1) + Number(operand1)).toString());
            setPrevResult((Number(operand1) + Number(operand1)).toString());
          } break;
          case '-': {
            setResult((Number(operand1) - Number(operand1)).toString());
            setPrevResult((Number(operand1) - Number(operand1)).toString());
          } break;
          case '/': {
            setResult((Number(operand1) / Number(operand1)).toString());
            setPrevResult((Number(operand1) / Number(operand1)).toString());
          } break;
          case 'x': {
            setResult((Number(operand1) * Number(operand1)).toString());
            setPrevResult((Number(operand1) * Number(operand1)).toString());
          } break;
          }
          setPrevOperand2(operand1);
          setPrevOperator(operator);
          setOperand1('0');
          setOperand2('');
          setOperator('');
        }
        return;
      } else if(operand2 === '0' && operator === '/') {
        setOperand1('0');
        setOperand2('');
        setOperator('');
        setResult('Не определено');
        return;
      }
      if(operand1 === '0') {
        switch(operator) {
        case '+': {
          setResult((Number(prevResult) + Number(operand2)).toString());
          setPrevResult((Number(prevResult) + Number(operand2)).toString());          
        } break;
        case '-': {
          setResult((Number(prevResult) - Number(operand2)).toString());
          setPrevResult((Number(prevResult) - Number(operand2)).toString());
        } break;
        case '/': {
          setResult((Number(prevResult) / Number(operand2)).toString());
          setPrevResult((Number(prevResult) / Number(operand2)).toString());
        } break;
        case 'x': {
          setResult((Number(prevResult) * Number(operand2)).toString());
          setPrevResult((Number(prevResult) * Number(operand2)).toString());
        } break;
        }
        setPrevOperand2(operand2);
        setPrevOperator(operator);
        setOperand1('0');
        setOperand2('');
        setOperator('');
        return;
      }
      switch(operator) {
      case '+': {
        setResult((Number(operand1) + Number(operand2)).toString());
        setPrevResult((Number(operand1) + Number(operand2)).toString());
      } break;
      case '-': {
        setResult((Number(operand1) - Number(operand2)).toString());
        setPrevResult((Number(operand1) - Number(operand2)).toString());
      } break;
      case '/': {
        setResult((Number(operand1) / Number(operand2)).toString());
        setPrevResult((Number(operand1) / Number(operand2)).toString());
      } break;
      case 'x': {
        setResult((Number(operand1) * Number(operand2)).toString());
        setPrevResult((Number(operand1) * Number(operand2)).toString());
      } break;
      }
      setPrevOperand2(operand2);
      setPrevOperator(operator);
      setOperand1('0');
      setOperand2('');
      setOperator('');
    }
  };

  useEffect(() => {
    if(result.length > 9) {
      displaySpanRef.current?.classList.add(`${style.sidebar__display__in__span__fontSize}`);
      if(Number(result) < 1 && result.length > 17) {
        setResult(Number(result).toFixed(16));
      } else if(Number(result) > 1 && result.length > 16) {
        setResult(result.substring(0, 16));
      }
    } else {
      displaySpanRef.current?.classList.remove(`${style.sidebar__display__in__span__fontSize}`);
    }
  }, [result]);

  useEffect(() => {
    listDropEl?.map(item => dropOperators.current?.append(item));
    if(listDropEl.length > 0 || visibleDisplayClone) {
      dropContainer.current?.classList.remove(`${style.dropZone}`);
      setVisibleHelp(false);
      dropContainer.current?.classList.add(`${style.canvas__borderNone}`);
    } else {
      setVisibleHelp(true);
      dropContainer.current?.classList.remove(`${style.canvas__borderNone}`);
    }
  }, [listDropEl, visibleDisplayClone, constructor]);

  useEffect(() => {
    setOperand1('0');
    setOperand2('');
    setOperator('');
    setResult('0');
    setPrevOperand2('');
    setPrevOperator('');
    setPrevResult('0');
    if(runtime) {
      setVisibleHelp(false);
      dropContainer.current?.classList.add(`${style.canvas__borderNone}`);
      operatorsRef.current!.draggable = false;
      numbersRef.current!.draggable = false;
      equalsRef.current!.draggable = false;
      sidebarRef.current?.classList.add(`${style.sidebar__displayNone}`);
      if(visibleOperatorsClone) {
        operatorsRef.current?.classList.add(`${style.sidebar__operators__hover}`);
      }
      if(visibleNumbersClone) {
        numbersRef.current?.classList.add(`${style.sidebar__numbers__hover}`);
      }
    } else if(constructor) {
      operatorsRef.current!.draggable = true;
      numbersRef.current!.draggable = true;
      equalsRef.current!.draggable = true;
      operatorsRef.current?.classList.remove(`${style.sidebar__operators__hover}`);
      numbersRef.current?.classList.remove(`${style.sidebar__numbers__hover}`);
      sidebarRef.current?.classList.remove(`${style.sidebar__displayNone}`);
    }
  }, [runtime, constructor]);

  const onHoverDropContainer = () => {
    if(listDropEl.length < 1 && !visibleDisplayClone) {
      dropContainer.current?.classList.add(`${style.dropZone}`);
    }
    imageCanvasRef.current?.classList.remove(`${style.canvas__imgDisplayNone}`);
    if(dropEl?.id === 'display') {
      imageCanvasRef.current?.classList.add(`${style.canvas__imgDisplayNone}`);
    }
  };

  const onLeaveDropContainer = () => {
    dropContainer.current?.classList.remove(`${style.dropZone}`);
    imageCanvasRef.current?.classList.add(`${style.canvas__imgDisplayNone}`);
  };

  return(
    <>
      <div 
        ref={sidebarRef}
        className={style.sidebar}>
        <div ref={displayWrapRef}>
          <div 
            ref={displayRef}
            className={style.sidebar__display}
            id='display'
            onDragStart={(ev) => setDropEl(ev.currentTarget)}
            draggable="true" 
            onDragOver={(ev) => ev.preventDefault()}
            onDoubleClick={(ev) => handleClickDelete(ev)}
          >
            <div className={style.sidebar__display__in}>
              <span 
                ref={displaySpanRef} 
                className={style.sidebar__display__in__span}
              >{result}</span>
            </div>
          </div>
          {visibleDisplayClone &&
            <div 
              className={`${style.sidebar__display} ${style.sidebar__display__clone}`}
            >
              <div className={style.sidebar__display__in}>
                <span className={style.sidebar__display__in__span}>0</span>
              </div>
            </div>
          }
        </div>
        <div ref={operatorsWrapRef}>
          {visibleOperatorsClone && 
            <div 
              className={`${style.sidebar__operators} ${style.sidebar__operators__clone}`}
            >
              {operators.map((item) => (
                <button key={item} >{item}</button>
              ))}
            </div>
          }
          <div 
            ref={operatorsRef}
            className={style.sidebar__operators}
            id='operators'
            onDragStart={(ev) => setDropEl(ev.currentTarget)}
            draggable="true" 
            onDragOver={(ev) => ev.preventDefault()}
            onDragEnter={(ev) => onDragEnter(ev)}
            onDrop={(ev) => onDrop2(ev)}
            onDoubleClick={(ev) => handleClickDelete(ev)}
          >
            {operators.map((item) => (
              <button 
                id={item} 
                key={item} 
                onClick={() => handleClickOperators(item)}
              >{item}</button>
            ))}
          </div>
        </div>
        <div ref={numbersWrapRef}>
          {visibleNumbersClone &&
            <div 
              className={`${style.sidebar__numbers} ${style.sidebar__numbers__clone}`}
            >
              <div className={style.sidebar__numbers__grid}>
                {numbers.map((item) => (
                  <button
                    className={style.sidebar__numbers__buttons}
                    key={item} 
                  >{item}</button>
                ))}
              </div>
              <button className={style.sidebar__numbers__zero}>0</button>
              <button className={style.sidebar__numbers__dot}>,</button>
            </div>
          }
          <div 
            ref={numbersRef}
            className={style.sidebar__numbers}
            id='numbers'
            onDragStart={(ev) => setDropEl(ev.currentTarget)}
            draggable="true" 
            onDragOver={(ev) => ev.preventDefault()}
            onDragEnter={(ev) => onDragEnter(ev)}
            onDrop={(ev) => onDrop2(ev)}
            onDoubleClick={(ev) => handleClickDelete(ev)}
          >
            <div className={style.sidebar__numbers__grid}>
              {numbers.map((item) => (
                <button 
                  className={style.sidebar__numbers__buttons} 
                  id={item.toString()} 
                  key={item} 
                  onClick={(ev) => changeOperand(ev)}
                >{item}</button>
              ))}
            </div>
            <button 
              id='0' 
              className={style.sidebar__numbers__zero} 
              onClick={(ev) => changeOperand(ev)}
            >0</button>
            <button 
              className={style.sidebar__numbers__dot} 
              id='.' 
              onClick={(ev) => changeOperand(ev)}
            >,</button>
          </div>
        </div>
        <div ref={equalsWrapRef}>
          {visibleEqualsClone &&
            <div 
              className={`${style.sidebar__equals} ${style.sidebar__equals__clone}`}
            >
              <button>=</button>
            </div>
          }
          <div 
            ref={equalsRef}
            className={style.sidebar__equals}
            id='equals'
            onDragStart={(ev) => setDropEl(ev.currentTarget)}
            draggable="true" 
            onDragOver={(ev) => ev.preventDefault()}
            onDragEnter={(ev) => onDragEnter(ev)}
            onDrop={(ev) => onDrop2(ev)}
            onDoubleClick={(ev) => handleClickDelete(ev)}
          >
            <button id='=' onClick={onResult}>=</button>
          </div>
        </div>
      </div>
      <div
        ref={dropContainer}
        className={style.canvas} 
        onDragOver={(ev) => ev.preventDefault()}
        onDragEnter={onHoverDropContainer}
        onDragLeave={onLeaveDropContainer}
        onDrop={onDrop}
      >
        <div
          ref={dropDisplay}
          className={style.canvas__display}
        >
        </div>
        <div
          ref={dropOperators}
        ></div>
        <div
          ref={imageCanvasRef}
          className={`${style.canvas__img} ${style.canvas__imgDisplayNone}`}
        >
          <img src={imgVector}
          ></img>
        </div>
        {visibleHelp && 
          <div className={style.canvas__help}>
            <img src={imgGroup}></img>
            <p className={style.canvas__help__p1}>Перетащите сюда</p>
            <p className={style.canvas__help__p2}>любой элемент</p>
            <p className={style.canvas__help__p3}>из левой панели</p>
          </div>
        }
      </div>
    </>
  );
};