'use client';
import { useState } from 'react';
import AspectRatio from './aspectRatio';

export default function DropdownMenu({ title, items }: any) {
	const [open, setOpen] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<button
				onClick={() => setOpen(!open)}
				className="flex gap-1 items-center text-neutral-600 hover:text-neutral-900 transition duration-300 cursor-pointer"
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
							<li key={index}>
								<a
									href={item.href}
									className="px-4 py-2 text-neutral-900 hover:bg-gray-100 items-start w-full flex gap-4"
								>
									<AspectRatio
										src={item.icon}
										alt=""
										className="relative top-1"
										size={{
											width: 24,
										}}
									/>
									<div className="flex flex-col">
										<strong className="font-semibold text-lg text-neutral-900">
											{item.title}
										</strong>
										<small className="text-sm text-black/40">
											{item.description}
										</small>
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
