'use client';

import Link from 'next/link';
import AspectRatio from './aspectRatio';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '@/app/context/globalContext';
import { ThemeContext } from '@/app/context/themeContext';
import { getPosts } from '@/services/wordpress';
import DropdownMenu from './DropdownMenu';

export default function Navbar() {
	const { site } = useContext(ThemeContext);
	const { perfil, session, anoDoAluno } = useContext(GlobalContext);
	const [loadingMenu, setLoadingMenu] = useState(true);
	const [menus, setMenus] = useState<any>([]);

	useEffect(() => {
		const getMenus = async () => {
			setLoadingMenu(true);
			const typeMenus: any = await getPosts('menu');
			const filtered = (typeMenus?.items || [])
				.filter((x: any) => {
					if (['gestor', 'professor'].includes(perfil)) {
						return x?.acf?.perfil === perfil;
					}
					if (perfil === 'aluno') {
						return (
							x?.acf?.perfil === perfil &&
							(x?.acf?.anos || '')
								.split(',')
								.map(parseInt)
								.includes(parseInt(anoDoAluno))
						);
					}
					return true;
				})
				.map((x: any) => {
					return {
						items: (x?.acf?.itens || '')
							.split('\r\n')
							.map((item: any) => item.split('|')),
						title: x?.acf?.titulo || '',
						tipo: x?.acf?.tipo || '',
						url: x?.acf?.url || '',
					};
				});
			setMenus(filtered);
			setLoadingMenu(false);
		};
		getMenus();
	}, []);

	const firstName = useMemo(() => {
		const name = session?.Identificacao?.[0]?.Nome || 'Anónimo';
		return name.split(' ')[0];
	}, [session]);

	return (
		<div className="bg-white px-6 py-4 rounded-2xl shadow-md w-full md:w-8/12 flex flex-col md:flex-row items-center gap-4 border border-gray-100 z-10">
			<Link
				href="/"
				className="pb-0 md:pb-6 cursor-pointer hover:opacity-70 transition duration-300"
			>
				<AspectRatio
					src={site?.acf?.logo_navbar || ''}
					alt="Logo"
					size={{ width: 212 }}
				/>
			</Link>
			<div className="flex items-center gap-4 flex-1 flex-col md:flex-row">
				<div
					className="flex items-center justify-center gap-2"
					style={{ margin: '0 auto' }}
				>
					{loadingMenu ? (
						<div className="spinner size-10" />
					) : (
						<>
							{menus
								.filter((x: any) => x.tipo === 'menu')
								.map((menu: any, key: number) => (
									<DropdownMenu
										key={key}
										title={menu.title}
										items={menu.items}
										menu={menu}
									/>
								))}
							{menus
								.filter((x: any) => x.tipo === 'link')
								.map((menu: any, key: number) => (
									<Link
										key={key}
										href={menu.url}
										className="flex gap-1 items-center text-primary font-semibold cursor-pointer"
									>
										{menu.title}
									</Link>
								))}
						</>
					)}
				</div>
				<div className="flex gap-2 items-center cursor-pointer">
					<div className="h-12 w-12 bg-gray-400 rounded-full flex"></div>
					<div className="flex flex-col gap-0">
						<div className="font-concert-one text-primary flex items-center gap-2">
							Olá, <strong className="font-semibold">{firstName}!</strong>
							{perfil === 'aluno' && (
								<div className="text-xs text-secondary-500 border border-secondary-500 rounded-xl px-2 py-1">
									{anoDoAluno}º Ano
								</div>
							)}
						</div>
						<Link href="/auth/login" className="text-muted text-xs">
							Sair da conta
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
