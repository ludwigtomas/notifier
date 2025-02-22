import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

const Breadcrumbs = () => {
    const { url } = usePage()
    const segments = url.split('/').filter(Boolean)

    const breadcrumbs = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')
        const label = segment.charAt(0).toUpperCase() + segment.slice(1)

        return {
            label,
            href,
            active: index === segments.length - 1,
        }
    })

    return (
        <header className="fixed right-0 top-0 z-50 w-full pl-[6.6rem] lg:pl-[14rem]">
            <div className='className="grid border-b border-neutral-700 bg-zinc-900/50 p-6 backdrop-blur-md'>
                <div className="flex items-center space-x-4 text-neutral-400">
                    {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                            <Link
                                href={item.href}
                                className={
                                    'text-lg font-semibold leading-tight ' +
                                    (item.active ? 'text-sky-500' : 'faster-animation hover:text-sky-500')
                                }
                            >
                                {item.label}
                            </Link>

                            {index < breadcrumbs.length - 1 && <ChevronRightIcon className="size-5" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </header>
    )
}

export default Breadcrumbs
