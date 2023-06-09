import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { RatingService } from '@/services/rating.service'

import { IUserState } from '@/store/user/user.interface'

import { toastrError } from '@/utils/toastr-error'

export const useRateMovie = (movieId: string, user: IUserState | null) => {
	const [rating, setRating] = useState<number>(0)
	const [isSended, setIsSended] = useState<boolean>(false)

	const { refetch } = useQuery(
		['your moving rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess({ data }) {
				if (typeof data === 'number') setRating(data)
			},
			onError(err) {
				toastrError(err, 'Get rating')
			},
			enabled: !!movieId && !!user, //срабатывает только если есть movieId и user
		}
	)

	const { mutateAsync: mutateRateMovie } = useMutation(
		'set rating movie',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onError(err) {
				toastrError(err, 'Rate movie')
			},
			onSuccess() {
				toastr.success('Rate movie', 'you have successfully rated')
				setIsSended(true)
				refetch()
				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			},
		}
	)

	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateRateMovie({ value: nextValue })
	}

	return { rating, isSended, handleClick }
}
