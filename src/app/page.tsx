'use client';
import AspectRatio from '@/components/aspectRatio';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { useMemo, useState } from 'react';

export default function Home() {
	const carouselSlides = useMemo(
		() => [
			{
				title: 'Conheça o livro de conteúdos de Língua Portuguesa',
				description:
					'Conteúdos completos e interativos para ajudar no desenvolvimento da leitura e escrita.',
			},
			{ title: 'Outro título', description: 'Outra descrição.' },
			{ title: 'Mais um título', description: 'Mais uma descrição.' },
		],
		[]
	);

	const contentData: any = useMemo(() => {
		return {
			initial: [
				{
					href: '#',
					title: '1° Ano',
					icon: '/assets/images/note.svg',
				},
				{
					href: '#',
					title: '2° Ano',
					icon: '/assets/images/book.svg',
				},
				{
					href: '#',
					title: '3° Ano',
					icon: '/assets/images/compass.svg',
				},
				{
					href: '#',
					title: '4° Ano',
					icon: '/assets/images/globe.svg',
				},
				{
					href: '#',
					title: '5° Ano',
					icon: '/assets/images/idea.svg',
				},
			],
			final: [
				{
					href: '#',
					title: '1° Ano',
					icon: '/assets/images/note.svg',
				},
			],
		};
	}, []);

	const [type, setType] = useState('initial');

	return (
		<div className="p-2 md:py-6 md:px-8">
			<div className="w-full bg-gray-300 rounded-2xl flex flex-col p-4 items-center">
				<Navbar />
				<Carousel slides={carouselSlides} />
			</div>
			<div className="w-full flex flex-col items-center mb-20">
				<div className="w-full bg-white py-20 flex items-center gap-2 justify-between flex-col md:flex-row">
					<h1 className="text-3xl font-semibold text-neutral-700">
						Escolha o ano escolar
					</h1>
					<div className="flex gap-2">
						<button
							onClick={() => setType('initial')}
							className={`btn px-4 py-2 rounded-full ${
								type === 'initial' ? 'bg-gray-600 text-white' : 'text-gray-600'
							}`}
						>
							Anos Iniciais
						</button>
						<button
							onClick={() => setType('final')}
							className={`btn px-4 py-2 rounded-full ${
								type === 'final' ? 'bg-gray-600 text-white' : 'text-gray-600'
							}`}
						>
							Anos Finais
						</button>
					</div>
				</div>

				<div className="w-full md:w-8/12 flex flex-wrap gap-8 justify-center">
					{contentData[type].map((item: any, index: any) => (
						<div key={index} className="w-full md:w-[250px]">
							<a
								href={item.href}
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
							</a>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}
