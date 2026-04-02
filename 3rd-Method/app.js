let listArr = JSON.parse(localStorage.getItem("myTransactions")) || [];
let totalexpense = Number(localStorage.getItem("totalExpense")) || 0;
let totalincome = Number(localStorage.getItem("totalIncome")) || 0;
let totalprofit = Number(localStorage.getItem("totalProfit")) || 0;

// Pehli baar screen load hone par data dikhana
printData();

function getData(type) {
  let detail = document.getElementById("itemName").value;
  let amount = Number(document.getElementById("amount").value);

  if (!detail || amount <= 0) {
    alert("Please enter valid details");
    return;
  }

  let dataObj = {
    detail: detail,
    amount: amount,
    type: type,
    id: Date.now(), // Har item ko ek unique ID dena delete karne ke liye
  };

  if (type === "buy") {
    totalexpense += amount;
  } else {
    totalincome += amount;
  }

  totalprofit = totalincome - totalexpense;
  listArr.push(dataObj);

  saveAndRefresh();

  // Inputs saaf karna
  document.getElementById("itemName").value = "";
  document.getElementById("amount").value = "";
}

// Item delete karne ka function
function deleteItem(id) {
  // Pehle wo item dhoondna jise delete karna hai taake calculation sahi ho
  let itemIndex = listArr.findIndex((item) => item.id === id);
  let item = listArr[itemIndex];

  if (item.type === "buy") {
    totalexpense -= item.amount;
  } else {
    totalincome -= item.amount;
  }

  totalprofit = totalincome - totalexpense;

  // Array se nikalna
  listArr.splice(itemIndex, 1);

  saveAndRefresh();
}

// Local Storage save karna aur Screen update karna
function saveAndRefresh() {
  localStorage.setItem("myTransactions", JSON.stringify(listArr));
  localStorage.setItem("totalExpense", totalexpense);
  localStorage.setItem("totalIncome", totalincome);
  localStorage.setItem("totalProfit", totalprofit);
  printData();
}

function printData() {
  document.getElementById("expense").innerHTML = totalexpense;
  document.getElementById("income").innerHTML = totalincome;
  document.getElementById("profit").innerHTML = totalprofit;

  let result = "";
  listArr.forEach((item) => {
    let color = item.type === "buy" ? "red" : "green";

    result += `
                <div class="history-item" style="color: ${color};">
                    <span>${item.detail}</span>
                    <span>
                        ${item.amount} Rs 
                        <i class="fa-solid fa-trash-can delete-btn" onclick="deleteItem(${item.id})"></i>
                    </span>
                </div>`;
  });
  document.getElementById("result").innerHTML = result;
}
