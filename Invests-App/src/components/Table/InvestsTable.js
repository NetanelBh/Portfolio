import FullTable from "./FullTable";

const InvestsTable = (props) => {
  const headers = [
    "Year",
    "Total Savings",
    "Interest (Year)",
    "Total Interest",
    "Invested Capital",
  ];

  const yearlyData = [];
  const { yearlySave, expectedRate, investDur } = props.userInput;
  let curSave = props.userInput.curSave;
  let totalInterest = 0;
  let investedCapital = curSave;

  for (let i = 0; i < investDur; i++) {
    // The rate per year
    const yearlyRate = curSave * expectedRate;
    totalInterest += yearlyRate;
    // Total Saving
    curSave += yearlySave + yearlyRate;
    // Invested Capital
    investedCapital += yearlySave;

    yearlyData.push({
      // feel free to change the shape of the data pushed to the array!
      year: i + 1,
      yearlyInterest: yearlyRate.toLocaleString("en-US", {
        style: "currency",
        currency: "ILS",
      }),
      savingsEndOfYear: curSave.toLocaleString("en-US", {
        style: "currency",
        currency: "ILS",
      }),
      totalInterest: totalInterest.toLocaleString("en-US", {
        style: "currency",
        currency: "ILS",
      }),
      yearlyContribution: yearlySave.toLocaleString("en-US", {
        style: "currency",
        currency: "ILS",
      }),
      investedCapital: investedCapital.toLocaleString("en-US", {
        style: "currency",
        currency: "ILS",
      }),
    });
  }

  return <FullTable tableHeaders={headers} userFullData={yearlyData} />;
};

export default InvestsTable;
