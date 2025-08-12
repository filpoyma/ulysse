import { useMemo } from 'react';

const useSortList = (lists: any, sortField: string, sortOrder: string, currentManager: string) => {
  return useMemo(() => {
    const arr = [...lists];
    arr.sort((a, b) => {
      const aIsCurrentManager = a.manager === currentManager;
      const bIsCurrentManager = b.manager === currentManager;

      // Текущий менеджер всегда вверху
      if (aIsCurrentManager && !bIsCurrentManager)
        return sortField === 'manager' ? (sortOrder === 'asc' ? -1 : 1) : -1;
      if (!aIsCurrentManager && bIsCurrentManager)
        return sortField === 'manager' ? (sortOrder === 'asc' ? 1 : -1) : 1;

      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [lists, sortField, sortOrder]);
};

export default useSortList;
