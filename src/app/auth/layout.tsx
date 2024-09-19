import AspectRatio from '@/components/aspectRatio';

export default function AuthTemplate({ children }: any) {
	return (
		<div className="h-full flex">
			<div className="w-full md:w-6/12 px-10 md:px-40 py-10 overflow-y-auto">
				<AspectRatio src="/assets/images/logo-gray.svg" size={{ height: 48 }} />
				{children}
			</div>
			<div className="w-full md:w-6/12 hidden md:flex h-full bg-[#C7C7C7] items-center justify-center">
				<AspectRatio
					src="/assets/images/login-bg.svg"
					size={{ width: '100%' }}
				/>
			</div>
		</div>
	);
}
