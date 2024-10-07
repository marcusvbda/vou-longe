import { findPost, getPosts } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';
import { getSession } from '@/services/auth';

export default async function AnoPage({ params }: any) {
	const session = await getSession();
	const { ano } = params;
	const areas = await getPosts('area-de-conhecimento');
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
	const matrizes = await getPosts('matriz');
	const anoSplited = decodeURIComponent(ano).split(',').map(String);
	const anosConteudo = String(session.anoEscolar).split(',').map(String);
	const options = (areas?.items || []).filter((x: any) => {
		const anos = (x?.acf?.anos_que_possuem_acesso || '').split(',');
		const hasCommonItem = anos.some((ano: string) =>
			anosConteudo.includes(ano)
		);
		const anosHasCommonItem = anos.some((ano: string) =>
			anoSplited.includes(ano)
		);
		return (
			anosHasCommonItem &&
			(hasCommonItem || ['gestor', 'professor'].includes(perfil))
		);
	});
	if (!options?.length) return notFound();
	let _options = [];
	for (let i = 0; i < options.length; i++) {
		const row = options[i];
		_options.push({
			title: row.acf?.nome_da_area,
			items: matrizes.items
				.filter((x: any) =>
					row?.acf?.matrizes.map(String).includes(String(x.id))
				)
				.map((x: any) => [x?.acf?.nome, x.acf?.slug]),
		});
	}
	return <Fragment options={_options} year={decodeURIComponent(ano)} />;
}
