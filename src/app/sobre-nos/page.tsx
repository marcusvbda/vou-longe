import Footer from '@/components/footer';
import PublicNavbar from '@/components/PublicNavbar';
import { getSite } from '@/services/auth';
import Link from 'next/link';

const HeroContent = ({ site }: any) => {
	return (
		<div className="w-full flex flex-col gap-2 px-4 items-center mt-20 md:px-32">
			<div className="w-full">
				<h1 className="text-neutral-800 font-bold font-lexend-deca text-3xl text-center mb-6">
					{site?.acf?.hero_sobre_linha_1 || ''}
				</h1>
				<h3 className="text-neutral-500 font-lexend text-center">
					{site?.acf?.hero_sobre_linha_2 || ''}
				</h3>
			</div>
			<div className="w-full">
				<img src={site?.acf?.hero_sobre_linha_url || ''} />
			</div>
			<div className="w-full">
				<h4 className="text-primary mt-6 font-lexend-deca text-center mb-6">
					{site?.acf?.hero_sobre_linha_3 || ''}
				</h4>
				<h2 className="text-neutral-800 font-bold font-lexend-deca text-2xl text-center mb-4">
					{site?.acf?.hero_sobre_linha_4 || ''}
				</h2>
				<h3 className="text-neutral-500 font-lexend text-center">
					{site?.acf?.hero_sobre_linha_5 || ''}
				</h3>
			</div>
		</div>
	);
};

export default async function AboutPage() {
	const site = await getSite();
	// console.log(site?.acf);

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
