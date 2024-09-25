import { findPost } from '@/services/wordpress';
import { notFound } from 'next/navigation';

export default async function MatrizPage({ params }: any) {
	const { year, component, matriz } = params;

	const [foundYear, foundComponent, foundMatriz] = await Promise.all([
		findPost('ano', 'id', year),
		findPost('componente', 'id', component),
		findPost('matriz', 'id', matriz),
	]);

	if (!foundYear?.id || !foundComponent?.id || !foundMatriz?.id)
		return notFound();

	const yearIncludedInComponent = foundComponent.acf?.ano?.includes(
		foundYear.id
	);
	const componentMatchesMatriz =
		parseInt(foundMatriz.acf?.componente) === parseInt(foundComponent.id);

	if (!yearIncludedInComponent || !componentMatchesMatriz) return notFound();

	console.log(foundMatriz);

	return <>Matriz Page</>;
}
