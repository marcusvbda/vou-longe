import { findPost } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';
import { getSession } from '@/services/auth';

export default async function MatrizPage({ params }: any) {
	const { anoEscolar } = await getSession();
	const { ano, matriz, conteudo } = params;
	const foundConteudo = await findPost('conteudo', 'id', conteudo);
	if (!foundConteudo?.id) return notFound();
	const foundMatriz = await findPost(
		'matriz',
		'id',
		foundConteudo?.acf?.matriz
	);
	if (foundMatriz?.acf?.slug !== matriz) return notFound();

	const anos: any = (foundConteudo?.acf?.anos_que_podem_acessar || '').split(
		','
	);

	if (!(anos.includes(String(ano)) || anos.includes(String(anoEscolar)))) {
		return notFound();
	}

	return <Fragment matriz={foundMatriz} year={ano} content={foundConteudo} />;
}
