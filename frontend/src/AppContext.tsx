import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ContentFile } from './shared/types';

interface AppContextInt {
    programs: ContentFile[];
    setPrograms: React.Dispatch<React.SetStateAction<ContentFile[]>>;
}

const AppContext = createContext<AppContextInt | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [programs, setPrograms] = useState<ContentFile[]>([]);

    return (
        <AppContext.Provider value={{ programs, setPrograms }}>
            {children}
        </AppContext.Provider>
    );
}

export function usePrograms() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('usePrograms must be used within a AppProvider');
    }
    return context;
}