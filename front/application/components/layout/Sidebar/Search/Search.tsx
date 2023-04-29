import { FC } from 'react'

import SearchField from '@/ui/searchField/SearchField'

import SearchList from './SearchList/SearchList'
import styles from './search.module.sass'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, handleSearch, data, searchTerm } = useSearch()
	return (
		<div className={styles.wrapper}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}
export default Search
