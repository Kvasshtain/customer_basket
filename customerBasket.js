/* eslint-disable react/jsx-no-undef,no-undef,react/react-in-jsx-scope */

const products = [
    {
        id: '1',
        name: 'apple',
        price: '$0.1',
        count: '10',
    },
    {
        id: '2',
        name: 'pear',
        price: '$0.15',
        count: '5',
    },
    {
        id: '3',
        name: 'tomatoes',
        price: '$0.12',
        count: '15',
    }
];

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
    state = {
        count: 0,
    }

    addButtonClick = (e) => {
        this.setState({count: this.state.count + 1});
    }

    render() {
        const {id, name, price, count} = this.props.data;

        return (
            <tr>
                <td className = "tableCell">{name}</td>
                <td className = "tableCell">{price}</td>
                <td className = "tableCell">{this.state.count}</td>
                <th className = "tableCell">
                    <button className = "button" onClick={this.addButtonClick}>+</button>
                </th>
            </tr>
        )
    }
}

Product.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.string,
        count: PropTypes.string,
    })
}

class ProductsList extends React.Component {
    renderProductList = () => {
        const { data } = this.props;
        let ProductsListTemplate = null;

        if (data.length) {
            return ProductsListTemplate = this.props.data.map(function(item, index) {
                return (
                    <tbody key = {item.id}>
                    <Product data = {item}/>
                    </tbody>
                )
            })
        }
        else {
            return ProductsListTemplate = <p>Products is empty</p>
        }
    }

    render() {
        return (
          <table className="productList">
              <tbody>
                  <ProductTableHeader></ProductTableHeader>
              </tbody>
              {this.renderProductList()}
          </table>
        )
    }
}

ProductsList.propTypes = {
    data: PropTypes.array.isRequired
}

class BigApp extends React.Component {
    render() {
        return (
            <React.Fragment>
              <h1>Products list</h1>
                <ProductsList data = {products}/>
            </React.Fragment>
        )
    }
};

ReactDOM.render(
    <BigApp />,
    document.getElementById('root')
);