const IsDayChanged = (lastCheckedDay) => {
  const returnedObj = {};
  const now = new Date().getDate();

  if(now !== lastCheckedDay) {
    returnedObj.isDayChanged = true;
    returnedObj.newDay = now;
  } else {
    returnedObj.isDayChanged = false;
    returnedObj.newDay = lastCheckedDay;
  }

  return returnedObj;
};

export default IsDayChanged;