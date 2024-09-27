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
				</div>
				{/* <div className="w-full flex flex-col items-center mb-20">
					{loadingYears ? (
						<div className="w-full flex py-24 items-center justify-center">
							<div className="spinner size-14" />
						</div>
					) : (
						<>
							<div className="w-full bg-white py-20 flex items-center gap-2 justify-between flex-col md:flex-row">
								<h1 className="text-3xl font-semibold text-neutral-700">
									Escolha o ano escolar
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
				</div> */}
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
							{menus[selected].items.map((item: any, index: any) => (
								<Link
									href={item[2]}
									key={index}
									className="w-full md:w-[340px] h-[240px] flex"
									style={{ maxWidth: '340px' }}
								>
									<div
										className="border border-gray-100 rounded-2xl p-4 w-full text-white text-center flex font-semibold items-center justify-center text-3xl"
										style={{
											backgroundImage: `url(${
												site?.acf?.background_card || ''
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
