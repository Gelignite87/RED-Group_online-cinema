import { FC } from 'react'
import StarRating from 'react-star-rating-component'

import AuthButton from '@/ui/video-player/AuthPlaceholder/AuthButton'

import { useAuth } from '@/hooks/useAuth'

import styles from './RateMovie.module.sass'
import { useRateMovie } from './useRateMovie'

interface IRateMovie {
	id: string
	slug: string
}
const RateMovie: FC<IRateMovie> = ({ id, slug }) => {
	const { user } = useAuth()
	const { rating, isSended, handleClick } = useRateMovie(id)
	return (
		<div className={styles.wrapper}>
			<h3>How do you like the movie?</h3>
			<p>Ratings improve recommendations</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}>Thanks for rating!</div>
					) : (
						<StarRating
							name="star-rating"
							starCount={6}
							value={rating}
							onStarClick={handleClick}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={slug} />
			)}
		</div>
	)
}

export default RateMovie
