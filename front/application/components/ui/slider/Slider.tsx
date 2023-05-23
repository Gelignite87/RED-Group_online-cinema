import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import SlideItem from './SlideItem'
import styles from './Slider.module.sass'
import SlideArrow from './slideArrow/SlideArrow'
import { ISlide } from './slider.interface'
import { useSlider } from './useSlider'

interface ISlider {
	slides: ISlide[]
	buttonTitle?: string
}
const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { slideIn, handleClick, index, isNext, isPrev } = useSlider(
		slides.length
	)
	return (
		<div className={styles.slider}>
			<CSSTransition
				in={slideIn}
				timeout={300}
				classNames="slide-animation"
				unmountOnExit //элемент будет пропадать из dom дерева
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>
			{isPrev && (
				<SlideArrow variant="left" clickHandler={() => handleClick('prev')} />
			)}
			{isNext && (
				<SlideArrow variant="right" clickHandler={() => handleClick('next')} />
			)}
		</div>
	)
}

export default Slider
