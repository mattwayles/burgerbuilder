import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {/* Hide the Orders page unless the user is logged in */}
        { props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuth
            ? <NavigationItem link="/auth">Login</NavigationItem>
            : <NavigationItem link="/logout">Logout</NavigationItem>
        }
    </ul>

);

export default navigationItems;