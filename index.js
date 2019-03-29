const countriesList = document.getElementById("country");
let countries; 

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => initialize(data))
.catch(err => console.log("Error:", err));

function initialize(countriesData) {
  countries = countriesData;
  let options = "";
  
  countries.forEach(country => options+=`<option value="${country.alpha3Code}">${country.name}</option>`);
  
  countriesList.innerHTML = options;
  
  countriesList.selectedIndex = Math.floor(Math.random()*countriesList.length);
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  document.querySelector("#flag img").src = countryData.flag;
  document.querySelector("#flag img").alt = `Flag of ${countryData.name}`;  
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById("country-code").innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currency").innerHTML = countryData.currencies.map(c => `${c.name} (${c.code}) (${c.symbol})`).join(", ");
  document.getElementById("latlong").innerHTML =  `${countryData.latlng[0]}     ${countryData.latlng[1]}`;
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
}