import './PopUp.css';
import {SvgX} from '../../svgs.js'

export default function ColorPickerPopup(props) {

    const computeOffsetX = (x)=>{
        if(x==null) return 0;
        return x + 10;
    }
    const computeOffsetY = (y)=>{
        if(y==null) return 0;
        return y - 10;
    }

    return (
        <div className={'popup '+ (props.show ? 'show' : 'hide')}
            style={{left: computeOffsetX(props.x), top: computeOffsetY(props.y)}} >
            <SvgX className='fechar' onClick={props.onClickClose}/>
            <section className='popup-main'>
                {props.x+","+props.y}
                {props.children}
            </section>
        </div>
    )

}