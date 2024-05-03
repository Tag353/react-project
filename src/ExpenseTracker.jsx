import React, { useState, useEffect } from 'react';

function ExpenseTracker() {
    const [tasks, setTasks] = useState([
        { name: "Eat Breakfast", transaction: 100 },
        { name: "Eat Lunch", transaction: -50 },
        { name: "Eat Dinner", transaction: -30 }
    ]);
    const [newTask, setNewTask] = useState("");
    const [transaction, setTransaction] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleTransactionInputChange(event) {
        setTransaction(event.target.value);
    }

    function addTransaction() {
        if (newTask.trim() !== "" && transaction.trim() !== "") {
            const newTransaction = parseInt(transaction);
            setTasks([...tasks, { name: newTask, transaction: newTransaction }]);
            setNewTask("");
            setTransaction("");
        }
    }

    function deleteTask(index) {
        const deletedTransaction = tasks[index].transaction;
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    useEffect(() => {
        const totalIncome = tasks.reduce((acc, task) => task.transaction > 0 ? acc + task.transaction : acc, 0);
        const totalExpense = tasks.reduce((acc, task) => task.transaction < 0 ? acc + task.transaction : acc, 0);
        setIncome(totalIncome);
        setExpense(totalExpense);
    }, [tasks]);

    function posneg(transaction) {
        return transaction > 0 ? "positive" : "negative";
    }

    return (
        <div className="expense-tracker">
            <h1>Expense Tracker</h1>
            <h2>Your Balance</h2>
            <div className="income-expense">
                <div className="income">
                    <h4>Income</h4>
                    <h4 style={{ color: "lime" }}>${income}</h4>
                </div>
                <div className="expense">
                    <h4>Expense</h4>
                    <h4 style={{ color: "red" }}>${expense}</h4>
                </div>
            </div>
            <h2>History</h2>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <div className={`colorbar-${posneg(task.transaction)}`}></div>
                        <span className="text">{task.name}</span>
                        <span className="text">{task.transaction > 0 ? `$${task.transaction}` : `-$${Math.abs(task.transaction)}`}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            X
                        </button>
                    </li>
                ))}
            </ol>
            <h2>Add new transaction</h2>
            <input
                type="text"
                placeholder="Enter a Transaction..."
                value={newTask}
                onChange={handleInputChange} />

            <input
                type="number"
                placeholder="Enter an amount..."
                value={transaction}
                onChange={handleTransactionInputChange} />

            <button
                className="add-button"
                onClick={addTransaction}>
                Add Transaction
            </button>
        </div>
    );
}

export default ExpenseTracker;