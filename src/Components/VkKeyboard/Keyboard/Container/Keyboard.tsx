import Row from '../../Row';
import React from 'react';
import './Keyboard.scss'

import CursorType from '../../CursorType';

const Keyboard = ({
    obj,
    setCurrent,
    setObject,
    current,
} : {
    obj: any;
    setCurrent: (data: CursorType) => void;
    setObject: (data: any) => void;
    current: CursorType;
}) => {
    const BottomRows = ({ children } : {children? : Array<any>}) => {
        return (<>{children && (children.map((element, index) => {
            return (
                <Row key={index} obj={obj} setObject={setObject} current={current} buttons={element} rowNumber={index} setCurrent={setCurrent}/>
            );
        }))}</>);
    }
    return (
        <React.Fragment>
            <div className="ButtonsMain">
                <BottomRows children={obj?.buttons}/>
            </div>
        </React.Fragment>
    );
};

export default Keyboard;