import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { useFavoriteMovies } from '@/layout/Sidebar/MoviesContainer/FavoriteMovies/useFavoriteMovies'

import { useFavorites } from '@/screens/favorites/useFavorites'

import { UserService } from '@/services/user.service'

import { toastrError } from '@/utils/toastr-error'

import styles from './FavoriteButton.module.sass'
import HeartImage from './heart-animation.png'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState<boolean>(false)
	const { dataFavorites, refetch } = useFavorites()
	const { refetch: refetchFavoriteMovies } = useFavoriteMovies()
	useEffect(() => {
		if (!dataFavorites) return
		const isHasMovie = dataFavorites.some((f) => f._id === movieId) //some возвращает true или false
		setIsSmashed(isHasMovie)
	}, [dataFavorites, movieId])

	const { mutateAsync: mutateFavorites } = useMutation(
		'update favorites',
		() => UserService.toggleFavoriteMovies(movieId),
		{
			onError(err) {
				toastrError(err, 'Update favorite list')
			},
			onSuccess() {
				setIsSmashed(!isSmashed)
				refetch()
				refetchFavoriteMovies()
			},
		}
	)
	return (
		<button
			onClick={() => mutateFavorites()}
			className={`${styles.button} ${isSmashed && styles.animate}`}
			style={{ backgroundImage: `url(${HeartImage.src})` }}
		/>
	)
}

export default FavoriteButton
