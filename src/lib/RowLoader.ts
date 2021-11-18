export class RowLoader {
	#fetch: Function;
	#delegate: Function;
	#rows: [Map<string, any>];
	completed: boolean;
	currentPage: number;
	pageSize: number;
	totalCount: number;

	constructor(fetch: Function, delegate: Function, rows: [Map<string, object>], pageSize?: number) {
		this.#fetch = fetch;
		this.#delegate = delegate;
		this.#rows = rows;
		this.currentPage = 0;
		this.totalCount = 0;
		this.completed = false;
		this.pageSize = pageSize ? pageSize : 20;
	}

	async get(params?: Record<string, string>, restart?: boolean): Promise<[Map<string, object>]> {
		if (restart) {
			this.#rows = [];
			this.currentPage = 0;
			this.totalCount = 0;
			this.completed = false;
		}
		if (!params) {
			params = {};
		}
		params.currentPage = this.currentPage;
		params.pageSize = this.pageSize;
		const result = await this.#delegate(this.#fetch, params);
		if (result) {
			this.currentPage = result.currentPage + 1;
			this.totalCount = result.totalCount
			this.completed = this.pageSize * this.currentPage >= this.totalCount;
			if (result.elements) {
				this.#rows = [...this.#rows, ...result.elements];
			}
		}
		return this.#rows;
	}
}
