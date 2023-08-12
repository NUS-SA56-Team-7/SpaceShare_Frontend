import React, { Fragment, useState } from 'react';

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import Layout from 'components/layout/Layout';
import Heading from 'components/ui/Heading';
import SearchForm from 'components/ui/SearchForm';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOption, setFilterOption] = useState('all'); // Default filter option is 'all'

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
    };

    // Function to handle search action, you can implement your search logic here
    const performSearch = () => {
        // Implement your search logic here using the 'searchQuery' and 'filterOption'
        console.log('Searching for:', searchQuery);
        console.log('Filter option:', filterOption);
    };

    const sortOptions = [
        { name: 'Most Popular', href: '#', current: true },
        { name: 'Best Rating', href: '#', current: false },
        { name: 'Newest', href: '#', current: false },
        { name: 'Price: Low to High', href: '#', current: false },
        { name: 'Price: High to Low', href: '#', current: false },
    ]
    const subCategories = [
        { name: 'HDB', href: '#' },
        { name: 'Condo', href: '#' },
        { name: 'Studio', href: '#' },
        { name: '2 Bedrooms', href: '#' },
        { name: 'Whole Flat', href: '#' },
    ]
    const filters = [
        {
            id: 'color',
            name: 'Bedroom',
            options: [
                { value: 'studio', label: 'studio', checked: false },
                { value: '1', label: '1', checked: false },
                { value: '2', label: '2', checked: true },
                { value: '3', label: '3', checked: false },
                { value: '4', label: '4', checked: false },
                { value: '5+', label: '5', checked: false },
            ],
        },
        {
            id: 'category',
            name: 'Price',
            options: [
                { value: '$100-500', label: '$100-500', checked: false },
                { value: '$500-1000', label: '$500-1000', checked: false },
                { value: '$1000-1500', label: '$1000-1500', checked: true },
                { value: '$1500+', label: '$1500+', checked: false },
                { value: 'accessories', label: 'Accessories', checked: false },
            ],
        },
        {
            id: 'size',
            name: 'Bathroom',
            options: [
                { value: '1', label: '1', checked: false },
                { value: '2', label: '2', checked: false },
                { value: '3', label: '3', checked: false },
                { value: '4', label: '4', checked: false },
                { value: '5+', label: '5+', checked: false },
            ],
        },
    ]
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Layout>
            <Heading
                title="Search Properties"
            />
            <div className="flex items-center gap-x-6 my-8">
                <div className="w-full">
                    <SearchForm></SearchForm>
                </div>
                <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                Sort
                                <ChevronDownIcon
                                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.name}>
                                            {({ active }) => (
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-gray-200">
                {/* 4 Column Section */}
                <div className="sm:col-span-1 md:col-span-3 pr-8 border-r border-gray-300">
                    <div className="flex flex-col p-6 md:sticky md:top-6 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                        <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                    {subCategories.map((category) => (
                                        <li key={category.name}>
                                            <a href={category.href} className="block px-2 py-3">
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-mx-2 -my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div key={option.value} className="flex items-center">
                                                                <input
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                        </ul>
                    </div>
                </div>
                {/* 8 Column Section */}
                <div className="sm:col-span-1 md:col-span-7 pt-8">

                </div>
            </div>

        </Layout>
    );
};

export default Search;
