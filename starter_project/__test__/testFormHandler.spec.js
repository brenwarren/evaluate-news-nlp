// Import the js file to test
import { handleSubmit } from "../src/client/js/formHandler";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ sentiment: 'positive', textPreview: 'This is a test text' }),
  })
);

// The describe() function takes two arguments - a string description, and a test suite as a callback function.   
describe("Testing the submit functionality", () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.  
  test("Testing the handleSubmit() function", () => {
    // Create a mock event object
    const event = {
      preventDefault: jest.fn()
    };

    // Set up the DOM elements
    document.body.innerHTML = `
      <form id="urlForm">
        <input id="name" name="url" value="http://example.com" />
        <button id="submitButton" type="submit">Submit</button>
      </form>
      <div id="results"></div>
    `;

    // Call the handleSubmit function
    handleSubmit(event);

    // Check if the function is defined
    expect(handleSubmit).toBeDefined();

    // Check if preventDefault was called
    expect(event.preventDefault).toHaveBeenCalled();

    // Check if fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/analyze-url', expect.any(Object));
  });
});