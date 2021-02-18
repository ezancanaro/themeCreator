import React from 'react';

export function SvgArrow(props) {
    let start = props.up ? 8 : 2;
    return (
        <svg className={props.className} onClick={props.onClick}
            id={props.id} viewBox='0 0 10 10'>
            <line x1={1} y1={start} x2={5} y2={Math.abs(10 - start)}></line>
            <line x1={5} y1={Math.abs(10 - start)} x2={10} y2={start}></line>
        </svg>
    )
}

export function SvgX(props) {
    return (
        <svg className={props.className} onClick={props.onClick}
            id={props.id} viewBox='0 0 10 10'>
            <line x1={1} y1={1} x2={9} y2={9}></line>
            <line x1={1} y1={9} x2={9} y2={1}></line>
        </svg>
    )
}