import Head from 'next/head'
import NextProgressBar from 'nextjs-progressbar'
import { FC, PropsWithChildren } from 'react'

import { accentColor } from '@/config/constants'

import Favicons from './Favicons'

const HeadProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<NextProgressBar
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Head>
				{/* <meta charSet="UTF-8" /> */}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1.0"
				/>
				<Favicons />
				<meta name="theme-color" content="#FB134E" />
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#FB134E"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#FB134E"
				/>
				<meta name="msapplication-navbutton-color" content="#FB134E" />
				<meta name="apple-mobile-web-app-status-bar-style" content="#FB134E" />
			</Head>
			{children}
		</>
	)
}
export default HeadProvider
