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
        resultListCurr =results
       // resultListCurr.push({title, year, actors, poster, imdbUrl});

       if(!storeResults){
        // resultList.push({title, year, actors, poster, imdbUrl});
        resultList= results
      }
      displayResults(resultListCurr);
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
    if (query.length >= 2) {
      searchMovies(query);
    } else {
      // Clear results if query is too short
      document.getElementById("results").innerHTML = "";
    }
//Event listener to store results of movies in a list

});
  document.getElementById("storeButton").addEventListener("click", () => {  
    storeResults = true; 
});
//Event listener to clear results of movies in a list

document.getElementById("clearButton").addEventListener("click", () => {  
    storeResults = false; 
});
document.getElementById("displayResult").addEventListener("click", () => {  
  //const processedResults = preprocessResults(resultListPara);
  displayResults(resultList);
});

// Function to display the results
function displayResults(resultListPara) {  
  // Clear previous results  

   document.getElementById("results").innerHTML = "";   

// Display each result  

   resultListPara.forEach(result => {    
       const title = result["#TITLE"];
       const year = result["#YEAR"];
       const actors = result["#ACTORS"];
       const poster = result["#IMG_POSTER"];
       const imdbUrl = result["#IMDB_URL"];
      
       const resultElement = document.createElement("div");    
       resultElement.innerHTML = `      
       <div style="text-align:center">
       <h2>${title} (${year})</h2>      
       <p>Actors: ${actors}</p>      
       <a href="${imdbUrl}" target="_blank">        
       <img src="${poster}" alt="${title} Poster" width="200" height="300">      
       </a> <br/><br/><br/></div>   `;     
       document.getElementById("results").appendChild(resultElement);  
       }); 
}