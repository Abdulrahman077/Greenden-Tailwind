// Add a live character count and a clear confirmation to the contact form.
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form");
    const message = document.querySelector("#message");
    const counter = document.querySelector("#message-count");
    const status = document.querySelector("#form-status");

    // Stop safely if this script is ever loaded on a page without the form.
    if (!form || !message || !counter || !status) {
        return;
    }

    function updateCharacterCount() {
        counter.textContent = `${message.value.length} / ${message.maxLength} characters`;
    }

    message.addEventListener("input", updateCharacterCount);

    form.addEventListener("submit", function (event) {
        // This is a front-end demo, so do not reload the page or claim it sent data.
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        status.textContent = `Thanks, ${name}! Your note is ready. This demo does not send messages yet.`;
        status.classList.remove("hidden");

        form.reset();
        updateCharacterCount();
    });
});

// Search and filter the plant and flower cards on the Products page.
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector("#product-search");
    const clearButton = document.querySelector("#clear-search");
    const resultMessage = document.querySelector("#product-results");
    const filterButtons = Array.from(document.querySelectorAll("[data-product-filter]"));
    const productCards = Array.from(document.querySelectorAll("#houseplants .grid > a, #flowers .grid > a"));
    const plantSection = document.querySelector("#houseplants");
    const flowerSection = document.querySelector("#flowers");
    const fieldGuide = document.querySelector("#field-guide");
    const noPlantsMessage = document.querySelector("#no-houseplants");
    const noFlowersMessage = document.querySelector("#no-flowers");

    // This part runs only on the Products page where these controls exist.
    if (!searchInput || !clearButton || !resultMessage || productCards.length === 0) {
        return;
    }

    let activeFilter = "all";

    productCards.forEach(function (card) {
        card.dataset.category = card.closest("#houseplants") ? "houseplants" : "flowers";
    });

    function updateProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;
        let visiblePlants = 0;
        let visibleFlowers = 0;

        productCards.forEach(function (card) {
            const categoryMatches = activeFilter === "all" || card.dataset.category === activeFilter;
            const cardText = `${card.textContent} ${card.querySelector("img")?.alt || ""}`.toLowerCase();
            const searchMatches = cardText.includes(searchTerm);
            const shouldShow = categoryMatches && searchMatches;

            card.classList.toggle("hidden", !shouldShow);

            if (shouldShow) {
                visibleCount += 1;
                if (card.dataset.category === "houseplants") visiblePlants += 1;
                if (card.dataset.category === "flowers") visibleFlowers += 1;
            }
        });

        // Hide whole collections that the selected category does not include.
        if (plantSection) plantSection.classList.toggle("hidden", activeFilter === "flowers");
        if (flowerSection) flowerSection.classList.toggle("hidden", activeFilter === "houseplants");
        if (fieldGuide) fieldGuide.classList.toggle("hidden", activeFilter === "flowers");

        if (noPlantsMessage) {
            noPlantsMessage.classList.toggle("hidden", activeFilter === "flowers" || visiblePlants > 0);
        }
        if (noFlowersMessage) {
            noFlowersMessage.classList.toggle("hidden", activeFilter === "houseplants" || visibleFlowers > 0);
        }

        resultMessage.textContent = searchTerm
            ? `${visibleCount} ${visibleCount === 1 ? "match" : "matches"} for “${searchInput.value.trim()}”`
            : `Showing ${visibleCount} of ${productCards.length} picks`;
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            activeFilter = button.dataset.productFilter;

            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;
                filterButton.setAttribute("aria-pressed", String(isActive));
                filterButton.classList.toggle("bg-green-900", isActive);
                filterButton.classList.toggle("text-white", isActive);
                filterButton.classList.toggle("bg-white", !isActive);
                filterButton.classList.toggle("text-green-900", !isActive);
            });

            updateProducts();
        });
    });

    searchInput.addEventListener("input", updateProducts);

    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        updateProducts();
        searchInput.focus();
    });

    updateProducts();
});
