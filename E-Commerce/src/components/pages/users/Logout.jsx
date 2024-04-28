import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { usersActions } from "../../store/cartSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  
  useEffect(() => {
    // Close the cart for the next login only if it's already open
    if(cart.isOpen) {
      dispatch(usersActions.showCart())
    }
    dispatch(usersActions.clearCart());

    navigate("/")
  }, []);
}

export default Logout;