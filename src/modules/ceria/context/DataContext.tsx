import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { loadAndProcessData } from '../services/mockData';
import { AppData } from '../types';

interface DataContextType {
    appData: AppData | null;
    isLoading: boolean;
    error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appData, setAppData] = useState<AppData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await loadAndProcessData();
                setAppData(data);
            } catch (err) {
                console.error("Failed to load application data:", err);
                setError("Gagal memuat data aplikasi. Periksa koneksi internet Anda dan coba muat ulang halaman.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ appData, isLoading, error }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
