import React from 'react'

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

export { Total }