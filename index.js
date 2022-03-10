// const employeeArray = [firstName, familyName, title, payPerHour];

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(array) {
  return array.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, dateStamp) {
  // let dateStamp = 'YYYY-MM-DD HHMM'
  //   dateStamp.split(" ");
  // console.log(dateStamp.split(' '))
  let hour = parseInt(dateStamp.split(" ")[1]);
  let date = dateStamp.split(" ")[0];
  //   console.log({ type: "TimeIn", hour: hour, date: date })
  employee.timeInEvents.push({ type: "TimeIn", hour: hour, date: date });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  // let dateStamp = 'YYYY-MM-DD HHMM'
  //   dateStamp.split(" ");
  // console.log(dateStamp.split(' '))
  let hour = parseInt(dateStamp.split(" ")[1]);
  let date = dateStamp.split(" ")[0];
  //   console.log({ type: "TimeIn", hour: hour, date: date })
  employee.timeOutEvents.push({ type: "TimeOut", hour: hour, date: date });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let event = employee.timeInEvents.find((event) => {
    return event.date === date;
  });
  // console.log(event);
  let eventOut = employee.timeOutEvents.find((eventOut) => {
    return eventOut.date === date;
  });
  // console.log(eventOut);
  return (eventOut.hour - event.hour) / 100;
}

function wagesEarnedOnDate(emp, date) {
  // console.log(date)
  let payRate = emp.payPerHour;
  // console.log(payRate);
  let hoursWorked = hoursWorkedOnDate(emp, date);
  return payRate * hoursWorked;
}

function allWagesFor(empl) {
  // console.log(empl);
  let dates = empl.timeInEvents.map((shift) =>
    wagesEarnedOnDate(empl, shift.date)
  );
  // console.log("hi", dates);
  return dates.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
}

function calculatePayroll(employees) {
  console.log(employees);
  let allDates = employees.map((employee) => allWagesFor(employee));
  return allDates.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
}
