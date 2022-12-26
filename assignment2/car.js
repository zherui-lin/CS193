function calculateTotal() {
    var res = 0;
    var form = document.getElementById("price-form");
    res += parseInt(form.configuration.value);
    res += parseInt(form.combo.value);
    for (let checkbox of form.getElementsByTagName("input")) {
        if (checkbox.type === "checkbox" && checkbox.checked) {
            res += parseInt(checkbox.value);
        }
    }
    // optinal parameters should be wrapped in a single object as parameter
    form.result.value = "$" + res.toLocaleString(undefined, {minimumFractionDigits: 2});
}

function changeColor() {
    document.getElementById("car-picture").src = document.getElementById("color").value + ".jpg";
}

document.getElementById("calculate").addEventListener("click", calculateTotal);
document.getElementById("color").addEventListener("change", changeColor);
