import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Edit, Trash2 } from 'lucide-react';
import { Transaction } from '../../types';
import { formatCurrency, formatDate } from '../../utils/helpers';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const { id, amount, date, description, type } = transaction;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-3 border-l-4 animate-slide-up transition-all duration-200 hover:shadow-md hover:translate-x-1 hover:border-l-6 group flex justify-between items-center gap-4 border-l-4 dark:border-l-4
      ${type === 'income' 
        ? 'border-l-success-500 dark:border-l-success-600' 
        : 'border-l-danger-500 dark:border-l-danger-600'}"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full 
          ${type === 'income' 
            ? 'bg-success-100 dark:bg-success-900/30' 
            : 'bg-danger-100 dark:bg-danger-900/30'}`}
        >
          {type === 'income' ? (
            <ArrowUpCircle className="h-5 w-5 text-success-600 dark:text-success-400" />
          ) : (
            <ArrowDownCircle className="h-5 w-5 text-danger-600 dark:text-danger-400" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            {description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(date)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`font-semibold ${
          type === 'income' 
            ? 'text-success-600 dark:text-success-400' 
            : 'text-danger-600 dark:text-danger-400'
        }`}>
          {type === 'income' ? '+' : '-'} {formatCurrency(amount)}
        </span>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(transaction)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Edit transaction"
          >
            <Edit className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Delete transaction"
          >
            <Trash2 className="h-4 w-4 text-danger-500 dark:text-danger-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;