import React from 'react';
import Layout from './components/Layout/Layout';
import Summary from './components/Dashboard/Summary';
import TransactionList from './components/Transactions/TransactionList';
import MonthlyChart from './components/Charts/MonthlyChart';
import CategoryChart from './components/Charts/CategoryChart';
import { ThemeProvider } from './context/ThemeContext';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <Layout>
          <Summary />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <MonthlyChart />
            <CategoryChart />
          </div>
          <TransactionList />
        </Layout>
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App;