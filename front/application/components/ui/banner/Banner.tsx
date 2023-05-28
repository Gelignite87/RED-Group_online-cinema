import Image from 'next/image'
import { FC } from 'react'

import styles from './Banner.module.sass'

interface IBanner {
	image: string
	Detail?: FC | null
}
const Banner: FC<IBanner> = ({ image, Detail }) => {
	return (
		<div className={styles.banner}>
			<Image
				src={image}
				draggable={false}
				fill
				alt="banner"
				className="image-like-bg object-top"
				priority
			/>
			{Detail && <Detail />}
		</div>
	)
}

export default Banner
