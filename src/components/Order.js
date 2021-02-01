import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPizzaOrder } from '../actions';

import Header from './Header';
import Pizza from './Pizza';
import OrderList from './OrderList';

class Order extends Component {

    handleClick = (oid, id) => {
        this.props.addPizzaOrder(oid, id);
    }

    render() {

        const oid = this.props.match.params.oid;

        const index = this.props.orders.findIndex(order => {
            return order.id === oid;
        });

        const pizzas = Object.keys(this.props.pizzas).map(key => {
            return (
                <Pizza 
                    key={key} 
                    name={this.props.pizzas[key].name} 
                    price={this.props.pizzas[key].price} 
                    image={this.props.pizzas[key].image} 
                    addToOrder={() => this.handleClick(oid, key)} 
                />
            );
        });

        return (
            <div className="App">
                <Header history={this.props.history} />

                <div className="order">
                    <div className="pizzas-wrapper">
                        {pizzas}
                    </div>
                    <div className="order-details-wrapper">
                        <div className="order-details">
                            <h2>Détail de la commande n°{oid}</h2>
                            {<OrderList 
                                pizzas={this.props.pizzas} 
                                orderPizzas={this.props.orders[index].pizzas} 
                                total={this.props.orders[index].total}
                            />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// React Redux
const mapStateToProps = state => {
    return {
        pizzas: state.pizzas,
        orders: state.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addPizzaOrder: (oid, pid) => {
            dispatch(addPizzaOrder(oid, pid));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);