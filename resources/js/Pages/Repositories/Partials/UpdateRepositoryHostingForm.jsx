import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { ClockIcon } from "@heroicons/react/24/outline";
import Dropdown from "@/Components/Dropdown";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Show({ repository, className = "" }) {
    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            id: repository.relationships.hosting.id ?? 0,
            name: repository.relationships.hosting.name ?? "",
            hosting: repository.relationships.hosting.hosting ?? "",
            ip_address: repository.relationships.hosting.ip_address ?? "",
            ip_port: repository.relationships.hosting.ip_port ?? "",
            login_user: repository.relationships.hosting.login_user ?? "",
            login_password: repository.relationships.hosting.login_password ?? "",
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("hostings.update", data.id), {
            preserveScroll: true,

        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-100">
                    Update Repository Hosting
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Update hosting information for this repository.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6"
            >
                <div className="space-y-6 border-2 border-zinc-700 bg-zinc-800 p-5 rounded-lg">
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="name"
                        />

                        <TextInput
                            type="text"
                            id="name"
                            className="mt-1 block w-full"
                            placeholder="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="hosting" value="hosting" />

                        <TextInput
                            type="text"
                            id="hosting"
                            className="mt-1 block w-full"
                            placeholder="hosting"
                            value={data.hosting}
                            onChange={(e) => setData("hosting", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.hosting} />
                    </div>

                    <div>
                        <InputLabel htmlFor="ip_address" value="ip_address" />

                        <TextInput
                            type="text"
                            id="ip_address"
                            className="mt-1 block w-full"
                            placeholder="ip_address"
                            value={data.ip_address}
                            onChange={(e) =>
                                setData("ip_address", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.ip_address}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="ip_port" value="ip_port" />

                        <TextInput
                            type="text"
                            id="ip_port"
                            className="mt-1 block w-full"
                            placeholder="ip_port"
                            value={data.ip_port}
                            onChange={(e) => setData("ip_port", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.ip_port} />
                    </div>

                    <div>
                        <InputLabel htmlFor="login_user" value="login_user" />

                        <TextInput
                            type="text"
                            id="login_user"
                            className="mt-1 block w-full"
                            placeholder="login_user"
                            value={data.login_user}
                            onChange={(e) =>
                                setData("login_user", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.login_user}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="login_password"
                            value="login_password"
                        />

                        <TextInput
                            type="text"
                            id="login_password"
                            className="mt-1 block w-full"
                            placeholder="login_password"
                            value={data.login_password}
                            onChange={(e) =>
                                setData("login_password", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.login_password}
                        />
                    </div>
                </div>

                <div className="mt-6 col-span-12 flex space-x-4">
                    <PrimaryButton
                        typeOfButton="submit"
                        className="justify-center"
                        disabled={processing}
                    >
                        Update
                    </PrimaryButton>

                    {recentlySuccessful && (
                        <p className="text-green-500">
                            Repository information has been updated!
                        </p>
                    )}

                    <Link
                        as="button"
                        method="DELETE"
                        preserveScroll
                        href={route("hostings.destroy", data.id)}
                        className="flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <TrashIcon className="size-5 mr-2 text-white" />
                        Smazat
                    </Link>
                </div>
            </form>
        </section>
    );
}
