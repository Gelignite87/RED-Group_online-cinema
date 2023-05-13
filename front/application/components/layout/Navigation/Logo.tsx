import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logo from '@/assets/images/logo.svg'

const Logo: FC = () => {
	return (
		<Link
			href={'/'}
			className="block mb-10 w-full" //block нужен чтобы заработали margin
		>
			<div style={{ filter: 'drop-shadow(0 0 23px #b900db96)', width: '100%' }}>
				<Image
					src={logo}
					width={100}
					height={34}
					alt="FDA"
					className="mx-auto w-1/3 h-auto" //размещаем картинку в центре блока
					draggable={false} //отключаем перетаскивание картинки мышкой
					// priority={true}
				/>
			</div>
		</Link>
	)
}
export default Logo
