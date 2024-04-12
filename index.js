const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) 
    return payable
}

function createEmployeeRecord(employeeData) {
    const employee = {};
    employee.firstName = employeeData[0];
    employee.familyName = employeeData[1];
    employee.title = employeeData[2];
    employee.payPerHour = employeeData[3];
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
  }
  
  function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const timeInEvent = {};
    timeInEvent.type = "TimeIn";
    timeInEvent.date = dateStamp.slice(0, 10);
    timeInEvent.hour = parseInt(dateStamp.slice(11, 13));
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const timeOutEvent = {};
    timeOutEvent.type = "TimeOut";
    timeOutEvent.date = dateStamp.slice(0, 10);
    timeOutEvent.hour = parseInt(dateStamp.slice(11, 13));
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, dateString) {
    const timeIn = employeeRecord.timeInEvents.find(
      (e) => e.date === dateString
    );
    const timeOut = employeeRecord.timeOutEvents.find(
      (e) => e.date === dateString
    );
  
    if (!timeIn || !timeOut) return 0;
  
    return (timeOut.hour + timeOut.minute / 60) - (timeIn.hour + timeIn.minute / 60);
  }
  
  function wagesEarnedOnDate(employeeRecord, dateString) {
    return hoursWorkedOnDate(employeeRecord, dateString) * employeeRecord.payPerHour;
  }
  
  allWagesFor.call({}, []);