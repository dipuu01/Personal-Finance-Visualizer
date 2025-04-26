import { format, parseISO } from 'date-fns';
import { Transaction, MonthlyData } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMM dd, yyyy');
};

export const groupTransactionsByMonth = (transactions: Transaction[]): MonthlyData[] => {
  const monthlyData: Record<string, MonthlyData> = {};

  transactions.forEach(transaction => {
    const month = format(parseISO(transaction.date), 'MMM yyyy');
    
    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }
    
    if (transaction.type === 'income') {
      monthlyData[month].income += transaction.amount;
    } else {
      monthlyData[month].expense += transaction.amount;
    }
  });

  return Object.values(monthlyData).sort((a, b) => {
    const dateA = new Date(a.month);
    const dateB = new Date(b.month);
    return dateA.getTime() - dateB.getTime();
  });
};

export const calculateTotal = (transactions: Transaction[], type: 'income' | 'expense'): number => {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};