import { HTMLBulder } from '../../../../utils/HTMLBulder.js';
import { TableInfinityServer } from '../../../common/table/table-infinity-server/index.js';

export class TableSales extends TableInfinityServer {
	constructor(headersConfig, { url = null, sorted, pageSize = 5, urlQueryPerem = {} } = {}) {
		super(headersConfig, {
			url,
			sorted,
			pageSize,
			urlQueryPerem,
		});
	}

	/**@override*/
	renderNextRows(data = []) {
		if (!data.length) {
			return;
		}

		const cells = this.headersConfig.map(({ id, template }) => ({
			id,
			template,
		}));

		const templateDefault = data => `<div class="sortable-table__cell">${data}</div>`;

		this.subElements.body.append(
			...data.map(data =>
				HTMLBulder.getElementFromString(`
				<div class="sortable-table__row">
					${cells.map(({ id, template = templateDefault }) => template(data[id])).join('')}
				</div>`),
			),
		);
	}
}
