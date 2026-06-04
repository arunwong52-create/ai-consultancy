const restaurants = [
  {
    name: "ส้มตำแม่ศรี",
    rating: 4.8,
    status: "open",
    image: "https://placehold.co/300x200"
  },
  {
    name: "ข้าวมันไก่ดี",
    rating: 4.2,
    status: "closed",
    image: "https://placehold.co/300x200"
  },
  {
    name: "ก๋วยเตี๋ยวเรือ",
    rating: 4.6,
    status: "open",
    image: "https://placehold.co/300x200"
  }
];

const container = document.getElementById("card-container");
const searchInput = document.getElementById("search-input");

let currentFilter = "all";
let sortByRating = false;

// Render
function renderRestaurants(data) {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<h2>ไม่พบร้านอาหาร</h2>";
    return;
  }

  data.forEach((shop) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${shop.image}" alt="${shop.name}">
      <h3>${shop.name}</h3>
      <p>⭐ ${shop.rating}</p>
      <p>${shop.status === "open" ? "🟢 เปิดอยู่" : "🔴 ปิดแล้ว"}</p>
    `;

    container.appendChild(card);
  });
}

// Update View
function updateView() {
  const keyword = searchInput.value.toLowerCase();

  let result = [...restaurants];

  // Search
  result = result.filter((shop) =>
    shop.name.toLowerCase().includes(keyword)
  );

  // Filter
  if (currentFilter === "open") {
    result = result.filter((shop) => shop.status === "open");
  }

  if (currentFilter === "closed") {
    result = result.filter((shop) => shop.status === "closed");
  }

  if (currentFilter === "rating") {
    result = result.filter((shop) => shop.rating >= 4.5);
  }

  // Sort
  if (sortByRating) {
    result.sort((a, b) => b.rating - a.rating);
  }

  renderRestaurants(result);
}

// Initial Render
updateView();

// Search Event
searchInput.addEventListener("input", () => {
  updateView();
});

// Filter Buttons
const buttons = document.querySelectorAll(".filters button");

function setActive(clickedBtn) {
  buttons.forEach((btn) => {
    if (btn.id !== "sort-btn") {
      btn.classList.remove("active");
    }
  });

  clickedBtn.classList.add("active");
}

// All
document.getElementById("all-btn").addEventListener("click", (e) => {
  currentFilter = "all";
  setActive(e.target);
  updateView();
});

// Open
document.getElementById("open-btn").addEventListener("click", (e) => {
  currentFilter = "open";
  setActive(e.target);
  updateView();
});

// Closed
document.getElementById("closed-btn").addEventListener("click", (e) => {
  currentFilter = "closed";
  setActive(e.target);
  updateView();
});

// Rating 4.5+
document.getElementById("rating-btn").addEventListener("click", (e) => {
  currentFilter = "rating";
  setActive(e.target);
  updateView();
});

// Sort Button (Toggle)
const sortBtn = document.getElementById("sort-btn");

sortBtn.addEventListener("click", () => {
  sortByRating = !sortByRating;

  sortBtn.classList.toggle("active");

  updateView();
});