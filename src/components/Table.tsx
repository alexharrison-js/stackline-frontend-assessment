import React, { useState } from 'react';

interface SalesData {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

interface TableProps {
  salesData: SalesData[];
}

const Table: React.FC<TableProps> = ({ salesData }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SalesData;
    direction: 'ascending' | 'descending';
  }>({
    key: 'weekEnding',
    direction: 'ascending',
  });

  const requestSort = (key: keyof SalesData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const sortedData = [...salesData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => requestSort('weekEnding')}>
            Week Ending
            {sortConfig.key === 'weekEnding' && (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => requestSort('retailSales')}>
            Retail Sales
            {sortConfig.key === 'retailSales' && (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => requestSort('wholesaleSales')}>
            Wholesale Sales
            {sortConfig.key === 'wholesaleSales' && (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => requestSort('unitsSold')}>
            Units Sold
            {sortConfig.key === 'unitsSold' && (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
          </th>
          <th onClick={() => requestSort('retailerMargin')}>
            Retailer Margin
            {sortConfig.key === 'retailerMargin' && (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.weekEnding}>
            <td>{item.weekEnding}</td>
            <td>{formatCurrency(item.retailSales)}</td>
            <td>{formatCurrency(item.wholesaleSales)}</td>
            <td>{item.unitsSold}</td>
            <td>{formatCurrency(item.retailerMargin)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
