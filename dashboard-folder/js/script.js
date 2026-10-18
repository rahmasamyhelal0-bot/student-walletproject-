document.addEventListener("DOMContentLoaded", function () {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let totalBalance = Number(localStorage.getItem("totalBalance"));
    if (!localStorage.getItem("totalBalance")) {
        totalBalance = 3000;
    }

    const totalExpenses = expenses.reduce(function (total, expense) {
        return total + Number(expense.amount);
    }, 0);

    function updateDashboard() {
        document.getElementById("total-balance").textContent =
            totalBalance + " EGP";

        document.getElementById("total-expenses").textContent =
            totalExpenses + " EGP";

        document.getElementById("remaining-balance").textContent =
            (totalBalance - totalExpenses) + " EGP";

        const categories = [
            ["food", "food-expenses"],
            ["transportation", "transportation-expenses"],
            ["education", "education-expenses"],
            ["shopping", "shopping-expenses"]
        ];

        categories.forEach(function (item) {
            const sum = expenses
                .filter(expense =>
                    expense.category.toLowerCase() === item[0]
                )
                .reduce((total, expense) =>
                    total + Number(expense.amount), 0
                );

            document.getElementById(item[1]).textContent = sum + " EGP";
        });
    }

    document.getElementById("total-balance").addEventListener("click", function () {
        const answer = prompt("Enter your total budget in EGP:", totalBalance);

        if (answer === null || answer.trim() === "") return;

        const newBalance = Number(answer);

        if (!Number.isFinite(newBalance) || newBalance < 0) {
            alert("Please enter a valid budget.");
            return;
        }

        totalBalance = newBalance;
        localStorage.setItem("totalBalance", totalBalance);
        updateDashboard();
    });

    updateDashboard();
});