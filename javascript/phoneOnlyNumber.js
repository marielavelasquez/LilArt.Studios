document.addEventListener("DOMContentLoaded", function () {
    
    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
    });
});