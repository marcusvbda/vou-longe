'use client';

import { useState } from 'react';
import AspectRatio from './aspectRatio';

export default function Carousel({ slides }: any) {
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<div className="relative w-full mt-20 mb-8">
			<div className="overflow-hidden w-full">
				<div
					className="flex transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${currentSlide * 100}%)` }}
				>
					{slides.map((slide: any, index: any) => (
						<div key={index} className="w-full flex-shrink-0 px-4">
							<div className="flex flex-col items-center gap-4 px-24 md:px-0">
								<h2 className="text-3xl font-semibold text-center">
									{slide.title}
								</h2>
								<small className="text-sm text-black/40">
									{slide.description}
								</small>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="w-full flex justify-between transform -translate-y-1/2 px-4">
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
				<button
					onClick={() =>
						setCurrentSlide(Math.min(currentSlide + 1, slides.length - 1))
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
			<div className="w-100 justify-center bottom-4 mt-10 flex gap-2">
				{slides.map((_: any, index: any) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`cursor-pointer h-4 ${
							currentSlide === index
								? 'bg-gray-500 w-8 rounded-lg'
								: 'bg-gray-400 rounded-md w-4'
						}`}
					/>
				))}
			</div>
		</div>
	);
}
