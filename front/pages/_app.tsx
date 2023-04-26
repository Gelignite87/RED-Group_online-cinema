import type { AppProps } from 'next/app'
import MainProvider from 'providers/MainProvider'

import Layout from '@/components/layout/Layout'

import '@/styles/globals.sass'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MainProvider>
			{/* подключаем react-query */}
			<Layout>
				{/* общее наполнение для всех страниц */}
				<Component {...pageProps} />
			</Layout>
		</MainProvider>
	)
}
