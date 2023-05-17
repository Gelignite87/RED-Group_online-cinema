import { useQuery } from 'react-query'

import { getGenreUrl } from '@/config/url.config'

import { GenreService } from '@/services/genre.service'

import { IMenuItem } from '../menu.interface'

export const usePopularGenres = () => {
	const queryData = useQuery(
		'popular genres menu',
		//первое значение useQuery - уникальный ключ
		() => GenreService.getAll(),
		{
			select: (
				{ data } //сюда приходит data.data
			) =>
				data
					.filter((genre) => genre.icon) //сюда может прийти пустая иконка которая не сможет отрисоваться, поэтому делаем filter
					.map(
						(genre) =>
							({
								icon: genre.icon,
								link: getGenreUrl(genre.slug),
								title: genre.name,
							} as IMenuItem)
					)
					.splice(0, 4), //удаляем 4 элемента начиная с индекса 0 и возвращаем удаленные элементы (используем именно splice так как длина массива может быть меньше 4)
			// onError(error) {},
		}
	)

	return queryData
}
