let data = [];
function dataManagement() {
  let item = document.getElementById("item").value;
  let expense = Number(document.getElementById("expense").value);
  let sell = Number(document.getElementById("sell").value);
  let profit;
  let loss;

  let remaingAmount = -(expense - sell);

  if (remaingAmount > 0) {
    profit = `Rs ${remaingAmount}`;
    profit.className = "profit";
    loss = "No Loss";
  } else {
    loss = `Rs ${-remaingAmount}`;
    loss.className = "loss";
    profit = "No Profit";
  }
  let dataObj = {
    productName: item,
    expense: expense,
    sell: sell,
    profit: profit,
    loss: loss,
  };
  data.push(dataObj);
  printTable();
}

function printTable() {
  let rows = "";
  for (let i = 0; i < data.length; i++) {
    rows += `
        <tr>
            <td class="number">${i + 1}</td>
            <td>${data[i].productName}</td>
            <td>Rs ${data[i].expense}</td>
            <td>Rs ${data[i].sell}</td>
            <td class="profit">${data[i].profit}</td>
            <td class="loss">${data[i].loss}</td>
            <td><button onClick="deleterow(${i})">Delete</button></td>
        </tr>`;
  }
  document.getElementById("tbody").innerHTML = rows;
}

function deleterow(index) {
  data.splice(index, 1);
  printTable();
}
