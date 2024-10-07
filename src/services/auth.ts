'use server';

import { cookies } from 'next/headers';
import { findPost } from './wordpress';
import * as crypto from 'crypto';
import axios from 'axios';

export const login = async (form: any) => {
	try {
		let data = JSON.stringify({
			login: form.username,
			senha: form.password,
			criptografia: 'SHA512',
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: `${process.env.NEXT_AUTH_API_URL}/Autenticacao/LoginHub`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: data,
		};

		const response = await axios.request(config);
		const result: any = decrypt(response.data?.itemToken);
		if (!result?.Identificacao) {
			return { success: false, message: 'Credenciais inválidas' };
		}
		console.log(
			result?.Sistemas.map((x: any) => x?.ComponenteCurricular)
				.filter((x: any) => x)
				.map(parseInt)
		);
		const token = {
			Identificacao: result?.Identificacao,
			anoEscolar: result?.Sistemas.map((x: any) => x?.ComponenteCurricular)
				.filter((x: any) => x)
				.map(parseInt),
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
	} catch (error) {
		return { success: false, message: 'Credenciais inválidas' };
	}
};

export const logout = () => {
	cookies().delete('session-token');
};

export const getSession = () => {
	const token = cookies().get('session-token')?.value;
	if (!token) return null;
	return JSON.parse(token);
};

export const getSite = async () => {
	const result = await findPost(
		'configuracao-de-site',
		'slug',
		'vou-mais-longe'
	);
	return result;
};

const decrypt = (encryptedText: string) => {
	const key = process.env.NEXT_AUTH_SECRET || '';
	const base64Decoded = Buffer.from(encryptedText, 'base64').toString('utf8');
	const payload = JSON.parse(base64Decoded);
	const aesKey = Buffer.from(key, 'utf8');
	const iv = Buffer.from(payload.iv, 'base64');
	const encryptedValue = Buffer.from(payload.value, 'base64');
	const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
	decipher.setAutoPadding(true);
	let decrypted = decipher.update(encryptedValue as any, 'base64', 'utf8');
	decrypted += decipher.final('utf8');
	return JSON.parse(Buffer.from(decrypted, 'base64').toString('utf8'));
};
