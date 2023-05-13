import { Roboto } from 'next/font/google'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

const StartPage: FC = () => {
	const { replace } = useRouter()

	useEffect(() => {
		const handler = setTimeout(() => replace('/'), 3000) //используем replace вместо push чтобы запрос не учитывался в истории браузера, стрелка назад будет неактивна если путь '/' был первым
		return () => clearTimeout(handler)
	}, []) //eslint-disable-line react-hooks/exhaustive-deps

	return (
		<h2 className={`${roboto.className} text-opacity-80 text-gray-500 text-lg`}>
			Roboto font google
		</h2>
	)
}

export default StartPage
