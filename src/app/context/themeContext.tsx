'use client';

import { ReactNode, createContext } from 'react';

export const ThemeContext = createContext<any>({});

export const ThemeContextProvider = ({ children, site }: any): ReactNode => {
	return (
		<ThemeContext.Provider value={{ site }}>{children}</ThemeContext.Provider>
	);
};
