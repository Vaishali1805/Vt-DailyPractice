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

function createToast(message, className1, color) {
    document.querySelector('.myToast').innerHTML =
        `<div class="toastDiv" style="--barColor: ${color}">
      <i class="fa-solid ${className1}" style="--iconColor: ${color}"></i>
      <span>${message}</span>
    </div>
    <i class="fa-solid fa-xmark" id="crossIcon"></i>`

    document.getElementById('crossIcon').addEventListener('click', () => {
        removeToast();
    })
}

function removeToast() {
    const toast = document.querySelector('.myToast');
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => {
        toast.classList.remove('hide');
        toast.innerHTML = '';
    });
}

function showHide_Password(event) {
    const inputId = event.target.dataset.input;
    const input = document.getElementById(inputId);
    const isVisible = input.type === 'text';

    input.type = isVisible ? 'password' : 'text';
    event.target.src = isVisible ? '../assets/icons/eyeHide.svg' : '../assets/icons/eyeShow.svg';
}

async function fetchReq(url, reqMethod, formData = null) {
    try {
        const options = {
            method: reqMethod,
            headers: {
                "Content-Type": "application/json",
            },
        };
        // Only add body if method is not GET
        if (reqMethod.toUpperCase() !== "GET" && formData) {
            options.body = formData;
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        return data;
        // if (data.success) {
        //     if (reqMethod.toUpperCase() !== "GET")
        //         return true;
        //     else
        //         return data;
        // }
    } catch (error) {
        console.log("Error: ", error);
    }
}