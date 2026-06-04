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

// render function
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

// initial render
renderRestaurants(restaurants);

// SEARCH
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", (event) => {
  const keyword = event.target.value.toLowerCase();

  const filtered = restaurants.filter((shop) => {
    return shop.name.toLowerCase().includes(keyword);
  });

  renderRestaurants(filtered);
});