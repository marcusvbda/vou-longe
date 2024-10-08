'use client';

import { useContext } from 'react';
import DefaultNavbar from './DefaultNavbar';
import { ThemeContext } from '@/app/context/themeContext';
import Link from 'next/link';

const Content = () => {
	return (
		<>
			<div className="flex flex-row gap-10 mx-auto">
				<Link
					href="/"
					className="flex gap-1 items-center text-primary font-semibold cursor-pointer text-sm"
				>
					Início
				</Link>
				<Link
					href="/sobre-nos"
					className="flex gap-1 items-center text-primary font-semibold cursor-pointer text-sm"
				>
					Sobre Nós
				</Link>
			</div>
		</>
	);
};

export default function PublicNavbar() {
	const { site, screenFormat } = useContext(ThemeContext);

	return (
		<DefaultNavbar
			homeLink="/"
			site={site}
			screenFormat={screenFormat}
			append={
				<div className="flex md:hidden">
					<Content />
				</div>
			}
		>
			<div className="flex items-center w-full">
				<div className="hidden md:flex items-end md:items-center gap-4 flex-1 justify-between flex-col md:flex-row">
					<Content />
				</div>
				<div className="ml-auto">
					<Link
						href="/portal/auth/login"
						target="_blank"
						className="cursor-pointer bg-primary text-white py-2 px-3 md:px-6 md:py-3 rounded-xl w-full flex justify-center items-center text-xs md:text-sm"
					>
						Entrar
					</Link>
				</div>
			</div>
		</DefaultNavbar>
	);
}
