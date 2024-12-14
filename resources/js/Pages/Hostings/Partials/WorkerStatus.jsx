import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage, router } from "@inertiajs/react";
import {
    TrashIcon,
    EyeIcon,
    PlusIcon,
    ChevronRightIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useState, useEffect } from "react";
import PrettyJson from "@/Components/PrettyJson";

export default function WorkerStatus({ worker, className = "" }) {
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [statusInterval, setStatusInterval] = useState(null);
    const [containers, setContainers] = useState([]);
    // const { data, setData, put, processing, errors } = useForm({
    //     repositories: []
    // });

    // const attachClientSubmit = (e) => {
    //     e.preventDefault();

    //     put(route('client-repository.attach', hosting.id));
    // }

    const fetchWorkerStatus = useCallback(() => {
        setIsLoading(true);
        axios
            .get(route("workers.status", worker.id))
            .then((response) => {
                setStatus(response.data.status || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [worker.id]);

    const fetchWorkerContainers = useCallback(() => {
        setIsLoading(true);
        axios
            .get(route("workers.containers", worker.id))
            .then((response) => {
                console.log(response.data);
                setContainers(response.data.containers || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [worker.id]);

    useEffect(() => {
        fetchWorkerStatus();
        fetchWorkerContainers();
        const interval = setInterval(() => {
            fetchWorkerStatus();
        }, 5000);

        setStatusInterval(interval);

        return () => {
            clearInterval(interval);
        };
    }, [fetchWorkerStatus]);
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">
                    Worker ({worker.name})
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Here you can see the status of the worker.
                </p>
            </header>

            <div className="mt-6 grid grid-cols-12 gap-5">
                <div className="col-span-12">
                    <div className="text-white">
                        <span className="font-bold me-2">Status:</span>
                        {isLoading ? (
                            <span className="text-yellow-500 font-bold border border-yellow-500 rounded-full px-4 py-1">
                                Loading...
                            </span>
                        ) : status && status.length > 0 ? (
                            <span className="text-green-500 font-bold border border-green-500 rounded-full px-4 py-1">
                                Working
                            </span>
                        ) : (
                            <span className="text-red-500 font-bold border border-red-500 rounded-full px-4 py-1">
                                Idle
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-span-12">
                    <div className="text-white">
                        <span className="font-bold me-2">Containers:</span>
                        
                        <table className="w-full mt-2">
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
    );
}
