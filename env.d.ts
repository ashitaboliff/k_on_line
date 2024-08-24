declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production'
		POSTGRES_PRISMA_URL: string
		GA_ID: string
		NEXT_PUBLIC_LIFF_ID: string
		LINE_CLIENT_ID: string
		LINE_CLIENT_SECRET: string
		APP_LINK: string
	}
}
