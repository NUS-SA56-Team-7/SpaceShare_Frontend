import React from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';
import FormInputText from 'components/form/FormInputText';
import FormError from 'components/form/FormError';

import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Modal Import
import UpSertModal from 'components/Admin/Modal/UpSertModal';
import ConfirmModal from 'components/Admin/Modal/ConfirmModal';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import axios from 'axios';

function ViewFacilities() {
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
        },
        {
            name: 'Facility Name',
            selector: row => row.facilityName,
            sortable: true,
        },
        {
            name: 'Actions',
            selector: 'actions',
            cell: (row) => (
                <div className="w-full flex gap-1">
                    <ButtonOutlined
                        onClick={() => setApproveModalOpen(true)}
                    >
                        <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-500" aria-hidden="true" />
                        <span className="text-blue-500">Update</span>
                    </ButtonOutlined>
                    <ButtonOutlined
                        onClick={() => setRejectModalOpen(true)}
                    >
                        <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                        <span className="text-red-500">Delete</span>
                    </ButtonOutlined>
                </div>
            )
        }
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/facility')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const updateData = (id) => {
        alert(`Update Modal: ${id}`);
    };

    const deleteData = (id) => {
        alert(`Delete Modal: ${id}`);
    };

    // Modal Methods
    const [modalOpen, setModalOpen] = useState(false);
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);

    return (
        <AdminLayout session={session}>
            <div className="flex justify-between mb-10">
                <Heading
                    title="All Facilities List"
                />
                <div>
                    <ButtonFilled
                        onClick={() => setModalOpen(true)}
                    >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Create New Facility
                    </ButtonFilled>
                </div>
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

            {/* Approve Modal */}
            <ConfirmModal
                action="approve"
                open={approveModalOpen}
                onClose={() => setApproveModalOpen(false)}
                title="Confirm Approval"
                confirmText="Approve"
                onConfirm={updateData}
            />

            {/* Reject Modal */}
            <ConfirmModal
                action="reject"
                open={rejectModalOpen}
                onClose={() => setRejectModalOpen(false)}
                title="Confirm Rejection"
                confirmText="Reject"
                onConfirm={deleteData}
            />

            <UpSertModal
                title="Create New Item"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={console.log('added new')}
            >
                <FormInputText
                    label='Enter Name'
                    autoFocus
                    value={0}
                    onChange={0}
                    onKeyPress={0}
                />
                <FormError nbsp>GG</FormError>
                <FormInputText
                    label='Enter Id'
                    autoFocus
                    value={0}
                    onChange={0}
                    onKeyPress={0}
                />
                <FormError nbsp>GG</FormError>
            </UpSertModal>
        </AdminLayout>
    );
}

export default ViewFacilities;
