import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'sweetalert2/src/sweetalert2.scss';
import './globals.scss';
import { getSession } from '@/services/auth';
import { GlobalContextProvider } from './context/globalContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Vou + Longe',
};

export default async function RootLayout({ children }: any) {
	const session = await getSession();

	return (
		<html lang="pt-BR" className="h-fill">
			<body suppressHydrationWarning className={inter.className}>
				<GlobalContextProvider serverSession={session}>
					{children}
				</GlobalContextProvider>
			</body>
		</html>
	);
}
