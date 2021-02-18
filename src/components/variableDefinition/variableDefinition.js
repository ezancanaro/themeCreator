import React, { useState, useEffect } from 'react';
import { SvgArrow } from '../../svgs.js';

import './variableDefinition.css';

export default function VariableDefinition({ variable, onClickColor }) {

    const [show, setShow] = useState(true);
    const [warning, setWarning] = useState('');

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
        a = parseInt(a, 16) / 255.0;
        return { red: r, green: g, blue: b, alpha: a };
    }

    const warn = (msg) => {
        setWarning(msg);
        setTimeout(() => setWarning(null), 5000);
    }

    const validateMinMax = (min, max, newValue) => {
        if (newValue < min) {
            warn('Value lower than Minimum Value for Field : ' + min);

            return min;
        }
        if (newValue > max) {
            warn('Value Exceeds Maximum Value for Field : ' + max);
            return max;
        }
        return newValue;
    }

    return (
        <div className='themeGridRoot'>
            <div className='rowHeader'>{variable.selector} <SvgArrow
                up={show}
                onClick={() => setShow(!show)} /></div>
            {warning && <p class="warningMsg" >{warning}</p>}
            {show && variable.variables.map((varDef) => {
                //variable: key, value: jsonElement.attributes[key]
                let colorHex = getColorHexCode(varDef.value);
                let colorRGBA = hexToRgba(colorHex);
                return (<>
                    <div className='variableName mb-sm'>{varDef.variable}</div>
                    <div className='colorBox mb-sm' >
                        <div className='square'
                            onClick={(ev) => onClickColor(ev, colorHex)} style={{ backgroundColor: varDef.value }}></div>
                    </div>
                    <div className='hexCodeInputs'>
                        <label for={varDef.variable + '_hex'}>HexCode</label>
                        <input id={varDef.variable + "_hex"} type='text' className='hexValue mb-sm hexCodeInput'
                            maxlength="9" defaultValue={colorHex} />
                    </div>
                    <div className='rgbaInputs'>
                        <label className='rgbaInputField' for={varDef.variable + '_red'}>R</label>
                        <label className='rgbaInputField' for={varDef.variable + '_green'}>G</label>
                        <label className='rgbaInputField' for={varDef.variable + '_blue'}>B</label>
                        <label className='rgbaInputField' for={varDef.variable + '_alpha'}>A</label>
                        <input type='number' id={varDef.variable + '_red'} className='rgbaValue mb-sm rgbaInputField'
                            min='0' max='255' defaultValue={colorRGBA.red} />
                        <input type='number' id={varDef.variable + '_green'} className='rgbaValue mb-sm rgbaInputField'
                            min='0' max='255' defaultValue={colorRGBA.green} />
                        <input type='number' id={varDef.variable + '_blue'} className='rgbaValue mb-sm rgbaInputField'
                            min='0' max='255' defaultValue={colorRGBA.blue} />
                        <input type='number' id={varDef.variable + '_alpha'} className='rgbaValue mb-sm rgbaInputField'
                            step='0.01' min='0.00' max='1.00' defaultValue={colorRGBA.alpha}
                            onChange={(e) => e.target.value = validateMinMax(0.00, 1.00, e.target.value)} />
                    </div>
                </>)
            })
            }
        </div>
    )





}