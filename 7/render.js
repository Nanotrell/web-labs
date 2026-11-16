function renderDishes() {

    const container = document.getElementsByClassName("dishes");

    const sortedDishes = dishes.toSorted(
        function(a,b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        }
    );

    for (let index = 0; index < sortedDishes.length; index++) {
        const dish = sortedDishes[index];

        const card = document.createElement("div");
        card.className = "dish-card";
        card.dataset.dish = dish.keyword;

        const img = document.createElement("img");
        img.src = dish.image;
        img.alt = dish.name;

        const nameEl = document.createElement("p");
        nameEl.className = "dish-name";
        nameEl.textContent = dish.name;

        const weightEl = document.createElement("p");
        weightEl.className = "dish-weight";
        weightEl.textContent = dish.count;

        const priceEl = document.createElement("p");
        priceEl.className = "dish-price";
        priceEl.textContent = `${dish.price} ₽`;

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "add-btn";
        btn.textContent = "Добавить";

        card.append(img, nameEl, weightEl, priceEl, btn);

        for (let i = 0; i < container.length; i++) {
            if (container[i].id == dish.category) {
                container[i].appendChild(card);
            }
        }
    }
}