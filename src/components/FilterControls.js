// src/components/FilterControls.js
import React from 'react';
import './FilterControls.css'; // We'll create this file

const FilterControls = ({ onFilterChange }) => {
  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="type-filter">Filter by Type:</label>
        <select
          id="type-filter"
          onChange={(e) => onFilterChange({ type: e.target.value })}
        >
          <option value="all">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          onChange={(e) => onFilterChange({ category: e.target.value })}
        >
          <option value="all">All</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;