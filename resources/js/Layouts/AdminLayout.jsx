import Breadcrumbs from '@/Components/Breadcrumbs'
import Sidebar from '@/Components/Sidebar'

export default function Authenticated({ user, header, children }) {
    return (
        <main className="flex min-h-screen flex-row items-start justify-start">
            <Sidebar user={user} />

            <section className="w-full">
                {header && (
                    <header className="fixed right-0 top-0 z-50 w-full pl-[6.6rem] lg:pl-[14rem]">
                        <div className='className="grid border-b border-neutral-700 bg-zinc-900/50 p-6 backdrop-blur-md'>
                            <div className="flex items-center space-x-4 text-neutral-400">{header}</div>
                        </div>
                    </header>
                )}

                {/* <Breadcrumbs/> */}

                <div className="mx-auto mt-28 max-w-[100rem] pb-10">{children}</div>
            </section>
        </main>
    )
}
