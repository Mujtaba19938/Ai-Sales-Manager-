import { createContext, useContext, useState } from 'react';
import { getDefaultDateRange } from '../utils/formatters';

const DateRangeContext = createContext();

export function DateRangeProvider({ children }) {
  const [dateRange, setDateRange] = useState(getDefaultDateRange);

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export const useDateRange = () => useContext(DateRangeContext);
