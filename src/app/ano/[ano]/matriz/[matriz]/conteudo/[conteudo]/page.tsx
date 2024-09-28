import { findPost, getPosts } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';
// import Fragment from './fragment';

export default async function MatrizPage({ params }: any) {
	const { ano, matriz, conteudo } = params;
	const foundConteudo = await findPost('conteudo', 'id', conteudo);
	if (!foundConteudo?.id) return notFound();
	const foundMatriz = await findPost(
		'matriz',
		'id',
		foundConteudo?.acf?.matriz
	);
	if (foundMatriz?.acf?.slug !== matriz) return notFound();

	if (
		!(foundConteudo?.acf?.anos_que_podem_acessar || '')
			.split(',')
			.map(parseInt)
			.includes(parseInt(ano))
	) {
		return notFound();
	}
	return <Fragment matriz={foundMatriz} year={ano} content={foundConteudo} />;
}
