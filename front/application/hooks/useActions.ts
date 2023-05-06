import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { allActions } from '@/store/rootActions'

export const useActions = () => {
	const dispatch = useDispatch() //dispatch - это функция, которая используется в Redux для отправки действий (actions) в хранилище (store).
	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]) //связывает все actions с функцией dispatch из хука useDispatch, предоставляемого библиотекой react-redux. Для этого используется функция bindActionCreators.
}
