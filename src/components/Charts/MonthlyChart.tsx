import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTransactions } from '../../context/TransactionContext';
import { groupTransactionsByMonth } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded shadow-md">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`tooltip-${index}`}
            className={`text-sm ${
              entry.name === 'Income' 
                ? 'text-success-600 dark:text-success-400' 
                : 'text-danger-600 dark:text-danger-400'
            }`}
          >
            {`${entry.name}: $${entry.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const MonthlyChart: React.FC = () => {
  const { transactions } = useTransactions();
  const { theme } = useTheme();
  
  const monthlyData = useMemo(() => 
    groupTransactionsByMonth(transactions),
    [transactions]
  );
  
  if (monthlyData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center animate-fade-in">
        <p className="text-gray-500 dark:text-gray-400">
          No transaction data available. Add some transactions to see your monthly chart.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Overview
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="month" 
              tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} 
            />
            <YAxis 
              tick={{ fill: theme === 'dark' ? '#9CA3AF' : '#4B5563' }} 
              tickFormatter={(value) => `$${value}`} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="income" 
              name="Income" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="expense" 
              name="Expenses" 
              fill="#EF4444" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;