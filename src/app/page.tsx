import Footer from '@/components/footer';
import HydratationPrevent from '@/components/HydratationPrevent';
import PublicNavbar from '@/components/PublicNavbar';
import { getSite } from '@/services/auth';
import Link from 'next/link';

const Banner1 = ({ site }: any) => {
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
			<div className="w-full md:w-6/12 order-0 md:order-1 flex items-center justify-center">
				<img src={site?.acf?.banner_1?.hero_imagem || ''} />
			</div>
		</div>
	);
};

const Banner2 = ({ site }: any) => {
	return (
		<div className="w-full flex flex-col gap-2 px-4 items-center mt-16">
			<div className="w-full">
				<h5 className="text-secondary text-center">
					{site?.acf?.banner_2?.titulo || ''}
				</h5>
				<h1
					className="text-3xl text-neutral-800 font-bold font-lexend-deca mb-4 text-center"
					dangerouslySetInnerHTML={{
						__html: site?.acf?.banner_2?.subtitulo || '',
					}}
				/>
				<h3 className="text-sm text-neutral-500 text-center">
					{site?.acf?.banner_2?.descricao || ''}
				</h3>
			</div>
			<div className="w-full mt-10 flex flex-col md:flex-row gap-4">
				{Array.from({ length: 4 }).map((_, index: number) => (
					<div
						className="border border-gray-100 rounded-xl p-4 flex flex-col w-full md:w-4/12"
						key={index}
					>
						<div className="w-full flex flex-col gap-2">
							<div>
								<img
									src={site?.acf?.banner_2?.[`card_${index + 1}`]?.icone || ''}
								/>
							</div>
							<h4 className="text-neutral-700 fonts-semibold mt-4">
								{site?.acf?.banner_2?.[`card_${index + 1}`]?.titulo || ''}
							</h4>
							<div className="text-neutral-400 text-sm">
								{site?.acf?.banner_2?.[`card_${index + 1}`]?.conteudo || ''}
							</div>
							<a
								href={site?.acf?.banner_2?.[`card_${index + 1}`]?.url || '#'}
								target="_blank"
								className="text-primary text-xs mt-2"
							>
								Ver mais
							</a>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const Banner3 = ({ site }: any) => {
	return (
		<div className="w-full flex flex-col md:flex-row gap-2 px-4 items-center">
			<div className="w-full md:w-6/12 pr-0 md:pr-10 order-1 md:order-0">
				<h5 className="text-[#4D91BA]">
					{site?.acf?.banner_3?.hero_linha_1 || ''}
				</h5>
				<h1
					className="text-3xl text-neutral-800 font-bold font-lexend-deca mb-4"
					dangerouslySetInnerHTML={{
						__html: site?.acf?.banner_3?.hero_linha_2 || '',
					}}
				/>
				<h3 className="text-sm text-neutral-500">
					{site?.acf?.banner_3?.hero_linha_3 || ''}
				</h3>
			</div>
			<div className=" w-full md:w-6/12 order-0 md:order-1 flex items-center justify-center">
				<img src={site?.acf?.banner_3?.hero_imagem || ''} />
			</div>
		</div>
	);
};

const Banner4 = ({ site }: any) => {
	return (
		<div className="w-full flex flex-col gap-2 px-4 items-center mt-16">
			<div className="w-full flex flex-col md:flex-row items-center">
				<div className="w-full">
					<h5 className="text-[#66BB90]">
						{site?.acf?.banner_4?.titulo || ''}
					</h5>
					<h1
						className="text-3xl text-neutral-800 font-bold font-lexend-deca mb-4"
						dangerouslySetInnerHTML={{
							__html: site?.acf?.banner_4?.subtitulo || '',
						}}
					/>
				</div>
				<div className="ml-auto w-full md:w-60">
					<Link
						href={site?.acf?.banner_4?.comecar_agora_url || ''}
						target="_blank"
						className="cursor-pointer bg-primary text-white py-4 md:py-2 px-3 md:px-6 rounded-xl w-full flex justify-center items-center text-xs md:text-sm"
					>
						Começar agora
					</Link>
				</div>
			</div>

			<div className="w-full mt-6 flex flex-col md:flex-row gap-4 ">
				<div
					className="border border-gray-100 overflow-hidden flex flex-col w-full md:w-3/6 h-full"
					style={{ borderRadius: 30 }}
				>
					<div
						className="w-full flex flex-col gap-2 bg-cover bg-center bg-no-repeat p-8 pb-20 md:pb-96"
						style={{
							backgroundImage: `url(${
								site?.acf?.banner_4?.card_1?.imagem || ''
							})`,
						}}
					>
						<h4 className="text-white fonts-semibold my-4">
							{site?.acf?.banner_4?.card_1?.titulo || ''}
						</h4>
						<div className="text-white/70 text-sm">
							{site?.acf?.banner_4?.card_1?.conteudo || ''}
						</div>
					</div>
				</div>
				<HydratationPrevent>
					{Array.from({ length: 2 }).map((_, index: number) => (
						<div
							className="border border-gray-100 rounded-xl p-8 flex flex-col w-full md:w-4/12"
							key={index}
							style={{ borderRadius: 30 }}
						>
							<div className="w-full flex flex-col gap-2">
								<div className="w-full flex items-center gap-2">
									<img
										src={
											site?.acf?.banner_4?.[`card_${index + 2}`]?.icone || ''
										}
									/>
									<h4 className="font-semibold text-neutral-700">
										{site?.acf?.banner_4?.[`card_${index + 2}`]?.titulo || ''}
									</h4>
								</div>
								<div className="text-neutral-400 text-sm mt-2">
									{site?.acf?.banner_4?.[`card_${index + 2}`]?.conteudo || ''}
								</div>
								<div className="mt-8 w-full flex flex-col">
									<strong className="text-neutral-700 text-xs">Inclui:</strong>
									{(site?.acf?.banner_4?.[`card_${index + 2}`]?.itens || '')
										.split('\r\n')
										.map((x: any, key: number) => (
											<p
												key={key}
												className="text-neutral-500 text-sm mt-2 flex items-center gap-2"
											>
												<div>
													<div
														className="h-4 w-4 rounded-full flex items-center justify-center"
														style={{
															backgroundColor:
																site?.acf?.banner_4?.[`card_${index + 2}`]
																	?.cor || '#fefefe',
														}}
													>
														<svg
															width="8"
															height="7"
															viewBox="0 0 8 7"
															fill="none"
														>
															<path
																d="M7.33335 1.33325L3.16669 5.49992L0.666687 2.99992"
																stroke="white"
																strokeWidth="1.25"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</div>
												</div>
												{x}
											</p>
										))}
								</div>
							</div>
						</div>
					))}
				</HydratationPrevent>
			</div>
		</div>
	);
};

export const FooterBanner = ({ site }: any) => {
	return (
		<div className="w-full flex flex-col md:flex-row gap-2 px-2 md:px-12 mt-10 md:mt-60 py-10 items-center">
			<div
				className="flex flex-col md:flex-row bg-cover bg-center bg-no-repeat w-full rounded-3xl px-10 pt-10"
				style={{
					backgroundImage: `url(${site?.acf?.banner_footer_publico_bg || ''})`,
				}}
			>
				<div className="w-full md:w-7/12 flex items-start flex-col gap-4 ">
					<h4 className="text-2xl text-white">
						{site?.acf?.banner_footer_publico_titulo || ''}
					</h4>
					<div className="text-white/70">
						{site?.acf?.banner_footer_publico_descricao || ''}
					</div>
					<div className="flex flex-row gap-2 px-0 my-10 w-auto mx-auto md:mx-0">
						<div>
							<Link
								href={site?.acf?.banner_footer_publico_comece_agora_url || '#'}
								className="cursor-pointer px-4 bg-white text-primary p-3 rounded-xl w-full flex justify-center items-center text-sm"
							>
								Comece agora
							</Link>
						</div>
						<div>
							<Link
								href={site?.acf?.banner_footer_publico_saiba_mais_url || '#'}
								className="cursor-pointer border px-4 text-white border-white p-3 rounded-xl w-full flex justify-center items-center text-sm"
							>
								Saiba mais
							</Link>
						</div>
					</div>
				</div>
				<div className="w-full md:w-5/12 relative">
					<img
						src={site?.acf?.banner_footer_publico || ''}
						className="absolute bottom-0 hidden md:block"
					/>
				</div>
			</div>
		</div>
	);
};

export default async function HomePage() {
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
					<Banner4 site={site} />
				</div>
				<FooterBanner site={site} />
			</div>
			<Footer />
		</>
	);
}
