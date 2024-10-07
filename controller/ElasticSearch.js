export class ElasticSearch {
	static async getAllDoc(c) {
		const esUrl = c.env.URL_ELASTIC + '/' + c.env.INDEX_DB + '/_search';
		const esAuth = 'ApiKey ' + c.env.API_KEY;
		const esQuery = {
			size: 10000,
			query: {
				match_all: {},
			},
		};
		const response = await (
			await fetch(esUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: esAuth,
				},
				body: JSON.stringify(esQuery),
			})
		).json();
		return response.hits.hits;
	}
	static async deleteAllDoc(c) {
		var results = await ElasticSearch.getAllDoc(c);
		const ids = results.map((e) => e._id);
		for (var element of ids) {
			const esUrl = c.env.URL_ELASTIC + '/' + c.env.INDEX_DB + '/_doc/' + element;
			const esAuth = 'ApiKey ' + c.env.API_KEY;
			var response = await (
				await fetch(esUrl, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: esAuth,
					},
				})
			).json();
			if (response.result === 'not_found') {
				return c.json("document doesn't exist", 400);
			}
		}
		return c.json('deleted all document', 200);
	}
}
