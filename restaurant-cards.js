// 🧩 ข้อมูลร้าน + status
const restaurants = [
  {
    name: "ข้าวซอยลุง",
    image: "https://via.placeholder.com/300x200",
    rating: 4.5,
    status: "open"
  },
  {
    name: "ส้มตำแซ่บเวอร์",
    image: "https://via.placeholder.com/300x200",
    rating: 4.2,
    status: "closed"
  },
  {
    name: "ก๋วยเตี๋ยวเรือ",
    image: "https://via.placeholder.com/300x200",
    rating: 4.7,
    status: "open"
  },
  {
    name: "หมูกระทะฟีลดี",
    image: "https://via.placeholder.com/300x200",
    rating: 4.8,
    status: "closed"
  }
];

// 🎯 หา container ใน HTML
const container = document.getElementById("card-container");

// ⚙️ loop สร้าง card อัตโนมัติ
restaurants.forEach((shop) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${shop.image}" alt="${shop.name}" />
    <h3>${shop.name}</h3>
    <p>⭐ ${shop.rating}</p>
   <p>${shop.status === "open" ? "🟢 เปิดอยู่" : "🔴 ปิดแล้ว"}</p>
    </p>
  `;

  container.appendChild(card);
});