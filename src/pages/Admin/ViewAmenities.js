import React from 'react';

import { useState, useEffect } from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Modal Import
import AdminDeleteModal from 'components/Admin/AdminDeleteModal';
import UpSertModal from 'components/Admin/Modal/UpSertModal';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';
import axios from 'axios';

function ViewAmenities() {
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
            name: 'Amenity Name',
            selector: row => row.amenityName,
            sortable: true,
        },
        {
            name: 'Actions',
            selector: 'actions',
            cell: (row) => (
                <div className="w-full flex gap-1">
                    <ButtonOutlined
                        onClick={() => updateData(row.id)}
                    >
                        <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-500" aria-hidden="true" />
                        <span className="text-blue-500">Update</span>
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

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/amenity')
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

    // Modal Toggle
    const [isModalOpen, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <AdminLayout session={session}>
            <div className="flex justify-between mb-10">
                <Heading
                    title="All Amenities List"
                />
                <div>
                    <ButtonFilled
                        onClick={() => console.log('open modal')}
                    >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Create New Amenity
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

            {/* Modal Components */}
            {isModalOpen && (
                <AdminDeleteModal
                    isOpen={modalIsOpen} setOpen={setModalIsOpen}
                />
            )}
            <UpSertModal />
        </AdminLayout>
    );
}

export default ViewAmenities;
