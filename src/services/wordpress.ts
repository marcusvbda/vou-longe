'use server';

export const getPosts = async (postType: string, params: any = {}) => {
	const page = params?.page || 1;
	const route = `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/${postType}/${
		params?.id ? params?.id : ''
	}?order=${params.order || 'asc'}&orderby=${params.orderby || 'id'}&per_page=${
		params.per_page || 100
	}&page=${page}`;
	const res = await fetch(route, {
		cache: 'no-store',
	});

	const pages = res.headers.get('X-WP-TotalPages');
	const total = res.headers.get('X-WP-Total');

	const items = await res.json();

	return {
		items,
		page,
		pages: pages ? parseInt(pages) : 1,
		total: total ? parseInt(total) : 1,
	};
};

export const findPost = async (
	postType: string,
	filterType: string,
	filterValue: any
) => {
	let page = 1;
	const type = filterType !== 'id' ? 'compound' : 'simple';
	while (true) {
		let payload: any = { page };
		if (type === 'simple') payload.id = filterValue;
		const res = await getPosts(postType, payload);
		if (type === 'simple' && res) return res?.items;
		const { items, pages } = res;
		const found = (Array.isArray(items) ? items : [items]).find((item: any) => {
			return recursiveFind(item, filterType, filterValue);
		});
		if (found) return found;
		if (page >= pages) break;
		page++;
	}

	return null;
};

const recursiveFind = (obj: any, key: string, value: any) => {
	const splited = key.split('.');
	if (splited.length === 1) {
		return Array.isArray(obj[key])
			? obj[key].includes(value)
			: obj[key] === value;
	}
	return recursiveFind(obj[splited[0]], splited.slice(1).join('.'), value);
};
