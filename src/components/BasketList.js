import React from 'react'
import PropTypes from 'prop-types'

const BasketTableHeader = () => {
    return (
        <tr>
            <th className = "tableCell">Name</th>
            <th className = "tableCell">Price</th>
            <th className = "tableCell">Count</th>
            <th className = "tableCell"></th>
            <th className = "tableCell"></th>
        </tr>
    )
}

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
                <td className = "tableCell">{name}</td>
                <td className = "tableCell">{price}</td>
                <td className = "tableCell">{count}</td>
                <th className = "tableCell">
                    <button className = "button" onClick = {this.addButtonClkHandler}>-</button>
                </th>
                <th className = "tableCell">
                    <button className = "button" onClick = {this.clearButtonClkHandler}>Clear all</button>
                </th>
            </tr>
        )
    }
}

BasketProduct.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.string,
        count: PropTypes.number,
        onCountDecrement : PropTypes.func,
        onClearCount : PropTypes.func,
    })
}

class BasketList extends React.Component {

    renderBasketList = () => {
        const {onCountDecrement, onClearCount} = this.props;
        let basketListTemplate = this.props.data
            .filter(item => item.count)
            .map(function(item) {
                return (
                    <tbody key = {item.id}>
                    <BasketProduct data = {item}
                                   onCountDecrement = {onCountDecrement}
                                   onClearCount = {onClearCount}
                    />
                    </tbody>
                )
            });

        return basketListTemplate;
    }

    render() {
        return (
            <table className="productList">
                <tbody>
                <BasketTableHeader/>
                </tbody>
                {this.renderBasketList()}
            </table>
        )
    }
}

BasketList.propTypes = {
    data: PropTypes.array.isRequired
}

export { BasketList }