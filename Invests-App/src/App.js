import InvestHeader from "./components/Invests/InvestHeader";
import InvestForm from "./components/Invests/InvestForm";
import InvestsTable from "./components/Table/InvestsTable";
import { useState } from "react";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const calculateHandler = (userInput) => {    
    setUserData(userInput);
    setIsEmpty(false);
  };

  const resetClickHandler = () => {
    setIsEmpty(true);
  };

  return (
    <div>
      <InvestHeader />
      <InvestForm
        onCalculateUserData={calculateHandler}
        onResetClick={resetClickHandler}
      />
      {!isEmpty && <InvestsTable userInput={userData} />}
      {isEmpty && <h1 style={{ textAlign: "center" }}>No items to show</h1>}
    </div>
  );
};

export default App;
