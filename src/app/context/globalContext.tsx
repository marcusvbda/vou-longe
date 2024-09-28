'use client';
import { ReactNode, createContext, useMemo, useState } from 'react';

export const GlobalContext = createContext<any>({});

export const GlobalContextProvider = ({
	children,
	session,
}: any): ReactNode => {
	const [loadingYears, setLoadingYears] = useState(true);
	const [components, setComponents] = useState<any>([]);

	const perfil = useMemo(() => {
		const original = (
			session?.Identificacao?.[0]?.Perfis?.[0] || ''
		).toLowerCase();
		// if (['super administrador'].includes(original)) {
		// 	return 'gestor';
		// }

		return 'aluno';
	}, [session]);

	const anoDoAluno = useMemo(() => {
		return 1;
	}, [session]);

	return (
		<GlobalContext.Provider
			value={{
				session,
				perfil,
				loadingYears,
				components,
				anoDoAluno,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
