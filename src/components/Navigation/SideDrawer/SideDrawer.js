import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import Backdrop from '../../ui/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxil from '../../../hoc/Auxil';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
        if (props.open) {
            attachedClasses = [classes.SideDrawer, classes.Open];
        }
    return (
        <Auxil>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
            </div>
        </Auxil>
    );
}

export default sideDrawer;