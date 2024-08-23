const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// @ts-ignore
function DateFormat(addDay) {
	let date = new Date()
	let utcDate = new Date(
		Date.UTC(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			15,
			0,
			0,
		),
	)
	utcDate.setUTCDate(utcDate.getUTCDate() + addDay)

	return utcDate
}

async function main() {
	console.log('Seeding data...')

	// ユーザーを作成する例
	await prisma.user.createMany({
		data: [
			{
				liff_id: '1',
				name: 'User 1',
				role: 'STUDENT',
				expected: 2030,
				part: [1],
				password:
					'$2a$05$UxevS4vImz/DMPPgVJQtQeWa.ai.LbtnE0C//hHl.Fy1D9jo0.3me',
			},
			{
				liff_id: '2',
				name: 'User 2',
				role: 'GRADUATE',
				expected: 2023,
				part: [1, 2],
				password:
					'$2a$05$UxevS4vImz/DMPPgVJQtQeWa.ai.LbtnE0C//hHl.Fy1D9jo0.3me',
			},
			{
				liff_id: 'Ub204e3d30a9ada4c261667699436afb6',
				name: 'User 3',
				role: 'STUDENT',
				expected: 2024,
				part: [1, 2, 3],
				password:
					'$2a$05$UxevS4vImz/DMPPgVJQtQeWa.ai.LbtnE0C//hHl.Fy1D9jo0.3me',
			},
			{
				liff_id: 'admin',
				name: 'admin',
				role: 'STUDENT',
				expected: 2024,
				part: [1, 2, 3],
				password:
					'$2a$05$UxevS4vImz/DMPPgVJQtQeWa.ai.LbtnE0C//hHl.Fy1D9jo0.3me',
			},
		],
	})

	await prisma.booking.createMany({
		data: [
			{
				booking_date: DateFormat(0),
				booking_time: 0,
				regist_name: 'サンプルバンド',
				name: 'サンプルユーザー',
				user_id: '1',
				password:
					'$2a$05$UxevS4vImz/DMPPgVJQtQeWa.ai.LbtnE0C//hHl.Fy1D9jo0.3me',
			},
			{
				booking_date: DateFormat(1),
				booking_time: 1,
				regist_name: 'サンプルバンド',
				name: 'サンプルユーザー',
				user_id: '1',
				password:
					'$2a$05$UxevS4vImz/DMPPgVJQtQeWa.ai.LbtnE0C//hHl.Fy1D9jo0.3me',
			},
			{
				booking_date: DateFormat(2),
				booking_time: 2,
				regist_name:
					'長文バンド名サンプル長文バンド名サンプル長文バンド名サンプル長文バンド名サンプル長文バンド名サンプル長文バンド名サンプル',
				name: '長文ユーザー名サンプル長文ユーザー名サンプル長文ユーザー名サンプル長文ユーザー名サンプル長文ユーザー名サンプル長文ユーザー名サンプル長文ユーザー名サンプル',
				user_id: '2',
				password:
					'$2a$05$UxevS4vImz/DMPPgVJQtQeWa.ai.LbtnE0C//hHl.Fy1D9jo0.3me',
			},
			{
				booking_date: DateFormat(4),
				booking_time: 1,
				regist_name: 'わたべサンプルバンド',
				name: 'わたべサンプルユーザー',
				user_id: 'Ub204e3d30a9ada4c261667699436afb6',
				password:
					'$2a$05$UxevS4vImz/DMPPgVJQtQeWa.ai.LbtnE0C//hHl.Fy1D9jo0.3me',
			},
		],
	})
	console.log('Data seeding complete.')
}

main()
	.catch((err) => {
		console.error('Error seeding data:', err)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
