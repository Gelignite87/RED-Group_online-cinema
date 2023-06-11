import dynamic from 'next/dynamic'
import { FC } from 'react'

const DinamicFavorites = dynamic(
	() => import('@/screens/favorites/Favorites'),
	{ ssr: false }
)

const FavoritesPage: FC = () => {
	return <DinamicFavorites />
}

export default FavoritesPage
