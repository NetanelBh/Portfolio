const getPieOptions = () => {
  return {
    title: "Total Sold Products (price)",
    is3D: true,
    height: "100%",
    width: "100%",
    pieSliceText: "value",
    sliceVisibilityThreshold: 0,
    backgroundColor: "#DAF5FF",
    titleTextStyle: {
      fontSize: 30,
      italic: true,
    },
    chartArea: {
      left: "20%",
      top: "15%",
      height: "90%",
      width: "90%",
    },
  };
};

export default getPieOptions;
