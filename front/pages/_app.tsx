import type { AppProps } from 'next/app'
import MainProvider from 'providers/MainProvider'

import '@/styles/globals.sass'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MainProvider>
			{/* подключаем react-query */}
			<Component {...pageProps} />
		</MainProvider>
	)
}
