
/**
 * It shows a toast message with the given message and type.
 * @param message - The message to be displayed
 * @param [type=success] - success or error
 */
export function showMessage(message, type = "success") {
    // toastify
    Toastify({
        text: message,
        duration: 3000,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type === "success" ? "green" : "red",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}
