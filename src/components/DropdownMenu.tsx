'use client';
import { useState } from 'react';
import AspectRatio from './aspectRatio';
import Link from 'next/link';

export default function DropdownMenu({ title, items }: any) {
	const [open, setOpen] = useState(false);
	const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

	return (
		<div
			className="relative"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => {
				setOpen(false);
				setActiveItemIndex(null); // Fecha o submenu ao sair
			}}
		>
			<button
				onClick={() => setOpen(!open)}
				className="flex gap-1 items-center text-primary font-semibold cursor-pointer"
			>
				{title}
				<div
					className={`transition-transform duration-300 ${
						open ? 'rotate-180' : ''
					}`}
				>
					<svg className="size-2.5 mx-3" fill="none" viewBox="0 0 10 6">
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m1 1 4 4 4-4"
						/>
					</svg>
				</div>
			</button>

			{open && (
				<div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80">
					<ul className="py-2 text-sm text-gray-700">
						{items.map((item: any, index: any) => (
							<li
								key={index}
								className="relative"
								onMouseEnter={() => setActiveItemIndex(index)}
								onMouseLeave={() => setActiveItemIndex(null)}
							>
								<a
									href={item[2]}
									className="px-4 py-2 text-neutral-900 hover:bg-gray-100 items-start w-full flex gap-4"
								>
									<AspectRatio
										src={item[3]}
										alt=""
										className="relative top-1"
										size={{
											width: 40,
										}}
									/>
									<div className="flex flex-col">
										<strong className="font-semibold text-neutral-800">
											{item[0]}
										</strong>
										<small className="text-xs text-black/40">{item[1]}</small>
									</div>
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
