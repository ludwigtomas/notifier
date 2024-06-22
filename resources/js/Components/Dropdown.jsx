import { useState, createContext, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ align = 'right', width = '48', direction = '', contentClasses = 'p-1 bg-zinc-900 border border-zinc-700', children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-bottom';

    if (align === 'left') {
        alignmentClasses = 'start-0';
    } else if (align === 'right') {
        alignmentClasses = 'end-0';
    } else if (align === 'center') {
        alignmentClasses = 'left-1/2 -translate-x-1/2';
    }

    let widthClasses = "w-" + width;

    let directionClasses = 'mt-2';

    if (direction === 'up') {
        directionClasses = 'bottom-full mb-2';
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 rounded-md shadow-lg ${alignmentClasses} ${widthClasses} ${directionClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 overflow-hidden ` + contentClasses}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={
                'flex items-center w-full px-4 py-2 text-start text-sm leading-5 text-zinc-400 hover:text-zinc-200 focus:outline-none focus:bg-zinc-700 transition duration-150 ease-in-out hover:bg-zinc-800  ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
