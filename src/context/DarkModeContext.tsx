'use client';

import { createContext, useContext, useState } from 'react';

type Props = {
    children: React.ReactNode;
};

const DarkModeContext = createContext({ darkMode: false, toggleDarkMode: () => { } });


export default function DarkModeContextProvider({ children }: Props) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(prev => !prev)

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider >
    )
}

export function useDarkmodeContext() {
    return useContext(DarkModeContext);
}