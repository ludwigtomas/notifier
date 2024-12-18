import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    ServerStackIcon,
    ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/outline";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, hostings }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        url: "",
        token: "",
        hosting_id: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("workers.store"));
    };

    return (
        <AdminLayout
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
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("hostings.index")}
                    >
                        Workers
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500 slower-animation"
                        href={route("workers.create")}
                    >
                        Vytvořit
                    </Link>
                </header>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-10 bg-zinc-900 sm:rounded-xl">
                    <header>
                        <h1 className="text-center text-xl font-bold text-gray-200">
                            Vytvořit Worker
                        </h1>
                    </header>

                    <form
                        onSubmit={submit}
                        className="mt-6 grid grid-cols-12 gap-10 items-start"
                    >
                        <div className="col-span-7 flex flex-col space-y-4 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                            <div>
                                <InputLabel
                                    isRequired
                                    htmlFor="name"
                                    value="Název"
                                />

                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Bohemia Cloud Worker"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.name}
                                    htmlFor="name"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="url"
                                    value="URL"
                                />

                                <TextInput
                                    id="url"
                                    type="text"
                                    name="url"
                                    placeholder="www.bohemia-cloud.cz"
                                    value={data.url}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "url",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.url}
                                    htmlFor="url"
                                />
                            </div>
                            
                            <div>
                                <InputLabel
                                    htmlFor="token"
                                    value="Token"
                                />

                                <TextInput
                                    id="token"
                                    type="text"
                                    name="token"
                                    placeholder="Token"
                                    value={data.token}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "token",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError
                                    message={errors.token}
                                    htmlFor="token"
                                />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="hosting_id"
                                    value="Hosting"
                                />

                                <select
                                    id="hosting_id"
                                    name="hosting_id"
                                    value={data.hosting_id}
                                    onChange={(e) =>
                                        setData(
                                            "hosting_id",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full bg-zinc-700 text-gray-200 rounded-lg"
                                >
                                    <option value="" disabled>Vyberte hosting</option>
                                    {hostings && hostings.map((hosting) => (
                                        <option key={hosting.id} value={hosting.id}>
                                            {hosting.name}
                                        </option>
                                    ))}
                                </select>

                                <InputError
                                    message={errors.hosting_id}
                                    htmlFor="hosting_id"
                                />
                            </div>
                        </div>

                        <div className="col-span-12">
                            <PrimaryButton
                                typeOfButton="submit"
                                disabled={processing}
                            >
                                <ServerStackIcon className="size-6 mr-4" />
                                Vytvořit
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
