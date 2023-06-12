module.export = {
  // the helper method 'format_date' will take in a timestamp and return a string with only the time
  format_date: (date) => {
    console.log (date)
    // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
    return date.toDateString();
  },};

