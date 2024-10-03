import { getPosts } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';
import { getSession } from '@/services/auth';

export default async function MatrizPage({ params }: any) {
	const { ano, matriz } = params;
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

	const conteudos = await getPosts('conteudo');
	const matrizes = await getPosts('matriz');
	const foundMatriz = matrizes?.items?.find(
		(x: any) => x?.acf?.slug === matriz
	);
	if (!foundMatriz?.id) return notFound();
	const options = (conteudos?.items || []).filter((x: any) => {
		const anos = (x?.acf?.anos_que_podem_acessar || '').split(',');
		if (perfil === 'gestor') {
			return (
				x?.acf?.matriz.map(String).includes(String(foundMatriz?.id)) &&
				anos.includes(String(ano))
			);
		}

		if (['aluno', 'professor'].includes(perfil)) {
			return (
				x?.acf?.matriz.map(String).includes(String(foundMatriz?.id)) &&
				x?.acf?.acesso === perfil &&
				anos.includes(String(ano))
			);
		}
	});

	if (!options?.length) {
		return notFound();
	}
	return <Fragment options={options} year={ano} matriz={foundMatriz} />;
}
