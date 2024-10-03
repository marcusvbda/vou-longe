import { findPost } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';
import { getSession } from '@/services/auth';

export default async function MatrizPage({ params }: any) {
	const session = await getSession();
	let perfil = '';

	const perfilOriginal = (
		session?.Identificacao?.[0]?.Perfis?.[0] || ''
	).toLowerCase();

	if (['super administrador', 'gestor escola'].includes(perfilOriginal)) {
		perfil = 'gestor';
	} else if (['aluno'].includes(perfilOriginal)) {
		perfil = 'aluno';
	} else if (['professor'].includes(perfilOriginal)) {
		perfil = 'professor';
	} else {
		perfil = 'aluno';
	}

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

	if (perfil !== foundConteudo?.acf?.acesso && perfil !== 'gestor') {
		return notFound();
	}

	return <Fragment matriz={foundMatriz} year={ano} content={foundConteudo} />;
}
