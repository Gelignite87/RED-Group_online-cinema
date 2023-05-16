import * as MaterialIcons from 'react-icons/md'

export const includesMaterialIcons = <T extends string>(icon: T) => {
	const arr = Object.keys(MaterialIcons) as Array<T>
	return arr.includes(icon)
}
