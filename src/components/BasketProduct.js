import React from 'react'
import PropTypes from 'prop-types'

class BasketProduct extends React.Component {

    addButtonClkHandler = () => {
        this.props.onCountDecrement(this.props.data.id);
    }

    clearButtonClkHandler = () => {
        this.props.onClearCount(this.props.data.id);
    }

    render() {
        const {name, price, count} = this.props.data;

        return (
            <tr>
                <td>{name}</td>
                <td>${price}</td>
                <td>{count}</td>
                <td>
                    <button onClick = {this.addButtonClkHandler}>-</button>
                </td>
                <td>
                    <button onClick = {this.clearButtonClkHandler}>Clear all</button>
                </td>
            </tr>
        )
    }
}

BasketProduct.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
        onCountDecrement : PropTypes.func,
        onClearCount : PropTypes.func,
    })
}

export { BasketProduct }