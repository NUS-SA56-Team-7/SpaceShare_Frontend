import React from 'react';
import AdminLayout from 'components/Admin/AdminLayout';
import ButtonFilled from 'components/ui/ButtonFilled';
import ButtonOutlined from 'components/ui/ButtonOutlined';
import Heading from 'components/ui/Heading';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

function ViewProperties() {
    const session = {
        // Replace with your session data
        role: 'admin', // Example role
        userId: '123', // Example user ID
        username: 'John Doe', // Example username
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
                            <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Admin ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Admin Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Admin Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            IU
                                        </th>
                                        <td className="px-6 py-4">
                                            Solo
                                        </td>
                                        <td className="px-6 py-4">
                                            2008
                                        </td>
                                        <td className="flex gap-1 px-6 py-4">
                                            <ButtonOutlined>
                                                <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-500" aria-hidden="true" />
                                                <span className='text-blue-500'>
                                                    Approve
                                                </span>
                                            </ButtonOutlined>
                                            <ButtonOutlined>
                                                <XMarkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                                                <span className='text-red-500'>
                                                    Decline
                                                </span>
                                            </ButtonOutlined>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

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

export default ViewProperties;
