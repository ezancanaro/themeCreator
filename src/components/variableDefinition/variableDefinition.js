import React, { useState, useEffect } from 'react';
import { SvgArrow } from '../../svgs.js';

export default function VariableDefinition({variable, onClickColor}) {
    
    const getColorHexCode = (color) => {
        let ctx = document.createElement("canvas").getContext("2d");
        ctx.fillStyle = color;
        return ctx.fillStyle;
    }

    const hexToRgba = (hexCode) => {
        if (!hexCode.startsWith('#')) {
            return 'rgba(0,0,0,0)';
        }
        let n = hexCode.slice(1).length;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 'ff';
        if (n === 3) {
            //Handle hex shorcuts
            r = hexCode.slice(1, 2);
            g = hexCode.slice(2, 3);
            b = hexCode.slice(3, 4);
            r += r;
            g += g;
            b += b;
        } else {
            //handle 6 or 8 chars hexCodes
            r = hexCode.slice(1, 3);
            g = hexCode.slice(3, 5);
            b = hexCode.slice(5, 7);
            if (n > 7) {
                //Hande alpha from 8 chars hexCodes
                a = hexCode.slice(7, 9);
            }
        }
        r = parseInt(r, 16);
        g = parseInt(g, 16);
        b = parseInt(b, 16);
        a = parseFloat(a, 16) / 256.0;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
    }


    return (
        <>
            <div className='rowHeader'>{variable.selector} <SvgArrow /></div>
            {variable.variables.map((varDef) => {
                //variable: key, value: jsonElement.attributes[key]
                let colorHex = getColorHexCode(varDef.value);
                return (<>
                    <div className='variableName mb-sm'>{varDef.variable}</div>
                    <div className='colorBox mb-sm' >
                        <div className='square'
                            onClick={(ev) => onClickColor(ev,colorHex)} style={{ backgroundColor: varDef.value }}></div>
                    </div>
                    <input type='text' className='hexValue mb-sm' value={colorHex} />
                    <input type='text' className='rgbaValue mb-sm' value={hexToRgba(colorHex)} />
                </>)
            })
            }
        </>
    )





}