import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useEffect, useCallback, useState } from "react";
import { usersActions } from "./components/store/usersSlice";
import { ordersActions } from './components/store/ordersSlice';
import { productsActions } from "./components/store/productsSlice";
import { categoriesActions } from "./components/store/categoriesSlice";

import db from "./components/firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

import PacmanLoading from "./components/UI/PacmanLoading";
import CreateRouter from "./components/utils/createRouter";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // Create the router from utils dir
  const router = CreateRouter();

  const fetchUsers = useCallback((collectionName) => {
    setIsLoading(true);

    let q = query(collection(db, collectionName));

    // With snapshot we can communicate with firebase(realtime update when change)
    onSnapshot(q, (snapShot) => {
      const data = snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      if(collectionName === 'users') {
        dispatch(usersActions.load(data));
      } else if(collectionName === 'orders') {
        dispatch(ordersActions.load(data));
      } else if(collectionName === 'categories') {
        dispatch(categoriesActions.load(data));
      } else if(collectionName === 'products') {
        dispatch(productsActions.load(data));
      }
    });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers("users");
    fetchUsers("orders");
    fetchUsers("categories");
    fetchUsers("products");
  }, [fetchUsers]);

  return (
    <>
      {isLoading && <PacmanLoading color="black" />}
      {!isLoading && <RouterProvider router={router} />}
    </>
  );
};

export default App;
