import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTransactions } from '../../context/TransactionContext';
import { CategoryData, TransactionCategory } from '../../types';

const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  housing: '#4C51BF',
  transportation: '#38B2AC',
  food: '#ED8936',
  utilities: '#667EEA',
  healthcare: '#F56565',
  entertainment: '#9F7AEA',
  shopping: '#ED64A6',
  education: '#48BB78',
  savings: '#4299E1',
  other: '#A0AEC0'
};

const CATEGORY_LABELS: Record<TransactionCategory, string> = {
  housing: 'Housing',
  transportation: 'Transportation',
  food: 'Food & Dining',
  utilities: 'Utilities',
  healthcare: 'Healthcare',
  entertainment: 'Entertainment',
  shopping: 'Shopping',
  education: 'Education',
  savings: 'Savings',
  other: 'Other'
};

const CategoryChart: React.FC = () => {
  const { transactions } = useTransactions();
  
  const categoryData = useMemo(() => {
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const { category, amount } = transaction;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(expensesByCategory)
      .map(([category, value]) => ({
        name: CATEGORY_LABELS[category as TransactionCategory],
        value,
        color: CATEGORY_COLORS[category as TransactionCategory]
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (categoryData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No expense data available to show category breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Expenses by Category
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={({ name, percent }) => 
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => 
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(value)
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;