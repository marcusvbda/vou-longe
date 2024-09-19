'use server';

import { PostIds } from '@/constants/posts';

export const getAcfField = async (
	post: string,
	field = '',
	defaultValue = null
) => {
	try {
		const postId = (PostIds as any)?.[post] || 0;
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/acf/v3/posts/${postId}?field=${field}`
		);

		const result = await res.json();
		return result?.[field] || defaultValue;
	} catch (error) {
		console.log(error);
		return {
			[field]: defaultValue,
		};
	}
};
