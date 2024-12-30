export const adjustImageUrl = (url: string): string => {
	const regex = /^\/public\/images\/[^\/]+\.[a-zA-Z]+$/
	if (regex.test(url)) {
		return url.replace(/^\/public/, '')
	}
	return url
}
