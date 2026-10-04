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
