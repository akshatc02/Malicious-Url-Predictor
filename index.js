document.addEventListener('DOMContentLoaded', function () {
    // Bind the event handler to the button
    document.getElementById('detectButton').addEventListener('click', detectMalware);
});

function detectMalware() {
    const urlInput = document.getElementById('urlInput').value;
    if (urlInput.trim() === '') {
        alert('Please enter a valid URL');
        return;
    }

    // Show a loading message or spinner to indicate the process is ongoing
    const resultElement = document.getElementById('result');
    resultElement.textContent = 'Detecting malware...';

    // Simulate a delay of 20 seconds using setTimeout
    setTimeout(() => {
        query({ "inputs": urlInput }).then((response) => {
            // Update the content with the JSON response after the delay
            resultElement.textContent = JSON.stringify(response, null, 2);
        }).catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while detecting malware. Please try again.');
        });
    }, 11000); // 20 seconds in milliseconds
}


async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/elftsdmr/malware-url-detect",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();
    return result;
}
