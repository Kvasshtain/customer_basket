import React, { Component } from 'react';
import {ProductsList} from './components/ProductsList'
import {BasketList} from './components/BasketList'
import products from './data/products.json'
import './App.css';

class App extends Component {

    state = {
        showBasket : false,
        products : products.map(function (product) {
            product.price = +product.price;
            product.count = +product.count;
            return product;
        })
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
}

export default App;
