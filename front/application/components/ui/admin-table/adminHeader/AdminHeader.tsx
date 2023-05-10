import { ChangeEvent, FC } from 'react'

import SearchField from '@/ui/searchField/SearchField'

import AdminCreateButton from './AdminCreateButton'
import styles from './AdminHeader.module.sass'

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({
	onClick,
	searchTerm,
	handleSearch,
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onClick ? <AdminCreateButton onClick={onClick} /> : <></>}
		</div>
	)
}

export default AdminHeader
