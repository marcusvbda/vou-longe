'use client';

import { getPosts } from '@/services/wordpress';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

export const GlobalContext = createContext<any>({});

export const GlobalContextProvider = ({
	children,
	session,
}: any): ReactNode => {
	const [processedYears, setProcessedYears] = useState<any>(null);
	const [loadingYears, setLoadingYears] = useState(true);
	const [components, setComponents] = useState<any>([]);

	const carouselSlides = useMemo(
		() => [
			{
				title: 'Conheça o livro de conteúdos de Língua Portuguesa',
				description:
					'Conteúdos completos e interativos para ajudar no desenvolvimento da leitura e escrita.',
			},
			{ title: 'Outro título', description: 'Outra descrição.' },
			{ title: 'Mais um título', description: 'Mais uma descrição.' },
		],
		[]
	);

	useEffect(() => {
		const processYears = async () => {
			setLoadingYears(true);
			let years: any = {};
			const typeYears = await getPosts('ano');
			for (const item of typeYears.items) {
				const tipo = item?.acf?.tipo_do_ano;
				const id = item?.id;
				const description = item?.acf?.descricao;
				const icon = item?.acf?.icone;
				const slug = item?.slug;
				const title = item?.title?.rendered;
				if (!years[tipo]) years[tipo] = [];
				const _components: any = await getPosts('componente');
				setComponents(_components);
				const filtered = (_components?.items || []).filter((x: any) => {
					return (
						x?.acf?.tipo_do_ano === tipo && (x?.acf?.ano || []).includes(id)
					);
				});

				years[tipo].push({
					id,
					title,
					description,
					icon,
					slug,
					components: filtered.map((x: any) => ({
						title: x?.acf?.titulo,
						descricao: x?.acf?.descricao,
						id: x?.id,
						icon: x?.acf?.icone,
						slug: x?.slug,
					})),
				});
			}
			setProcessedYears(years);
			setLoadingYears(false);
		};

		if (!processedYears) processYears();
		else setLoadingYears(false);
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				session,
				processedYears,
				setProcessedYears,
				loadingYears,
				carouselSlides,
				components,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
