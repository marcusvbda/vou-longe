'use client';

import { ThemeContext } from '@/app/context/themeContext';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function Fragment({ options, year }: any) {
	const [selected, setSelected] = useState(0);
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
								<img
									src="/assets/images/breadcrumb-arrow.svg"
									className="mx-2"
								/>
								<div className="text-primary font-semibold">
									Area de conhecimento
								</div>
							</div>
						</div>
						<h4 className="text-primary font-semibold py-8 text-3xl text-center">
							Escolha o componente curricular que deseja visualizar
						</h4>
						<div className="w-full flex flex-col items-center mb-20">
							<div className="w-full flex flex-col md:flex-row gap-4 mt-8 mb-10 ">
								<div className="w-full md:w-3/12 flex flex-row md:flex-col gap-4 md:gap-2 flex-wrap justify-center md:justify-start">
									{(options || []).map((type: any, key: any) => (
										<button
											onClick={() => setSelected(key)}
											key={key}
											className={`cursor-pointer text-left py-8 ${
												selected === key
													? 'text-primary font-semibold'
													: 'text-tertiary'
											}`}
										>
											{type.title}
										</button>
									))}
								</div>
								<div
									className="w-full flex gap-8 wrap"
									style={{ flexWrap: 'wrap' }}
								>
									{options[selected].items.map((item: any, index: any) => (
										<Link
											href={`/ano/${year}/matriz/${item[1]}`}
											key={index}
											className="w-full md:w-[340px] h-[240px] flex p-4  border border-gray-100 rounded-2xl"
											style={{ maxWidth: '340px' }}
										>
											<div
												className="rounded-2xl p-4 w-full text-white text-center flex font-semibold items-center justify-center text-3xl"
												style={{
													backgroundImage: `url(${
														site?.acf?.background_card_secundario || ''
													})`,
													backgroundSize: 'cover',
													backgroundRepeat: 'no-repeat',
												}}
											>
												{item[0]}
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
