'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext<any>({});

export const ThemeContextProvider = ({ children, site }: any): ReactNode => {
	const [screenFormat, setScreenFormat] = useState('desktop');

	useEffect(() => {
		const handleResize = () => {
			const size = window.innerWidth;
			if (size >= 1024) setScreenFormat('desktop');
			else if (size >= 800) setScreenFormat('tablet');
			else setScreenFormat('mobile');
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ThemeContext.Provider value={{ site, screenFormat }}>
			{children}
		</ThemeContext.Provider>
	);
};
