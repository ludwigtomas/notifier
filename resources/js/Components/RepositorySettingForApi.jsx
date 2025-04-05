import React from 'react'
import { EyeIcon, EyeSlashIcon, CommandLineIcon, DocumentIcon, ClipboardIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { motion } from 'framer-motion'

const RepositorySettingForApi = ({ repository }) => {
    const [showCode, setShowCode] = useState(false)
    const [selectFile, setSelectFile] = useState('env')

    function toggleShowCode() {
        setShowCode(!showCode)
    }

    const handleSelectTab = (file) => {
        return () => {
            setSelectFile(file)
        }
    }

    // Function to copy the code to clipboard
    const copyEnvToClipboard = () => {
        let backup_code = '"' + repository.database_verification_code + '"'
        let backup_url = '"' + import.meta.env.VITE_APP_URL + '/api/v1/repositories/' + repository.repository_id + '"'
        let BACKUP_ZIP_PASSWORD = '"' + repository.slug.slice(0, 1) + '_secret123' + '"'

        let env_code =
            'BACKUP_CODE=' + backup_code + '\n' + 'BACKUP_URL=' + backup_url + '\n' + 'BACKUP_ZIP_PASSWORD=' + BACKUP_ZIP_PASSWORD

        navigator.clipboard.writeText(env_code)
    }

    const copySSHToClipboard = () => {
        if (!repository.relationships.hosting_repository) {
            return
        }

        let port = repository.relationships.hosting_repository.ip_port ? repository.relationships.hosting_repository.ip_port : 22

        let ssh_code =
            'ssh ' +
            repository.relationships.hosting_repository.login_user +
            '@' +
            repository.relationships.hosting_repository.ip_address +
            ' -p ' +
            port

        console.log(ssh_code)

        navigator.clipboard.writeText(ssh_code)
    }

    return (
        <div className="col-span-12 mb-10 h-56">
            <div className="flex items-center justify-center">
                <div className="overflow-hidden rounded-xl bg-stone-900 p-1 drop-shadow-2xl lg:w-9/12">
                    <div className="relative flex items-center justify-between">
                        <div className="flex space-x-2 p-2">
                            <div className="space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSelectTab('env')}
                                    className={'inline-flex rounded-lg border border-zinc-600 bg-zinc-800 p-2 text-white'}
                                >
                                    .ENV
                                    <DocumentIcon className="ml-2 size-6" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSelectTab('ssh')}
                                    className={
                                        "+ (showCode === false && 'cursor-not-allowed') inline-flex rounded-lg border border-zinc-600 bg-zinc-800 p-2 text-white"
                                    }
                                >
                                    SSH Connection
                                    <CommandLineIcon className="ml-2 size-6" />
                                </motion.button>
                            </div>
                        </div>

                        <div className="flex space-x-2 p-4">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    {selectFile === 'ssh' ? (
                        <div className="relative col-span-12 grid w-full p-1">
                            <div className="absolute top-1/2 right-2 z-50 -translate-y-1/2">
                                <div className="flex space-x-2 p-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={copySSHToClipboard}
                                        className="rounded-lg border border-zinc-400 bg-zinc-700 p-2 text-zinc-200"
                                    >
                                        <ClipboardIcon className="h-6 w-6" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="flex items-center overflow-hidden rounded-lg bg-stone-800 p-1 drop-shadow-2xl">
                                <div className="flex w-full items-center justify-center">
                                    <div className="w-full rounded-lg bg-stone-800">
                                        <div
                                            id="code-area"
                                            className="space-y-3 p-5"
                                        >
                                            {repository.relationships.hosting_repository && (
                                                <div className="text-center text-base">
                                                    <span className="text-yellow-300">ssh</span>{' '}
                                                    <span className="text-purple-400">
                                                        {repository.relationships.hosting_repository?.login_user}
                                                    </span>
                                                    <span className="text-green-300">@</span>
                                                    <span className="text-purple-400">
                                                        {repository.relationships.hosting_repository?.ip_address}
                                                    </span>{' '}
                                                    {repository.relationships.hosting_repository?.ip_port && (
                                                        <span>
                                                            <span className="text-green-300">-p</span>{' '}
                                                            <span className="text-purple-400">
                                                                {repository.relationships.hosting_repository.ip_port}
                                                            </span>
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative col-span-12 grid w-full p-1">
                            <div className="absolute top-1/2 right-2 z-50 -translate-y-1/2">
                                <div className="flex space-x-2 p-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleShowCode}
                                        className="rounded-lg border border-zinc-600 bg-zinc-800 p-2 text-white"
                                    >
                                        {showCode ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={copyEnvToClipboard}
                                        className={
                                            'rounded-lg border border-zinc-400 bg-zinc-700 p-2 text-zinc-200 ' +
                                            (!showCode && 'cursor-not-allowed')
                                        }
                                    >
                                        <ClipboardIcon className="h-6 w-6" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-lg bg-stone-800 p-1 drop-shadow-2xl">
                                <div className="flex w-full items-center justify-center">
                                    <div className="w-full rounded-lg bg-stone-800">
                                        <div
                                            id="code-area"
                                            className="space-y-3 p-5"
                                        >
                                            <div className="text-base mb-1">
                                                <span className="text-yellow-300">BACKUP_CODE</span>

                                                <span className="text-green-400">=</span>

                                                <span className="text-blue-400">"</span>

                                                <span className="text-purple-400">
                                                    {showCode
                                                        ? repository.database_verification_code
                                                        : 'xxxxx - xxxxx - xxxxx - xxxxx - xxxxx - xxxxx'}
                                                </span>

                                                <span className="text-blue-400">"</span>
                                            </div>

                                            <div className="text-base mb-1">
                                                <span className="text-yellow-300">BACKUP_URL</span>
                                                <span className="text-green-400">=</span>
                                                <span className="text-blue-400">"</span>

                                                <span className="text-purple-400">
                                                    {showCode
                                                        ? import.meta.env.VITE_APP_URL + '/api/v1/repositories/' + repository.repository_id
                                                        : import.meta.env.VITE_APP_URL + '/api/v1/repositories/xxxxx-xxxxx'}
                                                </span>

                                                <span className="text-blue-400">"</span>
                                            </div>

                                            <div className="text-base mb-1">
                                                <span className="text-yellow-300">BACKUP_ZIP_PASSWORD</span>
                                                <span className="text-green-400">=</span>
                                                <span className="text-blue-400">"</span>

                                                <span className="text-purple-400">
                                                    {showCode ? repository.slug.slice(0, 1) + '_secret123' : 'x_xxxxxxxxx'}
                                                </span>

                                                <span className="text-blue-400">"</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RepositorySettingForApi
