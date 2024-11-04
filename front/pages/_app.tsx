import type { AppProps } from 'next/app'
import MainProvider from 'providers/MainProvider'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import '@/styles/globals.sass'

type TypeAppProps = AppProps & TypeComponentAuthFields //добавляем к типу AppProps тип {Component:{isOnlyAdmin?: boolean; isOnlyUser?: boolean}}

export default function App({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<>{<Component {...pageProps} />}</>
		</MainProvider>
	)
}
