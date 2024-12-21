import Breadcrumbs from "@/Components/Breadcrumbs";
import Sidebar from "@/Components/Sidebar";

export default function Authenticated({ user, header, children }) {
    return (
        <main className="flex flex-row items-start justify-start min-h-screen">

            <Sidebar user={user} />

            <section className="w-full">
                {header && (
                    <header className='fixed top-0 right-0 w-full z-50 pl-[6.6rem] lg:pl-[14rem]'>
                        <div className='className="grid p-6 bg-zinc-900/50 backdrop-blur-md border-b border-neutral-700'>
                            <div className='flex items-center space-x-4 text-neutral-400'>
                                {header}
                            </div>
                        </div>
                    </header>
                )}

                {/* <Breadcrumbs/> */}

                <div className="max-w-[100rem] mt-28 mx-auto pb-10">
                    {children}
                </div>
            </section>
        </main>
    );
}
