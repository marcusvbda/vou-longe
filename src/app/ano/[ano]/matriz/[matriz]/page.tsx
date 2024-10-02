import { getPosts } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';
// import Fragment from './fragment';

export default async function MatrizPage({ params }: any) {
	const { ano, matriz } = params;
	const conteudos = await getPosts('conteudo');
	const matrizes = await getPosts('matriz');
	const foundMatriz = matrizes?.items?.find(
		(x: any) => x?.acf?.slug === matriz
	);
	if (!foundMatriz?.id) return notFound();
	const options = (conteudos?.items || []).filter(
		(x: any) =>
			(x?.acf?.anos_que_podem_acessar || '')
				.split(',')
				.map(parseInt)
				.includes(parseInt(ano)) && x?.acf?.matriz.includes(foundMatriz?.id)
	);
	if (!options?.length) return notFound();
	return <Fragment options={options} year={ano} matriz={foundMatriz} />;
}
