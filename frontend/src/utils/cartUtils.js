export const updateCart = (state) => {
  state.itemPrice = Number(
    state.cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2),
  );
  state.shippingCharge = state.itemPrice >= 100 ? 0 : 5;
  state.taxPrice = Number((0.13 * state.itemPrice).toFixed(2));
  state.totalPrice = state.itemPrice + state.shippingCharge + state.taxPrice;
  localStorage.setItem("cart", JSON.stringify(state));
};
