import React, { useState } from 'react';
import { useTransactions } from '../../context/TransactionContext';
import { Transaction, TransactionCategory } from '../../types';

interface TransactionFormProps {
  transaction?: Transaction;
  onClose: () => void;
}

interface FormErrors {
  amount?: string;
  date?: string;
  description?: string;
  category?: string;
}

const CATEGORIES: { value: TransactionCategory; label: string }[] = [
  { value: 'housing', label: 'Housing' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'education', label: 'Education' },
  { value: 'savings', label: 'Savings' },
  { value: 'other', label: 'Other' }
];

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  transaction, 
  onClose 
}) => {
  const isEdit = !!transaction;
  const { addTransaction, updateTransaction } = useTransactions();
  
  const [formData, setFormData] = useState({
    amount: transaction?.amount.toString() || '',
    date: transaction?.date || new Date().toISOString().split('T')[0],
    description: transaction?.description || '',
    type: transaction?.type || 'expense',
    category: transaction?.category || 'other'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const transactionData = {
      amount: parseFloat(formData.amount),
      date: formData.date,
      description: formData.description,
      type: formData.type as 'income' | 'expense',
      category: formData.category as TransactionCategory
    };
    
    if (isEdit && transaction) {
      updateTransaction(transaction.id, transactionData);
    } else {
      addTransaction(transactionData);
    }
    
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      
      {formData.type === 'expense' && (
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.category 
                ? 'border-danger-300 focus:ring-danger-500 dark:border-danger-700 dark:focus:ring-danger-400' 
                : 'border-gray-300 focus:ring-primary-500 dark:border-gray-700 dark:focus:ring-primary-400'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          >
            {CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.category}</p>
          )}
        </div>
      )}
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Amount
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
            $
          </span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`w-full pl-7 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.amount 
                ? 'border-danger-300 focus:ring-danger-500 dark:border-danger-700 dark:focus:ring-danger-400' 
                : 'border-gray-300 focus:ring-primary-500 dark:border-gray-700 dark:focus:ring-primary-400'
            } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.amount}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.date 
              ? 'border-danger-300 focus:ring-danger-500 dark:border-danger-700 dark:focus:ring-danger-400' 
              : 'border-gray-300 focus:ring-primary-500 dark:border-gray-700 dark:focus:ring-primary-400'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.date}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="What was this transaction for?"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.description 
              ? 'border-danger-300 focus:ring-danger-500 dark:border-danger-700 dark:focus:ring-danger-400' 
              : 'border-gray-300 focus:ring-primary-500 dark:border-gray-700 dark:focus:ring-primary-400'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{errors.description}</p>
        )}
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
        >
          {isEdit ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;