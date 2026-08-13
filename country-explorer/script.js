const countryContainer = document.getElementById("country-container");
const loading = document.getElementById("loading");

const searchInput = document.getElementById("search-input");
const regionFilter = document.getElementById("region-filter");
const sortSelect = document.getElementById("sort-select");

// เก็บข้อมูลจาก API
let countries = [];


// ====================
// Display Countries
// ====================

function displayCountries(data) {

  countryContainer.innerHTML = "";

  data.forEach(function(country) {

    const card = document.createElement("div");
    card.classList.add("country-card");

    const flag = document.createElement("img");

    // ถ้ารูปโหลดไม่สำเร็จ
    flag.onerror = () => {

      flag.onerror = null;

      const noFlag = document.createElement("p");
      noFlag.textContent = "🚩 No flag available";
      noFlag.classList.add("no-flag");

      card.replaceChild(noFlag, flag);

    };

    flag.src = country.flags.png;
    flag.alt = country.name;

    const name = document.createElement("h2");
    name.textContent = country.name;

    const population = document.createElement("p");
    population.textContent =
      `Population: ${country.population.toLocaleString()}`;

    const region = document.createElement("p");
    region.textContent =
      `Region: ${country.region}`;

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

  const searchText =
    searchInput.value.toLowerCase();

  const selectedRegion =
    regionFilter.value;

  const sortValue =
    sortSelect.value;


  let filteredCountries =
    countries.filter(function(country) {

      const matchSearch =
        country.name
          .toLowerCase()
          .includes(searchText);

      const matchRegion =
        selectedRegion === "all" ||
        country.region === selectedRegion;

      return matchSearch && matchRegion;

    });


  // ====================
  // Sort
  // ====================

  if (sortValue === "name-asc") {

    filteredCountries.sort(function(a, b) {

      return a.name.localeCompare(b.name);

    });

  }

  else if (sortValue === "name-desc") {

    filteredCountries.sort(function(a, b) {

      return b.name.localeCompare(a.name);

    });

  }

  else if (sortValue === "population-asc") {

    filteredCountries.sort(function(a, b) {

      return a.population - b.population;

    });

  }

  else if (sortValue === "population-desc") {

    filteredCountries.sort(function(a, b) {

      return b.population - a.population;

    });

  }


  // ====================
  // No Results Check
  // ====================

  if (filteredCountries.length === 0) {

    countryContainer.innerHTML = `
      <p class="no-results">
        🔍 ไม่พบประเทศที่ค้นหา
      </p>
    `;

  }

  else {

    displayCountries(filteredCountries);

  }

}


// ====================
// Fetch Countries
// ====================

async function fetchCountries() {

  // Loading State
  loading.style.display = "block";

  // ล้างข้อมูลเก่าหรือ Error Card
  countryContainer.innerHTML = "";


  try {

    // Fetch API
    const response =
      await fetch(
         "https://countries.dev/this-api-does-not-exist"
      );


    // ตรวจสอบ HTTP Error
    if (!response.ok) {

      throw new Error(
        `API Error: ${response.status}`
      );

    }


    // แปลงข้อมูลเป็น JSON
    countries =
      await response.json();


    // Success State
    applyFilters();

  }


  catch (error) {

    console.error(
      "Failed to load countries:",
      error
    );


    // Error State
    countryContainer.innerHTML = `
      <div class="error-card">

        <h2>โหลดข้อมูลไม่สำเร็จ 😕</h2>

        <p>
          เกิดข้อผิดพลาดในการเชื่อมต่อ
          กรุณาลองใหม่อีกครั้ง
        </p>

        <button id="retry-button">
          ลองใหม่
        </button>

      </div>
    `;


    // Retry Button
    const retryButton =
      document.getElementById("retry-button");


    retryButton.addEventListener(
      "click",
      fetchCountries
    );

  }


  finally {

    // ซ่อน Loading หลังจากทำงานเสร็จ
    loading.style.display = "none";

  }

}


// ====================
// Event Listeners
// ====================

searchInput.addEventListener(
  "input",
  applyFilters
);

regionFilter.addEventListener(
  "change",
  applyFilters
);

sortSelect.addEventListener(
  "change",
  applyFilters
);


// ====================
// Start App
// ====================

fetchCountries();