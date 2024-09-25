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
				const title = item?.title?.rendered;
				if (!years[tipo]) years[tipo] = [];
				const _components: any = await getPosts('componente');
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
					components: filtered.map((x: any) => ({
						title: x?.title?.rendered,
						descricao: x?.acf?.descricao,
						id: x?.id,
						icon: x?.acf?.icone,
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
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
