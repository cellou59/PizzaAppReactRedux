import React, { Component } from 'react';
import Header from './Header';
import Order from './OrderList';
import { connect } from 'react-redux';
import { setOrderPaid } from '../actions';

class PaymentOrder extends Component {

    state = {
        selectedOrder: {}
    }

    handleChange = event => {
        const id = event.target.value;
        const index = this.props.orders.findIndex(order => {
            return order.id === id;
        });
        this.setState({ selectedOrder: this.props.orders[index] });
    }

    setPaid = () => {
        this.props.setOrderPaid(this.state.selectedOrder.id);
        this.setState({selectedOrder: {}})
    }

    selectedOrderDisplay = () => {
        if (Object.keys(this.state.selectedOrder).length > 0) {
            return (
                <div className="order-details">
                    <h2>Détail de la commande n°{this.state.selectedOrder.id}</h2>
                    <Order 
                        paid 
                        setPaid={() => this.setPaid()} 
                        pizzas={this.props.pizzas} 
                        orderPizzas={this.state.selectedOrder.pizzas} 
                        total={this.state.selectedOrder.total} 
                    />
                </div>
            );
        }
    }

    render() {
        const ordersList = this.props.orders.filter(order => !order.paid).map(order => {
            return (
                <option key={order.id} value={order.id}>{order.id} - {order.total}€</option>
            );
        });

        return (
            <div className="App">
                <Header history={this.props.history} />

                <div className="payment-wrapper">
                    <div className="order-selection">
                        <label htmlFor="orderSelect">Sélectionner la commande à encaisser</label>
                        <select id="orderSelect" onChange={e => this.handleChange(e)}>
                            <option value=""></option>
                            {ordersList}
                        </select>
                    </div>

                    <div className="payment-order">
                        <div className="order-details-wrapper">
                            {this.selectedOrderDisplay()}
                        </div>
                    </div>
                </div>
            </div>
        )
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
        setOrderPaid: id => {
            dispatch(setOrderPaid(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentOrder);
