import Link from 'next/link';
import AspectRatio from './aspectRatio';

export default function DefaultNavbar({
	homeLink,
	site,
	screenFormat,
	children,
	append = null,
}: any) {
	return (
		<div className="bg-white p-4 md:px-6 py-4 rounded-3xl shadow-md w-full md:w-10/12 flex items-center gap-4 border border-gray-100 z-10 flex-col">
			<div className="w-full flex items-center gap-2">
				<Link
					href={homeLink}
					className="pb-0 md:pb-2 cursor-pointer hover:opacity-70 transition duration-300"
				>
					<AspectRatio
						src={site?.acf?.logo_navbar || ''}
						alt="Logo"
						size={{ width: screenFormat ? 150 : 212 }}
					/>
				</Link>
				{children}
			</div>
			{append && append}
		</div>
	);
}
