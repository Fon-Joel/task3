document.addEventListener("DOMContentLoaded", function(){
  // code snippet to toggle dark and light mode
  const toggleDarkMode = document.getElementById('darkModeButton');
    if(toggleDarkMode){
        toggleDarkMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            if(isDarkMode){
                document.getElementById('darkModeText').textContent = "Light Mode";
            } else {
                document.getElementById('darkModeText').textContent = "Dark Mode";
            }
        }); 
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeText').textContent = "Light Mode";
    } else {
        document.getElementById('darkModeText').textContent = "Dark Mode";
    }
    }

  
  

  document.getElementById('search').addEventListener("keyup", async function(){
    const searchResultsDiv = document.querySelector('.search-result ul');
    if(this.value.trim() != ''){
        const query = this.value.toLowerCase();
        searchResultsDiv.innerHTML = ""; // Clear previous results

        try {
            // Fetch JSON data
            const response = await fetch("search.json");
            const data = await response.json();

            // Filter results based on query
            const results = data.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );

            // Display results
            if (results.length > 0) {
                results.forEach(item => {
                    const resultItem = document.createElement("li");
                    resultItem.className = "list-group-item";
                    resultItem.innerHTML = `<strong>${item.name}</strong>: ${item.description}`;
                    searchResultsDiv.appendChild(resultItem);
                });
            } else {
                searchResultsDiv.innerHTML = `<li class="list-group-item"><span class="fa fa-lg fa-circle-exclamation text-danger mx-2"></span>No result</li>` ;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            searchResultsDiv.innerHTML = "<p>Unable to fetch data. Please try again later.</p>";
        }

        document.querySelector(".search-result").classList.add('active')
    } else{
        document.querySelector(".search-result").classList.remove('active')
    }
   
  })
})

//function to validate newsletter
function sendEmail(event){
    event.preventDefault();
    const newletter = document.getElementById('newsletter');
    if(newletter.value.trim() == ''){
        document.getElementById('feedback').innerHTML = `<div class="alert alert-dismissible alert-danger text-danger">
                                                            <p id="feedback">Enter your Email</p>
                                                            <button class="btn-close text-danger" data-bs-dismiss="alert"></button>
                                                        </div>`
    } else if(!validateEmail(newletter.value)){
        document.getElementById('feedback').innerHTML = `<div class="alert alert-dismissible alert-danger text-danger">
        <p id="feedback">Wrong Email Format</p>
        <button class="btn-close text-danger" data-bs-dismiss="alert"></button>
    </div>`
    }
     else {
        document.getElementById('feedback').innerHTML = `<div class="alert alert-dismissible alert-success text-success">
        <p id="feedback">Successfull Subscribe</p>
        <button class="btn-close text-success" data-bs-dismiss="alert"></button>
    </div>`
    }
}
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}