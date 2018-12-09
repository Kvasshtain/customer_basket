import React from 'react'
import PropTypes from 'prop-types'
import {ProductTableHeader} from './ProductsTableHeader'
import {Product} from './Product'

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