'use client';

import { ThemeContext } from '@/app/context/themeContext';
import Link from 'next/link';
import { useContext, useMemo } from 'react';

export default function Footer() {
	const { site } = useContext(ThemeContext);
	const footerLogo = useMemo(() => site?.acf?.logo_footer || '', []);
	const address = useMemo(() => site?.acf?.endereco_footer || '', []);

	const linkQuero = useMemo(() => {
		const link = site?.acf?.botao_tambem_quero_footer || '';
		return link.split('|');
	}, []);

	const links = useMemo(() => {
		const content = site?.acf?.links_sobre_footer || '';
		return content.split('\r\n').map((item: any) => item.split('|'));
	}, []);

	return (
		<footer className="w-full bg-g flex flex-col gap-4 border-t border-gray-200">
			<div className="w-100 flex flex-col md:flex-row items-center justify-center md:justify-between px-10 md:px-20 py-10 gap-2">
				<div className="flex flex-col gap-2 max-w-[320px]">
					<img src={footerLogo} className="max-w-[151px]" />
					<small className="text-black/30">
						<p className="text-wrap">{address}</p>
					</small>
				</div>
				<div className="py-4 flex flex-col gap-2">
					<h4 className="mb-2 text-xl text-primary font-semibold">SOBRE NÓS</h4>
					{links.map((link: any, index: any) => (
						<a
							key={index}
							href={link?.[1] || '#'}
							target="_blank"
							className="cursor-pointer hover:opacity-70 transition duration-300"
						>
							{link[0]}
						</a>
					))}
				</div>
				<div className="flex flex-row gap-4 items-center">
					<Link
						href={linkQuero?.[1] || '#'}
						target="_blank"
						className="cursor-pointer bg-primary text-white px-6 py-4 rounded-lg text-lg"
					>
						{linkQuero[0]}
					</Link>
				</div>
			</div>
			<div className="bg-gray-100">
				<div className="text-primary-700 text-center text-xs py-2 px-4 w-full">
					{site?.acf?.copyright_disclaimer_footer}
				</div>
			</div>
		</footer>
	);
}
