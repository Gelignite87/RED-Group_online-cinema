import { FC } from 'react'

const Description: FC<{ text: string; className?: string }> = ({
	text,
	className,
}) => {
	return (
		<div
			className={`${className} text-lg font-light text-white text-opacity-60`}
			dangerouslySetInnerHTML={{ __html: text }}
		></div>
	)
}

export default Description
