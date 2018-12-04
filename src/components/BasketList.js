import React from 'react'
import PropTypes from 'prop-types'

const BasketTableHeader = () => {
    return (
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Count</th>
        </tr>
    )
}

class Total extends React.Component {

    calcTotal = (data) => {
        return data.reduce(function (sum, current) {
            return sum + current.price * current.count
        },0)
    }

    render() {
        return (
            <p>Total: ${this.calcTotal(this.props.data).toFixed(2)}</p>
        )
    }
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
            <div className = "tableBorder">
                <table>
                    <tbody>
                        <BasketTableHeader/>
                    </tbody>
                    {this.renderBasketList()}
                </table>
                <Total data = {this.props.data}/>

            </div>
        )
    }
}

BasketList.propTypes = {
    data: PropTypes.array.isRequired
}

export { BasketList }