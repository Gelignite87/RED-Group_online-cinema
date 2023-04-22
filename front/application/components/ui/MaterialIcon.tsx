import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { TypeMaterialIconName } from '@/shared/types/icon.types'

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
	//создали компонент чтобы динамически отдавать компоненты иконок в зависимости от name

	const IconComponent = MaterialIcons[name]

	return <IconComponent /> || <MaterialIcons.MdForest /> //MaterialIcons.MdForest произвольная иконка
}
export default MaterialIcon
