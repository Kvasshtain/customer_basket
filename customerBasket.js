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

class ProductsList extends React.Component {
    render() {
        const ProductsListTemplate = this.props.data.map(function(item, index) {
            return (
                <div key = {item.id}>
                  <p className="prodactName">{item.name}:</p>
                  <p className="prodactPrice">{item.price}:</p>
                  <p className="prodactCount">{item.count}:</p>
                </div>
            )
        })

        return (
          <div className="productList">
              {ProductsListTemplate}
          </div>
        )
    }
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