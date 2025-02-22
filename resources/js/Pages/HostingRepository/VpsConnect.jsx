import AdminLayout from '@/Layouts/AdminLayout'
import React, { useEffect } from 'react'
import io from 'socket.io-client'
import { Terminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import { Head, Link } from '@inertiajs/react'
import { PencilSquareIcon, EyeIcon, ChevronRightIcon, LinkIcon } from '@heroicons/react/24/outline'

export default function SshClient({ auth, hosting_repository }) {
    let param =
        'host=' +
        hosting_repository.ip_address +
        '&port=' +
        hosting_repository.ip_port +
        '&username=' +
        hosting_repository.login_user +
        '&password=' +
        hosting_repository.login_password

    let url = import.meta.env.VITE_NODE_SERVER_URL + '?' + param

    useEffect(() => {
        const socket = io(url)

        // Send SSH connection details to the server
        socket.emit('sshDetails')

        const terminal = new Terminal()
        terminal.open(document.getElementById('terminal'))

        terminal.onData((data) => {
            socket.emit('data', data)
        })

        socket.on('data', (data) => {
            terminal.write(data)
        })

        return () => {
            socket.disconnect()
        }
    }, [url])

    return (
        <AdminLayout
            user={auth.user}
            header={
                <header className="flex flex-row items-center justify-start space-x-4 text-zinc-500">
                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('dashboard.index')}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="slower-animation text-lg font-semibold leading-tight hover:text-sky-500"
                        href={route('repositories.index')}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="text-lg font-semibold leading-tight text-sky-500"
                        href={route('repositories.edit', hosting_repository.relationships.repository.repository_id)}
                    >
                        {hosting_repository.relationships.repository.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="group relative">
                        <Link
                            className="text-lg font-semibold leading-tight text-sky-500"
                            href={route('repositories.show', hosting_repository.relationships.repository.repository_id)}
                        >
                            Edit
                        </Link>

                        <div className="invisible absolute left-0 top-full z-30 flex flex-col pt-6 group-hover:visible">
                            <div className="grid gap-y-2 rounded-xl border-2 border-zinc-700 bg-zinc-900 p-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-sky-500"
                                    href={route('repositories.show', hosting_repository.relationships.repository.repository_id)}
                                >
                                    <span className="text-gray-200">Zobrazit</span>

                                    <EyeIcon className="size-6 text-sky-500" />
                                </Link>

                                <Link
                                    className="flex items-center justify-center space-x-4 rounded-md border border-transparent bg-zinc-800 px-4 py-2 hover:border-green-500"
                                    href={route('repositories.edit', hosting_repository.relationships.repository.repository_id)}
                                >
                                    <span className="text-gray-200">Editovat</span>

                                    <PencilSquareIcon className="h-6 w-6 text-green-500" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            }
        >
            <Head title="VPS" />

            <div className="grid gap-5">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-4">
                    <div className="group relative grid rounded-3xl border-2 border-stone-700 bg-stone-900 p-4 hover:border-stone-600">
                        <div className="grid overflow-hidden rounded-xl bg-white/5 py-2">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-lg font-bold text-zinc-200">
                                    {hosting_repository.ip_address + ':' + hosting_repository.ip_port}
                                </p>

                                <p className="text-xs text-zinc-400">IP adresa</p>
                            </div>
                        </div>
                    </div>

                    <div className="group relative grid rounded-3xl border-2 border-stone-700 bg-stone-900 p-4 hover:border-stone-600">
                        {hosting_repository.relationships.repository.website_url && (
                            <>
                                <div className="grid overflow-hidden rounded-xl bg-white/5 py-2">
                                    <div className="flex flex-col items-center justify-center">
                                        <LinkIcon className="size-12 text-zinc-200" />
                                    </div>
                                </div>

                                <a
                                    href={hosting_repository.relationships.repository.website_url}
                                    target="_blank"
                                    className="absolute inset-0"
                                    rel="noreferrer"
                                />
                            </>
                        )}
                    </div>

                    <div className="group relative grid rounded-3xl border-2 border-stone-700 bg-stone-900 p-4 hover:border-stone-600">
                        <div className="grid overflow-hidden rounded-xl bg-white/5 py-2">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-lg font-bold text-zinc-200">{hosting_repository.login_user}</p>

                                <p className="text-xs text-zinc-400">user</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-hidden rounded-2xl bg-stone-900 p-2 drop-shadow-2xl">
                    <div className="relative flex items-center justify-between">
                        <div className="absolute left-1/2 -translate-x-1/2">
                            <span className="mr-4 text-gray-400">vps</span>
                            <span className="text-xl font-bold uppercase text-white">
                                {hosting_repository.relationships.repository.name}
                            </span>
                        </div>

                        <div className="flex space-x-2 p-4">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-stone-700 bg-black p-5">
                        <div
                            id="terminal"
                            style={{ overflow: '!hidden' }}
                            className="h-[410px] w-full overflow-y-hidden"
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
