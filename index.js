// createEmployeeRecord function
/**
 * this functions should have a
 * 1. 4 element array of three strings and a number 
 * corresponding to a first name, family name, title, and pay rate per hour
 * 2. it should return an object with the keys for 
 * firstName
 * familyName
 * title
 * payPerHour
 * timeInEvents
 * timeOutEvents
 * 3.Behavior
 * Loads array elements into corresponding Object properties.
 * Initialize empty Arrays on the properties timeInEvents and timeOutEvents.
 */
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents:[],
    };
}
// createEmployeeRecords function
/**
 * this function should have 
 * 1. an array of arrays as an argument
 * 2. should return 
 * an array of objects 
 * Behavior
 * Converts each nested array into an employee record using 
 * createEmployeeRecord and accumulates it to a new array 
 */

function createEmployeeRecords (arrays) {
    return arrays.map(employeeArray => createEmployeeRecord(employeeArray));
}
// createTimeInEvent function 
/**
 * this function should take 
 * an employee record object
 * a date stamp ("YYYY-MM-DD HHMM")
 * It should return the employee record
 * Behavior
 * Add an object with the keys to the timeInEvents array on the record object
 * type set to "TimeIn"
 * hour :derived from the argument
 * date :derived from the argument
 */
 


function createTimeInEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}
// createTimeOutEvent function 
/**
 * this function should take 
 * an employee record object
 * a date stamp ("YYYY-MM-DD HHMM")
 * It should return the employee record
 * Behavior
 * Add an object with the keys to the timeInEvents array on the record object
 * type set to "TimeOut"
 * hour :derived from the argument
 * date :derived from the argument
 */
function createTimeOutEvent(employeeRecord, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord;
}
// hoursWorkedOnDate
/**
 * Argument(s)
 * An employee record Object
 * A date of the form "YYYY-MM-DD"
 * Returns
 * Hours worked, an Integer
 * Behavior
 * Given a date, find the number of hours elapsed between 
 * that date's timeInEvent and timeOutEvent
 */

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}
// wagesEarnedOnDate
/**
 * Argument(s)
 * An employee record Object
 * A date of the form "YYYY-MM-DD"
 * Returns
 * Pay owed
 * Behavior
 * Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed.
 *  Amount should be returned as a number.
 */
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate;
}
// allWagesFor
/**
 * Argument(s)
 * An employee record Object
 * Returns
 * Pay owed for all dates
 * Behavior
 * Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context.
 *  Amount should be returned as a number.
 *  HINT: You will need to find the available dates somehow...
 */
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
}
// calculatePayroll
/**
 * Array of employee records
 * Returns
 * Sum of pay owed to all employees for all dates, as a number
 * Behavior
 * Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context.
 *  Amount should be returned as a number.
  */
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {
        return totalPayroll + allWagesFor(employeeRecord);
    }, 0);
}

// Example usage:
const employeeData = [
    ["John", "Doe", "Manager", 25],
    ["Jane", "Smith", "Assistant", 20]
];
const employees = createEmployeeRecords(employeeData);

// Add time events for employees
createTimeInEvent(employees[0], "2024-04-15 0900");
createTimeOutEvent(employees[0], "2024-04-15 1700");
createTimeInEvent(employees[1], "2024-04-15 0800");
createTimeOutEvent(employees[1], "2024-04-15 1600");

console.log(calculatePayroll(employees)); 
