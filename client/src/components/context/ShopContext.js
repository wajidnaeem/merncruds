import React, { Component } from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_DOMAIN,
});

class ShopProvider extends Component {
  state = {
    products: [],
    product: {},
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  };

  componentDidMount() {
    if (localStorage.getItem("checkout_id")) {
      const fetchCheckout = this.fetchCheckout(
        localStorage.getItem("checkout_id")
      );
      console.log("fetchCheckout in if :: ", fetchCheckout);
    } else {
      console.log("createCheckout in else :: ");

      this.createCheckout();
    }
  }

  // componentDidMount() {
  //   if (localStorage.checkout_id) {
  //     this.fetchCheckout(localStorage.checkout_id);
  //   } else {
  //     this.createCheckout();
  //   }
  // }


  fetchAllProducts = async () => {
    console.log("cLIENT:::", client);

    const products = await client.product.fetchAll();
    console.log("products:::", products);
    this.setState({ products: products });
  };

  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout.id);
    this.setState({ checkout: checkout });
  };

  fetchCheckout = async (checkoutId) => {
    client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout: checkout });
      })
      .catch((error) => console.log(error));
  };

  addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout: checkout });

    this.openCart();
  };

  removeLineItem = async (lineItemIdsToRemove) => {
    const checkoutId = this.state.checkout.id;

    client.checkout
      .removeLineItems(checkoutId, lineItemIdsToRemove)
      .then((checkout) => this.setState({ checkout }));
  };

  fetchProductWithHandle = async (handle) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });

    return product;
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };
  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };
  openMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;
