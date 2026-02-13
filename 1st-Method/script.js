function calculate() {

    let item = document.getElementById("itemName").value;
    let expense = Number(document.getElementById("expense").value);
    let sale = Number(document.getElementById("sale").value);
    let result = document.getElementById("result");

    let amount = sale - expense;

    if (amount > 0) {
        result.innerHTML = item + " resulted in a profit of Rs " + amount;
        result.className = "profit";
    } 
    else if (amount < 0) {
        result.innerHTML = item + " resulted in a loss of Rs " + Math.abs(amount);
        result.className = "loss";
    } 
    else {
        result.innerHTML = "No Profit No Loss";
        result.className = "";
    }
}
