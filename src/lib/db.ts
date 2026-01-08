// IndexedDB wrapper for Bankak operations
const DB_NAME = 'bankak_db';
const DB_VERSION = 1;
const STORE_NAME = 'transactions';

export interface Transaction {
  id?: number;
  operationNumber: string;
  amount: number;
  date: string;
  time: string;
  timestamp: number;
}

let dbInstance: IDBDatabase | null = null;

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        store.createIndex('operationNumber', 'operationNumber', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('date', 'date', { unique: false });
      }
    };
  });
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(transaction);
    
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getTransactionsByDateRange = async (
  startDate: Date,
  endDate: Date
): Promise<Transaction[]> => {
  const allTransactions = await getAllTransactions();
  const start = startDate.getTime();
  const end = endDate.getTime();
  
  return allTransactions.filter(
    tx => tx.timestamp >= start && tx.timestamp <= end
  );
};

export const getDailyTransactions = async (date?: Date): Promise<Transaction[]> => {
  const targetDate = date || new Date();
  const start = new Date(targetDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(targetDate);
  end.setHours(23, 59, 59, 999);
  
  return getTransactionsByDateRange(start, end);
};

export const getWeeklyTransactions = async (date?: Date): Promise<Transaction[]> => {
  const targetDate = date || new Date();
  const dayOfWeek = targetDate.getDay();
  
  const start = new Date(targetDate);
  start.setDate(start.getDate() - dayOfWeek);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return getTransactionsByDateRange(start, end);
};

export const getMonthlyTransactions = async (date?: Date): Promise<Transaction[]> => {
  const targetDate = date || new Date();
  
  const start = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  
  return getTransactionsByDateRange(start, end);
};

export const deleteTransaction = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const clearAllTransactions = async (): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();
    
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
