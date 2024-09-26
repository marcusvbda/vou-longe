'use client';
import { GlobalContext } from '@/app/context/globalContext';
import AspectRatio from '@/components/aspectRatio';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { getPosts } from '@/services/wordpress';
import Link from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';

export default function Fragment({ year, component, matriz }: any) {
	const { loadingYears } = useContext(GlobalContext);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		setInitialized(true);
	}, []);

	if (!initialized) return <> </>;
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
						<Content year={year} component={component} matriz={matriz} />
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}

const Content = ({ year, component, matriz }: any) => {
	const [selected, setSelected] = useState(null);
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState([]);
	const [types, setTypes] = useState([]);

	useEffect(() => {
		setLoading(true);
		getPosts('conteudo').then((res) => {
			const filtered = (res?.items || []).filter(
				(x: any) => x?.acf?.matriz === matriz?.id
			);
			setContent(filtered);
			const typesValue = filtered.map((x: any) => x?.acf?.tipo_do_conteudo);
			setTypes(typesValue);
			setSelected(typesValue[0]);
			setLoading(false);
		});
	}, []);

	const typeContent = useMemo(() => {
		return content?.filter((x: any) => x?.acf?.tipo_do_conteudo === selected);
	}, [content, selected]);

	if (loading) {
		return (
			<div className="w-full flex items-center justify-center py-10">
				<div className="spinner" />
			</div>
		);
	}

	return (
		<div className="px-8 md:px-20 w-full">
			<div className="flex w-full md:w-auto">
				<div className="mt-8 w-full md:w-auto border-t border-b border-gray-300 py-2 flex text-neutral-500 text-sm items-center flex-wrap gap-2">
					<Link href="/" className="flex gap-2 items-center">
						<img src="/assets/images/home.svg" />
						Página Inicial
					</Link>
					<img src="/assets/images/breadcrumb-arrow.svg" className="mx-4" />
					<div>{year?.title?.rendered || ''}</div>
					<img src="/assets/images/breadcrumb-arrow.svg" className="mx-4" />
					<Link
						href={`/anos/${year?.id}/componentes`}
						className="flex gap-2 items-center"
					>
						Componente
					</Link>
					<img src="/assets/images/breadcrumb-arrow.svg" className="mx-4" />
					<div>{component?.acf?.titulo}</div>
					{selected && (
						<>
							<img src="/assets/images/breadcrumb-arrow.svg" className="mx-4" />
							<strong className="font-semibold text-black">{selected}</strong>
						</>
					)}
				</div>
			</div>
			<div className="w-full flex flex-col items-center mb-20">
				<div className="w-full flex flex-col md:flex-row gap-4 mt-8 mb-10 ">
					<div className="w-full md:w-3/12 flex flex-row md:flex-col gap-4 md:gap-2 flex-wrap justify-center md:justify-start">
						{(types || []).map((type: any, key: any) => (
							<button
								onClick={() => setSelected(type)}
								key={key}
								className={`transition duration-300 hover:text-black cursor-pointer text-left ${
									type === selected ? 'text-black' : 'text-neutral-500'
								}`}
							>
								{type}
							</button>
						))}
						<div className="mt-4 flex">
							<Link
								href={`/anos/${year.id}/componentes`}
								className="bg-gray-600 flex gap-2 items-center rounded-lg px-6 py-2 text-white transition duration-300 hover:bg-gray-700 order-0 md:order-1"
							>
								<AspectRatio
									size={{ width: 24 }}
									src="/assets/images/arrow-back.svg"
								/>
								Voltar
							</Link>
						</div>
					</div>
					<div className="w-full md:w-9/12 flex flex-col md:flex-row flex-wrap">
						<div className="w-full flex flex-wrap">
							{(typeContent || []).map((item: any, key: any) => (
								<div className="w-full md:w-6/12 p-2" key={key}>
									<Link
										href={`/anos/${year.id}/componentes/${component.id}/matriz/${matriz.id}/conteudo/${item.id}`}
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
					</div>
				</div>
			</div>
		</div>
	);
};
