import React from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

import { CheckIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

// Modal Import
import ConfirmModal from 'components/Admin/Modal/ConfirmModal';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import Axios from 'utils/Axios';

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
                    { row.approveStatus === 'PENDING' ? (
                        <>
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
                        </>
                    ) : row.approveStatus === 'APPROVED' ? (
                        <>
                            <ButtonOutlined
                                onClick={() => declineData(row.id)}
                            >
                                <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                                <span className="text-red-500">Decline</span>
                            </ButtonOutlined>
                        </>
                    ) : (
                        <>
                            <ButtonOutlined
                            onClick={() => approveData(row.id)}
                            >
                                <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-green-700" aria-hidden="true" />
                                <span className="text-green-700">Approve</span>
                            </ButtonOutlined>
                        </>
                    )}
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
                <p className='mb-2'>Postal Code</p>
                <p className='mb-4'>Approval Status</p>
            </div>
            <div>
                <p className='mt-4 mb-2'>: {row.postType}</p>
                <p className='mb-2'>: {row.propertyType}</p>
                <p className='mb-2'>: {row.title}</p>
                <p className='mb-2'>: {row.roomType}</p>
                <p className='mb-2'>: {row.rentalFees}</p>
                <p className='mb-2'>: {row.address}</p>
                <p className='mb-2'>: {row.postalCode}</p>
                <p className='mb-4'>: {row.approveStatus}</p>
            </div>
        </div>
    )

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        Axios.get('api/admin/property')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }

    // Modal Methods
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [declineModalOpen, setDeclineModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [selectedId, setId] = useState(null);

    const approveData = (id) => {
        setApproveModalOpen(true);
        setId(id);
    };

    const sendApprove = () => {
        if(selectedId) {
            Axios.put(`/api/property/${selectedId}/approve`)
                .then(response => {
                    console.log("Approved Data successfully");
                    setApproveModalOpen(false);
                    fetchData();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    const declineData = (id) => {
        setDeclineModalOpen(true);
        setId(id);
    };

    const sendDecline = () => {
        if(selectedId) {
            Axios.put(`/api/property/${selectedId}/decline`)
                .then(response => {
                    console.log("Declined Data successfully");
                    setApproveModalOpen(false);
                    fetchData();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    const deleteData = (id) => {
        setDeleteModalOpen(true);
        setId(id);
    };

    const sendDelete = () => {
        // if(selectedId) {
        //     Axios.put(`/api/property/delete/${selectedId}`)
        //         .then(response => {
        //             console.log("Deleted Data successfully");
        //             setDeleteModalOpen(false);
        //             fetchData();
        //         })
        //         .catch(error => {
        //             console.error('Error fetching data:', error);
        //         });
        // }
        console.log(selectedId);
    }

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

            {/* Approve Modal */}
            <ConfirmModal
                action="approve"
                open={approveModalOpen}
                onClose={() => setApproveModalOpen(false)}
                title="Confirm Approval"
                confirmText="Approve"
                onConfirm={sendApprove}
            />

            {/* Decline Modal */}
            <ConfirmModal
                action="decline"
                open={declineModalOpen}
                onClose={() => setDeclineModalOpen(false)}
                title="Confirm Decline"
                confirmText="Decline"
                onConfirm={sendDecline}
            />

            {/* Delete Modal */}
            <ConfirmModal
                action="delete"
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Delete"
                confirmText="Delete"
                onConfirm={sendDelete}
            />

        </AdminLayout>
    );
}

export default ViewProperties;
