import { Link, Head } from '@inertiajs/react'

export default function ErrorPage({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status]

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status]

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Head title={title} />
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white">{title}</h1>
                <p className="text-gray-400">{description}</p>
            </div>

            <div className="mt-8">
                <Link
                    href={route('dashboard.index')}
                    className="relative flex h-12 items-center rounded-xl border border-white/45 bg-zinc-700 px-4 text-white before:absolute before:inset-0 before:rounded-[11px] before:border-t before:border-white/30 before:shadow before:shadow-zinc-700 hover:bg-zinc-800"
                >
                    Dashboard
                </Link>
            </div>
        </div>
    )
}
