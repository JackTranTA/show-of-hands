function getCurrentDateAndTime() {
  const dateTime = new Date();
  return dateTime.toLocaleString().split('.').join('');
}

module.exports = { getCurrentDateAndTime };
