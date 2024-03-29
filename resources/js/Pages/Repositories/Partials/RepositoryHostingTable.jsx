import { Link, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { ClockIcon } from "@heroicons/react/24/outline";
import Dropdown from "@/Components/Dropdown";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function RepositoryClientsTable({ hosting }) {
    return (
        <div className="mt-6 grid gap-5">
            <div className="max-w-xl mx-auto w-full border-2 pace-y-6 border-zinc-700 bg-zinc-900 space-y-5 p-5 rounded-lg">
                <div>
                    <InputLabel htmlFor="name" value="name" />

                    <TextInput
                        type="text"
                        id="name"
                        className="mt-1 block w-full"
                        readOnly
                        placeholder="name"
                        defaultValue={hosting.name}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="hosting" value="hosting" />

                    <TextInput
                        type="text"
                        id="hosting"
                        className="mt-1 block w-full"
                        readOnly
                        placeholder="hosting"
                        defaultValue={hosting.hosting}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="ip_address" value="ip_address" />

                    <TextInput
                        type="text"
                        id="ip_address"
                        className="mt-1 block w-full"
                        readOnly
                        placeholder="ip_address"
                        defaultValue={hosting.ip_address}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="ip_port" value="ip_port" />

                    <TextInput
                        type="text"
                        id="ip_port"
                        className="mt-1 block w-full"
                        readOnly
                        placeholder="ip_port"
                        defaultValue={hosting.ip_port}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="login_user" value="login_user" />

                    <TextInput
                        type="text"
                        id="login_user"
                        className="mt-1 block w-full"
                        readOnly
                        placeholder="login_user"
                        defaultValue={hosting.login_user}
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
                        readOnly
                        placeholder="login_password"
                        defaultValue={hosting.login_password}
                    />
                </div>
            </div>
        </div>
    );
}
