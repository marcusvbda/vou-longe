'use client';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { GlobalContext } from './context/globalContext';
import { useContext, useEffect, useState } from 'react';
import { getPosts } from '@/services/wordpress';
import { ThemeContext } from './context/themeContext';
import Link from 'next/link';

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
					{perfil === 'gestor' && <GestorContent />}
					{perfil === 'aluno' && <AlunoContent />}
					{perfil === 'professor' && <ProfessorContent />}
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
			const typeMenus: any = await getPosts('menu');
			const filtered = (typeMenus?.items || [])
				.filter((x: any) => x?.acf?.perfil === 'gestor')
				.map((x: any) => {
					return {
						items: (x?.acf?.itens || '')
							.split('\r\n')
							.map((item: any) => item.split('|')),
						title: x?.acf?.titulo || '',
					};
				});
			setMenus(filtered);
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
			const filtered = (areas?.items || []).filter((x: any) =>
				(x?.acf?.anos_que_possuem_acesso || '')
					.split(',')
					.map(parseInt)
					.includes(anoDoAluno)
			);
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
										backgroundImage: `url(${
											item?.acf?.imagem_de_fundo || site?.acf?.background_card
										})`,
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

const ProfessorContent = () => {
	const { site } = useContext(ThemeContext);
	const [loadingMenu, setLoadingMenu] = useState(true);
	const [anos, setAnos] = useState<any>({});

	useEffect(() => {
		const getAreas = async () => {
			setLoadingMenu(true);
			const areas: any = await getPosts('area-de-conhecimento');
			let resAnos: any = {};
			const filtered = areas?.items || [];
			for (let i = 0; i < filtered.length; i++) {
				const splited = (filtered[i]?.acf?.anos_que_possuem_acesso || '').split(
					','
				);
				for (let y = 0; y < splited.length; y++) {
					const ano = splited[y];
					const index = `${ano}º Ano`;
					if (resAnos[index] === undefined)
						resAnos[index] = { index: ano, items: [] };
					resAnos[index].items.push(filtered[i]);
				}
			}
			setAnos(resAnos);
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
					{!Object.keys(anos).length && (
						<div className="text-2xl text-muted">Nenhum ano encontrado</div>
					)}
					{Object.keys(anos).map((ano: string, key: number) => (
						<div key={key} className="mb-16 w-full">
							<h1 className="text-3xl font-semibold text-neutral-700 mt-8 text-center text-primary mb-4">
								{ano}
							</h1>
							<div
								className="w-full flex gap-8 wrap justify-center items-center"
								style={{ flexWrap: 'wrap' }}
							>
								{!anos[ano]?.items.length && (
									<div className="text-2xl text-muted">
										Nenhuma area encontrado
									</div>
								)}
								{(anos[ano]?.items || []).map((item: any, index: any) => (
									<Link
										href={`/ano/${anos[ano]?.index}?area=${item?.acf?.nome_da_area}`}
										key={index}
										className="w-full md:w-[340px] h-[240px] flex p-4 border border-gray-100 rounded-2xl"
										style={{ maxWidth: '340px' }}
									>
										<div
											className="p-4 w-full text-white  rounded-2xl text-center flex font-semibold items-center justify-center text-3xl"
											style={{
												backgroundImage: `url(${
													item?.acf?.imagem_de_fundo ||
													site?.acf?.background_card
												})`,
												backgroundSize: 'cover',
												backgroundRepeat: 'no-repeat',
											}}
										>
											{item?.acf?.nome_da_area}
										</div>
									</Link>
								))}
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};
