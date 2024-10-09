import Footer from '@/components/footer';
import PublicNavbar from '@/components/PublicNavbar';
import { getSite } from '@/services/auth';
import Link from 'next/link';

const HeroContent = ({ site }: any) => {
	return (
		<div className="w-full flex flex-col md:flex-row gap-2 px-4 items-center">
			<div className="w-full md:w-6/12 pr-0 md:pr-10 order-1 md:order-0">
				<h5 className="text-primary">
					{site?.acf?.banner_1?.hero_linha_1 || ''}
				</h5>
				<h1
					className="text-3xl text-neutral-800 font-bold font-lexend-deca mb-4"
					dangerouslySetInnerHTML={{
						__html: site?.acf?.banner_1?.hero_linha_2 || '',
					}}
				/>
				<h3 className="text-sm text-neutral-500">
					{site?.acf?.banner_1?.hero_linha_3 || ''}
				</h3>
				<div className="flex flex-col md:flex-row gap-2 px-0 mt-10 w-auto">
					<div>
						<Link
							href={site?.acf?.banner_1?.comece_agora_link || '#'}
							className="cursor-pointer px-4 bg-primary text-white p-3 rounded-xl w-full flex justify-center items-center text-sm"
						>
							Comece agora
						</Link>
					</div>
					<div>
						<Link
							href={site?.acf?.banner_1?.saiba_mais_link || '#'}
							className="cursor-pointer border px-4 text-primary border-primary p-3 rounded-xl w-full flex justify-center items-center text-sm"
						>
							Saiba mais
						</Link>
					</div>
				</div>
			</div>
			<div className=" w-full md:w-6/12 order-0 md:order-1">
				<img src={site?.acf?.banner_1?.hero_imagem || ''} />
			</div>
		</div>
	);
};

export default async function HomePage() {
	const site = await getSite();
	// console.log(site?.acf?.banner_1?.hero_linha_1);

	return (
		<>
			<div className="md:py-6 md:px-8">
				<div className="w-full flex flex-col p-2 md:p-4 items-center">
					<PublicNavbar />
				</div>
				<div className="w-full flex relative mb-10 flex-col">
					<HeroContent site={site} />
				</div>
			</div>
			<Footer />
		</>
	);
}
