import TableRow from "./TableRow";

const TableBody = (props) => {
  return (
    <tbody>
      {props.userFullData.map((dataRow) => (
        <TableRow key={dataRow.year} rowDetails={dataRow} />
      ))}
    </tbody>
  );
};

export default TableBody;
