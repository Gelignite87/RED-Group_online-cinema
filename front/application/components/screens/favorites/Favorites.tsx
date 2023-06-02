import { FC } from 'react'

import SkeletonLoader from '@/ui/SceletonLoader'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.sass'
import { useFavorites } from './useFavorites'

const Favorites: FC = () => {
	const { dataFavorites, isLoading } = useFavorites()
	return (
		<Meta title="Favorites">
			<Heading title="Favorites" />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					dataFavorites?.map((m) => <FavoriteItem key={m._id} movie={m} />)
				)}
			</section>
		</Meta>
	)
}

export default Favorites
