/* eslint-disable react/jsx-no-undef,no-undef,react/react-in-jsx-scope */

const products = [
    {
        id: '1',
        name: 'apple',
        price: '$0.1',
        count: 0,
    },
    {
        id: '2',
        name: 'pear',
        price: '$0.15',
        count: 0,
    },
    {
        id: '3',
        name: 'tomatoes',
        price: '$0.12',
        count: 0,
    },
    {
        id: '4',
        name: 'cucumber',
        price: '$0.11',
        count: 0,
    },
    {
        id: '5',
        name: 'watermelon',
        price: '$0.2',
        count: 0,
    },
    {
        id: '6',
        name: 'melon',
        price: '$0.25',
        count: 0,
    },
];

//=============Product list============

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
        let ProductsListTemplate = null;

        if (data.length) {
            return ProductsListTemplate = this.props.data.map(function(item) {
                return (
                    <tbody key = {item.id}>
                    <Product data = {item} onCountIncrement = {onCountIncrement}/>
                    </tbody>
                )
            })
        }
        else {
            return ProductsListTemplate = <p>Products list is empty</p>
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

//=============Basket============

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

Product.propTypes = {
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

//==================================================

class BigApp extends React.Component {
    state = {
        showBasket : false,
        products: products
    }

    onCountIncrement = (id) => {
        this.setState(
            {products: this.state.products.map(function(product){
                if(product.id === id){
                    product.count++;
                }
                return product;
            })}
        );
    }

    updateProducts = (id, action) => {
        this.setState(
            {products: this.state.products.map(function(product){
                if(product.id === id){
                    action(product);
                }
                return product;
            })}
        );
    }

    onCountDecrement = (id) => {
        this.updateProducts(id, (product) => {product.count--})
    }

    onClearCount = (id) => {
        this.updateProducts(id, (product) => {product.count = 0})
    }

    basketButtonClkHandler = () => {
        this.setState({showBasket : true});
    }

    productListButtonClkHandler = () => {
        this.setState({showBasket : false});
    }

    clearBasketButtonClkHandler = () => {
        this.setState(
            {products: this.state.products.map(function(product){
                product.count = 0;
                return product;
            })}
        );
    }

    render() {
        if(this.state.showBasket){
            return (
                <React.Fragment>
                    <h1>Basket</h1>
                    <BasketList data = {products}
                                onCountDecrement = {this.onCountDecrement}
                                onClearCount = {this.onClearCount}
                    />
                    <button className = "button" onClick = {this.productListButtonClkHandler}>Products list</button>
                    <button className = "button" onClick = {this.clearBasketButtonClkHandler}>Clear basket</button>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <h1>Products list</h1>
                <ProductsList data = {products} onCountIncrement = {this.onCountIncrement}/>
                <button className = "button" onClick = {this.basketButtonClkHandler}>Basket</button>
            </React.Fragment>
        )
    }
};

ReactDOM.render(
    <BigApp />,
    document.getElementById('root')
);