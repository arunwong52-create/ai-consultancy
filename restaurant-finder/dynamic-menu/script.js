const menu = [
  {
    name: "ข้าวผัด",
    price: 60,
    spicy: false,
    category: "อาหารจานเดียว"
  },
  {
    name: "กะเพราหมู",
    price: 70,
    spicy: true,
    category: "อาหารจานเดียว"
  },
  {
    name: "ชาไทย",
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

function displayMenu(data) {

  menuContainer.innerHTML = "";

  for (let i = 0; i < data.length; i++) {

    const dish = data[i];

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
}

// แสดงเมนูทั้งหมดตอนเปิดเว็บ
displayMenu(menu);

// ====================
// Filter Category
// ====================

const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(function(button) {

  button.addEventListener("click", function() {

    const selectedCategory = button.dataset.category;

    if (selectedCategory === "all") {

      displayMenu(menu);

    } else {

      const filteredMenu = menu.filter(function(item) {
        return item.category === selectedCategory;
      });

      displayMenu(filteredMenu);
    }

  });

});

// ====================
// Search Menu
// ====================

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function() {

  const searchText = searchInput.value;

  const filteredMenu = menu.filter(function(item) {
    return item.name.includes(searchText);
  });

  displayMenu(filteredMenu);

});