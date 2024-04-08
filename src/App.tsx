import React, { ChangeEvent, useState } from 'react';
import './App.css';
import VkKeyboard from './Components/VkKeyboard';

function App() {
  const [value, setValue] = useState("");
  const onChange = (event : ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);
  const onChangeKeyboard = (data: any) => {
    setValue(data);
  }

  return (
    <div className="App">
    <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
    <VkKeyboard keyboardJson={value} onChangeVkKeyboard={onChangeKeyboard}/>
   </div>
   <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
      <textarea rows={15} cols={100} value={value || ""} onChange={onChange}></textarea>
    </div>
   </div>
  );
}

export default App;
