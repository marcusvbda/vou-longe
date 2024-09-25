'use client';
import { GlobalContext } from '@/app/context/globalContext';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { getPosts } from '@/services/wordpress';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect, useMemo, useState } from 'react';

export default function Fragment({ year }: any) {
	const { loadingYears } = useContext(GlobalContext);

	return (
		<>
			<div className="p-2 md:py-6 md:px-8">
				<div className="w-full rounded-2xl flex flex-col p-4 items-center">
					<Navbar />
				</div>
				<div className="w-full flex flex-col items-center mb-20">
					{loadingYears ? (
						<div className="w-full flex items-center justify-center py-10">
							<div className="spinner" />
						</div>
					) : (
						<Content year={year} />
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}

const Content = ({ year }: any) => {
	const searchParams = useSearchParams();
	const selectedId = parseInt(searchParams.get('id') as any);
	const { components } = useContext(GlobalContext);
	const [selected, setSelected] = useState(
		isNaN(selectedId) ? (components?.items || [])[0]?.id : selectedId
	);
	const [loadingContent, setLoadingContent] = useState(true);
	const [matrix, setMatriz] = useState([]);

	useEffect(() => {
		// remove query param from url if has
		if (!isNaN(selected)) {
			const url = new URL(window.location.href);
			url.searchParams.delete('id');
			window.history.replaceState({}, '', url.href);
		}
		setLoadingContent(true);
		getPosts('matriz').then((res) => {
			const filtered = (res?.items || []).filter(
				(x: any) => x?.acf?.componente === selected && x?.acf?.ano === year?.id
			);
			setMatriz(filtered);
			setLoadingContent(false);
		});
	}, [selected]);

	const selectedComponent = useMemo(() => {
		return components?.items?.find((x: any) => x?.id === selected);
	}, [components, selected]);

	return (
		<div className="px-8 md:px-20 w-full">
			<div className="flex w-full md:w-auto">
				<div className="mt-8 w-full md:w-auto border-t border-b border-gray-300 py-2 flex text-neutral-500 text-sm items-center flex-wrap gap-2">
					<Link href="/">
						<img src="/assets/images/home.svg" />
					</Link>
					<img src="/assets/images/breadcrumb-arrow.svg" className="mx-4" />
					<div>{year?.title?.rendered || ''}</div>
					<img src="/assets/images/breadcrumb-arrow.svg" className="mx-4" />
					<div>{selectedComponent?.acf?.titulo || ''}</div>
					<img src="/assets/images/breadcrumb-arrow.svg" className="mx-4" />
					<strong className="font-semibold text-black">Componentes</strong>
				</div>
			</div>
			<div
				className="w-full flex flex-col items-center mb-20"
				x-data="contentData"
			>
				<h1 className="text-3xl font-semibold text-neutral-700 mt-8 mb-10 text-center">
					Escolha o componente que deseja visualizar
				</h1>
				<div className="w-full flex flex-col md:flex-row gap-4">
					<div className="w-full md:w-3/12 flex flex-row md:flex-col gap-4 md:gap-2 flex-wrap justify-center md:justify-start">
						{(components?.items || []).map((item: any, key: any) => (
							<button
								onClick={() => setSelected(item.id)}
								key={key}
								className={`transition duration-300 hover:text-black cursor-pointer text-left ${
									item.id === selected ? 'text-black' : 'text-neutral-500'
								}`}
							>
								{item?.acf?.titulo || ''}
							</button>
						))}
					</div>
					<div className="w-full md:w-9/12 flex flex-col md:flex-row flex-wrap">
						{loadingContent ? (
							<div className="w-full flex py-24 items-center justify-center">
								<div className="spinner size-14" />
							</div>
						) : (
							<div className="w-full flex flex-wrap">
								{matrix.map((item: any, key: any) => (
									<div className="w-full md:w-6/12 p-2" key={key}>
										<Link
											href={`/anos/${year.id}/componentes/${selectedComponent.id}/matriz/${item.id}`}
											className="border border-gray-200 rounded-lg cursor-pointer p-2 flex flex-col gap-2 ransition duration-300 hover:bg-gray-100"
										>
											<div className="bg-gray-400 rounded-lg h-60 w-full" />
											<div className="flex gap-2 items-center w-full">
												<strong className="mt-4 text-neutral-700">
													{item?.acf?.titulo || ''}
												</strong>
												<svg
													width="24"
													height="28"
													viewBox="0 0 24 28"
													fill="none"
													className="ml-auto"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M7 21L17 11M17 11H7M17 11V21"
														stroke="#101828"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<small className="text-neutral-400">
												{item?.acf?.descricao || ''}
											</small>
										</Link>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
