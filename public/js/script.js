// Define the URLs of your header and footer HTML files
const headerUrl = 'header.html';
const footerUrl = 'footer.html';

// Function to fetch and insert header and footer content
function fetchAndInsertContent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error(`Error fetching content from ${url}: ${error}`);
        });
}

// Fetch and insert the header and footer content
fetchAndInsertContent(headerUrl, 'header');
fetchAndInsertContent(footerUrl, 'footer');