import { FC } from 'react'

export type TypeRoles = {
	isOnlyAdmin?: boolean
	isOnlyUser?: boolean
}

export type FCPageAuth<P = {}> = FC<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles }
