import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionButton } from "@/Components/Buttons/ActionButtons";
import { useCallback } from "react";

export default function Show({ hostings, hosting, hosting_repository, className = "" }) {
    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            hosting_id: hosting_repository.hosting_id ?? "",

            ip_address: hosting_repository.ip_address ?? "",
            ip_port: hosting_repository.ip_port ?? "",
            login_user: hosting_repository.login_user ?? "",
            login_password: hosting_repository.login_password ?? "",
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("hosting-repository.update", hosting_repository.id), {
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
                            htmlFor="hosting_id"
                            value="Hosting"
                        />

                        <select
                            id="hosting_id"
                            className="mt-1 block w-full bg-zinc-700 border-2 border-zinc-500 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm"
                            value={data.hosting_id}
                            onChange={(e) => setData("hosting_id", e.target.value)}
                        >
                            <option value="">
                                Vyberte hosting
                            </option>

                            {hostings.map((hosting) => (
                                <option
                                    key={hosting.id}
                                    value={hosting.id}
                                >
                                    {hosting.name}
                                </option>
                            ))}
                        </select>

                        <InputError
                            className="mt-2"
                            message={errors.hosting_id}
                        />


                    </div>

                    <div className="pt-10">
                        <InputLabel
                            htmlFor="login_user"
                            value="User"
                        />

                        <TextInput
                            type="text"
                            id="login_user"
                            className="mt-1 block w-full"
                            placeholder="tech1"
                            value={data.login_user}
                            onChange={(e) => setData("login_user", e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.login_user}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="ip_address"
                            value="IP adresa"
                        />

                        <TextInput
                            type="text"
                            id="ip_address"
                            className="mt-1 block w-full"
                            placeholder="127.0.0.10"
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
                        <InputLabel
                            htmlFor="ip_port"
                            value="IP port"
                        />

                        <TextInput
                            type="text"
                            id="ip_port"
                            className="mt-1 block w-full"
                            placeholder="1788"
                            value={data.ip_port}
                            onChange={(e) => setData("ip_port", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.ip_port} />
                    </div>


                    <div>
                        <InputLabel
                            htmlFor="login_password"
                            value="Heslo"
                        />

                        <TextInput
                            type="text"
                            id="login_password"
                            className="mt-1 block w-full"
                            placeholder="empty"
                            value={data.login_password}
                            onChange={(e) => setData("login_password", e.target.value)}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.login_password}
                        />
                    </div>
                </div>

                <div className="mt-6 col-span-12 flex items-center space-x-4">
                    <PrimaryButton
                        typeOfButton="submit"
                        className="justify-center"
                        disabled={processing}
                    >
                        Update
                    </PrimaryButton>

                    <Link
                        as="button"
                        method="DELETE"
                        preserveScroll
                        href={route("hosting-repository.destroy", hosting_repository.id)}
                        className="flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <TrashIcon className="size-5 mr-2 text-white" />

                        Smazat
                    </Link>

                    {recentlySuccessful && (
                        <p className="text-green-500">
                            Repository information has been updated!
                        </p>
                    )}
                </div>
            </form>
        </section>
    );
}
