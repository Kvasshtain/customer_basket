/* eslint-disable react/jsx-no-undef,no-undef,react/react-in-jsx-scope */

const products = [
    {
        id: '1',
        name: 'apple',
        price: '$0.1',
        count: 10,
    },
    {
        id: '2',
        name: 'pear',
        price: '$0.15',
        count: 5,
    },
    {
        id: '3',
        name: 'tomatoes',
        price: '$0.12',
        count: 15,
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

    constructor(props) {
        super(props);
        this.addButtonClkHandler = this.addButtonClkHandler.bind(this);
    }

    addButtonClkHandler(e) {
        this.props.onCountChange(this.props.data.id);
    }

    render() {
        const {id, name, price, count} = this.props.data;

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
        onCountChange : PropTypes.func,
    })
}

class ProductsList extends React.Component {

    renderProductList = () => {
        const {data, onCountChange} = this.props;
        let ProductsListTemplate = null;

        if (data.length) {
            return ProductsListTemplate = this.props.data.map(function(item, index) {
                return (
                    <tbody key = {item.id}>
                    <Product data = {item} onCountChange = {onCountChange}/>
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
    state = {
        products: products
    }

    onCountChange = (id) => {
        this.setState(
            {products: this.state.products.map(function(product){
                if(product.id === id){
                    product.count++;
                }
                return product;
            })}
            );
    }

    render() {
        return (
            <React.Fragment>
              <h1>Products list</h1>
                <ProductsList data = {products} onCountChange = {this.onCountChange}/>
            </React.Fragment>
        )
    }
};

ReactDOM.render(
    <BigApp />,
    document.getElementById('root')
);