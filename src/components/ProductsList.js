import React from 'react'
import PropTypes from 'prop-types'

const ProductTableHeader = () => {
    return (
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Count</th>
        </tr>
    )
}

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
                    <button onClick = {this.addButtonClkHandler}>+</button>
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

class ProductsList extends React.Component {

    renderProductList = () => {
        const {data, onCountIncrement} = this.props;

        if (data.length) {
            return this.props.data.map(function(item) {
                return (
                    <tbody key = {item.id}>
                    <Product data = {item} onCountIncrement = {onCountIncrement}/>
                    </tbody>
                )
            })
        }
        else {
            return <p>Products list is empty</p>
        }
    }

    render() {
        return (
            <div className = "tableBorder">
                <table>
                    <tbody>
                        <ProductTableHeader/>
                    </tbody>
                    {this.renderProductList()}
                </table>
            </div>
        )
    }
}

ProductsList.propTypes = {
    data: PropTypes.array.isRequired
}

export { ProductsList }