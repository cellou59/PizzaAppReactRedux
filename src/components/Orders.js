import React, { Component } from 'react';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { deleteOrder } from '../actions';

class Orders extends Component {

    editOrder = id => {
        this.props.history.push(`order/${id}`);
    }

    render() {
        const ordersList = this.props.orders.map(order => {
            return (
                <tr key={order.id}>
                    <td>Commande n°{order.id}</td>
                    <td>{order.total}€</td>
                    <td className={order.paid ? "bg-success" : "bg-warning"}>{order.paid ? "Réglé" : "En attente de paiement"}</td>
                    <td className={order.paid ? "order-actions hidden" : "order-actions"}>
                        <button 
                            className="order-action-edit" 
                            onClick={() => this.editOrder(order.id)}
                        >
                            <FontAwesomeIcon icon="edit" size="2x" />
                        </button>
                        <button
                            className="order-action-delete" 
                            onClick={() => this.props.deleteOrder(order.id)}
                        >
                            <FontAwesomeIcon icon="trash" size="2x" />
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="App">
                <Header history={this.props.history} />

                <div className="orders-list">
                    <h2>Liste des commandes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Total Commande</th>
                                <th>Statut Commande</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

// React Redux
const mapStateToProps = state => {
    return {
        orders: state.orders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteOrder: (id) => {
            dispatch(deleteOrder(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);