import Link from 'next/link'
import { FC } from 'react'

import MovieItem from './MovieItem'
import styles from './MovieList.module.sass'
import { IMovieList } from './movieList.interface'

const MovieList: FC<IMovieList> = ({ link, movies, title }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link href={link} className={styles.button}>
				{`See ${title.toLowerCase()}`}
			</Link>
		</div>
	)
}
export default MovieList
