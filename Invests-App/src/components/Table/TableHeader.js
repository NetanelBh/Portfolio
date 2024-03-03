const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        {props.tableHeaders.map((header) => (
          <th key={Math.random()}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
