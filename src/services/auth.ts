'use server';

import { cookies } from 'next/headers';

export const login = (form: any) => {
	if (form.username === 'admin@admin.com' && form.password === 'admin') {
		const token = {
			Identificacao: [
				{
					Uuid: '3dddd484-59e5-42d6-a880-0661ad183b42',
					Login: '2024499072',
					Nome: 'Arthur Santos Neto',
					Ativo: true,
					Perfis: ['Gestor Secretaria'],
					DataHoraGeracao: '2024-09-20T16:46:04.1974527-03:00',
				},
			],
		};

		let payload: any = {
			name: 'session-token',
			value: JSON.stringify(token),
			httpOnly: true,
			path: '/',
		};

		if (payload.remember) payload.maxAge = 60 * 60 * 24;
		cookies().set(payload);

		return { success: true, message: 'Login bem-sucedido' };
	}

	return { success: false, message: 'Credenciais inválidas' };
};

export const logout = () => {
	cookies().delete('session-token');
};

export const getSession = () => {
	const token = cookies().get('session-token')?.value;
	if (!token) return null;
	return JSON.parse(token);
};
