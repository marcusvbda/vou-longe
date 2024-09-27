import { getPosts } from '@/services/wordpress';
import { notFound } from 'next/navigation';
// import Fragment from './fragment';

export default async function MatrizPage({ params }: any) {
	const { ano, matriz } = params;
	const areas = await getPosts('area-de-conhecimento');
	const options = (areas?.items || []).filter((x: any) =>
		(x?.acf?.anos_que_possuem_acesso || '')
			.split(',')
			.map(parseInt)
			.includes(parseInt(ano))
	);
	if (!options?.length) return notFound();

	const conteudos = await getPosts('conteudo');
	console.log(conteudos);

	// return <Fragment options={options} year={ano} />;
}
