'use client';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { GlobalContext } from './context/globalContext';
import { useContext, useEffect, useState } from 'react';
import { getPosts } from '@/services/wordpress';
import { ThemeContext } from './context/themeContext';
import Link from 'next/link';
import { menuGestor } from './constants/gestor';

export default function Home() {
	const { perfil } = useContext(GlobalContext);

	return (
		<>
			<div className="p-2 md:py-6 md:px-8">
				<div className="w-full flex flex-col p-4 items-center">
					<Navbar />
					<Carousel />
				</div>
				<div className="w-full flex relative -top-24 flex-col">
					{perfil === 'aluno' && <AlunoContent />}
					{perfil === 'gestor' && <GestorContent />}
				</div>
			</div>
			<Footer />
		</>
	);
}

const GestorContent = () => {
	const { site } = useContext(ThemeContext);
	const [loadingMenu, setLoadingMenu] = useState(true);
	const [selected, setSeleted] = useState(0);
	const [menus, setMenus] = useState<any>([]);

	useEffect(() => {
		const getMenus = async () => {
			setLoadingMenu(true);
			setMenus(menuGestor);
			setLoadingMenu(false);
		};
		getMenus();
	}, []);

	return (
		<div className="w-full flex flex-col items-center">
			{loadingMenu ? (
				<div className="w-full flex py-24 items-center justify-center">
					<div className="spinner size-14" />
				</div>
			) : (
				<>
					<div className="w-full bg-white flex items-center gap-2 justify-between flex-col">
						<div className="flex w-full gap-2 justify-center mb-10">
							{!menus.length && (
								<div className="text-2xl text-muted">
									Nenhum tipo de ano encontrado
								</div>
							)}
							{menus.map((menu: any, key: any) => (
								<button
									key={key}
									onClick={() => setSeleted(key)}
									className={`btn px-4 py-2 rounded-full ${
										selected === key
											? 'bg-secondary text-white'
											: 'text-secondary'
									}`}
								>
									{menu.title}
								</button>
							))}
						</div>
						<div
							className="w-full flex gap-8 wrap justify-center items-center"
							style={{ flexWrap: 'wrap' }}
						>
							{!menus[selected].items.length && (
								<div className="text-2xl text-muted">Nenhum ano encontrado</div>
							)}
							{menus[selected].items.map((item: any, index: any) => (
								<Link
									href={item[2]}
									key={index}
									className="w-full md:w-[340px] h-[240px] flex p-4 border border-gray-100 rounded-2xl"
									style={{ maxWidth: '340px' }}
								>
									<div
										className="p-4 w-full text-white  rounded-2xl text-center flex font-semibold items-center justify-center text-3xl"
										style={{
											backgroundImage: `url(${
												item?.acf?.imagem_de_fundo || site?.acf?.background_card
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
				</>
			)}
		</div>
	);
};

const AlunoContent = () => {
	const { anoDoAluno } = useContext(GlobalContext);
	const { site } = useContext(ThemeContext);
	const [loadingMenu, setLoadingMenu] = useState(true);
	const [areas, setAreas] = useState<any>([]);

	useEffect(() => {
		const getAreas = async () => {
			setLoadingMenu(true);
			const areas: any = await getPosts('area-de-conhecimento');
			const filtered = areas?.items || [];
			setAreas(filtered);
			setLoadingMenu(false);
		};
		getAreas();
	}, []);

	return (
		<div className="w-full flex flex-col items-center">
			{loadingMenu ? (
				<div className="w-full flex py-24 items-center justify-center">
					<div className="spinner size-14" />
				</div>
			) : (
				<>
					<div
						className="w-full flex gap-8 wrap justify-center items-center"
						style={{ flexWrap: 'wrap' }}
					>
						{!areas.length && (
							<div className="text-2xl text-muted">Nenhuma área encontrada</div>
						)}
						{areas.map((item: any, index: any) => (
							<Link
								href={`/ano/${anoDoAluno}?area=${item?.acf?.nome_da_area}`}
								key={index}
								className="w-full md:w-[340px] h-[240px] flex p-4 border border-gray-100 rounded-2xl"
								style={{ maxWidth: '340px' }}
							>
								<div
									className="p-4 w-full text-white  rounded-2xl text-center flex font-semibold items-center justify-center text-3xl"
									style={{
										backgroundImage: `url(${item?.acf?.thumbnail})`,
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
									}}
								>
									{item?.acf?.nome_da_area}
								</div>
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);
};
