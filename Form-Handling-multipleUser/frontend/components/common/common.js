document.querySelectorAll('.form-outline .form-control').forEach((input) => {
    // Run on load
    if (input.value) {
        input.classList.add('active');
    }

    // Run on input change
    input.addEventListener('input', () => {
        if (input.value) {
            input.classList.add('active');
        } else {
            input.classList.remove('active');
        }
    });
});