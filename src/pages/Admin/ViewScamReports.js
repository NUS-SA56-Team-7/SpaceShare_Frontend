import React from 'react';

import { useState, useEffect } from 'react';
import Axios from 'utils/Axios';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';

function ViewScamReports() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
    };

    // Mock Data
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Property Id',
            selector: row => row.propertyId,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Created At',
            selector: row => row.createdAt,
            sortable: true,
        },
        {
            name: 'Updated At',
            selector: row => row.updatedAt,
            sortable: true,
        },
        {
            name: 'Actions',
            selector: 'actions',
            cell: (row) => (
                <div className="w-full flex flex-col gap-1 py-2">
                    <ButtonOutlined
                        onClick={() => approveData(row.id)}
                    >
                        <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-500" aria-hidden="true" />
                        <span className='text-blue-500'>
                            Approve
                        </span>
                    </ButtonOutlined>
                    <ButtonOutlined
                        onClick={() => declineData(row.id)}
                    >
                        <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                        <span className='text-red-500'>
                            Decline
                        </span>
                    </ButtonOutlined>
                </div>
            )
        }
    ];

    const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetch('https://localhost:7286/api/Scam')
    //         .then(response => response.json())
    //         .then(data => setData(data))
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);

    useEffect(() => {
        Axios.get('https://localhost:7286/api/Scam')
            .then(res => {
                setData(res.data);
                // if (res.status === 200) {
                //     setData(res.data);
                // }
                // setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    console.log(err.response.data);
                }
                else if (err.response.status === 500) {
                    console.log(err.response.data);
                }
                // setLoading(false);
            })
    }, []);

    const approveData = (id) => {
        alert(`Approve Modal: ${id}`);
    };

    const declineData = (id) => {
        alert(`Decline Modal: ${id}`);
    };

    return (
        <AdminLayout session={session}>
            <div className="mb-10">
                <Heading
                    title="All Scam Reports List"
                />
            </div>
            <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                <div className="col-span-12">
                    <div className="p-8 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5">
                        {/* Card Title */}
                        <div className="mb-4">
                            <h3 className="font-bold text-lg mb-2 text-gray-900 ">
                                Some data Some data
                            </h3>
                            <span className="font-normal text-base text-gray-500">
                                Some more data Some more data
                            </span>
                        </div>
                        {/* Card Content */}
                        <div className="w-full">

                            <DataTableComponent
                                columns={columns}
                                data={data}
                            />

                        </div>
                        {/* Card Footer */}
                        <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
                            {/* <div className="ml-auto w-36">
                                <ButtonFilled>
                                    View
                                </ButtonFilled>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}

export default ViewScamReports;
