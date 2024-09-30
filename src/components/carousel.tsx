'use client';

import { use, useContext, useEffect, useState } from 'react';
import AspectRatio from './aspectRatio';
import { ThemeContext } from '@/app/context/themeContext';

export default function Carousel() {
	const { site } = useContext(ThemeContext);
	const [slides] = useState(
		(site?.acf?.itens_carousel_home || '')
			.split('\r\n')
			.map((item: any) => item.split('|'))
	);
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<div className="relative w-full h-[634px] mb-8 top-[-130px]">
			<div className="overflow-hidden h-full n w-full">
				<div
					className="flex h-full transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${currentSlide * 100}%)` }}
				>
					{slides.map((slide: any, index: any) => (
						<div
							key={index}
							className="w-full h-full flex-shrink-0 px-4 rounded-[50px]"
							style={{
								backgroundImage: `url(${slide[0]})`,
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<div className="w-full flex h-full items-center justify-between">
								<button
									onClick={() => setCurrentSlide(Math.max(currentSlide - 1, 0))}
									disabled={currentSlide === 0}
									className={`cursor-pointer hover:opacity-70 transition duration-300 ${
										currentSlide === 0 ? 'opacity-50' : ''
									}`}
								>
									<AspectRatio
										src="/assets/images/arrow-btn-prev.svg"
										alt="Previous"
										size={{ width: 50 }}
									/>
								</button>
								<div className="w-full flex px-20">
									<div className="w-full md:w-5/12 flex flex-col">
										{slide[1] && (
											<h1
												className="text-6xl font-semibold mt-10 md:mt-0"
												dangerouslySetInnerHTML={{ __html: slide[1] }}
											/>
										)}
										{slide[2] && (
											<div
												className="mt-4"
												dangerouslySetInnerHTML={{ __html: slide[2] }}
											/>
										)}
									</div>
								</div>
								<button
									onClick={() =>
										setCurrentSlide(
											Math.min(currentSlide + 1, slides.length - 1)
										)
									}
									disabled={currentSlide === slides.length - 1}
									className={`cursor-pointer hover:opacity-70 transition duration-300 ${
										currentSlide === slides.length - 1 ? 'opacity-50' : ''
									}`}
								>
									<AspectRatio
										src="/assets/images/arrow-btn-next.svg"
										alt="Previous"
										size={{ width: 50 }}
									/>
								</button>
							</div>
							<div className="w-100 justify-center bottom-4 mt-auto relative -top-20 flex gap-2">
								{slides.map((_: any, index: any) => (
									<button
										key={index}
										onClick={() => setCurrentSlide(index)}
										className={`cursor-pointer bg-white h-4 ${
											currentSlide === index
												? 'w-8 rounded-lg'
												: 'rounded-md w-4'
										}`}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
