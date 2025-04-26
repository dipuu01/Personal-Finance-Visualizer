# Personal Finance Visualizer

A modern, responsive web application for tracking personal finances with beautiful visualizations and intuitive transaction management.

 ## [Live Project](https://personalfinancevisual.netlify.app/)
![Personal Finance Visualizer](https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)


## Features
### Transaction Management
- Add, edit, and delete financial transactions
- Categorize transactions with predefined categories
- Track both income and expenses
- Detailed transaction history with search and filtering

### Visual Analytics
- Monthly overview with income vs expenses bar chart
- Category-wise expense breakdown pie chart
- Real-time summary cards showing financial status

### User Experience
- Beautiful, responsive design that works on all devices
- Dark/light theme support
- Smooth animations and transitions
- Form validation and error handling
- Intuitive and user-friendly interface

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Charts**: Recharts for beautiful data visualization
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting
- **Build Tool**: Vite for fast development and optimized builds

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/         # React components
│   ├── Charts/        # Visualization components
│   ├── Dashboard/     # Dashboard components
│   ├── Layout/        # Layout components
│   ├── Transactions/  # Transaction management
│   └── UI/            # Reusable UI components
├── context/           # React context providers
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
└── main.tsx          # Application entry point
```

## Features in Detail

### Transaction Management
- Add transactions with amount, date, description, and category
- Edit existing transactions
- Delete transactions with confirmation
- Categorize transactions for better organization
- View transaction history with sorting and filtering

### Financial Dashboard
- Total income and expenses overview
- Current balance calculation
- Monthly spending trends
- Category-wise expense breakdown
- Recent transaction list

### Data Visualization
- Interactive bar chart showing monthly income vs expenses
- Dynamic pie chart for expense categories
- Responsive charts that adapt to screen size
- Hover tooltips with detailed information

### Theme Support
- Light and dark mode support
- System theme detection
- Persistent theme preference
- Smooth theme transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Recharts](https://recharts.org/) for the amazing charting library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [date-fns](https://date-fns.org/) for date manipulation
