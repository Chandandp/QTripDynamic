
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let cities = params.get("city");
  return cities;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const rawData= await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const finalData= await rawData.json();
    return finalData;
  }
  catch (err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  //const dataContainer=document.getElementById("data");
  //dataContainer.innerHTML="";

  adventures.forEach((key) => {
    let card = `<div class="col-6 col-lg-3 mb-3 test">
    <a href="detail/?adventure=${key.id}" id=${key.id}>
      <div class="card activity-card">
      <span class="category-banner">${key.category}</span>
        <img src="${key.image}" alt="">
        <div class="card-body">
          <div class="d-md-flex justify-content-between">
            <h5 class="card-title">${key.name}</h5>
            <p class="card-text bold">&#x20b9; ${key.costPerHead}</p>
          </div>
          <div class="d-md-flex justify-content-between">
          <h5 class="card-title">Duration</h5>
          <p class="card-text bold">${key.duration} Hours</p>
        </div>
        </div>
 
      </div>
    </a>
  </div>`;
    const element = document.createElement("div");
    element.innerHTML = card;
    data.appendChild(element.firstElementChild);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const advFilter = list.filter((adv) => adv.duration >= low && adv.duration <= high);
  console.log(advFilter);
  return advFilter;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  //const filterList = adventureList.filter(adventures => categoryList.includes(adventures.category));
  //return filterList;

const advCategory = list.filter((adv) => categoryList.includes(adv.category));
console.log(advCategory);
return advCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

 const splitDuration = filters.duration.split("-");
 const lowDuration = splitDuration[0];
 const highDuration = splitDuration[1];



 if (filters.duration.length > 0 && filters.category.length > 0) {
     console.log('// case1 : duration is selected and category is also selected')
     return filterByDuration(filterByCategory(list, filters.category), lowDuration, highDuration);
     //filterByCategory(filteredAdv, filters.category);

 } else if (filters.duration.length > 0) {
     console.log("// case2: duration is selected but category is not selected")
     return filterByDuration(list, lowDuration, highDuration);
     //return filteredAdv;
 } else if (filters.category.length > 0) {
     console.log("// case3: duration is not selected but category is selected")
     return filterByCategory(list, filters.category);
     //return filteredAdv;
 } else {
     // case4: duration and category both are not selected
     return list;
     //filterFunction(list);
 }
 // Place holder for functionality to work in the Stubs
 // return list;
 //return filterAdventureFromDuration;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const localStr = JSON.parse(localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const parentEl = document.getElementById('category-list');
  parentEl.innerHTML = "";
  filters.category.forEach(element => {
    let pTag = document.createElement("p");
    pTag.textContent = element;
    parentEl.append(pTag);
});

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
