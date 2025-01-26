//============  Code for Replace with your actual RapidAPI key ==============
const API_KEY = 'YOUR_RAPIDAPI_KEY'; 

document.getElementById('summarizeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('articleUrl').value;
    const loadingSpinner = document.getElementById('loadingSpinner');
    const summaryResult = document.getElementById('summaryResult');
    const summaryText = document.getElementById('summaryText');
    const errorMessage = document.getElementById('errorMessage');

    // ============= Reset previous states for new request ==============
    loadingSpinner.style.display = 'block';
    summaryResult.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
        const response = await fetch('https://article-extractor-and-summarizer.p.rapidapi.com/summarize', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
            },
            body: JSON.stringify({ url: url, length: 3 })
        });


        // ============= Handle if not found  response ==============

        if (!response.ok) {
            throw new Error('Failed to fetch summary');
        }

        const data = await response.json();
        loadingSpinner.style.display = 'none';
        summaryResult.style.display = 'block';
        summaryText.textContent = data.summary;
    } 
    catch (error) {
        loadingSpinner.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Error: Unable to summarize the article. Please check the URL and try again.';
        console.error('Summarization Error:', error);
    }
});