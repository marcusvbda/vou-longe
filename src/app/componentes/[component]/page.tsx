import { findPost } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';

export default async function ComponentPage({ params }: any) {
	const { component } = params;
	const foundYear = await findPost('componente', 'id', component);
	if (!foundYear?.id) return notFound();

	return <Fragment year={foundYear} />;
}
