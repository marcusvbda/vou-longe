import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'sweetalert2/src/sweetalert2.scss';
import './globals.scss';
import { getSession, getSite } from '@/services/auth';
import { GlobalContextProvider } from './context/globalContext';
import { ThemeContextProvider } from './context/themeContext';
import WppBtn from '@/components/wppBtn';
import Script from 'next/script';
import { getPosts } from '@/services/wordpress';
import { menuGestor } from './constants/gestor';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Vou + Longe',
};

export default async function RootLayout({ children }: any) {
	const [session, site] = await Promise.all([getSession(), getSite()]);

	const getMenus = async () => {
		let perfil;
		let menus = [];
		const anoDoAluno = (session?.anoEscolar || []).join(',');
		const original = (
			session?.Identificacao?.[0]?.Perfis?.[0] || ''
		).toLowerCase();

		if (['super administrador', 'gestor escola'].includes(original)) {
			perfil = 'gestor';
		} else if (['aluno'].includes(original)) {
			perfil = 'aluno';
		} else if (['professor'].includes(original)) {
			perfil = 'professor';
		} else {
			perfil = 'aluno';
		}

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

			menus = newMenus;
		}

		if (perfil === 'gestor') {
			menus = menuGestor;
		}

		return menus;
	};

	const menus = await getMenus();

	return (
		<html lang="pt-BR">
			<body suppressHydrationWarning className={inter.className}>
				<ThemeContextProvider site={site} menus={menus}>
					<GlobalContextProvider session={session}>
						{children}
						<WppBtn />
						<Script
							src="https://cdn.userway.org/widget.js"
							data-account="RkKmjhw0Hr"
							strategy="afterInteractive" // Carregar após a interação
						/>
					</GlobalContextProvider>
				</ThemeContextProvider>
			</body>
		</html>
	);
}
