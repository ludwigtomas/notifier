import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    RocketLaunchIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import ResetFilters from "@/Components/ResetFilters";
import Pagination from "@/Components/Pagination";
import debounce from "lodash/debounce";
import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import RepositoriesTable from "@/Pages/Repositories/Partials/RepositoriesTable";

export default function Index({ auth, repositories, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [trashed, setTrashed] = useState(filters.trashed || false);

    const debouncedSearch = debounce((value) => {
        setSearch(value);
        fetchRepositories(value, trashed);
    }, 500);

    const handleSetTrashed = (value) => {
        setTrashed(value);
        fetchRepositories(search, value);
    };

    const fetchRepositories = (searchValue, trashedValue) => {
        router.get(route("repositories.index"), {
                search: searchValue,
                trashed: trashedValue,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
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
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("repositories.index")}
                    >
                        Repozitáře
                    </Link>
                </header>
            }
        >
            <Head title="Repozitáře" />

            {/* TABLE */}
            <div>
                <div className="max-w-[100rem] mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1">
                        <section className="mb-10 card">
                            <div className="grid grid-cols-5 gap-2 items-center">
                                <div>
                                    <InputLabel
                                        className="mb-1"
                                        htmlFor="search"
                                        value="Vyhledat"
                                    />

                                    <TextInput
                                        label="Hledat"
                                        name="search"
                                        placeholder="Hledat hlavní skupinu..."
                                        type="text"
                                        className="w-full !border-zinc-600 "
                                        onChange={(e) =>
                                            debouncedSearch(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        className="mb-1"
                                        htmlFor="trashed"
                                        value="Smazané"
                                    />

                                    <div className="relative group w-full bg-zinc-700 py-2 border-2 border-zinc-600 focus:border-sky-500 focus:ring-sky-500 text-zinc-200 rounded-md shadow-sm">
                                        <div className="flex items-center justify-center space-x-4 bg-zinc-700 rounded-xl">
                                            <h3 className="text-gray-300">
                                                Vybrané modely
                                            </h3>

                                            <div className="text-white font-bold">
                                                {trashed}
                                            </div>
                                        </div>

                                        <div className="hidden group-hover:block absolute right-0 top-full pt-4 ">
                                            <div className="z-40 overflow-y-auto overflow-x-hidden p-2 w-[30rem] border border-neutral-600 bg-neutral-800 rounded-xl">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <button
                                                        className={"w-full bg-zinc-700 py-2 border-2 border-zinc-600 hover:bg-zinc-800 text-zinc-200 rounded-md shadow-sm " + (trashed === 'with' ? 'bg-zinc-800' : '')}
                                                        onClick={(e) =>handleSetTrashed('with')}
                                                    >
                                                        <span className="text-zinc-200">
                                                            Společně s mazanými
                                                        </span>
                                                    </button>

                                                    <button
                                                        className={"w-full bg-zinc-700 py-2 border-2 border-zinc-600 hover:bg-zinc-800 text-zinc-200 rounded-md shadow-sm " + (trashed === 'only' ? 'bg-zinc-800' : '')}
                                                        onClick={(e) =>handleSetTrashed('only')}
                                                    >
                                                        <span className="text-zinc-200">
                                                            Pouze smazané
                                                        </span>
                                                    </button>

                                                    <button
                                                        className={"w-full bg-zinc-700 py-2 border-2 border-zinc-600 hover:bg-zinc-800 text-zinc-200 rounded-md shadow-sm " + (trashed === 'without' ? 'bg-zinc-800' : '')}
                                                        onClick={(e) =>handleSetTrashed('without')}
                                                    >
                                                        <span className="text-zinc-200">
                                                            Pouze aktivní
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card">
                            <div className="flex space-x-4">
                                <div className="flex items-center justify-center">
                                    <Link
                                        href={route("repositories.index")}
                                        className="p-2 rounded-md bg-zinc-800 border border-zinc-700 hover:border-zinc-600 faster-animation"
                                    >
                                        <RocketLaunchIcon className="size-10 text-sky-500" />
                                    </Link>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-semibold capitalize lg:text-3xl dark:text-white">
                                        Repositories
                                    </h1>

                                    <p className="text-zinc-400">
                                        Seznam všech dostupných repozitářů.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <main className="mt-2">
                            {repositories && repositories.data.length > 0 ? (
                                <RepositoriesTable repositories={repositories}/>
                            ) : (
                                <ResetFilters
                                    href={route("repositories.index")}
                                >
                                    Nebyly nalezeny žádné repozitáře.
                                </ResetFilters>
                            )}
                        </main>
                    </div>
                </div>

                {/* Another options */}
                <div className="fixed right-10 bottom-10">
                    <Dropdown maxWidth="md">
                        <Dropdown.Trigger>
                            <div className="flex items-center space-x-2">
                                <div className="group inline-flex rounded-xl bg-sky-500 ">
                                    <button
                                        type="button"
                                        className="px-6 py-3 rounded-md focus:outline-none"
                                    >
                                        <span className="leading-4 font-medium text-white text-lg group-hover:text-sky-100 transition ease-in-out duration-150">
                                            Další možnosti
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </Dropdown.Trigger>

                        <Dropdown.Content direction="up" width="72">
                            <h3 className="text-center text-white font-bold uppercase py-2 mb-2 border-b border-zinc-800">
                                Settings
                            </h3>

                            <Link
                                // href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">
                                    ❌ Repositories - update last commit
                                </code>
                            </Link>

                            <Link
                                // href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">
                                    ❌ Repositories - update avatar
                                </code>
                            </Link>

                            <Link
                                href={route("repositories.sync")}
                                preserveScroll
                                className="flex items-center justify-center py-2 pl-1 text-sm leading-5 text-zinc-400 focus:outline-none focus:bg-zinc-600 transition duration-150 ease-in-out hover:bg-zinc-800 border-l-4 border-transparent hover:border-green-500 hover:text-green-500"
                            >
                                <code className="p-1 w-full">
                                    Repositories - sync everything
                                </code>
                            </Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

        </AdminLayout>
    );
}
