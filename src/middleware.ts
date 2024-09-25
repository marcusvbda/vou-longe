import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('session-token');

	const isLogged = token ? true : false;

	if (!isLogged) {
		const url = req.nextUrl.clone();
		url.pathname = '/auth/login';
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!auth|_next|.*\\..*).*)'],
};
