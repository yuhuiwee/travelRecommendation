const mainTitle = "EXPLORE DREAM DESTINATION";
const mainContent = "It encourages exploration of unfamiliar territories, embracing diverse cultures and landscapes, while pursuing the desired destination that captivates the heart and ignites a sense of wonder"

let main = document.getElementById("main");

let titleDiv = document.getElementById("titleDiv");
titleDiv.innerHTML+=`<h1>${mainTitle}</h1>`
titleDiv.innerHTML+=`<p id="mainContent">${mainContent}</p>`;
main.appendChild(titleDiv);



const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', searchRecs);

const btnClear = document.getElementById('btnClear');
btnClear.addEventListener('click', clearAll);

let result=[]
let searchResultDiv = document.getElementById("searchResult");
function searchRecs(){
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    
    searchResultDiv.innerHTML=``;
    fetch('./travel_recommendation_api.json')
    .then(response=>response.json())
    .then(data=>{

        result = processInput(searchInput, data);
        if (result==null){
            console.error('Search key not found');
            return;
        }
        load();

    }).catch(error=>{
        console.error('Error:', error);
    });

    main.appendChild(searchResultDiv);
}

function processInput(inputString, jsonData){
    switch(inputString){
        case "beach":
        case "beaches":
            return jsonData.beaches;
        case "temple":
        case "temples":
            return jsonData.temples;
        case "country":
        case "countries":
            var cities =[];
            jsonData.countries.forEach( c=>{
                cities = cities.concat(c.cities);
            })
            return cities;
        case "australia":
            return jsonData.countries[0].cities;
        case "japan":
            return jsonData.countries[1].cities;
        case "brazil":
            return jsonData.countries[2].cities;
        default:
            return null;
    }
}

function createResult(country){
    var resultDiv = document.createElement("div");
    resultDiv.classList.add("city");
    resultDiv.setAttribute("id","result_" + country.id);
    resultDiv.innerHTML+=`<img src="./searchRecommendations/${country.imageUrl}" alt="${country.id}"/>`;
    resultDiv.innerHTML+=`<h1>${country.name}</h1>`;
    resultDiv.innerHTML+=`<p>${country.description}</p>`;
    searchResultDiv.appendChild(resultDiv);
}

function load(){
    if(document.getElementById("loadMore")!= null){
        document.getElementById("loadMore").remove();
    }
    if(result.length==0){
        return;
    }
    i=0
    while(i<2 && i<result.length){
        var country = result[i];
        createResult(country);
        i++;
    }
    if(result.length >i){
        searchResultDiv.innerHTML+=`<button onClick="load()" id="loadMore"> Load More</button>`;
    }
    result = result.slice(i);
}

function clearAll(){
    searchResultDiv.innerHTML=``;
    document.getElementById("searchInput").value = "";
}