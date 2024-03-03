const TableRow = (props) => {
  return (
    <tr>
      <td>{props.rowDetails.year}</td>
      <td>{props.rowDetails.savingsEndOfYear}</td>
      <td>{props.rowDetails.yearlyInterest}</td>
      <td>{props.rowDetails.totalInterest}</td>
      <td>{props.rowDetails.investedCapital}</td>
    </tr>
  );
};

export default TableRow;
