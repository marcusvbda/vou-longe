'use client';
import AspectRatio from '@/components/aspectRatio';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from './context/globalContext';
import Link from 'next/link';
import { ThemeContext } from './context/themeContext';

export default function Home() {
	const { site } = useContext(ThemeContext);
	const slides = useMemo(() => {
		const items = (site?.acf?.items_do_carrossel || '')
			.split('\r\n')
			.map((item: any) => item.split('|'));
		return items.map((item: any) => {
			return {
				title: item[0],
				description: item[1],
			};
		});
	}, []);

	const { processedYears, loadingYears } = useContext(GlobalContext);
	const [type, setType] = useState(null);

	const keys: any[] = useMemo(() => {
		if (!processedYears) return [];
		return Object.keys(processedYears);
	}, [processedYears]);

	useEffect(() => {
		setType(keys[0]);
	}, [keys]);

	const contentData: any = useMemo(() => {
		return processedYears?.[type || ''] || [];
	}, [type]);

	return (
		<>
			<div className="p-2 md:py-6 md:px-8">
				<div className="w-full bg-gray-300 rounded-2xl flex flex-col p-4 items-center">
					<Navbar />
					<Carousel slides={slides} />
				</div>
				<div className="w-full flex flex-col items-center mb-20">
					{loadingYears ? (
						<div className="w-full flex py-24 items-center justify-center">
							<div className="spinner size-14" />
						</div>
					) : (
						<>
							<div className="w-full bg-white py-20 flex items-center gap-2 justify-between flex-col md:flex-row">
								<h1 className="text-3xl font-semibold text-neutral-700">
									Escolha o componente
								</h1>
								<div className="flex gap-2">
									{keys.map((key) => (
										<button
											key={key}
											onClick={() => setType(key)}
											className={`btn px-4 py-2 rounded-full ${
												type === key
													? 'bg-gray-600 text-white'
													: 'text-gray-600'
											}`}
										>
											{key}
										</button>
									))}
								</div>
							</div>

							<div className="w-full md:w-8/12 flex flex-wrap gap-8 justify-center">
								{contentData.map((item: any, index: any) => (
									<div key={index} className="w-full md:w-[250px]">
										<Link
											href={`/anos/${item.id}/componentes`}
											className="w-full cursor-pointer transition duration-300 hover:bg-gray-100 border border-gray-200 py-4 px-6 rounded-lg flex gap-4 font-semibold text-xl items-center text-neutral-700"
										>
											<div className="border border-gray-200 p-4 rounded-lg">
												<AspectRatio
													src={item.icon}
													alt={item.title}
													size={{ width: 32 }}
												/>
											</div>
											<span>{item.title}</span>
										</Link>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}
