'use client';
import { GlobalContext } from '@/app/context/globalContext';
import Carousel from '@/components/carousel';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { useContext } from 'react';

export default function Fragment({ year }: any) {
	const { carouselSlides } = useContext(GlobalContext);

	return (
		<>
			<div className="p-2 md:py-6 md:px-8">
				<div className="w-full bg-gray-300 rounded-2xl flex flex-col p-4 items-center">
					<Navbar />
					<Carousel slides={carouselSlides} />
				</div>
				<div className="w-full flex flex-col items-center mb-20">asdads</div>
			</div>
			<Footer />
		</>
	);
}
