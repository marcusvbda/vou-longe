'use client';

import { ThemeContext } from '@/app/context/themeContext';
import { useContext } from 'react';

export default function AuthTemplate({ children }: any) {
	const { site } = useContext(ThemeContext);

	return (
		<div
			className="w-full items-center justify-center flex"
			style={{
				backgroundImage: `url(${site?.acf?.login_background || ''})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				height: '100vh',
			}}
		>
			<div className="w-full max-w-[556px] p-3 md:p-6 overflow-y-auto self-start">
				{children}
			</div>
		</div>
	);
}
