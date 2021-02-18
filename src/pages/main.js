import React from 'react';
import ThemeBar from '../components/themeBar/themeBar';

export default function Main(props) {

    return (
        <div >
            MAIN TEST FROM MY APP
            <ThemeBar selectorsWithVariables={['#root', '#root.darkTheme']}
                cssFilePath='/definitions.css'>
            </ThemeBar>
        </div>
    )

}