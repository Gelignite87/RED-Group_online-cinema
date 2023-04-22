import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import FDA_SVG from '@/assets/images/FDA_SVG.svg'

const Logo: FC = () => {
	return (
		<Link
			href={'/'}
			className="block mx-20 mb-10" //block нужен чтобы заработали margin
		>
			<div style={{ filter: 'drop-shadow(0 0 23px #b900db96)' }}>
				<Image
					src={FDA_SVG}
					width={100}
					height={34}
					alt="FDA"
					className="mx-auto" //размещаем картинку в центре блока
					draggable={false} //отключаем перетаскивание картинки мышкой
				/>
			</div>
		</Link>
	)
}
export default Logo
