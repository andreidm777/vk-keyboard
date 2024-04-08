import './VkKeyboard.scss';

import React, { useEffect, useState } from 'react';

import Keyboard from '../Keyboard';

import ConstructorPanel from '../ConstructorPanel';

import CursorType from '../CursorType';

const VkKeyboard = ({
  keyboardJson,
  onChangeVkKeyboard,
} : {
  keyboardJson? : string;
  onChangeVkKeyboard:  (data: any) => void;
}) : JSX.Element => {
  const [obj, setObj] = useState(null);
  const [current, setCurrent] = useState({x: -1, y: -1});

  const setKeyboard = (value?: string) => {
    try {
    const object = JSON.parse(value || "");
    setObj(object);
    } catch(err) {
      console.log(err)
    }
  };

  useEffect(() => {
    setKeyboard(keyboardJson);
  }
  , [keyboardJson]);

  const setCur = (value: CursorType) => {
    setCurrent(value);
  }

  const setObject = (value: any) => {
    //console.log(value);
    setObj({...value});
    onChangeVkKeyboard(JSON.stringify(value, null, 2));
  };

  return (
    <>
    <div className="App-keyboard">
    <div style={{ display: 'flex', flexDirection: 'column', margin: '5px', alignContent: 'center' }}>
    <h3 style={{ alignContent: 'center' }}>
      Конструктор клавиатуры
    </h3>
   <Keyboard obj={obj} setObject={setObject} setCurrent={setCur} current={current}/>
   <ConstructorPanel obj={obj} onChange={setObject} setCurrent={setCurrent} cursor={current}/>
   </div>
   </div>
   </>
  );
}

export default VkKeyboard;
