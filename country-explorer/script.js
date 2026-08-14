const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");
const loading = document.getElementById("loading");


// ====================
// Search Country
// ====================

async function searchCountry() {

  const countryName = countryInput.value.trim();


  // ====================
  // Empty Input
  // ====================

  if (countryName === "") {

    result.innerHTML = `
      <p class="no-result">
        🔍 กรุณาพิมพ์ชื่อประเทศก่อนค้นหา
      </p>
    `;

    return;
  }


  // ====================
  // Loading State
  // ====================

  loading.hidden = false;

  result.innerHTML = "";

  searchBtn.disabled = true;
  searchBtn.textContent = "กำลังค้นหา...";


  try {

    // ====================
    // Fetch API
    // ====================

    const response = await fetch(
      `https://countries.dev/name/${encodeURIComponent(countryName)}`
    );


    // ====================
    // HTTP Error
    // ====================

    if (!response.ok) {

      throw new Error(
        `API Error: ${response.status}`
      );

    }


    // ====================
    // Convert JSON
    // ====================

    const data = await response.json();


    // ดูข้อมูลจริงจาก API
    console.log("API response:", data);


    // ====================
    // Support Array / Object
    // ====================

    const country = Array.isArray(data)
      ? data[0]
      : data;


    // ====================
    // Check Result
    // ====================

    if (!country) {

      throw new Error(
        "Country not found"
      );

    }


    // ====================
    // Display Country
    // ====================

    displayCountry(country);

  }


  // ====================
  // Error Handling
  // ====================

  catch (error) {

    console.error(
      "Search failed:",
      error
    );


    result.innerHTML = `
      <div class="error-card">

        <h2>
          ❌ ค้นหาไม่สำเร็จ
        </h2>

        <p>
          ไม่พบข้อมูลประเทศหรือเกิดปัญหาในการเชื่อมต่อ
          กรุณาลองใหม่อีกครั้ง
        </p>

        <button
          class="retry-button"
          id="retryBtn"
        >
          🔄 ลองใหม่
        </button>

      </div>
    `;


    // ====================
    // Retry Button
    // ====================

    const retryBtn =
      document.getElementById("retryBtn");


    retryBtn.addEventListener(
      "click",
      searchCountry
    );

  }


  // ====================
  // Finally
  // ====================

  finally {

    loading.hidden = true;

    searchBtn.disabled = false;

    searchBtn.textContent = "ค้นหา";

  }

}


// ====================
// Display Country
// ====================

function displayCountry(country) {

  const name =
    country.name || "ไม่ระบุ";

  const region =
    country.region || "ไม่ระบุ";

  const population =
    typeof country.population === "number"
      ? country.population.toLocaleString()
      : "ไม่ระบุ";


  const flag =
    country.flags?.png || "";


  result.innerHTML = `
    <div class="country-card">

      ${
        flag
          ? `
            <img
              src="${flag}"
              alt="ธงของ ${name}"
            >
          `
          : `
            <p>
              🚩 No flag available
            </p>
          `
      }

      <h2>
        ${name}
      </h2>

      <p>
        🌍 Region:
        ${region}
      </p>

      <p>
        👥 Population:
        ${population}
      </p>

    </div>
  `;

}


// ====================
// Search Button
// ====================

searchBtn.addEventListener(
  "click",
  searchCountry
);


// ====================
// Enter Key
// ====================

countryInput.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter") {

      searchCountry();

    }

  }
);