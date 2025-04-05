import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { Link, useForm, usePage, router } from '@inertiajs/react'
import { TrashIcon, EyeIcon, PlusIcon, ChevronRightIcon, UserIcon } from '@heroicons/react/24/outline'
import { useCallback, useState, useEffect } from 'react'
import PrettyJson from '@/Components/PrettyJson'

export default function WorkerStatus({ worker, className = '' }) {
    const [status, setStatus] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [statusInterval, setStatusInterval] = useState(null)
    const [containers, setContainers] = useState([])
    // const { data, setData, put, processing, errors } = useForm({
    //     repositories: []
    // });

    // const attachClientSubmit = (e) => {
    //     e.preventDefault();

    //     put(route('client-repository.attach', hosting.id));
    // }

    const fetchWorkerStatus = useCallback(() => {
        setIsLoading(true)
        axios
            .get(route('workers.status', worker.id))
            .then((response) => {
                console.log(response.data)
                setStatus(response.data.status || [])
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [worker.id])

    const fetchWorkerContainers = useCallback(() => {
        setIsLoading(true)
        axios
            .get(route('workers.containers', worker.id))
            .then((response) => {
                console.log(response.data)
                setContainers(response.data.containers || [])
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [worker.id])

    useEffect(() => {
        fetchWorkerStatus()
        fetchWorkerContainers()
        const interval = setInterval(() => {
            fetchWorkerStatus()
            fetchWorkerContainers()
        }, 5000)

        setStatusInterval(interval)

        return () => {
            clearInterval(interval)
        }
    }, [fetchWorkerStatus])
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">Worker ({worker.name})</h2>

                <p className="mt-1 text-sm text-gray-400">Here you can see the status of the worker.</p>
            </header>

            <div className="mt-6 grid grid-cols-12 gap-5">
                <div className="col-span-12">
                    <div className="text-white">
                        <span className="me-2 font-bold">Status:</span>
                        {isLoading ? (
                            <span className="rounded-full border border-yellow-500 px-4 py-1 font-bold text-yellow-500">Loading...</span>
                        ) : status && status.length > 0 ? (
                            <span className="rounded-full border border-green-500 px-4 py-1 font-bold text-green-500">Working</span>
                        ) : (
                            <span className="rounded-full border border-red-500 px-4 py-1 font-bold text-red-500">Idle</span>
                        )}
                        <table className="mt-2 w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">ID</th>
                                    <th className="text-left">Status</th>
                                    <th className="text-left">Script</th>
                                    <th className="text-left">Args</th>
                                </tr>
                            </thead>
                            <tbody>
                                {status && status.length > 0 ? (
                                    status.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.state}</td>
                                            <td>{JSON.stringify(item.data.script)}</td>
                                            <td>{JSON.stringify(item.data.args)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No status available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-span-12">
                    <div className="text-white">
                        <span className="me-2 font-bold">Containers:</span>

                        <table className="mt-2 w-full">
                            <thead>
                                <tr>
                                    <th className="text-left">Name</th>
                                    <th className="text-left">Status</th>
                                    <th className="text-left">Ports</th>
                                </tr>
                            </thead>
                            <tbody>
                                {containers.map((container, index) => (
                                    <tr key={index}>
                                        <td>{container.names}</td>
                                        <td>{container.status}</td>
                                        <td>{container.ports}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
