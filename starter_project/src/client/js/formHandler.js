// Replace checkForName with a function that checks the URL
//import { checkForName } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000/analyze-url';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;  
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Validate the URL
    if (!isValidURL(formText)) {
        alert("Please enter a valid URL");
        return;
    }

    // If the URL is valid, send it to the server using the serverURL constant above
    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: formText })
        });

        const data = await response.json();
        // Handle the response data (e.g., display the analysis results)
        console.log(data);
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to display the results in a formatted way
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (data.error) {
        resultsDiv.innerText = `Error: ${data.error}`;
        return;
    }

    const sentiment = data.sentiment || 'Unknown';
    const textPreview = data.textPreview || 'No text preview available';

    const sentimentElement = document.createElement('p');
    sentimentElement.innerHTML = `<strong>Sentiment:</strong> ${sentiment}`;

    const textPreviewElement = document.createElement('p');
    textPreviewElement.innerHTML = `<strong>Input Text Preview:</strong> ${textPreview}`;

    resultsDiv.appendChild(sentimentElement);
    resultsDiv.appendChild(textPreviewElement);
}

// Export the handleSubmit function
export { handleSubmit };