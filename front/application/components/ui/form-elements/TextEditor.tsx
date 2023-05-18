import cn from 'classnames'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { FC, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { ITextEditor } from './form.interface'
import styles from './form.module.sass'

const TextEditor: FC<ITextEditor> = ({
	onChange,
	value,
	placeholder,
	error,
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty()) //создаем пустой draft
	const [isUpdated, setIsUpdated] = useState(false)

	useEffect(() => {
		//при отрисовке компонента превращаем html в draft
		if (isUpdated) return //логика html to draft выполняется только при загрузке страницы

		const defaultValue = value || ''
		const blockFromHtml = htmlToDraft(defaultValue)

		const contentState = ContentState.createFromBlockArray(
			blockFromHtml.contentBlocks,
			blockFromHtml.entityMap
		)
		const newEditorState = EditorState.createWithContent(contentState)
		setEditorState(newEditorState) //записываем draft полученный из value
	}, [value, isUpdated]) //при отрисовке компонента мы сначала получаем пустой value, а затем value со значением, поэтому useEffect должен сработать несколько раз

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true) //отключаем useEffect
		setEditorState(editorState) //записываем draft
		onChange(draftToHtml(convertToRaw(editorState.getCurrentContent()))) //записываем value, преобразовав draft в html
	}

	return (
		<div className={cn(styles.common, styles.editorWrapper, 'animate-fade')}>
			<label>
				<span>{placeholder}</span>
				<div className={styles.wrapper}>
					<Editor
						toolbarClassName={styles.toolbar}
						editorClassName={styles.editor}
						editorState={editorState} //получаем путём преобразования value
						onEditorStateChange={onEditorStateChange} //при изменении EditorState через onChange записывается новый value
						spellCheck
						toolbar={{
							options: ['inline', 'list', 'history'],
							inline: {
								inDropdown: false,
								className: undefined,
								component: undefined,
								dropdownClassName: undefined,
								options: ['bold', 'italic', 'underline', 'strikethrough'],
							},
							list: {
								inDropdown: false,
								options: ['unordered', 'ordered'],
							},
						}}
					/>
				</div>
				{error && <div className={styles.error}>{error.message}</div>}
			</label>
		</div>
	)
}

export default TextEditor
