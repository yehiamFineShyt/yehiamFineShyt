let currentPage = 1;
const resultsPerPage = 10; // Adjust as needed

function displayPage(data, page) {
  const start = (page - 1) * resultsPerPage;
  const end = start + resultsPerPage;
  const pageData = data.slice(start, end);

  // Display the current page of data
  const resultsContainer = document.getElementById('photos');
  resultsContainer.innerHTML = ''; // Clear previous results

  pageData.forEach(item => {
    const resultElement = document.createElement('div');
    resultElement.textContent = item.name.common; // Customize this as needed
    resultsContainer.appendChild(resultElement);
  });

  // Show/hide pagination buttons based on page
  document.getElementById('prev').style.display = page > 1 ? 'inline' : 'none';
  document.getElementById('next').style.display = page * resultsPerPage < data.length ? 'inline' : 'none';
}

document.getElementById('prevButton').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(filteredJson, currentPage);
  }
});

document.getElementById('nextButton').addEventListener('click', () => {
  if (currentPage * resultsPerPage < filteredJson.length) {
    currentPage++;
    displayPage(filteredJson, currentPage);
  }
});


// displayPage(filteredJson, currentPage);
