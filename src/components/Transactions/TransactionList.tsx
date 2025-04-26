import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTransactions } from '../../context/TransactionContext';
import TransactionItem from './TransactionItem';
import Modal from '../UI/Modal';
import TransactionForm from './TransactionForm';
import { Transaction } from '../../types';

const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | undefined>(undefined);
  
  const handleAddTransaction = () => {
    setCurrentTransaction(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTransaction(undefined);
  };
  
  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Transaction History
        </h2>
        <button
          onClick={handleAddTransaction}
          className="flex items-center gap-1 px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <Plus className="h-4 w-4" />
          <span>Add Transaction</span>
        </button>
      </div>
      
      <div className="max-h-96 overflow-y-auto pr-1 space-y-3">
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map(transaction => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={handleEditTransaction}
              onDelete={deleteTransaction}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No transactions yet. Add your first transaction!</p>
          </div>
        )}
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={currentTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          transaction={currentTransaction}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default TransactionList;