const restaurants = [
  {
    name: "ร้านข้าวมันไก่เจ๊อ้วน",
    location: "เชียงใหม่",
    menu: "ข้าวมันไก่",
    rating: 4.7
  },
  {
    name: "ร้านก๋วยเตี๋ยวเรือป้าสม",
    location: "ลำพูน",
    menu: "ก๋วยเตี๋ยวเรือ",
    rating: 4.5
  },
  {
    name: "ร้านส้มตำแซ่บนัว",
    location: "เชียงราย",
    menu: "ส้มตำไทย",
    rating: 4.8
  }
];

for (const restaurant of restaurants) {
  console.log(`${restaurant.name} — ${restaurant.location} — ⭐ ${restaurant.rating}`);
}