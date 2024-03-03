import styles from "./Meals.module.css";

import Error from "../UI/Error";
import MealItem from "./MealItem";
import useHttp from "../../hooks/useHttp";
import PacmanLoading from "../UI/PacmanLoading";

// Define it here, because when it outside the component it save in memory
// and not recreated when the component re-run and prevent infinite-loop in 
// useEffect function within the useHttp file.
const configObject = {};

const Meals = () => {
  const {
    isLoading,
    error,
    data: loadedMeals,
  } = useHttp("http://localhost:3000/meals", configObject, []);

  if (isLoading) {
    return <PacmanLoading color="#ffc404"/>;
  }

  return (
    <>
      {error && <Error title={'Failed to fetch data'} message={error} />}
      {!error && <ul className={styles.meals}>
        {loadedMeals.map(meal => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>}
    </>
  );
};

export default Meals;
