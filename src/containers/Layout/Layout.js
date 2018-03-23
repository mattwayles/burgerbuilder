import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxil from '../../hoc/Auxil';
import classes from './Layout.css';
import { withRouter } from 'react-router-dom';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
            this.setState({showSideDrawer: false});
    };
    
    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !this.state.showSideDrawer }
        });
    };
    
    render () {
        return (
            <Auxil>
                <Toolbar isAuth={this.props.isAuthenticated} openMenu={this.sideDrawerOpenHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxil>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

//Wrapping the export with withRouter helped solve a huge issue where connection to redux broke navigation functionality!
export default withRouter(connect(mapStateToProps)(Layout));