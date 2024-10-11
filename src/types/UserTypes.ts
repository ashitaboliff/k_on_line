type Role = 'GRADUATE' | 'STUDENT'

type RoleEnum = '卒業生' | '現役生'

type Part =
	| 'BASS'
	| 'DRUMS'
	| 'BACKING_GUITER'
	| 'LEAD_GUITER'
	| 'KEYBOARD'
	| 'VOCAL'
	| 'OTHER'

type PartEnum =
	| 'ベース'
	| 'ドラム'
	| 'バッキングギター'
	| 'リードギター'
	| 'キーボード'
	| 'ボーカル'
	| 'その他'

export const RoleMap: Record<Role, RoleEnum> = {
	GRADUATE: '卒業生',
	STUDENT: '現役生',
}

export const PartMap: Record<Part, PartEnum> = {
	BASS: 'ベース',
	DRUMS: 'ドラム',
	BACKING_GUITER: 'バッキングギター',
	LEAD_GUITER: 'リードギター',
	KEYBOARD: 'キーボード',
	VOCAL: 'ボーカル',
	OTHER: 'その他',
}

export interface Profile {
	id: string
	expected: string
	role: Role
	part: Part
}
