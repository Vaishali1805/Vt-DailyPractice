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

function createToast(message,className1,color) {
    document.querySelector('.myToast').innerHTML =
        `<div class="toastDiv" style="--barColor: ${color}">
      <i class="fa-solid ${className1}" style="--iconColor: ${color}"></i>
      <span>${message}</span>
    </div>
    <i class="fa-solid fa-xmark" id="crossIcon"></i>`

    document.getElementById('crossIcon').addEventListener('click', () => {
        removeToast();
        setTimeout(() => {
            window.location.href = './login.html';
        }, 500);
    })
}

function removeToast() {
    document.querySelector('.toastDiv').classList.add('hide');
}

