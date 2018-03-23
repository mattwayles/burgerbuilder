import React from 'react';
import classes from './NavigationItem.css'
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>

        {/*Set to exact so only the active link is marked as Active*/}
        <NavLink
            to={props.link}
            exact
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;