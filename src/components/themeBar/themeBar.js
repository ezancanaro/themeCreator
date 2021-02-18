import React, { useState, useEffect } from 'react';
import { toCSS, toJSON } from 'cssjson';
import './themeBar.css'
import { SvgArrow } from '../../svgs.js';
import { ChromePicker } from 'react-color';
import ColorPickerPopup from '../colorPickerPopup/colorPickerPopup';
import VariableDefinition from '../variableDefinition/variableDefinition';

export default function ThemeBar(props) {

    const [variables, setVariables] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [colorPickerPos, setColorPickerPos] = useState({ show: false, x: 0, y: 0 });
    const [movePopup, setMovePopup] = useState(false);
    const [currentSelectedColor, setCurrentSelectedColor] = useState('#fff');
    const [currentVariableDef, setCurrentVariableDef] = useState({});
    const [nVars,setnVars] = useState(0);

    useEffect(() => {
        setFirstLoad(true);
        loadVariables();
    }, [firstLoad]);

    const loadVariables = () => {
        if (props.selectorsWithVariables && props.selectorsWithVariables.length > 0) {
            let newVars = parseCSSforVariables(getInlineStylesAsString());
            setVariables(newVars);
            setnVars(newVars.length);
        }
    };

    const getInlineStylesAsString = () => {
        let styleTags = [...document.getElementsByTagName('style')];
        let cssText = '';
        if (styleTags) {
            styleTags.forEach((tag) => {
                cssText += tag.innerText;
            })
        }
        return cssText;
    }


    const parseCSSforVariables = (css) => {
        //console.log("myCSS: ", css);
        const json = toJSON(css);
        let vars = [];
        props.selectorsWithVariables.forEach(element => {
            if (json.children[element]) {
                let variableDef = {
                    selector: element,
                    variables: createVariablesObject(json.children[element])
                }
                vars.push(variableDef);
            }
        });
        return vars;
        //console.log('Variables Definitions:', vars);
    }

    const createVariablesObject = (jsonElement) => {
        let myVars = [];
        //console.log(jsonElement);
        if (jsonElement.attributes) {
            myVars = Object.keys(jsonElement.attributes)
                .filter((key) => key.startsWith('--'))
                .map((key) => {
                    return { variable: key.slice(2), value: jsonElement.attributes[key] }
                });
            //console.log(myVars);
        }
        return myVars;
    }

    const showColorPicker = (e, colorHexCode) => {
        if (e.pageX == null && e.clientX != null) {
            var doc, body;
            let eDoc = (e.target && e.target.ownerDocument) || document;
            doc = eDoc.documentElement;
            body = eDoc.body;
            e.pageX = e.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
            e.pageY = e.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0);
        }
        let currentPos = colorPickerPos;
        currentPos.show = true;
        currentPos.x = e.pageX;
        currentPos.y = e.pageY;
        console.log(currentPos.x, currentPos.y);
        setColorPickerPos(currentPos);
        setMovePopup(!movePopup);
        setCurrentSelectedColor(colorHexCode);
    }

    const setCurrentColor = (color) => {

        setCurrentSelectedColor(color);
    }

    const updateColorVariable = (color) => {
        setCurrentColor(color);
    }



    return (
        <div>
            <ColorPickerPopup
                show={colorPickerPos.show}
                x={colorPickerPos.x}
                y={colorPickerPos.y}
                flipMe={movePopup}
                onClickClose={() => { setColorPickerPos({ show: false, x: 0, y: 0 }); setMovePopup(!movePopup); }}
            >
                <ChromePicker
                    color={currentSelectedColor}
                    onChangeComplete={(color) => setCurrentColor(color)}
                    onChange={(color) => updateColorVariable(color)} />
            </ColorPickerPopup>
            <div id='themeGridRoot'>
                
                {nVars != 0 && variables.map((variableDefinition,index) => {
                    console.log('Mapping vars...',nVars);
                    return <VariableDefinition key={'var_'+index} variable={variableDefinition}
                        onClickColor={(ev, colorHex) => showColorPicker(ev, colorHex)}
                    />
                    }
                )
                }
            </div>
        </div>
    )
}