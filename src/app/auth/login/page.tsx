'use client';

import { findPost, getPosts } from '@/services/wordpress';
import { useEffect, useMemo, useState } from 'react';

export default function Login() {
	const [step, setStep] = useState<any>('student');

	const currentYear = useMemo(() => new Date().getFullYear(), []);

	const steps: any = useMemo(() => {
		return {
			student: 'Aluno',
			teacher: 'Professor',
			manager: 'Gestor',
		};
	}, []);

	useEffect(() => {
		getPosts('tipo-de-ano').then((res: any) => {
			console.log(res);
		});

		findPost('ano', 'acf.tipo_do_ano', 39).then((res: any) => {
			console.log(res);
		});

		findPost('ano', 'acf.tipo_do_ano', 39).then((res: any) => {
			console.log(res);
		});
	}, []);

	return (
		<>
			<form className="mt-20">
				<h1 className="text-3xl text-black font-semibold mb-4">Login</h1>
				<small className="text-gray-600">
					Bem vindo de volta! Por favor, insira seus dados abaixo.
				</small>

				<div className="w-full mt-8 p-1 border border-gray-300 flex gap-1 bg-gray-100 rounded-lg">
					{Object.keys(steps).map((row, index) => (
						<button
							type="button"
							key={index}
							className={`flex-1 shadown h-10 transition duration-300 flex items-center justify-center rounded-lg cursor-pointer ${
								step === row ? 'bg-white border border-gray-300' : ''
							}`}
							onClick={() => setStep(row)}
						>
							{steps[row]}
						</button>
					))}
				</div>

				<div className="flex flex-col gap-6 mt-10">
					{step === 'student' && (
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-1">
								<label className="text-neutral-700">RA</label>
								<input
									className="border border-gray-200 p-2 rounded-lg"
									placeholder="Insira seu RA"
								/>
							</div>
						</div>
					)}

					{step === 'teacher' && (
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-1">
								<label className="text-neutral-700">Código da Escola</label>
								<input
									className="border border-gray-200 p-2 rounded-lg"
									placeholder="Insira seu código"
								/>
							</div>
						</div>
					)}

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-neutral-700">E-mail</label>
							<input
								className="border border-gray-200 p-2 rounded-lg"
								type="email"
								placeholder="Insira seu email"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-1">
							<label className="text-neutral-700">Senha</label>
							<input
								className="border border-gray-200 p-2 rounded-lg"
								type="password"
								placeholder="******"
							/>
						</div>
					</div>

					{step === 'manager' && (
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-1">
								<label className="text-neutral-700">
									Código de Autenticação
								</label>
								<input
									className="border border-gray-200 p-2 rounded-lg"
									placeholder="Insira seu código"
								/>
							</div>
						</div>
					)}

					<div className="flex flex-col md:flex-row gap-1 justify-between w-full text-sm">
						<label className="flex items-center gap-2">
							<input type="checkbox" />
							Lembre de mim
						</label>
						<a href="#" className="text-gray-600 font-semibold">
							Esqueci minha senha
						</a>
					</div>

					<button className="mt-4 w-full bg-gray-600 py-2 px-auto rounded-lg text-white transition duration-300 hover:bg-gray-700 cursor-pointer">
						Entrar
					</button>
				</div>

				<div className="w-full mt-20 pb-8 text-black/50 text-xs">
					© Vou + Longe {currentYear}
				</div>
			</form>
		</>
	);
}
