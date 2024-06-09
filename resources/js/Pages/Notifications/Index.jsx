import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    CheckIcon,
    XMarkIcon,
    ChevronRightIcon,
    LinkIcon,
    BackspaceIcon,
    CommandLineIcon,
} from "@heroicons/react/24/outline";
import Modal from "@/Components/Modal";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import Pagination from "@/Components/Pagination";
import debounce from "lodash/debounce";
import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";

export default function Index({ auth, repositories, filters }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >

        </AuthenticatedLayout>
    );
}
