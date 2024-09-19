import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	console.log('entrou no middleware');
	const isLogged = false;

	if (!isLogged) {
		const url = request.nextUrl.clone();
		url.pathname = '/auth/login';
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!auth|_next|.*\\..*).*)'],
};
