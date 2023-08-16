import { React, useState, useEffect} from 'react';

import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';

import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// DataTable Import
import DataTableComponent from 'components/Admin/DataTableComponent';

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

    useEffect(() => {
        fetch('http://localhost:8000/api/facility/getAllFacilities')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const updateData = (id) => {
        alert(`Update Modal: ${id}`);
    };

    const deleteData = (id) => {
        alert(`Delete Modal: ${id}`);
    };

    return (
        <AdminLayout session={session}>
            <div className="flex justify-between mb-10">
                <Heading
                    title="All Facilities List"
                />
                <div>
                    <ButtonFilled
                        onClick={() => console.log('open modal')}
                    >
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Create New Facility
                    </ButtonFilled>
                </div>
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

export default ViewFacilities;
