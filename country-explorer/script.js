const countryContainer = document.getElementById("country-container");
const loading = document.getElementById("loading");

const searchInput = document.getElementById("search-input");
const continentFilter = document.getElementById("continent-filter");
const sortSelect = document.getElementById("sort-select");

const countries = [
  {
    name: {
      common: "Thailand"
    },
    flags: {
      png: "https://flagcdn.com/w320/th.png"
    },
    population: 71697030,
    region: "Asia"
  },
  {
    name: {
      common: "Japan"
    },
    flags: {
      png: "https://flagcdn.com/w320/jp.png"
    },
    population: 125836021,
    region: "Asia"
  },
  {
    name: {
      common: "France"
    },
    flags: {
      png: "https://flagcdn.com/w320/fr.png"
    },
    population: 68042591,
    region: "Europe"
  },
  {
    name: {
      common: "Brazil"
    },
    flags: {
      png: "https://flagcdn.com/w320/br.png"
    },
    population: 215313498,
    region: "Americas"
  },
  {
    name: {
      common: "Australia"
    },
    flags: {
      png: "https://flagcdn.com/w320/au.png"
    },
    population: 26068792,
    region: "Oceania"
  }
];

// ====================
// Display Countries
// ====================

function displayCountries(data) {

  countryContainer.innerHTML = "";

  data.forEach(function(country) {

    const card = document.createElement("div");
    card.classList.add("country-card");

    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = country.name.common;

    const name = document.createElement("h2");
    name.textContent = country.name.common;

    const population = document.createElement("p");
    population.textContent = `Population: ${country.population}`;

    const region = document.createElement("p");
    region.textContent = `Region: ${country.region}`;

    card.appendChild(flag);
    card.appendChild(name);
    card.appendChild(population);
    card.appendChild(region);

    countryContainer.appendChild(card);

  });

}

// ====================
// Search + Filter + Sort
// ====================

function applyFilters() {

  const searchText = searchInput.value.toLowerCase();
  const selectedRegion = continentFilter.value;
  const sortValue = sortSelect.value;

  let filteredCountries = countries.filter(function(country) {

    const matchSearch =
      country.name.common.toLowerCase().includes(searchText);

    const matchRegion =
      selectedRegion === "all" ||
      country.region === selectedRegion;

    return matchSearch && matchRegion;

  });

  if (sortValue === "name-asc") {

    filteredCountries.sort(function(a, b) {
      return a.name.common.localeCompare(b.name.common);
    });

  } else if (sortValue === "name-desc") {

    filteredCountries.sort(function(a, b) {
      return b.name.common.localeCompare(a.name.common);
    });

  } else if (sortValue === "population-asc") {

    filteredCountries.sort(function(a, b) {
      return a.population - b.population;
    });

  } else if (sortValue === "population-desc") {

    filteredCountries.sort(function(a, b) {
      return b.population - a.population;
    });

  }

  displayCountries(filteredCountries);

}

// ====================
// Start App
// ====================

function fetchCountries() {

  applyFilters();

  loading.style.display = "none";

}

searchInput.addEventListener("input", applyFilters);

continentFilter.addEventListener("change", applyFilters);

sortSelect.addEventListener("change", applyFilters);

fetchCountries();