'use client';
import { ThemeContext } from '@/app/context/themeContext';
import AspectRatio from '@/components/aspectRatio';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import { useContext, useMemo } from 'react';

export default function Fragment({ year, matriz, content }: any) {
	return (
		<>
			<div className="p-2 md:py-6 md:px-8">
				<div className="w-full rounded-2xl flex flex-col items-center">
					<Navbar />
				</div>
				<div className="w-full flex flex-col items-center mb-20">
					<Content year={year} matriz={matriz} content={content} />
				</div>
			</div>
			<Footer />
		</>
	);
}

const Content = ({ year, matriz, content }: any) => {
	const splited = content?.acf?.conteudo.split('|');
	const { screenFormat } = useContext(ThemeContext);

	return (
		<div className="px-2 md:px-20 w-full">
			<div className="w-full flex flex-col items-center mb-20">
				<div className="w-full flex flex-col gap-4 mt-8 mb-10 ">
					<div className="w-full flex justify-between items-center gap-2">
						<h1 className="w-full  text-xl md:text-3xl font-semibold text-neutral-700 mt-0 md:mt-8 text-left md:text-center text-primary">
							{splited[0]}
						</h1>
						<Link
							href={`/ano/${year}/matriz/${matriz?.acf?.slug}`}
							className="ml-auto text-sm cursor-pointer bg-primary text-white px-4 md:px-6 py-2 rounded-lg items-center justify-center flex gap-2"
						>
							<svg
								width={screenFormat === 'mobile' ? '20' : '32'}
								height={screenFormat === 'mobile' ? '20' : '32'}
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
					<ShowContent content={content} url={splited[1] || ''} />
				</div>
			</div>
		</div>
	);
};

const ShowContent = ({ content, url }: any) => {
	const type = useMemo(() => {
		const index = (content?.acf?.apresentacao || '').toLowerCase();
		const options: any = {
			'leitor de pdf': 'iframe',
			'player de video': 'video',
			'link de acesso': 'link',
		};
		return options[index] || 'link';
	}, [content?.acf?.apresentacao]);

	return (
		<>
			{type === 'iframe' && (
				<div style={{ width: `100%`, height: `1024px`, overflow: `auto` }}>
					<iframe
						className="rounded-3xl"
						src={url}
						style={{ width: `100%`, height: `100%`, border: `none` }}
					/>
				</div>
			)}
			{type === 'video' && (
				<iframe
					className="rounded-3xl"
					width="100%"
					height="600px"
					src={url}
					style={{ border: 'none' }}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			)}
			{type === 'link' && (
				<div className="w-full flex items-center justify-center">
					<Link
						href={url}
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
