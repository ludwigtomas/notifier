import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    XMarkIcon,
    ChevronRightIcon,
    PhotoIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import UpdateClientInformationForm from "@/Pages/Clients/Partials/UpdateClientInformationForm";
import UpdateClientDetachRepositoriesForm from "@/Pages/Clients/Partials/UpdateClientDetachRepositoriesForm";
import UpdateClientAttachRepositoriesForm from "@/Pages/Clients/Partials/UpdateClientAttachRepositoriesForm";

export default function Edit({ auth, client, repositories }) {

    const { data, setData, put, processing, errors } = useForm({
        name: client.name ?? '',
        email: client.email ?? '',
        phone: client.phone ?? '',
        ico: client.ico ?? '',
        repositories: [...client.relationships.repositories.map((repository) => repository.id)],
    });

    // define new variable
    const [test, setTest] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        put(route('clients.update', client.id), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Klient byl úspěšně upraven.');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <header className="flex items-center justify-start flex-row space-x-4 text-zinc-500">
                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("dashboard.index")}
                    >
                        Dashboard
                    </Link>

                    <span>
                        <ChevronRightIcon className="w-5 h-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("clients.index")}
                    >
                        Klienti
                    </Link>

                    <span>
                        <ChevronRightIcon className="w-5 h-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("clients.edit", client.id)}
                    >
                        {client.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="w-5 h-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("clients.edit", client.id)}
                    >
                        Edit
                    </Link>
                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateClientInformationForm
                            client={client}
                        />
                    </div>

                   <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateClientDetachRepositoriesForm
                            client={client}
                        />
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateClientAttachRepositoriesForm
                            client={client}
                            repositories={repositories}
                        />
                    </div>
                </div>
                {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-zinc-900 overflow-hidden shadow-sm sm:rounded-xl">
                        <form
                            onSubmit={submit}
                            className="p-5 mt-6 grid grid-cols-12 gap-x-10"
                        >
                            <div className="col-span-8">
                                <div>
                                    <InputLabel
                                        className="text-zinc-400"
                                        htmlFor="name"
                                        value="Name"
                                    />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        isFocused
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="email"
                                    />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="email"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.email}
                                        htmlFor="email"
                                    />
                                </div>


                                <div>
                                    <InputLabel
                                        htmlFor="phone"
                                        value="phone"
                                    />

                                    <TextInput
                                        id="phone"
                                        type="text"
                                        name="phone"
                                        value={data.phone}
                                        autoComplete="phone"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.phone}
                                        htmlFor="phone"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="ico"
                                        value="ico"
                                    />

                                    <TextInput
                                        id="ico"
                                        type="text"
                                        name="ico"
                                        value={data.ico}
                                        autoComplete="given-name"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("ico", e.target.value)
                                        }
                                    />

                                    <InputError
                                        message={errors.ico}
                                        htmlFor="ico"
                                    />
                                </div>
                            </div>

                            <div className="col-span-4">
                                <InputLabel
                                    className="text-zinc-400"
                                    htmlFor="repositories"
                                    value="repositories"
                                />

                                {repositories.map((repository) => (
                                    <div
                                        className="flex justify-between gap-x-2 text-white"
                                        key={repository.id}
                                    >

                                        <input
                                            type="checkbox"
                                            value={repository.id ?? null}
                                            onChange={(e) => {
                                                const repositoryId = e.target.value;
                                                if (e.target.checked) {
                                                    setData("repositories", [...data.repositories, Number(repositoryId)]
                                                    );
                                                } else {
                                                    setData("repositories", data.repositories.filter((id) => id !== Number(repositoryId))
                                                    );
                                                }
                                            }}
                                            checked={data.repositories.includes(repository.id)}
                                        />

                                        <h2 className="w-10/12">
                                            {repository.name}
                                        </h2>


                                        <div>
                                            <Link href={route('repositories.show', repository.id)}>
                                                <EyeIcon className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="">

                                <PrimaryButton
                                    disabled={processing}
                                    type="submit"
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div> */}
            </div>
        </AuthenticatedLayout>
    );
}
