// Import the js file to test
import { checkForName } from "../src/client/js/nameChecker";

// Mock the alert function
global.alert = jest.fn();

// A describe() function with two arguments - a string description, and a test suite as a callback function.     
describe("Testing the name checking functionality", () => {
  test("Testing the checkForName() function with a valid captain name", () => {
    // Define the input for the function
    const inputText = "Picard";

    // Call the function with the input
    checkForName(inputText);

    // Check if the alert was called with the correct message
    expect(alert).toHaveBeenCalledWith("Welcome, Captain!");
  });

  test("Testing the checkForName() function with an invalid captain name", () => {
    // Define the input for the function
    const inputText = "Smith";

    // Call the function with the input
    checkForName(inputText);

    // Check if the alert was called with the correct message
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });
});