function getCurrentDateAndTime() {
  const dateTime = new Date();
  return dateTime.toLocaleString();
}

module.exports = { getCurrentDateAndTime };
