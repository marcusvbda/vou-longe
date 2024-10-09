import Footer from '@/components/footer';
import PublicNavbar from '@/components/PublicNavbar';
import { getSite } from '@/services/auth';
import { FooterBanner } from '../page';

const Banner1 = ({ site }: any) => {
	return (
		<div className="w-full flex flex-col gap-2 px-4 items-center mt-20 md:px-32">
			<div className="w-full">
				<h1 className="text-neutral-800 font-bold font-lexend-deca text-3xl text-center mb-6">
					{site?.acf?.banner_sobre_1?.hero_sobre_linha_1 || ''}
				</h1>
				<h3 className="text-neutral-500 font-lexend text-center">
					{site?.acf?.banner_sobre_1?.hero_sobre_linha_2 || ''}
				</h3>
			</div>
			<div className="w-full flex items-center justify-center">
				<img src={site?.acf?.banner_sobre_1?.hero_sobre_linha_url || ''} />
			</div>
			<div className="w-full">
				<h4 className="text-primary mt-6 font-lexend-deca text-center mb-6">
					{site?.acf?.banner_sobre_1?.hero_sobre_linha_3 || ''}
				</h4>
				<h2 className="text-neutral-800 font-bold font-lexend-deca text-2xl text-center mb-4">
					{site?.acf?.banner_sobre_1?.hero_sobre_linha_4 || ''}
				</h2>
				<h3 className="text-neutral-500 font-lexend text-center">
					{site?.acf?.banner_sobre_1?.hero_sobre_linha_5 || ''}
				</h3>
			</div>
		</div>
	);
};

const Banner2 = ({ site }: any) => {
	return (
		<div className="px-4">
			<div className="w-full md:w-6/12 mb-10 mt-48 ml-0 md:ml-16">
				<h4 className="text-secondary mt-6 font-lexend-deca text-left mb-2">
					{site?.acf?.banner_sobre_2?.etiqueta || ''}
				</h4>
				<h2 className="text-neutral-800 font-bold font-lexend-deca text-2xl text-left mb-4">
					{site?.acf?.banner_sobre_2?.titulo || ''}
				</h2>
				<h3 className="text-neutral-500 font-lexend text-left">
					{site?.acf?.banner_sobre_2?.descricao || ''}
				</h3>
			</div>
			<div className="w-full flex flex-col md:flex-row gap-2 px-0 md:px-12 items-center">
				<div
					className="flex flex-col md:flex-row bg-cover bg-center bg-no-repeat w-full rounded-3xl pt-10 px-10"
					style={{
						backgroundImage: `url(${
							site?.acf?.banner_sobre_2?.background || ''
						})`,
					}}
				>
					<div className="w-full md:w-7/12 flex items-start flex-col gap-4 justify-end pb-10">
						<h4 className="text-2xl text-white">
							{site?.acf?.banner_sobre_2?.titulo_2 || ''}
						</h4>
						<div className="text-white/70">
							{site?.acf?.banner_sobre_2?.descricao_2 || ''}
						</div>
					</div>
					<div className="w-full md:w-5/12 relative hidden md:flex">
						<img
							src={site?.acf?.banner_sobre_2?.imagem || ''}
							className="absolute bottom-0"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const Banner3 = ({ site }: any) => {
	return (
		<div className="w-full flex flex-col gap-2 px-4 items-center mt-20 md:px-32">
			<div className="w-full mb-2">
				<h4 className="text-[#4D91BA] mt-6 font-lexend-deca text-center mb-2">
					{site?.acf?.banner_sobre_3?.hero_sobre_linha_1 || ''}
				</h4>
				<h2 className="text-neutral-800 font-bold font-lexend-deca text-2xl text-center mb-4">
					{site?.acf?.banner_sobre_3?.hero_sobre_linha_2 || ''}
				</h2>
				<h3 className="text-neutral-500 font-lexend text-center">
					{site?.acf?.banner_sobre_3?.hero_sobre_linha_3 || ''}
				</h3>
			</div>
			<video
				className="w-full rounded-2xl my-6"
				src={site?.acf?.banner_sobre_3?.hero_sobre_video_url || '' || ''}
				controls
			/>
			<div className="w-full">
				<h4 className="text-[#66BB90] mt-6 font-lexend-deca text-center mb-2">
					{site?.acf?.banner_sobre_3?.hero_sobre_linha_4 || ''}
				</h4>
				<h2 className="text-neutral-800 font-bold font-lexend-deca text-2xl text-center mb-4">
					{site?.acf?.banner_sobre_3?.hero_sobre_linha_5 || ''}
				</h2>
				<h3 className="text-neutral-500 font-lexend text-center">
					{site?.acf?.banner_sobre_3?.hero_sobre_linha_6 || ''}
				</h3>
			</div>
		</div>
	);
};

export default async function AboutPage() {
	const site = await getSite();

	return (
		<>
			<div className="md:py-6 md:px-8 !max-w-[1440px] mx-auto">
				<div className="w-full flex flex-col p-2 md:p-4 items-center">
					<PublicNavbar />
				</div>
				<div className="w-full flex relative mb-10 flex-col">
					<Banner1 site={site} />
					<Banner2 site={site} />
					<Banner3 site={site} />
				</div>
				<FooterBanner site={site} />
			</div>
			<Footer />
		</>
	);
}
