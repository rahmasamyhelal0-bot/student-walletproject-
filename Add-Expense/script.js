const date = document.getElementById("date");
const expenseForm = document.querySelector(".expense-form");
const successMessage = document.getElementById("successMessage");

const amount = document.getElementById("amount");
const category = document.getElementById("category");
const paymentMethod = document.getElementById("paymentMethod");

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    document.getElementById("amountError").style.display = "none";
    document.getElementById("categoryError").style.display = "none";
    document.getElementById("dateError").style.display = "none";

    let hasError = false;

    if (amount.value === "" || Number(amount.value) <= 0) {
        document.getElementById("amountError").textContent =
            "Please enter a valid amount.";
        document.getElementById("amountError").style.display = "block";
        hasError = true;
    }

    if (category.value === "") {
        document.getElementById("categoryError").textContent =
            "Please select a category.";
        document.getElementById("categoryError").style.display = "block";
        hasError = true;
    }

    if (date.value === "") {
        document.getElementById("dateError").textContent =
            "Please select a date.";
        document.getElementById("dateError").style.display = "block";
        hasError = true;
    } else {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const todayString = `${year}-${month}-${day}`;

        if (date.value > todayString) {
            document.getElementById("dateError").textContent =
                "Date cannot be in the future.";
            document.getElementById("dateError").style.display = "block";
            hasError = true;
        }
    }

    if (hasError) {
        return;
    }
    let totalBalance = Number(localStorage.getItem("totalBalance"));

    if (localStorage.getItem("totalBalance") === null) {
        totalBalance = 3000;
    }
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Calculate total expenses
    const totalExpenses = expenses.reduce(function(total, expense) {
        return total + Number(expense.amount);
    }, 0);

    const remainingBalance = totalBalance - totalExpenses;
    const newExpenseAmount = Number(amount.value);

    if (newExpenseAmount > remainingBalance) {
        alert(
            "⚠️ Budget Warning!\n\n" +
            "Your remaining balance is " + remainingBalance + " EGP.\n" +
            "Your new expense is " + newExpenseAmount + " EGP.\n\n" +
            "Please enter a smaller amount to stay within your budget."
        );

        return;
    }

    const description = document.getElementById("description").value;

    const expense = {
        amount: newExpenseAmount,
        category: category.value,
        date: date.value,
        description: description,
        paymentMethod: paymentMethod.value
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));
    successMessage.classList.add("show");

    expenseForm.reset();

    setTimeout(function() {
        successMessage.classList.remove("show");
        window.location.href =
            "../transactions-floder/transactions.html";
    }, 2000);
});