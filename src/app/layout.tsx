import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'sweetalert2/src/sweetalert2.scss';
import './globals.scss';
import { getSession, getSite } from '@/services/auth';
import { GlobalContextProvider } from './context/globalContext';
import { ThemeContextProvider } from './context/themeContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Vou + Longe',
};

export default async function RootLayout({ children }: any) {
	const [session, site] = await Promise.all([getSession(), getSite()]);
	return (
		<html lang="pt-BR" className="h-fill">
			<body suppressHydrationWarning className={inter.className}>
				<ThemeContextProvider site={site}>
					<GlobalContextProvider session={session}>
						{children}
					</GlobalContextProvider>
				</ThemeContextProvider>
			</body>
		</html>
	);
}
