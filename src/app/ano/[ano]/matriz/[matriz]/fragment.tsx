'use client';

import { ThemeContext } from '@/app/context/themeContext';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function Fragment({ options, year, matriz }: any) {
	const [selected, setSelected] = useState(0);
	const [types, setTypes] = useState(options.map((x: any) => x?.acf?.tipo));
	const [type, setType] = useState(types[0]);
	const { site } = useContext(ThemeContext);

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

								<Link
									href={`/ano/${year}}`}
									className="flex items-center gap-2"
								>
									<img
										src="/assets/images/breadcrumb-arrow.svg"
										className="mx-2"
									/>
									<div className="font-semibold">Area de conhecimento</div>
								</Link>
								<img
									src="/assets/images/breadcrumb-arrow.svg"
									className="mx-2"
								/>
								<div className="font-semibold">{matriz?.acf?.nome}</div>
								<img
									src="/assets/images/breadcrumb-arrow.svg"
									className="mx-2"
								/>
								<div className="text-primary font-semibold">{type}</div>
							</div>
						</div>
						<div className="w-full flex flex-col items-center mb-20">
							<div className="w-full flex flex-col md:flex-row gap-4 mt-8 mb-10 ">
								<div className="w-full md:w-3/12 flex flex-row md:flex-col gap-4 md:gap-2 flex-wrap justify-center md:justify-start">
									{(types || []).map((item: any, key: any) => (
										<button
											onClick={() => setType(item)}
											key={key}
											className={`cursor-pointer text-left py-8 ${
												item === type
													? 'text-primary font-semibold'
													: 'text-tertiary'
											}`}
										>
											{item}
										</button>
									))}
								</div>
								<div
									className="w-full flex gap-8 wrap"
									style={{ flexWrap: 'wrap' }}
								>
									{(options || [])
										.filter((x: any) => x?.acf?.tipo === type)
										.map((item: any, index: any) => (
											<Link
												href={`/ano/${year}/matriz/${matriz?.acf?.slug}/conteudo/${item?.id}`}
												key={index}
												className="w-full md:w-[432px] flex  p-4  border border-gray-100 rounded-2xl flex-col gap-2"
												style={{ maxWidth: '432px' }}
											>
												<div
													className="rounded-2xl h-[352px] p-4 w-full text-white text-center flex font-semibold items-center justify-center text-3xl"
													style={{
														backgroundImage: `url(${
															item?.acf?.thumbnail || ''
														})`,
														backgroundSize: 'cover',
														backgroundRepeat: 'no-repeat',
													}}
												/>
												<div className="text-primary font-semibold gap-2 flex w-full mt-2">
													{item?.acf?.conteudo.split('|')[0]}
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
