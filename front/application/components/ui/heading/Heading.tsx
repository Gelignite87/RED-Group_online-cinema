import { FC } from 'react'

interface IHeading {
	title: string
	className?: string
}

const Heading: FC<IHeading> = ({ title, className }) => {
	return (
		<h1
			className={
				`text-gray-500 text-opacity-80 font-bold 
				${className?.includes('xl') ? '' : 'text-3xl'} ${className}` || `font-bold`
			}
		>
			{title}
		</h1>
	)
}
export default Heading
