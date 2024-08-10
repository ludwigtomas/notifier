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
import AttachHostingRepositoriesForm from "@/Pages/Hostings/Partials/AttachHostingRepositoriesForm";
import UpdateHostingAttachedRepositoriesForm from "@/Pages/Hostings/Partials/UpdateHostingAttachedRepositoriesForm";
import UpdateHostingInformationForm from "@/Pages/Hostings/Partials/UpdateHostingInformationForm";

export default function Index({ auth, hosting, repositories }) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            name: hosting.name,
            hosting_url: hosting.hosting_url ?? "",
            repositories: [],
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("hostings.update", hosting.id));
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
                        Klienti
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500 slower-animation"
                        href={route("hostings.edit", hosting.id)}
                    >
                        {hosting.name}
                    </Link>

                    <span>
                        <ChevronRightIcon className="size-5" />
                    </span>

                    <Link
                        className="font-semibold text-lg leading-tight text-sky-500"
                        href={route("hostings.edit", hosting.id)}
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
                        <UpdateHostingInformationForm hosting={hosting} />
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <UpdateHostingAttachedRepositoriesForm
                            hosting={hosting}
                        />
                    </div>

                    <div className="p-10 bg-zinc-900 sm:rounded-xl">
                        <AttachHostingRepositoriesForm
                            hosting={hosting}
                            repositories={repositories}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
