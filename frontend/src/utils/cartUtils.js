export const updateCart = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};
