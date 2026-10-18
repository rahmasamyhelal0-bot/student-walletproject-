document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("tableContent");
    const clearBtn = document.getElementById("clearBtn");
    const searchInput = document.getElementById("searchInput");

    if (!tableBody) return;

    function loadTransactions(searchText = "") {
        let expenses = [];

        try {
            expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        } catch (error) {
            expenses = [];
        }

        const search = searchText.toLowerCase().trim();

        const filteredExpenses = expenses.filter(item =>
            (item.category || "").toLowerCase().includes(search) ||
            (item.description || "").toLowerCase().includes(search) ||
            (item.paymentMethod || "").toLowerCase().includes(search)
        );

        tableBody.innerHTML = "";

        if (filteredExpenses.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; padding:20px; color:#777;">
                        No transactions found.
                    </td>
                </tr>
            `;
            return;
        }

        filteredExpenses.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.date || "-"}</td>
                <td><span class="badge-cat">${item.category || "-"}</span></td>
                <td><span class="price-text">-${Number(item.amount) || 0} EGP</span></td>
                <td></td>
                <td>${item.paymentMethod || "-"}</td>
            `;

            row.children[3].textContent = item.description || "-";

            tableBody.appendChild(row);
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            loadTransactions(searchInput.value);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear all transactions?")) {
                localStorage.removeItem("expenses");
                loadTransactions(searchInput ? searchInput.value : "");
            }
        });
    }

    loadTransactions();
});