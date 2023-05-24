import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Gallery.module.sass'
import { IGalleryItemProps } from './gallery.interface'

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	return (
		<Link
			href={item.link}
			className={`${styles.item} ${item.content && styles.withText} ${
				styles[variant]
			}`}
		>
			<Image
				alt={item.name}
				src={item.posterPath}
				fill
				draggable={false}
				priority
			/>
			{item.content && (
				<div className={styles.content}>
					<div className={styles.title}>{item.content.title}</div>
					{item.content.subTitle && (
						<div className={styles.subTitle}>{item.content.subTitle}</div>
					)}
				</div>
			)}
		</Link>
	)
}

export default GalleryItem
