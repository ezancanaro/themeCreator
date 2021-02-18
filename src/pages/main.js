import React from 'react';
import ThemeBar from '../components/themeBar/themeBar';

export default function Main(props) {

    return (
        <div >
            MAIN TEST FROM MY APP
            <ThemeBar selectorsWithVariables={['#root', '#root.darkTheme', ':root', '.theme-switch__input:checked~*']}
                cssFilePath='/definitions.css'>
            </ThemeBar>
        </div>
    )

}