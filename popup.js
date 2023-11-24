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

    query({ "inputs": urlInput }).then((response) => {
        const resultElement = document.getElementById('result');
        resultElement.textContent = JSON.stringify(response, null, 2);
    }).catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while detecting malware. Please try again.');
    });
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
