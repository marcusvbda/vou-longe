'use client';

import AspectRatio from '@/components/aspectRatio';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useRouter } from 'next/navigation';
import { login, logout } from '@/services/auth';
import { ThemeContext } from '@/app/context/themeContext';

export default function Login() {
	const [initialized, setInitialized] = useState(false);
	const { site } = useContext(ThemeContext);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		username: process.env.NEXT_PUBLIC_DEFAULT_USERNAME || '',
		password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || '',
		remember: false,
	});

	useEffect(() => {
		logout();
		setInitialized(true);
	}, []);

	const onSubmitHandler = async (e: any) => {
		setLoading(true);
		e.preventDefault();
		const _data = await login(form);
		if (!_data.success && _data.message) {
			Swal.fire({
				title: 'Ooops !',
				text: _data.message,
				icon: 'error',
				confirmButtonText: 'Tentar novamente',
			});
			setLoading(false);
		}
		router.push('/');
	};

	if (!initialized) return <></>;

	return (
		<div className="bg-white p-6 flex item-center justify-center rounded-xl flex-col mt-10">
			<div className="bg-secondary rounded-xl max-w-[362px] py-8 px-10 flex items-center justify-center self-center relative -top-12">
				<AspectRatio src={site?.acf?.logo_login} size={{ height: 48 }} />
			</div>

			<form onSubmit={(e: any) => onSubmitHandler(e)}>
				<h1 className="text-3xl text-primary font-semibold font-concert-one">
					Login
				</h1>
				<small className="text-muted">
					Bem vindo de volta! Por favor, insira seus dados abaixo.
				</small>
				<div className="flex flex-col gap-6 mt-10">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-muted">Login</label>
							<input
								className="border border-gray-200 p-2 rounded-lg text-muted"
								placeholder="Insira seu login"
								value={form.username}
								onChange={(e) => setForm({ ...form, username: e.target.value })}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-muted">Senha</label>
							<input
								className="border border-gray-200 p-2 rounded-lg text-muted"
								type="password"
								placeholder="*****"
								value={form.password}
								onChange={(e) => setForm({ ...form, password: e.target.value })}
							/>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-1 justify-between w-full text-sm">
						<label className="flex items-center gap-2 text-muted">
							<input
								type="checkbox"
								checked={form.remember}
								onChange={(e) =>
									setForm({ ...form, remember: e.target.checked })
								}
							/>
							Lembrar de mim
						</label>
						{/* <a href="#" className="text-gray-600 font-semibold">
							Esqueci minha senha
						</a> */}
					</div>

					<button
						disabled={loading}
						className="disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 justify-center mt-4 w-full bg-primary py-3 px-auto rounded-lg text-white"
					>
						Entrar
						{loading && <div className="spinner size-4" />}
					</button>
				</div>
			</form>
		</div>
	);
}
