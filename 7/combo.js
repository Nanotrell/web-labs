const combos = [
  ["soup", "main", "salad", "drink"],
  ["soup", "main", "drink"],
  ["soup", "salad", "drink"],
  ["main", "salad", "drink"],
  ["main", "drink"]
];

function checkCombo() {
  const chosen = [];
  if (selected.soup) chosen.push("soup");
  if (selected.main) chosen.push("main");
  if (selected.salad) chosen.push("salad");
  if (selected.drink) chosen.push("drink");

  if (chosen.length === 0) {
    return "Ничего не выбрано. Выберите блюда для заказа";
  }

  const hasSalad = chosen.includes("salad");
  const hasSoup = chosen.includes("soup");
  const hasMain = chosen.includes("main");
  const hasDrink = chosen.includes("drink");

  if (hasSalad && !hasSoup && !hasMain) {
    return "Выберите суп или главное блюдо";
  }

  if (hasSoup && !hasMain && !hasSalad) {
    return "Выберите главное блюдо/салат/стартер";
  }

  if (!hasDrink) {
    return "Выберите напиток";
  }

  const matched = combos.some(function (combo) {
    return combo.every(function (c) { return chosen.includes(c); });
  });

  if (!matched) {
    return "Выберите главное блюдо";
  }

  return null;
}

function showNotification(text) {
  const old = document.getElementById("combo-notification");
  if (old) old.remove();

  const overlay = document.createElement("div");
  overlay.id = "combo-notification";
  overlay.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;" +
    "background:rgba(0,0,0,0.5);display:flex;align-items:center;" +
    "justify-content:center;z-index:9999;";

  const box = document.createElement("div");
  box.style.cssText =
    "background:#fff;padding:30px 40px;border-radius:15px;" +
    "text-align:center;max-width:400px;font-family:'Macherie';";

  const msg = document.createElement("p");
  msg.textContent = text;
  msg.style.cssText = "font-size:18px;margin:0 0 20px;width:100%;";

  const ok = document.createElement("button");
  ok.type = "button";
  ok.textContent = "Окей";
  ok.style.cssText =
    "padding:10px 30px;border:1px solid #333;background:#fff;" +
    "border-radius:10px;cursor:pointer;font-family:'Macherie';" +
    "font-size:16px;transition:background-color 0.3s ease,color 0.3s ease;";

  ok.addEventListener("mouseover", function () {
    ok.style.background = "tomato";
    ok.style.color = "#fff";
  });
  ok.addEventListener("mouseout", function () {
    ok.style.background = "#fff";
    ok.style.color = "#333";
  });
  ok.addEventListener("click", function () {
    overlay.remove();
  });

  box.append(msg, ok);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

document.querySelector(".order-form").addEventListener("submit", function (event) {
  const error = checkCombo();
  if (error) {
    event.preventDefault();
    showNotification(error);
  }
});