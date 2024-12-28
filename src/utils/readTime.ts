import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

function translateReadingTimeToGerman(readingTimeText: string): string {
	const translations: { [key: string]: string } = {
		'min read': 'Min. Lesezeit'
	}

	for (const [english, german] of Object.entries(translations)) {
		if (readingTimeText.includes(english)) {
			return readingTimeText.replace(english, german)
		}
	}

	return readingTimeText
}

/**
 * Injects `minutesRead` into frontmatter processed by Remark.
 */
export function remarkReadingTime() {
	return function (tree: unknown, { data }: any) {
		const textOnPage = toString(tree)
		const readingTime = getReadingTime(textOnPage)
		data.astro.frontmatter.minutesRead = translateReadingTimeToGerman(readingTime.text)
	}
}
