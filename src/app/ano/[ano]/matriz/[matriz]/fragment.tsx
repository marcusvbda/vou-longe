'use client';

import { GlobalContext } from '@/app/context/globalContext';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function Fragment({ options, year, matriz }: any) {
	const { perfil } = useContext(GlobalContext);
	let defaultState = [
		'Acomp. de Simulados',
		'Atividades Extras',
		'Áudios',
		'Avaliações',
		'Jogos',
		'Livros',
		'Leitura Guiada',
		'Material de Apoio',
		'Simulados',
		'Trilhas Gamificadas',
		'Videos',
	];

	const [types] = useState(
		defaultState.filter((x: any) =>
			perfil === 'aluno' ? !['Avaliações'].includes(x) : true
		)
	);

	const [type, setType] = useState(
		Array.from(new Set(options?.map((x: any) => x?.acf?.tipo)))[0] || types[0]
	);

	const handleClick = (item: string) => {
		if (item === 'Avaliações') {
			return window.open(
				'https://avaliacoesaprendebrasil.homolog.local/',
				'_blank'
			);
		}
		setType(item);
	};

	return (
		<>
			<div className="p-2 md:py-6 md:px-8">
				<div className="w-full rounded-2xl flex flex-col p-4 items-center">
					<Navbar />
				</div>
				<div className="w-full flex flex-col items-center mb-20">
					<div className="px-8 md:px-20 w-full">
						<div className="flex w-full md:w-auto">
							<div className="mt-8 w-full md:w-auto border-t border-b border-gray-300 py-2 flex text-neutral-500 text-sm items-center flex-wrap gap-2">
								<Link href="/" className="flex gap-2 items-center">
									<img src="/assets/images/home.svg" />
									Página Inicial
								</Link>
								<Link href={`/ano/${year}`} className="flex items-center gap-2">
									<img
										src="/assets/images/breadcrumb-arrow.svg"
										className="mx-2"
									/>
									<div>Area de conhecimento</div>
								</Link>
								<img
									src="/assets/images/breadcrumb-arrow.svg"
									className="mx-2"
								/>
								<div>{matriz?.acf?.nome}</div>
								<img
									src="/assets/images/breadcrumb-arrow.svg"
									className="mx-2"
								/>
								<div className="text-primary font-semibold">
									{(type || '') as any}
								</div>
							</div>
						</div>
						<div className="w-full flex flex-col items-center mb-20">
							<div className="w-full flex flex-col md:flex-row gap-4 mt-8 mb-10 ">
								<div className="w-full md:w-3/12 flex flex-row md:flex-col gap-4 md:gap-2 flex-wrap justify-center md:justify-start">
									{(types || []).map((item: any, key: any) => (
										<button
											onClick={() => handleClick(item)}
											key={key}
											className={`cursor-pointer text-left transition-all hover:opacity-100 text-thin duration-300 hover:bg-primary-100 rounded-lg px-4 py-1 ${
												item === type
													? 'text-primary font-semibold bg-primary-100'
													: 'text-tertiary opacity-60'
											}`}
										>
											{item}
										</button>
									))}
									<div className="flex flex-row gap-4 items-center mt-2">
										<Link
											href={`/ano/${year}`}
											className="cursor-pointer bg-primary text-white px-6 py-2 rounded-lg items-center justify-center flex gap-2"
										>
											<svg
												width="32"
												height="32"
												viewBox="0 0 32 32"
												fill="none"
											>
												<path
													d="M6.66699 15.9997H25.3337"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M13.3337 9.33301L6.66699 15.9997"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M13.3337 22.6662L6.66699 15.9995"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											Voltar
										</Link>
									</div>
								</div>
								<div
									className="w-full flex gap-8 wrap relative"
									style={{ flexWrap: 'wrap' }}
								>
									<div className="w-[40px] absolute right-60 top-40">
										<svg className="w-full" viewBox="0 0 71 98" fill="none">
											<path
												d="M46.2257 34.8751C46.2257 28.7691 41.2716 23.8208 35.1685 23.8208C29.0613 23.8208 24.1113 28.7691 24.1113 34.8751C24.1113 39.0214 26.3957 42.6275 29.7719 44.5211L30.0015 37.1856C30.0015 34.1843 32.4363 31.7495 35.4405 31.7495H35.7491C38.115 31.7495 40.0328 33.6669 40.0328 36.0331V44.793C43.6934 42.9944 46.2257 39.2323 46.2257 34.8751Z"
												fill="#E86453"
											/>
											<path
												d="M40.0328 36.0331C40.0328 33.6668 38.115 31.7495 35.749 31.7495H35.4404C32.4363 31.7495 30.0014 34.1843 30.0014 37.1856L29.7718 44.5212L29.2625 60.6827C29.1468 61.1811 29.0807 72.4179 29.0807 72.4179C28.1308 71.4495 27.0734 70.3416 26.1235 69.2815C23.9055 66.8074 19.8302 65.1402 17.1214 64.8316C15.6945 64.668 14.605 64.8633 13.8798 65.4091C13.6477 65.5862 13.4207 65.784 13.2071 65.9975C11.8093 67.3742 10.7542 69.598 11.7302 71.2279C12.1521 71.9398 12.8771 72.4123 13.6476 72.9082C14.6684 73.5701 16.388 74.2874 17.6806 75.936C19.8452 78.7055 24.8579 84.8966 27.9385 88.2013C28.5794 88.5998 29.9354 89.953 30.5763 90.2958C32.5203 91.5382 34.1085 92.7066 34.6592 93.3397C35.0895 93.8326 37.6346 95.1358 37.6346 95.1358C39.6923 96.439 43.4376 97.6572 47.7635 97.6572C52.0811 97.6572 56.0039 97.9159 58.9027 95.3657H59.0579L59.1345 95.173C62.0836 92.4719 63.9169 88.7288 63.9169 84.5904C63.9169 83.5671 63.9169 79.7928 63.9169 79.083V64.8048C63.9169 63.8346 63.7035 60.5844 60.9703 59.6084C59.6569 59.1417 58.4149 59.3184 57.3566 59.7749L57.1092 59.7856L57.0328 59.7906C56.5576 58.0051 55.3707 56.8523 53.6142 56.5464C51.4934 56.1794 50.0237 56.8127 49.1403 57.454C48.2624 55.5654 46.5 54.5812 44.1156 54.7817C42.3276 54.9326 40.9978 55.8105 40.0328 56.9684V44.7931V36.0331Z"
												fill="#3B3434"
											/>
											<path
												d="M59.8416 53.2337L62.0363 55.676C62.4586 56.1507 63.2233 56.1219 63.5953 55.6076C67.8261 49.7362 70.1582 42.6699 70.1582 35.2364C70.1582 15.9415 54.4614 0.24707 35.1689 0.24707C33.8451 0.24707 32.5025 0.321105 31.1752 0.469037C15.0747 2.26266 2.12664 15.2588 0.388465 31.372C-0.558777 40.1398 1.76232 48.694 6.73978 55.6074C7.10884 56.1244 7.87379 56.1506 8.3018 55.6784L10.4934 53.2386C10.8049 52.8931 10.8281 52.3813 10.5644 51.9987C7.05129 46.8657 5.20737 40.7357 5.39162 34.3608C5.83765 18.8881 18.2927 6.20334 33.7469 5.48309C50.8344 4.64188 64.9567 18.3394 64.9567 35.2362C64.9567 41.2822 63.1128 47.0958 59.7654 51.9936C59.5043 52.3789 59.5279 52.8884 59.8416 53.2337Z"
												fill="#E86453"
											/>
											<path
												d="M50.0061 42.2875L52.3297 44.8723C52.8044 45.4049 53.6675 45.2836 53.9863 44.6482C55.4532 41.7494 56.2258 38.56 56.2258 35.2366C56.2258 25.3246 49.1885 16.6595 39.4865 14.6284C36.657 14.0295 33.6837 14.0295 30.8457 14.6284C21.1495 16.6595 14.1123 25.3246 14.1123 35.2366C14.1123 38.5629 14.8849 41.7492 16.3493 44.6482C16.674 45.2836 17.5312 45.4049 18.0084 44.8723L20.3295 42.2875C20.5907 41.997 20.6512 41.5857 20.5037 41.2274C19.723 39.3306 19.3116 37.297 19.3116 35.2367C19.3116 28.6083 23.5023 22.6211 29.7368 20.3393C33.2196 19.0678 37.1178 19.0678 40.5975 20.3393C46.8329 22.6211 51.0215 28.6083 51.0215 35.2367C51.0215 37.297 50.6103 39.3306 49.8345 41.2274C49.6869 41.5883 49.7467 41.9996 50.0061 42.2875Z"
												fill="#F6C1BA"
											/>
										</svg>
									</div>
									{(options || []).filter((x: any) => x?.acf?.tipo === type)
										.length <= 0 && (
										<div className="w-full py-20 text-center text-muted">
											Nenhum conteúdo deste tipo
										</div>
									)}
									{(options || [])
										.filter((x: any) => x?.acf?.tipo === type)
										.map((item: any, index: any) => (
											<Link
												href={`/ano/${year}/matriz/${matriz?.acf?.slug}/conteudo/${item?.id}`}
												key={index}
												className="w-full md:w-6/12 flex p-4  border border-gray-100 rounded-2xl flex-col gap-2"
												style={{ maxWidth: '432px', height: 'fit-content' }}
											>
												<div
													className="rounded-2xl h-[250px] p-4 w-full text-white text-center flex font-semibold items-center justify-center text-3xl"
													style={{
														backgroundImage: `url(${
															item?.acf?.thumbnail || ''
														})`,
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
													}}
												/>
												<div className="text-primary font-semibold gap-2 flex w-full mt-2">
													<div className="w-full truncate">
														{item?.acf?.conteudo.split('|')[0]}
													</div>
													<svg
														className="ml-auto"
														width="28"
														height="28"
														viewBox="0 0 28 28"
														fill="none"
													>
														<path
															d="M8.57129 20.0001L19.9999 8.57153M19.9999 8.57153H8.57129M19.9999 8.57153V20.0001"
															stroke="#E86453"
															strokeWidth="2.28571"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
											</Link>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
