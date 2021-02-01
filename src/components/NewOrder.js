import { Component } from 'react';
import { connect } from 'react-redux';
import { addOrder } from '../actions';

class NewOrder extends Component {

    componentDidMount = () => {
        const id = `CMD-${Date.now()}`;
        
        this.props.addOrder(id);
        
        this.props.history.push(`order/${id}`);
    }

    render() {
        return ("");
    }
}

// React Redux
const mapDispatchToProps = dispatch => {
    return {
        addOrder: id => {
            dispatch(addOrder(id));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(NewOrder);
