import Sidebar from '@/Layouts/Partials/Sidebar'
import { Head } from '@inertiajs/react'

export default function Authenticated({ title, user, header, children }) {
    return (
        <>
            <Head title={title ? title : 'Dashboard'} />
            <Sidebar user={user} />

            <div className="lg:pl-60">
                <div className="sticky top-0 right-0 z-10 border-b border-neutral-700 bg-zinc-900/50 px-4 backdrop-blur-md sm:px-6 lg:px-8">
                    {header && (
                        <header className="z-50 w-full">
                            <div className="grid py-6">
                                <div className="flex items-center space-x-4 text-neutral-400">{header}</div>
                            </div>
                        </header>
                    )}
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    )
}
