export const updateCart = (state) => {
  state.itemPrice = state.cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );
  localStorage.setItem("cart", JSON.stringify(state));
};
