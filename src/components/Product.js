import React from 'react'
import PropTypes from 'prop-types'
import textStrings from '../data/textStrings.json'

class Product extends React.Component {

    addButtonClkHandler = () => {
        this.props.onCountIncrement(this.props.data.id);
    }

    render() {
        const {name, price, count} = this.props.data;

        return (
            <tr>
                <td>{name}</td>
                <td>${price}</td>
                <td>{count}</td>
                <td>
                    <button onClick = {this.addButtonClkHandler}>{textStrings.plus}</button>
                </td>
            </tr>
        )
    }
}

Product.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
        onCountIncrement : PropTypes.func,
    })
}

export { Product }