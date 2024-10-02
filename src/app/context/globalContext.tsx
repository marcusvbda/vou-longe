'use client';
import { ReactNode, createContext, useMemo } from 'react';

export const GlobalContext = createContext<any>({});

export const GlobalContextProvider = ({
	children,
	session,
}: any): ReactNode => {
	const perfil = useMemo(() => {
		const original = (
			session?.Identificacao?.[0]?.Perfis?.[0] || ''
		).toLowerCase();

		if (['super administrador'].includes(original)) {
			return 'gestor';
		}

		if (['aluno'].includes(original)) {
			return 'aluno';
		}

		if (['professor'].includes(original)) {
			return 'professor';
		}

		return 'aluno';
	}, [session]);

	const anoDoAluno = useMemo(() => {
		return 1;
		return session?.anoEscolar;
	}, [session]);

	return (
		<GlobalContext.Provider
			value={{
				session,
				perfil,
				anoDoAluno,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
