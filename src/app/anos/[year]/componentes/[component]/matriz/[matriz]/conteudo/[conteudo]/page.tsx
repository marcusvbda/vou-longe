import { findPost } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';

export default async function MatrizPage({ params }: any) {
	const { year, component, matriz, conteudo } = params;

	const [foundYear, foundComponent, foundMatriz, foundContent] =
		await Promise.all([
			findPost('ano', 'id', year),
			findPost('componente', 'id', component),
			findPost('matriz', 'id', matriz),
			findPost('conteudo', 'id', conteudo),
		]);

	if (!foundYear?.id || !foundComponent?.id || !foundMatriz?.id) {
		return notFound();
	}

	const yearIncludedInComponent = foundComponent.acf?.ano?.includes(
		foundYear.id
	);
	const componentMatchesMatriz =
		parseInt(foundMatriz.acf?.componente) === parseInt(foundComponent.id);

	if (!yearIncludedInComponent || !componentMatchesMatriz) return notFound();

	if (foundContent?.acf?.matriz !== foundMatriz.id) return notFound();

	return (
		<Fragment
			year={foundYear}
			component={foundComponent}
			matriz={foundMatriz}
			content={foundContent}
		/>
	);
}
