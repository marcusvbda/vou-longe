import { useMemo } from 'react';

export default function Footer() {
	const currentYear = useMemo(() => new Date().getFullYear(), []);

	return (
		<footer className="w-full bg-gray-300 h-56 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-10 md:px-20">
			<div className="flex flex-col gap-2">
				<img src="/assets/images/logo.svg" />
				<small className="text-black/30">
					©Vou + Longe {currentYear}. Todos os direitos reservados
				</small>
			</div>
			<div className="flex flex-row gap-4 items-center">
				<a
					href="#"
					target="_blank"
					className="cursor-pointer hover:opacity-70 transition duration-300"
				>
					<img src="/assets/images/insta.svg" />
				</a>
				<a href="#" target="_blank">
					<img
						src="/assets/images/linkedin.svg"
						className="cursor-pointer hover:opacity-70 transition duration-300"
					/>
				</a>
				<a href="#" target="_blank">
					<img
						src="/assets/images/face.svg"
						className="cursor-pointer hover:opacity-70 transition duration-300"
					/>
				</a>
				<a href="#" target="_blank">
					<img
						src="/assets/images/youtube.svg"
						className="cursor-pointer hover:opacity-70 transition duration-300"
					/>
				</a>
			</div>
		</footer>
	);
}
