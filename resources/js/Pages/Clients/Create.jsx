import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        ico: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("clients.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="first_name"
                                        value="first_name"
                                    />

                                    <TextInput
                                        id="first_name"
                                        type="text"
                                        name="first_name"
                                        value={data.first_name}
                                        autoComplete="given-name"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.first_name}
                                        htmlFor="first_name"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="last_name"
                                        value="last_name"
                                    />

                                    <TextInput
                                        id="last_name"
                                        type="text"
                                        name="last_name"
                                        value={data.last_name}
                                        autoComplete="family-name"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.last_name}
                                        htmlFor="last_name"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="email" />

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
                                </div>
                                <div>
                                    <InputLabel htmlFor="phone" value="phone" />

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
                                    <InputLabel htmlFor="ico" value="ico" />

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

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                    >
                                        ADD
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
