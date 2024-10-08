import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('session-token');
	const isLogged = !!token;

	// Verifica se a rota é /portal/auth ou se o usuário já está logado
	if (!isLogged && !req.nextUrl.pathname.startsWith('/portal/auth')) {
		const url = req.nextUrl.clone();
		url.pathname = '/portal/auth/login';
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/portal/:path*'],
};
