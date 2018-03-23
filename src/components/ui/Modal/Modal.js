import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxil from '../../../hoc/Auxil';


//Required to be class in order to control shouldComponentUpdate() method
class Modal extends Component {

    //Optimize application by not updating Modal unless it is shown!
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render() {
        return (
            <Auxil>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0' }} >
                    {this.props.children}
                </div>
            </Auxil>
        )
    }
};

export default Modal;