declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production'
		POSTGRES_PRISMA_URL: string
		GA_ID: string
		NEXT_PUBLIC_LIFF_ID: string
		LINE_CLIENT_ID: string
		LINE_CLIENT_SECRET: string
		APP_LINK: string
		ADMIN_ID: string
		ADMIN_PASSWORD: string
		TEST_ID: string
		TEST_PASSWORD: string
	}
}
