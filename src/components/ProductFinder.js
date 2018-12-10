import React from 'react'
import PropTypes from 'prop-types'
import textStrings from '../data/textStrings.json'

class ProductFinder extends React.Component {

    state = {
        filterValue: this.props.filterValue
    }

    onTextChange = (event) => {
        let value = event.target.value;
        this.setState({filterValue: value});
        this.props.onTextChange(value);
    }

    onClick = (event) => {
        this.setState({filterValue: ''});
        this.props.onTextChange('');
    }

    render() {
        return (
            <div>
                <p>{textStrings.enterProductName}</p>
                <input type="text" value={this.state.filterValue} onChange={this.onTextChange}></input>
                <button type="submit" onClick = {this.onClick}>{textStrings.clearFilter}</button>
            </div>
        )
    }
}

ProductFinder.propTypes = {
    data: PropTypes.shape({
        onTextChange : PropTypes.func,
        filterValue : PropTypes.string
    })
}

export { ProductFinder }