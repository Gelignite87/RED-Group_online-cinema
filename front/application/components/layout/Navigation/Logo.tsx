import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logo from '@/assets/images/logo.svg'

const Logo: FC = () => {
	return (
		<Link
			href={'/'}
			className="block mx-20 mb-10" //block нужен чтобы заработали margin
		>
			<div style={{ filter: 'drop-shadow(0 0 23px #b900db96)' }}>
				<Image
					src={logo}
					width={100}
					height={34}
					alt="FDA"
					className="mx-auto" //размещаем картинку в центре блока
					draggable={false} //отключаем перетаскивание картинки мышкой
					priority
				/>
			</div>
		</Link>
	)
}
export default Logo
