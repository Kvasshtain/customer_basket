import React from 'react'
import PropTypes from 'prop-types'

const ProductTableHeader = () => {
    return (
        <tr>
            <th className = "tableCell">Name</th>
            <th className = "tableCell">Price</th>
            <th className = "tableCell">Count</th>
            <th className = "tableCell"></th>
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
                <td className = "tableCell">{name}</td>
                <td className = "tableCell">{price}</td>
                <td className = "tableCell">{count}</td>
                <th className = "tableCell">
                    <button className = "button" onClick = {this.addButtonClkHandler}>+</button>
                </th>
            </tr>
        )
    }
}

Product.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.string,
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
            <table className="productList">
                <tbody>
                <ProductTableHeader/>
                </tbody>
                {this.renderProductList()}
            </table>
        )
    }
}

ProductsList.propTypes = {
    data: PropTypes.array.isRequired
}

export { ProductsList }