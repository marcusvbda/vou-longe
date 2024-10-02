import Link from 'next/link';

export default function WppBtn() {
	return (
		<Link
			href="https://api.whatsapp.com/send/?phone=5541991937458&text=Ol%C3%A1%21+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+seus+produtos.&type=phone_number&app_absent=0"
			target="_blank"
			className="z-10 cursor rounded-xl fixed right-6 bottom-6 bg-white text-[#25D366] flex items-center text-lg border border-gray-200 gap-2 px-4 py-2"
		>
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
				<path
					d="M13.4921 18.5018C15.8206 20.8314 18.771 22.3162 20.5257 20.569L20.9513 20.1434C21.5177 19.577 21.4388 18.6394 20.7817 18.1817C20.3668 17.8927 19.9209 17.5823 19.4281 17.2356C18.9182 16.8772 18.2185 16.9316 17.7758 17.3711L17.2948 17.8489C16.6985 17.4713 16.1086 16.986 15.5604 16.4388L15.5582 16.4367C15.011 15.8895 14.5257 15.2985 14.1481 14.7023L14.626 14.2212C15.0654 13.7785 15.1209 13.0777 14.7604 12.5679C14.4137 12.0761 14.1033 11.6313 13.8164 11.2175C13.3598 10.5582 12.4211 10.4782 11.8537 11.0457L11.4281 11.4713C9.68193 13.226 11.1657 16.1743 13.4942 18.505"
					stroke="#25D366"
					strokeWidth="1.71429"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M21.1475 25.7546C19.4128 26.728 17.4155 27.2893 15.2861 27.2893C8.65813 27.2893 3.28613 21.9173 3.28613 15.2893C3.28613 8.66131 8.65813 3.28931 15.2861 3.28931C21.9141 3.28931 27.2861 8.66131 27.2861 15.2893C27.2861 17.42 26.7248 19.4173 25.7515 21.1506L27.2861 27.2893L21.1475 25.7546Z"
					stroke="#25D366"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			WhatsApp
		</Link>
	);
}
