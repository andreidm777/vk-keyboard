import './Row.scss'

import React from 'react';
import Button from '../../Button';
import { ButtonType } from '../../Button/Container/Button';
import CursorType from '../../CursorType';

const Row = ({
    obj,
    setObject,
    buttons,
    rowNumber,
    current,
    setCurrent,
}: {
    obj: any;
    setCurrent: (data: any) => void;
    setObject: (data: any) => void;
    rowNumber: number;
    current: CursorType;
    buttons: any;
}) => {

    const addButton = (front: boolean) => {
        if (front) {
            for( let i = 0; i < obj.buttons.length; i++ ) {
                if (obj.buttons[i] === buttons) {
                    obj.buttons[i] = [{action:{type: ButtonType.Text}}, ...buttons];
                } 
            }
        } else {
            buttons.push({action:{type: ButtonType.Text}});
        }
        setCurrent({x: -1,y: -1});
        setObject(obj);
    };

    const BottomRow = ({ children } : {children : Array<any>}) => {
        return (<>{children.map((element,index) => {
            const selected = (current.x === rowNumber && current.y === index);
            return (
                <Button key={index} button={element} select={selected} onClick={() => { setCurrent({x: rowNumber, y: index}) }}/>
            );
        })}</>);
    }
    return (
        <div className="row">
             {buttons.length < 5 && (<div onClick={() => addButton(true)} className="button-add">+</div>)}
            <div className="Buttons">
            <BottomRow children={buttons} />
            </div>
            {buttons.length < 5 && (<div onClick={() => addButton(false)} className="button-add">+</div>)}
        </div>
    );
};

export default Row;