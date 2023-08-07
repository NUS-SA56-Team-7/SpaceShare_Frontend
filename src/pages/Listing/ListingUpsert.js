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
import NotFound404 from '../Error/NotFound404';
import ImageUploader from 'components/ImageUploader/ImageUploader';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Service Imports */
import { firebaseStorageRefs } from 'services/firebase/CloudStorage/firebaseCloudStorage';
import firebaseStorageUploadFiles from 'services/firebase/CloudStorage/firebaseStorageUploadFiles';
import firebaseStorageDeleteFiles from 'services/firebase/CloudStorage/firebaseStorageDeleteFiles';
import Loader from 'components/Loader/Loader';

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

    /* useParams */
    const { upsert: paramUpsert } = useParams();

    /* useLocation */
    const location = useLocation();

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
        if (selectedImages.length === 0) {
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
        // Axios.post('/api/property/create', data,
        //     { headers: { 'Content-Type': 'application/json' } })
        //     .then(res => {
        //         if (res.status === 200) {
        //             console.log('OK');
        //             // navigate('/home');
        //         }
        //     })
        //     .catch(err => {
        //         if (err.response.status === 500) {
        //             setError(err.response.data);
        //         }
        //     })
        // await firebaseStorageUploadFiles(firebaseStorageRefs.propertyImages, selectedImages)
        //     .then((result) => {
        //         setData({ ...data, propertyImageURLs: result });
        //         Axios.post('/api/property/create', data,
        //             { headers: { 'Content-Type': 'application/json' } })
        //     })
        //     .then(res => {
        //         console.log("OK");
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         firebaseStorageDeleteFiles(firebaseStorageRefs.propertyImages, data.propertyImageURLs);
        //     })

        try {
            // Upload images to Firebase Storage
            const uploadedImageURLs = await firebaseStorageUploadFiles(firebaseStorageRefs.propertyImages, selectedImages);

            // Update the data object with the uploaded image URLs
            const updatedData = { ...data, propertyImageURLs: uploadedImageURLs };

            // Create the property using your backend API
            const response = await Axios.post('/api/property/create', updatedData, {
                headers: { 'Content-Type': 'application/json' }
            });
        }
        catch (error) {
            console.error("Error creating property:", error);
        }
    };

    const get = (propertyId) => {
        setLoading(true);
        Axios.get(`/api/property/${propertyId}`)
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
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

    };

    const submit = () => {
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
        if (paramUpsert === 'create') {
            console.log('create');
        }
        else if (paramUpsert === 'update') {
            get(propertyId);
            console.log('update');
        }
    }, []);

    /* Testing */
    useEffect(() => {
        console.log(data);
    }, [data]);

    const uploadFiles = () => {
        console.log(data);
        firebaseStorageUploadFiles(firebaseStorageRefs.propertyImages, selectedImages)
            .then((result) => {
                setData({ ...data, propertyImageURLs: result });
                return Axios.post('/api/property/create', data,
                    { headers: { 'Content-Type': 'application/json' } })
            })
            .then(res => {
                console.log("OK");
            })
            .catch(err => {
                console.log(err);
                firebaseStorageDeleteFiles(firebaseStorageRefs.propertyImages, data.propertyImages);
            })
    };

    if (!allowedPaths.includes(paramUpsert)) {
        return <NotFound404 />
    }
    else {
        return (
            <div style={{ width: '500px' }}>
                {loading && <Loader />}
                <h1>
                    {
                        paramUpsert === 'create'
                            ? 'Create a New Property Advertisement'
                            : 'Update Property Advertisement'
                    }
                </h1>

                <ImageUploader
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                    concurrentImageLimit={5} />
                <FormError nbsp>{'propertyImages' in error && error['propertyImages']}</FormError>

                <button onClick={() => uploadFiles(selectedImages)}>Upload</button>

                <FormInputText
                    label='Enter Title of Property Post'
                    autoFocus
                    value={data['title']}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && submit()}
                />
                <FormError nbsp>{'title' in error && error['title']}</FormError>

                <FormRadioOption
                    name='Property Type'
                    options={{ 'HDB': 'HDB', 'Condominium': 'CONDOMINIUM', 'Landed': 'LANDED' }}
                    selected={data['propertyType']}
                    setSelected={(e) => setData({ ...data, propertyType: e.target.value })} />
                <FormError nbsp>{'propertyType' in error && error['propertyType']}</FormError>

                <FormRadioOption
                    name='Room Type'
                    options={{ 'Single': 'SINGLE', 'Common': 'COMMON', 'Master': 'MASTER', 'Whole Unit': 'WHOLE_UNIT' }}
                    selected={data['roomType']}
                    setSelected={(e) => setData({ ...data, roomType: e.target.value })} />
                <FormError nbsp>{'roomType' in error && error['roomType']}</FormError>

                <FormInputNumber
                    label='Enter Rental Fees'
                    value={data['rentalFees']}
                    min='0'
                    step='50'
                    onChange={(e) => setData({ ...data, rentalFees: e.target.value })} />
                <FormError nbsp>{'rentalFees' in error && error['rentalFees']}</FormError>

                <FormInputText
                    label='Enter Property Address'
                    value={data['address']}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && submit()}
                />
                <FormError nbsp>{'address' in error && error['address']}</FormError>

                <FormInputText
                    label='Enter Postal Code'
                    value={data['postalCode']}
                    maxLength='6'
                    onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && submit()}
                />
                <FormError nbsp>{'postalCode' in error && error['postalCode']}</FormError>

                <FormRadioOption
                    name='Proeprty Furnishment'
                    options={{ 'Furnished': 'FURNISHED', 'Partial': 'PARTIAL_FURNISHED', 'Unfurnished': 'UNFURNISHED' }}
                    selected={data['furnishment'] ? data['furnishment'] : ''}
                    setSelected={(e) => setData({ ...data, furnishment: e.target.value })} />
                <FormError nbsp>{'furnishment' in error && error['furnishment']}</FormError>

                <FormSelectOption
                    name='Number of Bedrooms'
                    options={{ 'default': 'Select Number of Bedrooms', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' }}
                    selected={data['numBedrooms'] ? data['numBedrooms'] : ''}
                    setSelected={(e) => setData({ ...data, numBedrooms: e.target.value })} />

                <FormSelectOption
                    name='Number of Bathrooms'
                    options={{ 'default': 'Select Number of Bathrooms', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' }}
                    selected={data['numBathrooms'] ? data['numBathrooms'] : ''}
                    setSelected={(e) => setData({ ...data, numBathrooms: e.target.value })} />

                <FormSelectOption
                    name='Number of Tenants'
                    options={{ 'default': 'Select Number of Tenants', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6' }}
                    selected={data['numTenants'] ? data['numTenants'] : ''}
                    setSelected={(e) => setData({ ...data, numTenants: e.target.value })} />

                <ButtonFilled
                    onClick={() => submit()}>
                    {paramUpsert === 'create'
                        ? 'Create Property Advertisement'
                        : 'Update Property Advertisement'}
                </ButtonFilled>
            </div>
        );
    }
}

export default ListingUpsert;