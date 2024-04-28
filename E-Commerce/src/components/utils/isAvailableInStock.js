const isAvailableInStock = (productId, cartProducts, dbProducts) => {
  // Find the required item in DB
  const selectedItem = dbProducts.find((p) => p.id === productId);
  // Find the selected item in the cart products array
  const itemInCart = cartProducts.find((p) => p.id === productId);

  // If the item already exists in cart
  if (itemInCart && selectedItem) {
    // Check if the stock greater than the required qty
    if (selectedItem.stock >= itemInCart.qty + 1) {
      return true;
    }
    // If the item not exist in cart, means that there is at least 1 in stock
  } else if (!itemInCart) {
    return true;
  } else {    
    return false;
  }
};

export default isAvailableInStock;
