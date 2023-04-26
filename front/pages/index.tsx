// import { Roboto } from 'next/font/google'
// import Image from 'next/image'
import Home from '@/components/screens/home/Home'

// const roboto = Roboto({ weight: '400', subsets: ['latin'] })

export default function HomePage() {
	return (
		<Home />
		// <Image
		// 	src="/vercel.svg"
		// 	alt="Vercel Logo"
		// 	className="dark:invert"
		// 	width={100}
		// 	height={24}
		// 	priority
		// />
		// <h2 className={`${roboto.className} mb-3 text-2xl font-semibold`}>
		// 	Roboto
		// </h2>
	)
}
