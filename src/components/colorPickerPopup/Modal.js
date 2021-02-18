import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {

    render() {
        return (
            <div className={this.props.show}>
                <div className='formTitle'>
                    <h5 className='titleText'>{this.props.titleName}</h5>
                    <button className='modal-button' onClick={this.props.handleClose}>X</button>
                </div>
                {this.props.errorMessage && <p id='service-error'>{this.props.errorMessage}</p>}
                {this.props.successMessage && <p id='service-success'>{this.props.successMessage}</p>}
                <section className="modal-main">
                    {this.props.children}
                </section>
            </div>
        );
    }
};