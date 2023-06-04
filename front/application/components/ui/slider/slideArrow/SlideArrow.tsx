import { FC } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import styles from './SlideArrow.module.sass'

interface ISlideArrow {
	variant: 'left' | 'right'
	clickHandler: () => void
}
const SlideArrow: FC<ISlideArrow> = ({ clickHandler, variant }) => {
	const isLeft = variant === 'left'
	return (
		<button
			onClick={clickHandler}
			className={`${styles.arrow} ${isLeft ? styles.left : styles.right}`}
			aria-label={isLeft ? 'prev' : 'next'}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	)
}

export default SlideArrow
