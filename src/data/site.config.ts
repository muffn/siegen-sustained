interface SiteConfig {
	site: string
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
	formsPublicKey: string
}

export const siteConfig: SiteConfig = {
	site: 'https://siegen-sustained.de',
	author: 'Muffn',
	title: 'Siegen Sustained',
	description: 'Ein Blog für die Siegen Sustained Warhammer40k Tabletop Community ', // Description to display in the meta tags
	lang: 'de-DE',
	ogLocale: 'de_DE',
	shareMessage: 'Diesen Beitrag teilen', // Message to share a post on social media
	paginationSize: 6, // Number of posts per page
	formsPublicKey: process.env.FORMS_PUBLIC_KEY || 'key_not_found'
}
