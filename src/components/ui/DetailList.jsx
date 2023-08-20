import React from 'react';
import DetailItem from './DetailItem';
import AttachmentItem from './AttachmentItem';

const DetailList = ({ title, data }) => {
    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">{title}</h3>
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <DetailItem title="Room Area" content={data?.roomArea ? data.roomArea : 'Not Listed'} />
                    <DetailItem title="Bedrooms" content={data?.numBedrooms ? data.numBedrooms : 'Not Listed'} />
                    <DetailItem title="Bathrooms" content={data?.numBathrooms ? data.numBathrooms : 'Not Listed'} />
                    <DetailItem title="Current Tenants" content={data?.numTenants ? data.numTenants : 'Not Listed'} />
                    <DetailItem
                        title="Description"
                        content={data?.description}
                    />
                    {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                <AttachmentItem filename="proof_of_ownership.pdf" size="2.4mb" />
                                <AttachmentItem filename="other_files.zip" size="4.5mb" />
                            </ul>
                        </dd>
                    </div> */}
                </dl>
            </div>
        </div>
    );
};

export default DetailList;
