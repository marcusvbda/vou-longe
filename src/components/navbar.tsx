'use client';

import Link from 'next/link';
import AspectRatio from './aspectRatio';
import DropdownMenu from './DropdownMenu';
import { useContext, useMemo } from 'react';
import { GlobalContext } from '@/app/context/globalContext';

export default function Navbar() {
	const { session, processedYears, loadingYears } = useContext(GlobalContext);

	const firstName = useMemo(() => {
		const name = session?.Identificacao?.[0]?.Nome || 'Anónimo';
		return name.split(' ')[0];
	}, [session]);

	return (
		<div className="bg-white px-6 py-4 rounded-2xl shadow-md w-full md:w-8/12 flex flex-col md:flex-row items-center gap-4 border border-gray-100">
			<Link
				href="/"
				className="pb-6 cursor-pointer hover:opacity-70 transition duration-300"
			>
				<AspectRatio
					src="/assets/images/logo-gray.svg"
					alt="Logo"
					size={{ width: 212 }}
				/>
			</Link>
			<div className="ml-0 md:ml-auto flex items-center gap-4">
				{loadingYears ? (
					<div className="spinner size-10" />
				) : (
					<>
						{Object.keys(processedYears).map((key) => (
							<DropdownMenu key={key} title={key} items={processedYears[key]} />
						))}
						<div className="ml-auto flex gap-2 items-center cursor-pointer">
							<div className="h-12 w-12 bg-gray-400 rounded-full flex"></div>
							<div className="flex flex-col gap-0 text-neutral-700 text-sm">
								<div>
									Olá, <strong className="font-semibold">{firstName}!</strong>
								</div>
								<Link href="/auth/login">Sair da conta</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
