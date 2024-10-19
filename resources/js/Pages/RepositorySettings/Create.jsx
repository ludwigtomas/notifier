import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    EyeIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({
    auth,
    repository,
    option_keys,
    option_values
}) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        key: "",
        value: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('repository-settings.store', repository.repository_id), {
            preserveScroll: true,
        });
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
                        href={route("repositories.index")}
                    >
                        Repozitáře
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight hover:text-sky-500 slower-animation"
                        href={route("repositories.edit", repository.repository_id)}
                    >
                        {repository.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <div className="relative group">
                        <Link
                            className="font-semibold text-lg leading-tight text-sky-500"
                            href={route("repository-settings.create", repository.repository_id)}
                        >
                            Repository settings
                        </Link>

                        <div className="absolute invisible group-hover:visible flex flex-col left-0 top-full pt-6 z-30">
                            <div className="bg-zinc-900 border-2 border-zinc-700 rounded-xl p-2 grid gap-y-2 shadow-xl shadow-black">
                                <Link
                                    className="flex items-center justify-center space-x-4 bg-zinc-800 px-4 py-2 rounded-md border border-transparent hover:border-sky-500"
                                    href={route("repository-settings.create", repository.repository_id)}
                                >
                                    <span className="text-gray-200">
                                        Create
                                    </span>

                                    <EyeIcon className="size-6 text-sky-500" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            }
        >
            <Head title={repository.name + " - Edit"} />

            <div className="max-w-[90rem] mx-auto sm:px-6 lg:px-8 space-y-6">
                <form
                    className="col-span-6 space-y-6"
                    onSubmit={submit}
                >
                    <div className="space-y-6 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <InputLabel
                                    htmlFor="key"
                                    value="klíč"
                                />

                                <select
                                    name="key"
                                    value={data.key}
                                    onChange={(e) => setData("key", e.target.value)}
                                    className="w-full !border-zinc-600 rounded-md bg-zinc-900 text-white"
                                >
                                    {option_keys.map((key) => (
                                        <option
                                            key={key}
                                            value={key}
                                        >
                                            {key}
                                        </option>
                                    ))}
                                </select>

                                <InputError
                                    message={errors.key}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="value"
                                    value="hodnota"
                                />

                                <select
                                    name="value"
                                    value={data.value}
                                    onChange={(e) => setData("value", e.target.value)}
                                    className="w-full !border-zinc-600 rounded-md bg-zinc-900 text-white"
                                >
                                    {option_values.map((value) => (
                                        <option
                                            key={value}
                                            value={value}
                                        >
                                            {value}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}
