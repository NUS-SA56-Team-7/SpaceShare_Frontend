import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';

/* Package Imports */
import { v4 as uuidv4 } from 'uuid';

/* Component Imports */
import FormInputText from 'components/form/FormInputText';
import FormInputNumber from 'components/form/FormInputNumber';
import FormError from 'components/form/FormError';
import ButtonFilled from 'components/ui/ButtonFilled';
import FormRadioOption from 'components/form/FormRadioOption';
import FormSelectOption from 'components/form/FormSelectOption';
import NotFound404 from './Error/NotFound404';
import ImageSelector from 'components/ImageSelector/ImageSelector';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Service Imports */
// import { firebaseStorageRefs } from 'services/firebase/CloudStorage/firebaseCloudStorage';
// import firebaseStorageUploadFiles from 'services/firebase/CloudStorage/firebaseStorageUploadFiles';
// import firebaseStorageDeleteFiles from 'services/firebase/CloudStorage/firebaseStorageDeleteFiles';
import Loader from 'components/Loader/Loader';
import { useContext } from 'react';
import AuthChecker from 'components/layout/AuthChecker';
import Layout from 'components/layout/Layout';

import Heading from 'components/ui/Heading';

function ListingUpsert() {

    /* Initialization */
    const allowedPaths = ['create', 'update'];

    const initData = {
        title: '', description: '', propertyType: '', roomType: '',
        rentalFees: 0, address: '', postalCode: '', furnishment: '',
        numBedrooms: 0, numBathrooms: 0, numTenants: 0,
        propertyImageURLs: [],
        postType: 'ROOM_RENTAL'
    };
    const err = {};

    /* useState */
    const [data, setData] = useState(initData);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [selectedDocs, setSelectedDocs] = useState([]);

    /* useParams */
    const { upsert: paramUpsert } = useParams();

    /* useLocation */
    const location = useLocation();

    /* useContext */
    const { auth } = useContext(AuthContext);

    /* Search Params */
    const searchParams = new URLSearchParams(location.search);
    const propertyId = searchParams.get('id');

    /* Functions */
    const checkTitle = (title) => {
        if (title.length === 0) {
            err['title'] = 'Title of Property Post must not be empty'
        }
    };

    const checkRentalFees = (rentalFees) => {
        if (rentalFees < 0) {
            err['rentalFees'] = 'Minimum Rental Fees must be greater than 0'
        }
        else if (rentalFees === 0) {
            err['rentalFees'] = 'Please set the Rental Fees'
        }
    };

    const checkAddress = (address) => {
        if (address.length === 0) {
            err['address'] = 'Property Address must not be empty'
        }
    };

    const checkPostalCode = (postalCode) => {
        const regexPostalCode = /^[0-9]{6}$/;
        if (!regexPostalCode.test(postalCode)) {
            err['postalCode'] = 'Please enter valid postal code'
        }
        else if (postalCode.length === 0) {
            err['postalCode'] = 'Postal Code must not be empty'
        }
    };

    const checkOthers = () => {
        if (data['propertyType'].length === 0) {
            err['propertyType'] = 'Please select Property Type'
        }
        if (data['roomType'].length === 0) {
            err['roomType'] = 'Please select Room Type'
        }
        if (data['furnishment'].length === 0) {
            err['furnishment'] = 'Please select Furnishment Status'
        }
        if (selectedImages.length + existingImages.length === 0) {
            err['propertyImages'] = 'Please provide a Property Image'
        }
    };

    const checkData = () => {
        checkTitle(data['title']);
        checkRentalFees(data['rentalFees']);
        checkAddress(data['address']);
        checkPostalCode(data['postalCode']);
        checkOthers();

        if (Object.keys(err).length == 0) {
            setError({});
            return true;
        }
        else {
            setError(err);
            return false;
        }
    };

    const create = async () => {
        // try {
        //     // Upload Images to Firebase Storage
        //     const uploadedImageURLs = await firebaseStorageUploadFiles(
        //         firebaseStorageRefs.propertyImages, selectedImages);
        //     // Update the Data Object with the Uploaded Image URLs
        //     const updatedData = { ...data, propertyImageURLs: uploadedImageURLs };

        //     await Axios.post(`/api/renter/${auth?.id}/property/create`,
        //         updatedData,
        //         {
        //             headers: { 'Content-Type': 'application/json' }
        //         })
        //         .then(res => {
        //             if (res.status === 201) {
        //                 setData(res.data);
        //             }
        //             setLoading(false);
        //         })
        //         .catch(err => {
        //             if (err.response.status === 404) {
        //                 setError(err.response.data);
        //             }
        //             else if (err.response.status === 500) {
        //                 setError(err.response.data);
        //             }
        //             setLoading(false);
        //         });
        // }
        // catch (error) {
        //     console.error("Error creating property:", error);
        // }
        console.log('Created');
    };

    useEffect(() => {
        console.log(auth);
    }, [auth])


    const get = (propertyId) => {
        setLoading(true);
        Axios.get(`/api/property/${propertyId}`)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                    setSelectedImages(res.data?.propertyImages)
                }
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setError(err.response.data);
                }
                else if (err.response.status === 500) {
                    setError(err.response.data);
                }
                setLoading(false);
            })
    };

    const update = () => {
        // Axios.put(`/api/property/update/${propertyId}`)
        //     .then(res => {
        //         if (res.status === 200) {
        //             setData(res.data);
        //         }
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         if (err.response.status === 404) {
        //             setError(err.response.data);
        //         }
        //         else if (err.response.status === 500) {
        //             setError(err.response.data);
        //         }
        //         setLoading(false);
        //     })
        console.log(data);
    };

    const submit = () => {
        console.log('here');
        if (checkData()) {
            if (paramUpsert === 'create') {
                create();
            }
            else if (paramUpsert === 'update') {
                update();
            }
        }
    };

    /* useEffect */
    useEffect(() => {
        if (paramUpsert === 'update') {
            get(propertyId);
        }
    }, []);

    /* Testing */
    useEffect(() => {
        console.log(data);
    }, [data]);

    // if (!allowedPaths.includes(paramUpsert)) {
    //     return <NotFound404 />
    // }
    // else {
    return (
        <Layout>
            {/* <div style={{ width: '500px' }}> */}
            {loading && <Loader />}
            <h1>
                {
                    paramUpsert === 'create'
                        ? 'Create a New Property Advertisement'
                        : 'Update Property Advertisement'
                }
            </h1>
            <Heading
                title={
                    paramUpsert === 'create'
                        ? 'Create a New Property Advertisement'
                        : 'Update Property Advertisement'
                }
            />

            <div className="grid grid-cols-12 p-8 my-12 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-y-4">
                    <div className="col-span-1 md:col-span-12">
                        <FormInputText
                            label='Enter Title of Property Post'
                            autoFocus
                            value={data['title']}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && submit()}
                        />
                        <FormError nbsp>{'title' in error && error['title']}</FormError>
                    </div>

                    <div className="col-span-1 md:col-span-12">
                        <FormRadioOption
                            name='Property Type'
                            options={{ 'HDB': 'HDB', 'Condominium': 'CONDOMINIUM', 'Landed': 'LANDED' }}
                            selected={data['propertyType']}
                            setSelected={(e) => setData({ ...data, propertyType: e.target.value })} />
                        <FormError nbsp>{'propertyType' in error && error['propertyType']}</FormError>
                    </div>


                    <div className="col-span-1 md:col-span-12">
                        <FormRadioOption
                            name='Room Type'
                            options={{ 'Single': 'SINGLE', 'Common': 'COMMON', 'Master': 'MASTER', 'Whole Unit': 'WHOLE_UNIT' }}
                            selected={data['roomType']}
                            setSelected={(e) => setData({ ...data, roomType: e.target.value })} />
                        <FormError nbsp>{'roomType' in error && error['roomType']}</FormError>
                    </div>


                    <div className="col-span-1 md:col-span-6">
                        <FormInputNumber
                            label='Enter Rental Fees'
                            value={data['rentalFees']}
                            min='0'
                            step='50'
                            onChange={(e) => setData({ ...data, rentalFees: e.target.value })} />
                        <FormError nbsp>{'rentalFees' in error && error['rentalFees']}</FormError>
                    </div>


                    <div className="col-span-1 md:col-span-12">
                        <FormInputText
                            label='Enter Property Address'
                            value={data['address']}
                            onChange={(e) => setData({ ...data, address: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && submit()}
                        />
                        <FormError nbsp>{'address' in error && error['address']}</FormError>
                    </div>


                    <div className="col-span-1 md:col-span-12">
                        <FormInputText
                            label='Enter Postal Code'
                            value={data['postalCode']}
                            maxLength='6'
                            onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                            onKeyPress={(e) => e.key === 'Enter' && submit()}
                        />
                        <FormError nbsp>{'postalCode' in error && error['postalCode']}</FormError>
                    </div>


                    <div className="col-span-1 md:col-span-12">
                        <FormRadioOption
                            name='Proeprty Furnishment'
                            options={{ 'Furnished': 'FURNISHED', 'Partial': 'PARTIAL_FURNISHED', 'Unfurnished': 'UNFURNISHED' }}
                            selected={data['furnishment'] ? data['furnishment'] : ''}
                            setSelected={(e) => setData({ ...data, furnishment: e.target.value })} />
                        <FormError nbsp>{'furnishment' in error && error['furnishment']}</FormError>
                    </div>


                    <div className="col-span-1 md:col-span-12">
                        <FormSelectOption
                            name='Number of Bedrooms'
                            options={{ 'default': 'Select Number of Bedrooms', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' }}
                            selected={data['numBedrooms'] ? data['numBedrooms'] : ''}
                            setSelected={(e) => setData({ ...data, numBedrooms: e.target.value })} />
                    </div>


                    <div className="col-span-1 md:col-span-12">
                        <FormSelectOption
                            name='Number of Bathrooms'
                            options={{ 'default': 'Select Number of Bathrooms', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' }}
                            selected={data['numBathrooms'] ? data['numBathrooms'] : ''}
                            setSelected={(e) => setData({ ...data, numBathrooms: e.target.value })} />

                    </div>

                    <div className="col-span-1 md:col-span-12">
                        <FormSelectOption
                            name='Number of Tenants'
                            options={{ 'default': 'Select Number of Tenants', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6' }}
                            selected={data['numTenants'] ? data['numTenants'] : ''}
                            setSelected={(e) => setData({ ...data, numTenants: e.target.value })} />
                    </div>

                    <div className="col-span-1 md:col-span-12">
                        <ImageSelector
                            selectedImages={selectedImages}
                            setSelectedImages={setSelectedImages}
                            concurrentImageLimit={5} />
                        <FormError nbsp>{'propertyImages' in error && error['propertyImages']}</FormError>

                        <div className='custom' style={{ display: 'flex' }}>
                            {existingImages.map(image => (
                                <img src={image.imageUrl} alt={image.id} style={{ maxWidth: '200px' }} />
                            ))}
                        </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-12">
                        <ButtonFilled
                            onClick={() => submit()}>
                            {paramUpsert === 'create'
                                ? 'Create Property Advertisement'
                                : 'Update Property Advertisement'}
                        </ButtonFilled>
                    </div>
                </div>
            </div>


            {/* </div> */}
        </Layout>
    );
    // }
}

export default ListingUpsert;