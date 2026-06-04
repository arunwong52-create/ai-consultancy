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

let currentData = [...restaurants];

// 🎯 render
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
      <img src="${shop.image}" />
      <h3>${shop.name}</h3>
      <p>⭐ ${shop.rating}</p>
      <p>${shop.status === "open" ? "🟢 เปิดอยู่" : "🔴 ปิดแล้ว"}</p>
    `;

    container.appendChild(card);
  });
}

// 🚀 initial render
renderRestaurants(currentData);



// 🔍 SEARCH 

searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();

  const filtered = restaurants.filter((shop) =>
    shop.name.toLowerCase().includes(keyword)
  );

  currentData = filtered;
  renderRestaurants(filtered);
});


// 🔍 SEARCH

const buttons = document.querySelectorAll(".filters button");

function setActive(btn) {
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// ALL
document.getElementById("all-btn").addEventListener("click", (e) => {
  setActive(e.target);
  currentData = restaurants;
  renderRestaurants(restaurants);
});

// OPEN
document.getElementById("open-btn").addEventListener("click", (e) => {
  setActive(e.target);
  const result = restaurants.filter(r => r.status === "open");
  currentData = result;
  renderRestaurants(result);
});

// CLOSED
document.getElementById("closed-btn").addEventListener("click", (e) => {
  setActive(e.target);
  const result = restaurants.filter(r => r.status === "closed");
  currentData = result;
  renderRestaurants(result);
});

// RATING 4.5+
document.getElementById("rating-btn").addEventListener("click", (e) => {
  setActive(e.target);
  const result = restaurants.filter(r => r.rating >= 4.5);
  currentData = result;
  renderRestaurants(result);
});



// 🔍 SEARCH

document.getElementById("sort-btn").addEventListener("click", (e) => {
  setActive(e.target);

  const sorted = [...currentData].sort((a, b) => {
    return b.rating - a.rating;
  });

  currentData = sorted;
  renderRestaurants(sorted);
});