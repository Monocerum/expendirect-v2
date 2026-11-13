import { useEffect } from 'react'

function setHeadTag(selector, tagName, attributes, valueAttribute, value) {
    let element = document.head.querySelector(selector)
    if (!element) {
        element = document.createElement(tagName)
        Object.entries(attributes).forEach(([name, attr]) => element.setAttribute(name, attr))
        document.head.appendChild(element)
    }
    element.setAttribute(valueAttribute, value)
}

export default function SeoHead({ title, description }) {
    useEffect(() => {
        document.title = title
        setHeadTag('meta[name="description"]', 'meta', { name: 'description' }, 'content', description)
        setHeadTag('meta[property="og:title"]', 'meta', { property: 'og:title' }, 'content', title)
        setHeadTag(
            'meta[property="og:description"]',
            'meta',
            { property: 'og:description' },
            'content',
            description,
        )
    }, [title, description])
    return null
}
