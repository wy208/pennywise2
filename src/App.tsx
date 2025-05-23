/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return(
    <div>
      <h2>Add Expense</h2>
      <div>
          <p>Item: </p>
          <input type="text" />
          <p>Amount: </p>
          <input type="text" />
          <p>Date: </p>
          <input type="text" />
          <button>Add</button>
      </div>
      
    </div>
  );
}

export default App;*/

import "./App.css";
import { useState } from "react";
import { Expense } from "./types";
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import ExpensePage from "./expensepage";
import SummaryPage from "./summarypage";
import BudgetPage from "./budgetpage";

import logo from "./images/pennywise_logo.png"

function App() {
  //storing the list of all expenses added
  const [expenses, setExpenses] = useState<Expense[]>([]);

  //for budgeting
  const [budget, setBudget] = useState<number | null>(null);
  const [totalSpending, setTotalSpending] = useState(0); // You'll need to track this from expenses

  const handleBudgetChange = (newBudget: number) => {
    setBudget(newBudget);
  }

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
    setTotalSpending(prev => prev + Number(expense.amount));
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/summary">Summary</Link>
          </li>
          <li>
            <Link to="/budget">Budget and Challenges</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={
          <ExpensePage 
            expenses={expenses} 
            setExpenses={setExpenses}/>} />
        <Route path="/summary" element={
          <SummaryPage
            expenses={expenses} />} />
        <Route path="/budget" element={
          <BudgetPage 
            budget={budget} 
            onBudgetChange={handleBudgetChange}
            totalSpending={totalSpending}/> } />
      </Routes>     
    </Router>
  
  );
}
 
export default App;

