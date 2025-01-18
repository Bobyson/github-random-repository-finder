// Select DOM elements
const languageDropdown = document.getElementById('language');
const result = document.getElementById('result');

// Fetching data from API
    // const url = `https://api.github.com/search/repositories?q=language`
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
        result.innerHTML = `<p>No repositories found for $(language)</p>`
       }
    } catch (error) {
        result.innerHTML = `<p>Error fetching repositories</p>`
    }
    console.log(data);
}


// Display the repo
function displayRepository(repository) {
    const {name, description, language, stargazers_count, forks, open_issues} = repository;

    result.innerHTML = `
        <div class="repository">
                <h1>${name}</h1>
                <p>${description || "No description available"}</p>
                <ul>
                    <li>${language}</li>
                    <li>${stargazers_count}</li>
                    <li>${forks}</li>
                    <li>${open_issues}</li>
                </ul>
         </div>
    `;
}

// Handle dropdown
languageDropdown.addEventListener("click", async()=>{
    const selectedLanguage = languageDropdown.value;
    if(!selectedLanguage) return;

    fetchAndDisplayRepository(selectedLanguage);
})