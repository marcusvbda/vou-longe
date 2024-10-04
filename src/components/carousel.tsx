'use client';

import { useContext, useEffect, useState } from 'react';
import AspectRatio from './aspectRatio';
import { ThemeContext } from '@/app/context/themeContext';

export default function Carousel() {
	const { site, screenFormat } = useContext(ThemeContext);
	const [slides] = useState(
		(site?.acf?.itens_carousel_home || '')
			.split('\r\n')
			.map((item: any) => item.split('|'))
	);
	const [currentSlide, setCurrentSlide] = useState(0);

	// Função para mover para o próximo slide
	const nextSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === slides.length - 1 ? 0 : prevSlide + 1
		);
	};

	// Função para mover para o slide anterior
	const prevSlide = () => {
		setCurrentSlide((prevSlide) =>
			prevSlide === 0 ? slides.length - 1 : prevSlide - 1
		);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => clearInterval(intervalId);
	}, [currentSlide, slides.length]);

	return (
		<div className="relative w-full h-[350px] md:h-[634px] mb-8 top-4 md:top-[-130px]">
			<div className="overflow-hidden h-full w-full">
				<div
					className="flex h-full transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${currentSlide * 100}%)` }}
				>
					{slides.map((slide: any, index: any) => (
						<div
							key={index}
							className="w-full h-full flex-shrink-0 px-1 md:px-4 rounded-[50px]"
							style={{
								backgroundImage: `url(${slide[0]})`,
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<div className="w-full flex h-full items-center justify-between relative">
								<button
									onClick={prevSlide}
									className="cursor-pointer hover:opacity-70 transition duration-300 absolute"
								>
									<AspectRatio
										src="/assets/images/arrow-btn-prev.svg"
										alt="Previous"
										size={{ width: screenFormat === 'mobile' ? 40 : 50 }}
									/>
								</button>
								<div className="w-full h-full flex items-start md:items-center px-10 md:px-20">
									<div className="w-full md:w-7/12 flex flex-col">
										{slide[1] && (
											<h1
												className="text-2xl md:text-6xl font-semibold mt-10 md:mt-0 font-lexend-deca text-center md:text-left"
												dangerouslySetInnerHTML={{ __html: slide[1] }}
											/>
										)}
										{slide[2] && (
											<div
												className="mt-4 text-center md:text-left"
												dangerouslySetInnerHTML={{ __html: slide[2] }}
											/>
										)}
									</div>
								</div>
								<button
									onClick={nextSlide}
									className="cursor-pointer hover:opacity-70 transition duration-300 absolute right-0"
								>
									<AspectRatio
										src="/assets/images/arrow-btn-next.svg"
										alt="Next"
										size={{ width: screenFormat === 'mobile' ? 40 : 50 }}
									/>
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="w-100 transition-all duration-300 justify-center bottom-4 mt-auto relative -top-20 flex gap-2">
					{slides.map((_: any, index: any) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`cursor-pointer bg-white h-4 ${
								currentSlide === index ? 'w-8 rounded-lg' : 'rounded-md w-4'
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
