import React from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

import { CheckIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import axios from 'axios';

function ViewProperties() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
    };

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            width: '75px',
        },
        {
            name: 'Property Information',
            cell: row => (
                <MergedCell row={row} />
            ),
            width: '800px',
        },
        {
            name: 'Actions',
            selector: 'actions',
            cell: (row) => (
                <div className="w-full flex flex-col gap-1 py-2 min-w-[100px]">
                    <ButtonOutlined
                        onClick={() => approveData(row.id)}
                    >
                        <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-green-700" aria-hidden="true" />
                        <span className="text-green-700">Approve</span>
                    </ButtonOutlined>
                    <ButtonOutlined
                        onClick={() => declineData(row.id)}
                    >
                        <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                        <span className="text-red-500">Decline</span>
                    </ButtonOutlined>
                    <ButtonOutlined
                        onClick={() => deleteData(row.id)}
                    >
                        <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                        <span className="text-red-500">Delete</span>
                    </ButtonOutlined>
                </div>
            )
        }
    ];

    const MergedCell = ({ row }) => (
        <div className="flex">
            <div className="mr-4">
                <p className='mt-4 mb-2'>Post Type</p>
                <p className='mb-2'>Property Type</p>
                <p className='mb-2'>Title</p>
                <p className='mb-2'>Room Type</p>
                <p className='mb-2'>Rental Fees</p>
                <p className='mb-2'>Address</p>
                <p className='mb-4'>Postal Code</p>
            </div>
            <div>
                <p className='mt-4 mb-2'>: {row.postType}</p>
                <p className='mb-2'>: {row.propertyType}</p>
                <p className='mb-2'>: {row.title}</p>
                <p className='mb-2'>: {row.roomType}</p>
                <p className='mb-2'>: {row.rentalFees}</p>
                <p className='mb-2'>: {row.address}</p>
                <p className='mb-4'>: {row.postalCode}</p>
            </div>
        </div>
    )

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/property')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const approveData = (id) => {
        alert(`Approve Modal: ${id}`);
    };

    const declineData = (id) => {
        alert(`Decline Modal: ${id}`);
    };

    const deleteData = (id) => {
        alert(`Delete Modal: ${id}`);
    };

    return (
        <AdminLayout session={session}>
            <div className="mb-10">
                <Heading
                    title="All Properties List"
                />
            </div>
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-12">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5">
                        {/* Card Content */}
                        <div className="w-full">

                            {loading ? (
                                <p>Loading......</p>
                            ) : (

                                <DataTableComponent
                                    columns={columns}
                                    data={data}
                                    pagination
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}

export default ViewProperties;
