let resultList = []
let storeResults = false;
// Function to query the API and display the results
async function searchMovies(query) {
    try { console.log ("search movies")
      const response = await fetch(`https://search.imdbot.workers.dev/?q=${query}`);
      const data = await response.json();
      if ( !storeResults ){
        resultList = [];   
   }
      if (data.ok) {
        const results = data.description;
  
        // Clear previous results
        let resultListCurr = []
        resultListCurr = data.description
       // resultListCurr.push({title, year, actors, poster, imdbUrl});

       if(!storeResults){
        // resultList.push({title, year, actors, poster, imdbUrl});
       resultList= data.description}
        displayResults(resultListCurr)
     } else {
        console.log("Error:", data.error_code);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  // Event listener for keyup event on input field
  document.getElementById("searchInput").addEventListener("keyup", event => {
    const query = event.target.value;
  
    // Minimum query length for searching
    if (query.length >= 3) {
      searchMovies(query);
    } else {
      // Clear results if query is too short
      document.getElementById("results").innerHTML = "";
    }
//Event listener to store results of movies in a list

});
  document.getElementById("storeButton").addEventListener("click", () => {  
    storeResult = true; 
});
//Event listener to clear results of movies in a list

document.getElementById("clearButton").addEventListener("click", () => {  
    storeResult = false; 
});
document.getElementById("displayResult").addEventListener("click", () => {  
    displayResult(resultList);
});

// Function to display the results
function displayResults(resultListPara) {  
   // Clear previous results  

    document.getElementById("results").innerHTML = "";   

// Display each result  

    resultListPara.forEach(result => {    
        const { title, year, actors, poster, imdbUrl } = result;     
        const resultElement = document.createElement("div");    
        resultElement.innerHTML = `      
        <h2>${title} (${year})</h2>      
        <p>Actors: ${actors}</p>      
        <a href="${imdbUrl}" target="_blank">        
        <img src="${poster}" alt="${title} Poster" width="200" height="300">      
        </a>    `;     
        document.getElementById("results").appendChild(resultElement);  
        }); 
}