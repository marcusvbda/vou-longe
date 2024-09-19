import AspectRatio from './aspectRatio';
import Carousel from './carousel';
import DropdownMenu from './DropdownMenu';

export default function Navbar() {
	const initialItems = [
		{
			href: '#',
			title: '1° Ano',
			icon: '/assets/images/note.svg',
			description:
				'Conteúdos básicos e lúdicos para introduzir a leitura, escrita e números.',
		},
		{
			href: '#',
			title: '2° Ano',
			icon: '/assets/images/book.svg',
			description:
				'Conteúdos que fortalecem a leitura e escrita e cálculos simples.',
		},
		{
			href: '#',
			title: '3° Ano',
			icon: '/assets/images/compass.svg',
			description:
				'Aprofundamento nas habilidades de leitura, escrita e matemática.',
		},
		{
			href: '#',
			title: '4° Ano',
			icon: '/assets/images/globe.svg',
			description:
				'Estudos em ciências, expandindo o conhecimento sobre o mundo.',
		},
		{
			href: '#',
			title: '5° Ano',
			icon: '/assets/images/idea.svg',
			description: 'Desenvolvimento de habilidades críticas e criatividade.',
		},
	];

	const finalItems = [
		{
			href: '#',
			title: '1° Ano',
			icon: '/assets/images/note.svg',
			description:
				'Conteúdos básicos e lúdicos para introduzir a leitura, escrita e números.',
		},
	];

	return (
		<div className="bg-white px-6 py-4 rounded-2xl shadow-md w-full md:w-8/12 flex flex-col md:flex-row items-center gap-4 border border-gray-100">
			<a
				href="/"
				className="pb-6 cursor-pointer hover:opacity-70 transition duration-300"
			>
				<AspectRatio
					src="/assets/images/logo-gray.svg"
					alt="Logo"
					size={{ width: 212 }}
				/>
			</a>
			<div className="ml-0 md:ml-auto flex items-center gap-4">
				<DropdownMenu title="Anos Iniciais" items={initialItems} />
				<DropdownMenu title="Anos Finais" items={finalItems} />
				<div className="ml-0 md:ml-auto flex gap-2 items-center cursor-pointer">
					<div className="h-12 w-12 bg-gray-400 rounded-full flex"></div>
					<div className="flex flex-col gap-0 text-neutral-700 text-sm">
						<div>
							Olá, <strong className="font-semibold">Beatriz!</strong>
						</div>
						<div>Sair da conta</div>
					</div>
				</div>
			</div>
		</div>
	);
}
