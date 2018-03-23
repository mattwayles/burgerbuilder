import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    
    render () {
        //If user accesses the checkout page without building a burger, they get a server error. Improve UX by redirecting
        //back to burderBuilder is ingredients are null
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary =
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    {/* Instead of routing to a component, route to a RENDER method which takes parameters! I can even pass my own props to give ContactData History, Location and Match objects */}
                    {/*<Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.props.totalPrice} {...props} />)} />*/}
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
        }
        return (
            <div>
                {summary}


            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);

