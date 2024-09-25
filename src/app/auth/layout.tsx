export default function AuthTemplate({ children }: any) {
	return (
		<div
			className="h-fill w-full items-center justify-center flex"
			style={{
				backgroundImage: `url(/assets/images/login-bg.svg)`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className="w-full max-w-[556px] py-10 overflow-y-auto">
				{children}
			</div>
		</div>
	);
}
