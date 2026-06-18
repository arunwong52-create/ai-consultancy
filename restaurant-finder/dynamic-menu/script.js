const menu = [
  {
    name: "ผัดกะเพราหมูสับ",
    price: 60,
    spicy: true,
    category: "อาหารจานเดียว"
  },
  {
    name: "ข้าวผัดปู",
    price: 80,
    spicy: false,
    category: "อาหารจานเดียว"
  },
  {
    name: "ต้มยำกุ้ง",
    price: 120,
    spicy: true,
    category: "ซุป"
  },
  {
    name: "ส้มตำไทย",
    price: 50,
    spicy: true,
    category: "สลัด"
  },
  {
    name: "ชาไทยเย็น",
    price: 45,
    spicy: false,
    category: "เครื่องดื่ม"
  },
  {
    name: "ข้าวเหนียวมะม่วง",
    price: 90,
    spicy: false,
    category: "ของหวาน"
  }
];

const menuContainer = document.getElementById("menu-container");

for (let i = 0; i < menu.length; i++) {
  const dish = menu[i];

  const cardHTML = `
    <div class="dish-card">
      <h3>${dish.name}</h3>
      <p>ราคา: ${dish.price} บาท</p>
      <p>หมวดหมู่: ${dish.category}</p>
      <p>ความเผ็ด: ${dish.spicy ? "เผ็ด 🌶️" : "ไม่เผ็ด"}</p>
    </div>
  `;

  menuContainer.innerHTML += cardHTML;
}