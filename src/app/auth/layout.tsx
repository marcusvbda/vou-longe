'use client';

import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

export default function AuthTemplate({ children }: any) {
	const { site } = useContext(ThemeContext);

	return (
		<div
			className="h-fill w-full items-center justify-center flex"
			style={{
				backgroundImage: `url(${site?.acf?.imagem_de_fundo_login || ''})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="w-full max-w-[556px] py-10 overflow-y-auto">
				{children}
			</div>
		</div>
	);
}
