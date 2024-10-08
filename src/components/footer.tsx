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
			<div className="w-100 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-20 py-4 md:py-10 gap-2">
				<div className="flex flex-col gap-2 md:max-w-[320px] w-full text-center md:text-left items-center md:items-start">
					<img src={footerLogo} className="max-w-[151px]" />
					<small className="text-black/30">
						<p className="text-wrap">{address}</p>
					</small>
				</div>
				<div className="py-4 flex flex-col gap-2 w-full text-center md:text-left">
					<h4 className="md:mb-2 md:text-xl text-primary font-semibold">
						SOBRE NÓS
					</h4>
					{links.map((link: any, index: any) => (
						<a
							key={index}
							href={link?.[1] || '#'}
							target="_blank"
							className="cursor-pointer hover:opacity-70 transition duration-300 text-sm md:text-sm"
						>
							{link[0]}
						</a>
					))}
				</div>
				<div className="flex flex-row gap-4 items-center w-full md:max-w-[350px]">
					<Link
						href={linkQuero?.[1] || '#'}
						target="_blank"
						className="cursor-pointer bg-primary text-white px-6 py-4 rounded-xl md:text-lg w-full flex justify-center items-center text-sm"
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
