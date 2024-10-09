'use client';

import { useEffect, useState } from 'react';

export default function HydratationPrevent({ children }: any) {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		setVisible(true);
	}, []);

	if (!visible) return null;
	return children;
}
