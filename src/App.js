import React, { Component } from 'react';
import {ProductsList} from './components/ProductsList'
import {BasketList} from './components/BasketList'
import jsonProducts from './data/products.json'
import textStrings from './data/textStrings.json'
import './App.css';

let products = jsonProducts.map(function (product) {
    product.price = +product.price;
    product.count = +product.count;
    return product;
});

class App extends Component {

    state = {
        showBasket : false,
        products : products,
        visibleProducts : products,
        filterValue : ''
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

    onTextChange = (value) => {
        this.setState({filterValue: value});

        if(value === '') {
            this.setState({visibleProducts: this.state.products});
            return;
        }

        this.setState(
            {visibleProducts: this.state.products.filter(function(product){
                return product.name.includes(value)
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
                  <h1>{textStrings.basket}</h1>
                  <BasketList data = {products}
                              onCountDecrement = {this.onCountDecrement}
                              onClearCount = {this.onClearCount}
                  />
                  <button onClick = {this.productListButtonClkHandler}>{textStrings.productsList}</button>
                  <button onClick = {this.clearBasketButtonClkHandler}>{textStrings.clearBasket}</button>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
              <h1>Products list</h1>
              <ProductsList
                  data = {this.state.visibleProducts}
                  onCountIncrement = {this.onCountIncrement}
                  onTextChange = {this.onTextChange}
                  filterValue = {this.state.filterValue}
              />
              <button onClick = {this.basketButtonClkHandler}>{textStrings.basket}</button>
            </React.Fragment>
        )
    }
}

export default App;
