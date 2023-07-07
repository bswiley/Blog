module.exports = {
  format_date: function(date) {
    console.log("date2 = " + date);
    const options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
    // Perform the necessary logic to format the date
    // Replace this line with your actual formatting logic
    const formattedDate = date.toLocaleTimeString({},options);
    return formattedDate;
  }
};


