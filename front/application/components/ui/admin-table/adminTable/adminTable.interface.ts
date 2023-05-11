export interface ITableItem {
	[key: string]: string | string[] //все ключи (неограниченное количество) только типа string и содержат значения string | string[]
	_id: string
	editUrl: string
	items: string[]
}
export interface IAdminTableItem {
	tableItem: ITableItem
	removeHandler: () => void
}
