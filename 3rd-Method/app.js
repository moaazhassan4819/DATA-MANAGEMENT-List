        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        function updateUI() {
            const historyList = document.getElementById('history-list');
            const totalExpEl = document.getElementById('total-expense');
            const totalIncEl = document.getElementById('total-income');
            const totalPrfEl = document.getElementById('total-profit');

            historyList.innerHTML = '';
            let totalExpense = 0;
            let totalIncome = 0;

            transactions.forEach((t, index) => {
                const div = document.createElement('div');
                div.className = `history-item ${t.type === 'buy' ? 'item-red' : 'item-green'}`;
                div.innerHTML = `<span>${t.details}</span> <span>${t.amount}</span>`;
                historyList.prepend(div); // Newest on top

                if(t.type === 'buy') totalExpense += t.amount;
                else totalIncome += t.amount;
            });

            totalExpEl.innerText = totalExpense;
            totalIncEl.innerText = totalIncome;
            totalPrfEl.innerText = totalIncome - totalExpense;

            localStorage.setItem('transactions', JSON.stringify(transactions));
        }

        function addTransaction(type) {
            const details = document.getElementById('details').value;
            const amount = parseFloat(document.getElementById('amount').value);

            if (details === '' || isNaN(amount)) {
                alert("Please enter valid details and amount");
                return;
            }

            const newTransaction = {
                details: details,
                amount: amount,
                type: type
            };

            transactions.push(newTransaction);
            document.getElementById('details').value = '';
            document.getElementById('amount').value = '';
            
            updateUI();
        }

        // Initial Load
        updateUI();