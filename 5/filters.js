document.addEventListener("click", function (event) {
  const btn = event.target.closest(".filter-btn");
  if (!btn) return;

  const section = btn.closest(".dish-section");
  const container = section.querySelector(".dishes");
  const kind = btn.dataset.kind;

  const wasActive = btn.classList.contains("active");

  section.querySelectorAll(".filter-btn").forEach(function (b) {
    b.classList.remove("active");
  });

  if (!wasActive) {
    btn.classList.add("active");
  }

  const activeKind = wasActive ? null : kind;

  container.querySelectorAll(".dish-card").forEach(function (card) {
    const dish = dishes.find(function (d) {
      return d.keyword === card.dataset.dish;
    });
    if (!dish) return;

    if (activeKind === null || dish.kind === activeKind) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});