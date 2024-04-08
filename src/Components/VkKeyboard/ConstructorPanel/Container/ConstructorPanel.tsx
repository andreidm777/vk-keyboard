import React, { ChangeEvent } from 'react';

import Buttons from '../../Buttons';

import Button from '../../Button/Container/Button';

import './ConstructorPanel.scss';

import { ButtonType, Color } from '../../Button/Container/Button';
import CursorType from '../../CursorType';

const ConstructorPanel = ({
    obj,
    onChange,
    cursor,
    setCurrent,
}:{
    obj: any;
    onChange: (data: any) => void;
    cursor: CursorType;
    setCurrent: (data: CursorType ) => void;
}) => {

    const current = (obj && cursor.x > -1) ? obj.buttons[cursor.x][cursor.y] : null;

    const ColorButtons = () => {
        return (<>{[Color.Primary, Color.Secondary, Color.Negative, Color.Positive].map((element,index) => {
            return (<Button
                key={index}
                label={current.color === element ? 'X' : ''}
                color={element}
                onClick={() => setColor(current, element)} />);
        })}</>);
    }

    const toText = (current: any) => {
        if (current) {
            const oldAction = current.action
            current.action = {
                type: ButtonType.Text,
                label: oldAction.label,
            };

            if (oldAction.payload) {
                current.action.payload = oldAction.payload;
            }
            current.color = current.color || Color.Primary;
        }
        onChange(obj);
    };
    const toOpenLink = (current: any) => {
        if (current) {
            const oldAction = current.action
            current.action = {
                type: ButtonType.OpenLink,
                label: oldAction.label,
                link: oldAction.link || "",
            };

            if (oldAction.payload) {
                current.action.payload = oldAction.payload;
            }
            current.color = current.color || Color.Primary;
        }
        onChange(obj);
    };
    const toLocation = (current: any) => {
        if (current) {
            const oldAction = current.action
            current.action = {
                type: ButtonType.Location,
            };

            if (oldAction.payload) {
                current.action.payload = oldAction.payload;
            }
        }
        onChange(obj);
    };
    const toVKPay = (current: any) => {
        if (current) {
            const oldAction = current.action
            current.action = {
                type: ButtonType.VKPay,
                hash: oldAction.hash || "",
            };

            if (oldAction.payload) {
                current.action.payload = oldAction.payload;
            }
        }
        onChange(obj);
    };
    const toVKApps = (current: any) => {
        if (current) {
            const oldAction = current.action
            current.action = {
                type: ButtonType.VKApps,
                app_id: oldAction.app_id || 0,
                owner_id: oldAction.owner_id || 0,
                label: oldAction.label || "",
                hash: oldAction.hash || "",
            };

            if (oldAction.payload) {
                current.action.payload = oldAction.payload;
            }
        }
        onChange(obj);
    };
    const toCallback = (current: any) => {
        if (current) {
            const oldAction = current.action
            current.action = {
                type: ButtonType.Callback,
                label: oldAction.label || "",
            };

            if (oldAction.payload) {
                current.action.payload = oldAction.payload;
            }
        }
        onChange(obj);
    };
    const changeLabel = (event:  ChangeEvent<HTMLInputElement>) => {
        current.action.label = event.target.value;
        onChange(obj);
    };
    const changeLink = (event:  ChangeEvent<HTMLInputElement>) => {
        current.action.link = event.target.value;
        onChange(obj);
    };
    const changeHash = (event:  ChangeEvent<HTMLInputElement>) => {
        current.action.hash = event.target.value;
        onChange(obj);
    };
    const changeApp = (event:  ChangeEvent<HTMLInputElement>) => {
        current.action.app_id = event.target.value;
        onChange(obj);
    };
    const changeOwner = (event:  ChangeEvent<HTMLInputElement>) => {
        current.action.owner_id = event.target.value;
        onChange(obj);
    };
    const changePayload = (event:  ChangeEvent<HTMLInputElement>) => {
        current.action.payload = event.target.value;
        onChange(obj);
    };

    const setColor = (current: any, color: string) => {
        current.color = color;
        onChange(obj);
    };

    const removeButton = () => {
        if (obj && current) {
            let found = false;
            for (let i = 0; i < obj.buttons.length; i++) {
                for (let j = 0; j < obj.buttons[i].length; j++) {
                    if (obj.buttons[i][j] === current) {
                        obj.buttons[i] = obj.buttons[i].filter((elem: any) => elem !== current);
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            if (found) {
                console.log(found);
                obj.buttons = obj.buttons.filter((item: any) => {
                    return item.length > 0;
                })
            }
            setCurrent({x: -1,y: -1});
            onChange(obj);
        }
    };

    const addButton = () => {
        if (!obj) {
            obj = {
                buttons: [],
            };
        }
        obj.buttons.push([{ action: { type: ButtonType.Text } }]);
        setCurrent({x: -1,y: -1});
        onChange(obj);
    };

    const setOneTime = () => {
        if(obj) {
            obj.one_time = !obj.one_time;
            onChange(obj);
        }
    }

    const canAddRow = (!obj || !obj.buttons || (!obj.inline && obj.buttons.length < 10) || (obj.inline && obj.buttons.length < 6))

    return (
        <>
            {canAddRow && (<div className="block-item">
                <div onClick={() => addButton()} className="button-add">Добавить</div>
            </div>)}
            <div className="border">
                <div className="block-item">
                    <label>Тип кнопки</label>
                    <Buttons>
                        <>
                            <Button
                                key={'ba'}
                                label="Text"
                                color={current?.action.type === ButtonType.Text ? Color.Primary : Color.Secondary}
                                select={current?.action.type === ButtonType.Text}
                                onClick={() => toText(current)} />
                            <Button
                                key={'bc'}
                                label="Open Link"
                                color={current?.action.type === ButtonType.OpenLink ? Color.Primary : Color.Secondary}
                                select={current?.action.type === ButtonType.OpenLink}
                                onClick={() => toOpenLink(current)} />
                            <Button
                                 key={'bd'}
                                label="Location"
                                color={current?.action.type === ButtonType.Location ? Color.Primary : Color.Secondary}
                                select={current?.action.type === ButtonType.OpenLink}
                                onClick={() => toLocation(current)} />
                        </>
                    </Buttons>
                    <Buttons>
                        <>
                            <Button
                                key={'aa'}
                                label="VK Pay"
                                color={current?.action.type === ButtonType.VKPay ? Color.Primary : Color.Secondary}
                                onClick={() => toVKPay(current)} />
                            <Button
                                key={'ab'}
                                label="VK Apps"
                                color={current?.action.type === ButtonType.VKApps ? Color.Primary : Color.Secondary}
                                onClick={() => toVKApps(current)} />
                            <Button
                                key={'ac'}
                                label="Callback"
                                color={current?.action.type === ButtonType.Callback ? Color.Primary : Color.Secondary}
                                onClick={() => toCallback(current)} />
                        </>
                    </Buttons>
                </div>

                {(current && [ButtonType.Text, ButtonType.VKApps, ButtonType.OpenLink, ButtonType.Callback].includes(current.action.type)) &&
                    (<div className="block-item">
                        <label>Текст (label)</label>
                        <input
                            type="text"
                            maxLength={40}
                            value={current?.action.label||""} onChange={changeLabel} />
                    </div>
                    )}

                {(current && [ButtonType.OpenLink].includes(current.action.type)) &&
                    (<div className="block-item">
                        <label>Ссылка (link)</label>
                        <input type="text" value={current?.action.link||""} onChange={changeLink} />
                    </div>
                    )}

                {(current && current.action.type === ButtonType.VKPay) &&
                    (<div className="block-item">
                        <label>Параметры платежа VK Pay</label>
                        <input type="text" value={current?.action.hash||""} onChange={changeHash} />
                        {current.action.hash === '' && (
                            <b className="note" style={{ color: '#db3b3b' }}>Пустой hash!</b>
                        )}
                    </div>
                    )}

                {(current && current.action.type === ButtonType.VKApps) &&
                    (<>
                        <div className="block-item">
                            <label>Приложение (app_id)</label>
                            <input
                                type="number"
                                value={current?.action.app_id||""} onChange={changeApp} />
                            {(current.action.app_id === '') &&
                                (<b className="note" style={{ color: '#db3b3b' }}>Пустой индификатор!</b>
                                )}
                        </div>
                        <div className="block-item">
                            <label>Идентификатор сообщества (owner_id)</label>
                            <input
                                type="number"
                                value={current?.action.owner_id||""} onChange={changeOwner} />
                        </div>
                        <div className="block-item">
                            <label>Хэш (hash)</label>
                            <input type="text" value={current?.action.hash||""} onChange={changeHash} />
                        </div>
                    </>)}

                <div className="block-item">
                    <label>Полезная нагрузка (payload)</label>
                    <input
                        type="text"
                        maxLength={255}
                        value={current?.action.payload||""} onChange={changePayload} />
                </div>

                {(current && [ButtonType.Text, ButtonType.Callback].includes(current.action.type)) &&
                    (<div className="block-item">
                        <label>Цвет</label>
                        <Buttons>
                            <ColorButtons />
                        </Buttons>
                    </div>
                    )}
                <Buttons>
                    <Button onClick={() => removeButton()} label="Удалить" color={Color.Negative} /></Buttons>
            </div>

            <div className="block-item">

                <Buttons>
                    <Button
                        label="Клавиатура"
                        onClick={() => { obj.inline = false; onChange(obj); }}
                        color={obj?.inline !== true ? Color.Primary : Color.Secondary} />
                    <Button
                        label="Инлайн клавиатура"
                        onClick={() => { obj.inline = true; obj.one_time = false; onChange(obj); }}
                        color={obj?.inline === true ? Color.Primary : Color.Secondary} />
                </Buttons>
            </div>
            {(obj?.inline !== true) && (
                <div className="one-time">
                    <input type="checkbox" checked={obj?.one_time} onChange={setOneTime}/>
                    <label>скрывать клавиатуру</label>
                </div>
            )}
        </>
    );
}

export default ConstructorPanel;