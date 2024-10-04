'use client';

import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

export default function AuthTemplate({ children }: any) {
	const { site } = useContext(ThemeContext);

	return (
		<div
			className="w-full h-full items-center justify-center flex"
			style={{
				backgroundImage: `url(${site?.acf?.login_background || ''})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="w-full max-w-[556px] p-6 mb-[400px] overflow-y-auto">
				{children}
			</div>
		</div>
	);
}
