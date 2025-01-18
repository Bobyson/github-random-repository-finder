// Select DOM elements
const languageDropdown = document.getElementById('language');
const result = document.getElementById('result');

// Fetching data from API
    // const url = `https://api.github.com/search/repositories?q=language:${language}`
    // fetch(url)
    // .then(response=>response.json())
    // .then(data => console.log(data))
    // .catch(error=> console.error(error));
async function fetchAndDisplayRepository(language) {
    result.innerHTML = `<p>Loading, please wait..</p>`
    try {
       const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}`);
       const data = await response.json();
       
       if (data.items && data.items.length > 0) {
        const randomIndex = Math.floor(Math.random()*data.items.length);
        const randomRepository = data.items[randomIndex];
        displayRepository(randomRepository)
       } else {
        result.innerHTML = `
            <p>No repositories found for ${language}</p>
            <button id="retry-btn">Retry</button>
        `;
        document.getElementById("retry-btn").addEventListener("click", resetState);
       }
    } catch (error) {
        result.innerHTML = `
            <p>Error fetching repositories</p>
            <button id="retry-btn">Retry</button>
        `;
        document.getElementById("retry-btn").addEventListener("click", resetState);
    }
    
}


// Display the repo
function displayRepository(repository) {
    const {name, description, language, stargazers_count, forks, open_issues} = repository;

    result.innerHTML = `
        <div class="repository">
                <h1>${name}</h1>
                <p>${description || "No description available"}</p>
                <div id="details">
                    <div class="detail">${language}</div>
                    <div class="detail">${stargazers_count}</div>
                    <div class="detail">${forks}</div>
                    <div class="detail">${open_issues}</div>
                </div>
                
                <button id="refresh-btn">Refresh</button>
         </div>
    `;

    document.getElementById("refresh-btn").addEventListener("click", resetState);
}
// Reset to initial state
function resetState() {
    result.innerHTML = `<h3>Please select a language</h3>`;

    languageDropdown.value = "";
}

// Handle dropdown
languageDropdown.addEventListener("click", async()=>{
    const selectedLanguage = languageDropdown.value;
    if(!selectedLanguage) return;

    fetchAndDisplayRepository(selectedLanguage);
})