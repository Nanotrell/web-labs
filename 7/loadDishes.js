const API_BASE = "https://free-food-menus-api-two.vercel.app";

const SOURCES = [
  { endpoint: "bbqs",  category: "soup",    kind: "meat" },
  { endpoint: "breads",  category: "salad",    kind: "veg" },
  { endpoint: "best-foods",  category: "soup",    kind: "meat" },
  { endpoint: "burgers",  category: "main",    kind: "meat" },
  { endpoint: "pizzas",   category: "main",    kind: "veg"  },
  { endpoint: "drinks",   category: "drink",   kind: "cold" },
  { endpoint: "desserts", category: "dessert", kind: "small" }
];

function loadDishes() {
  dishes.length = 0;

  return Promise.all(
    SOURCES.map(function (src) {
      return fetch(API_BASE + "/" + src.endpoint)
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          return r.json();
        })
        .then(function (data) {
          data.slice(0, 4).forEach(function (item) {
            dishes.push({
              keyword: String(item.id),
              name: item.name,
              price: Math.round(Number(item.price) * 10),
              image: item.img,
              count: item.dsc || "1 шт",
              category: src.category,
              kind: src.kind
            });
          });
        });
    })
  )
    .then(function () { return dishes; })
    .catch(function (error) {
      console.error("Не удалось загрузить блюда:", error);
      return [];
    });
}