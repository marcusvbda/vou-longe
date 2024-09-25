import { findPost } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';

export default async function ComponentPage({ params }: any) {
	const { year } = params;
	const foundYear = await findPost('ano', 'id', year);
	if (!foundYear?.id) return notFound();
	return <Fragment year={foundYear} />;
}
