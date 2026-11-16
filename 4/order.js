const selected = {
    soup: null,
    main: null,
    drink: null
};

const summaryBlock = document.getElementById("order-summary");
const nothingChoosedBlock = document.getElementById("nothing-choosed");

function renderOrder() {
    const chosen = Object.values(selected).filter(Boolean);

    if (chosen.length === 0) {
        nothingChoosedBlock.style.display = "block";
        document.getElementById("choosed-soup").style.display = "none";
        document.getElementById("choosed-main").style.display = "none";
        document.getElementById("choosed-drink").style.display = "none";
        document.getElementById("price").style.display = "none";
    } else {
        nothingChoosedBlock.style.display = "none";
        document.getElementById("choosed-soup").style.display = "block";
        document.getElementById("choosed-main").style.display = "block";
        document.getElementById("choosed-drink").style.display = "block";
        document.getElementById("price").style.display = "block";

        var price = 0;
        var price1 = 0;
        var price2 = 0;
        var price3 = 0;

        if (selected.soup != null) {
            let dish = selected.soup;
            document.getElementById("choosed-soup").getElementsByClassName("choosed-dish-name")[0].textContent = `${dish.name} - ${dish.price} ₽`;
            var price1 = dish.price;
        } else {
            document.getElementById("choosed-soup").getElementsByClassName("choosed-dish-name")[0].textContent = "Блюдо не выбрано";
        };

        if (selected.main != null) {
            let dish = selected.main;
            document.getElementById("choosed-main").getElementsByClassName("choosed-dish-name")[0].textContent = `${dish.name} - ${dish.price} ₽`;
            var price2 = dish.price;
        } else {
            document.getElementById("choosed-main").getElementsByClassName("choosed-dish-name")[0].textContent = "Блюдо не выбрано";
        };

        if (selected.drink != null) {
            let dish = selected.drink;
            document.getElementById("choosed-drink").getElementsByClassName("choosed-dish-name")[0].textContent = `${dish.name} - ${dish.price} ₽`;
            var price3 = dish.price;
        } else {
            document.getElementById("choosed-drink").getElementsByClassName("choosed-dish-name")[0].textContent = "Напиток не выбран";
        };
        console.log(price1, price2, price3);
        price = price1 + price2 + price3;

        document.getElementById("total-price").textContent = `${price} ₽`;
    };

}

function updateHiddenInputs() {
    document.getElementById("hidden-soup").value = selected.soup ? selected.soup.keyword : "";
    document.getElementById("hidden-main").value = selected.main ? selected.main.keyword : "";
    document.getElementById("hidden-drink").value = selected.drink ? selected.drink.keyword : "";
}


document.addEventListener("click", function (event) {
    const button = event.target.closest(".add-btn");
    if (!button) return;

    const closestcard = button.closest(".dish-card");
    if (!closestcard) return;

    const keyword = closestcard.dataset.dish;

    const dish = dishes.find(function (d) {
        return d.keyword === keyword;
    });
    if (!dish) return;

    selected[dish.category] = dish;

    document
        .querySelectorAll(`#${dish.category} .dish-card`)
        .forEach(function (card) {
            card.style.border = "";
        });

    closestcard.style.border = "2px solid tomato";

     updateHiddenInputs();

    renderOrder();

});

document.querySelector(".order-form").addEventListener("reset", function () {
    selected.soup = null;
    selected.main = null;
    selected.drink = null;

    document.querySelectorAll(".dish-card").forEach(function (card) {
        card.style.border = "";
    });

    updateHiddenInputs();
    renderOrder();
});