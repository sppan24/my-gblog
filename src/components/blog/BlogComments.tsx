import * as React from 'react'
import Giscus from '@giscus/react'

const id = 'inject-comments'

function getCurrentTheme(): string {
    if (window.localStorage.getItem('hs_theme')) {
        return window.localStorage.getItem('hs_theme') ?? 'default'
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
}

function BlogComments() {
    const [mounted, setMounted] = React.useState(false)
    const [theme, setTheme] = React.useState('dark')

    const handleThemeChange = (event: any) => {
        const theme = event?.detail ?? 'light'
        setTheme(theme)
    }

    React.useEffect(() => {
        const theme = getCurrentTheme()
        setTheme(theme)

        window.addEventListener('on-hs-appearance-change', handleThemeChange)

        return () => {
            window.removeEventListener('on-hs-appearance-change', handleThemeChange)
        }
    }, [])

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div id={id} className="w-full">
            {mounted
                ? (
                    <Giscus
                        id={id}
                        repo="godruoyi/gblog"
                        repoId="MDEwOlJlcG9zaXRvcnkxMjcyODI0NzA"
                        category="Announcements"
                        categoryId="DIC_kwDOB5YtJs4CfZnX"
                        mapping="title"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="top"
                        lang="zh-CN"
                        loading="lazy"
                        theme={theme}
                    />
                    )
                : null}
        </div>
    )
}

export default BlogComments
