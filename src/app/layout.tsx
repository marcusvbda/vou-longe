import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.scss';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Vou + Longe',
};

export default function RootLayout({ children }: any) {
	return (
		<html lang="pt-BR">
			<body suppressHydrationWarning className={inter.className}>
				{children}
			</body>
		</html>
	);
}
