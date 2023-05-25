import { FC, useRef } from 'react'

import styles from './Gallery.module.sass'
import GalleryItem from './GalleryItem'
import { IGalleryItem } from './gallery.interface'

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const handleScroll = (event: any) => {
		const delta = event.deltaY > 0 ? event.deltaY + 100 : event.deltaY - 100
		if (containerRef.current) containerRef.current.scrollLeft += delta
	}
	return (
		<div className={styles.gallery} ref={containerRef} onWheel={handleScroll}>
			{items.map((item) => (
				<GalleryItem key={item.link} item={item} variant="vertical" />
			))}
		</div>
	)
}

export default Gallery
