import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        };

        componentDidMount () {
            importComponent()
                .then(cmp => {
                    this.setState( {component: cmp.default });
                });
        }


        render () {
            const C = this.state.component;

            /*Use the spread operator to send any components we'll need, without knowing what they are at compile time*/
            return C ? <C { ...this.props } /> : null;
        }
    }
}


export default asyncComponent;