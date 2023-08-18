import React from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Modal Import
import ConfirmModal from 'components/Admin/Modal/ConfirmModal';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import axios from 'axios';

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
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/scamreport')
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

    // Modal Methods
    const [modalOpen, setModalOpen] = useState(false);

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
                        {/* Card Content */}
                        <div className="w-full">

                            {/* Data Table */}
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

            {/* Modal Components */}
            <ConfirmModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm Deletion"
                confirmText="Delete"
                onConfirm={console.log('confirm')}
            />

        </AdminLayout>
    );
}

export default ViewScamReports;
