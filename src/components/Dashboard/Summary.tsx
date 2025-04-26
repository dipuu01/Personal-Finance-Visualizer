import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import { calculateTotal, formatCurrency } from '../../utils/helpers';

const Summary: React.FC = () => {
  const { transactions } = useTransactions();
  
  const totalIncome = calculateTotal(transactions, 'income');
  const totalExpenses = calculateTotal(transactions, 'expense');
  const balance = totalIncome - totalExpenses;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all duration-200 hover:shadow-md animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Income</p>
            <h3 className="text-2xl font-bold text-success-600 dark:text-success-400 mt-1">
              {formatCurrency(totalIncome)}
            </h3>
          </div>
          <div className="bg-success-100 dark:bg-success-900/30 p-3 rounded-full">
            <ArrowUpCircle className="h-6 w-6 text-success-600 dark:text-success-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all duration-200 hover:shadow-md animate-fade-in" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</p>
            <h3 className="text-2xl font-bold text-danger-600 dark:text-danger-400 mt-1">
              {formatCurrency(totalExpenses)}
            </h3>
          </div>
          <div className="bg-danger-100 dark:bg-danger-900/30 p-3 rounded-full">
            <ArrowDownCircle className="h-6 w-6 text-danger-600 dark:text-danger-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-all duration-200 hover:shadow-md animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Balance</p>
            <h3 className={`text-2xl font-bold mt-1 ${
              balance >= 0 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-danger-600 dark:text-danger-400'
            }`}>
              {formatCurrency(balance)}
            </h3>
          </div>
          <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
            <Wallet className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;