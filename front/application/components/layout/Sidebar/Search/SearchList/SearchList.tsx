import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { IMovie } from '@/shared/interfaces/movie.interfaces'

import { getMovieUrl } from '@/config/url.config'

import styles from './searchList.module.sass'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={styles.list}>
			{movies.length ? ( //если movies.length = 0 это то же самое что и false
				movies.map((movie) => (
					<Link key={movie._id} href={getMovieUrl(movie.slug)}>
						<Image
							src={movie.poster}
							width={50}
							height={50}
							alt={movie.title}
							style={{ objectFit: 'cover', objectPosition: 'top' }}
							draggable={false}
						/>
						<span>{movie.title}</span>
					</Link>
				))
			) : (
				<div className="text-white text-center my-4">Movies not found!</div>
			)}
		</div>
	)
}
export default SearchList
