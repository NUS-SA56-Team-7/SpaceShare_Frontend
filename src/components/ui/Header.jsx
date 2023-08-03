import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router';

import { Dialog, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Header() {
    /* useNavigate */
    const navigate = useNavigate();

    const [open, setOpen] = useState(false)
    return (
        <header className='bg-white border-b border-gray-200'>
            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="flex h-16 items-center">

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <a href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/');
                                }}>
                                <span className="sr-only">SpaceShare</span>
                                <img
                                    className="h-8 w-32"
                                    src="./spaceshare_logo.svg"
                                    alt="logo"
                                />
                            </a>
                        </div>

                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <a
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:txt-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/login');
                                    }}
                                >
                                    Sign in
                                </a>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                <a
                                    href="#"
                                    className="text-sm font-medium text-gray-700 hover:txt-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/login');
                                    }}
                                >
                                    Create account
                                </a>
                            </div>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-primary text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://i.pinimg.com/originals/50/28/ce/5028ce929cd06b95691bd55db694a37b.jpg"
                                            alt="profile-img"
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    View Profile
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Settings
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Log out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Menu</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <div className="flex items-center gap-x-6 pb-6 mb-6 border-b border-gray-200">
                                                            <img className="h-16 w-16 rounded-full" src="https://i.pinimg.com/originals/50/28/ce/5028ce929cd06b95691bd55db694a37b.jpg" alt="" />
                                                            <div>
                                                                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">UserName</h3>
                                                                <p className="text-sm font-semibold leading-6 txt-primary">Verified</p>
                                                            </div>
                                                            <div className="ml-auto">
                                                                <a
                                                                    href="#"
                                                                    className="inline-flex items-center justify-center rounded-md border border-transparent btn-primary px-5 py-2.5 text-base font-sm text-white shadow-sm"
                                                                >
                                                                    Edit
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <a
                                                                href="#"
                                                                className="font-normal"
                                                            >
                                                                View Posts
                                                            </a>
                                                            <a
                                                                href="#"
                                                                className="font-normal"
                                                            >
                                                                View Wishlist
                                                            </a>
                                                        </div>
                                                        {/* <ul role="list" className="-my-6 divide-y divide-gray-200">

                                                            <div>
                                                                <div className="mt-6">
                                                                    <a
                                                                        href="#"
                                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                                    >
                                                                        Log in
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="mt-6">
                                                                    <a
                                                                        href="#"
                                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                                    >
                                                                        Sign Up
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog >
            </Transition.Root >
        </header >
    );
}

export default Header;