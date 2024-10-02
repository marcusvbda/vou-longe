import { getPosts } from '@/services/wordpress';
import { notFound } from 'next/navigation';
import Fragment from './fragment';
import { getSession } from '@/services/auth';

export default async function AnoPage({ params }: any) {
	const { anoEscolar } = await getSession();
	const { ano } = params;
	const areas = await getPosts('area-de-conhecimento');

	const options = (areas?.items || [])
		.filter((x: any) => {
			const anos = (x?.acf?.anos_que_possuem_acesso || '').split(',');
			return anos.includes(String(ano)) && anos.includes(String(anoEscolar));
		})
		.map((item: any) => {
			return {
				title: item?.acf?.nome_da_area || '',
				items: (item?.acf?.matrizes || '')
					.split('\r\n')
					.map((item: any) => item.split('|')),
			};
		});
	if (!options?.length) return notFound();
	return <Fragment options={options} year={ano} />;
}
