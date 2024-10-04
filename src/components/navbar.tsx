'use client';

import Link from 'next/link';
import AspectRatio from './aspectRatio';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '@/app/context/globalContext';
import { ThemeContext } from '@/app/context/themeContext';
import { getPosts } from '@/services/wordpress';
import DropdownMenu from './DropdownMenu';
import { menuGestor } from '@/app/constants/gestor';

export default function Navbar() {
	const { site, screenFormat } = useContext(ThemeContext);
	const { perfil, session, anoDoAluno } = useContext(GlobalContext);
	const [loadingMenu, setLoadingMenu] = useState(true);
	const [menus, setMenus] = useState<any>([]);

	useEffect(() => {
		let isMounted = true;

		const getMenus = async () => {
			setLoadingMenu(true);
			try {
				const areas = await getPosts('area-de-conhecimento');
				const matrizes = await getPosts('matriz');
				if (['aluno', 'professor'].includes(perfil)) {
					const conteudos: any = await getPosts('conteudo');
					const filtered = (conteudos?.items || [])
						.filter((x: any) => x?.acf?.acesso === 'aluno')
						.filter((x: any) => {
							const anos = (x?.acf?.anos_que_podem_acessar || '')
								.split(',')
								.map(String);
							return anos.includes(String(anoDoAluno));
						});

					const filteredWithMatriz = filtered.map((item: any) => {
						const matrizId = item?.acf?.matriz?.[0];
						const matriz = (matrizes?.items || []).find(
							(m: any) => m.id === matrizId
						);

						if (matriz) {
							matriz.area = areas?.items?.find((a: any) =>
								a?.acf?.matrizes.includes(matriz.id)
							);
							item.matriz = matriz;
						}

						return item;
					});

					const uniqueMatriz = filteredWithMatriz.filter(
						(value: any, index: number, self: any) =>
							index ===
							self.findIndex(
								(t: any) => t?.matriz?.acf?.nome === value?.matriz?.acf?.nome
							)
					);

					let menuItems = uniqueMatriz.map((x: any) => [
						x?.matriz?.area?.acf?.nome_da_area,
						x?.matriz?.area?.acf?.descricao,
						`/ano/${anoDoAluno}?area=${x?.matriz?.area?.acf?.nome_da_area}`,
						x?.matriz?.acf?.icon,
					]);

					if (isMounted) {
						const newMenus: any = [
							{
								tipo: 'menu',
								title: 'Areas de Conhecimento',
								items: menuItems,
							},
						];

						if (perfil === 'professor') {
							newMenus.push({
								tipo: 'link',
								title: 'Avaliações',
								url: 'https://avaliacoesaprendebrasil.homolog.local/',
							});
						}

						setMenus(newMenus);
					}
				}

				if (perfil === 'gestor' && isMounted) {
					setMenus(menuGestor);
				}
			} catch (error) {
				console.error('Erro ao carregar os menus:', error);
			} finally {
				if (isMounted) {
					setLoadingMenu(false);
				}
			}
		};

		getMenus();

		return () => {
			isMounted = false;
		};
	}, [perfil, anoDoAluno]);

	const firstName = useMemo(() => {
		const name = session?.Identificacao?.[0]?.Nome || 'Anónimo';
		return name.split(' ')[0];
	}, [session]);

	return (
		<div className="bg-white p-4 md:px-6 py-4 rounded-2xl shadow-md w-full md:w-10/12 flex items-center gap-4 border border-gray-100 z-10 flex-col">
			<div className="w-full flex items-center gap-2">
				<Link
					href="/"
					className="pb-0 md:pb-2 cursor-pointer hover:opacity-70 transition duration-300"
				>
					<AspectRatio
						src={site?.acf?.logo_navbar || ''}
						alt="Logo"
						size={{ width: screenFormat ? 150 : 212 }}
					/>
				</Link>
				<div className="flex items-end md:items-center gap-4 flex-1 flex-col md:flex-row">
					<ItemsMenu
						loadingMenu={loadingMenu}
						menus={menus}
						perfil={perfil}
						className="items-center justify-center gap-2 hidden md:flex wrap"
					/>
					<div className="flex gap-2 items-center cursor-pointer">
						<div className="h-12 w-12 bg-gray-400 rounded-full md:flex hidden" />
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
			<ItemsMenu
				loadingMenu={loadingMenu}
				menus={menus}
				perfil={perfil}
				className="items-center justify-center flex md:hidden gap-2 wrap"
			/>
		</div>
	);
}

const ItemsMenu = ({ loadingMenu, menus, perfil, className }: any) => {
	return (
		<div className={className} style={{ margin: '0 auto' }}>
			{loadingMenu ? (
				<div className="spinner size-10" />
			) : (
				<>
					{menus
						.filter((x: any) => x.tipo === 'menu')
						.map((menu: any, key: number) => (
							<DropdownMenu
								perfil={perfil}
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
								target="_blank"
								key={key}
								href={menu.url}
								className="flex gap-1 items-center text-primary font-semibold cursor-pointer text-sm"
							>
								{menu.title}
							</Link>
						))}
				</>
			)}
		</div>
	);
};
