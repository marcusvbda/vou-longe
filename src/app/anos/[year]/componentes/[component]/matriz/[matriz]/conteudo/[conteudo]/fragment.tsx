'use client';
import { GlobalContext } from '@/app/context/globalContext';
import AspectRatio from '@/components/aspectRatio';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { getPosts } from '@/services/wordpress';
import Link from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';

export default function Fragment({ year, component, matriz, content }: any) {
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
						<Content
							year={year}
							component={component}
							matriz={matriz}
							content={content}
						/>
					)}
				</div>
			</div>
			<Footer />
		</>
	);
}

const Content = ({ year, component, matriz, content }: any) => {
	return (
		<div className="px-8 md:px-20 w-full">
			<div className="w-full flex flex-col items-center mb-20">
				<div className="w-full flex flex-col gap-4 mt-8 mb-10 ">
					<div className="w-full flex justify-between items-center flex-col md:flex-row">
						<h1 className="text-3xl font-semibold text-neutral-700 mt-8 text-center order-1 md:order-0">
							{content?.acf?.titulo}
						</h1>
						<a
							href={`/anos/${year?.id}/componentes/${component?.id}/matriz/${matriz?.id}`}
							className="bg-gray-600 flex gap-2 items-center rounded-lg px-6 py-2 text-white transition duration-300 hover:bg-gray-700 order-0 md:order-1"
						>
							<AspectRatio
								size={{ width: 24 }}
								src="/assets/images/arrow-back.svg"
							/>
							Voltar
						</a>
					</div>
					<ShowContent content={content} />
				</div>
			</div>
		</div>
	);
};

const ShowContent = ({ content }: any) => {
	const type = useMemo(() => {
		const original = (content?.acf?.tipo_do_conteudo || '').toLowerCase();
		const options: any = {
			livro: 'iframe',
			vídeo: 'video',
		};

		return options[original] || 'link';
	}, [content?.acf?.tipo_do_conteudo]);

	return (
		<>
			{type === 'iframe' && (
				<div style={{ width: `100%`, height: `1024px`, overflow: `auto` }}>
					<iframe
						className="rounded-3xl"
						src={content?.acf?.conteudo_url}
						style={{ width: `100%`, height: `100%`, border: `none` }}
					/>
				</div>
			)}
			{type === 'video' && (
				<iframe
					className="rounded-3xl"
					width="100%"
					height="600px"
					src={content?.acf?.conteudo_url}
					style={{ border: 'none' }}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			)}
			{type === 'link' && (
				<div className="w-full flex items-center justify-center">
					<Link
						href={content?.acf?.conteudo_url}
						target="_blank"
						className="text-blue-900 underline py-10"
					>
						Clique aqui para acessar
					</Link>
				</div>
			)}
		</>
	);
};
