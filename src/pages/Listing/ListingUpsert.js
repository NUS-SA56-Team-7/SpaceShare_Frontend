import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

/* Component Imports */
import FormInputText from 'components/form/FormInputText';
import FormInputNumber from 'components/form/FormInputNumber';
import FormError from 'components/form/FormError';
import ButtonFilled from 'components/ui/ButtonFilled';
import FormRadioOption from 'components/form/FormRadioOption';
import FormSelectOption from 'components/form/FormSelectOption';
import ImageSelector from 'components/ImageSelector/ImageSelector';
import FileSelector from 'components/FileSelector/FileSelector';
import Heading from 'components/ui/Heading';

/* Context Imports */
import AuthContext from 'contexts/AuthContext';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Service Imports */
import { firebaseStorageRefs } from 'services/firebase/CloudStorage/firebaseCloudStorage';
import { uploadFiles, uploadFilesUUID } from 'services/firebase/CloudStorage/firebaseStorageUploadFiles'
import firebaseStorageDeleteFiles from 'services/firebase/CloudStorage/firebaseStorageDeleteFiles';
import Loader from 'components/Loader/Loader';
import { useContext } from 'react';
import AuthChecker from 'components/layout/AuthChecker';
import Layout from 'components/layout/Layout';

/* Page Imports */
import NotFound404 from 'pages/Error/NotFound404';

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
    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);

    const [toggleAmenity, setToggleAmenity] = useState(false);
    const [toggleFacility, setToggleFacility] = useState(false);

    /* useNavigate */
    const navigate = useNavigate();

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
        try {
            // Upload Images to Firebase Storage
            const uploadedImageURLs = await uploadFilesUUID(
                firebaseStorageRefs.propertyImages, selectedImages);

            // Upload Files to Firebase Storage
            const uploadedFileURLs = await uploadFiles(
                firebaseStorageRefs.propertyDocs, selectedDocs);

            // Update the Data Object with the Uploaded Image URLs
            const updatedData = {
                ...data,
                propertyImageURLs: uploadedImageURLs,
                propertyDocURLs: uploadedFileURLs,
                propertyAmenityIDs: selectedAmenities,
                propertyFacilityIDs: selectedFacilities
            };

            await Axios.post(`/api/renter/${auth?.id}/property/create`,
                updatedData,
                {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => {
                    if (res.status === 201) {
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
                    setSelectedImages(res.data?.propertyImages);
                    setSelectedDocs(res.data?.propertyDocs);
                    // setSelectedAmenities(res.data?.)
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
            setData(initData);
        }
        else if (paramUpsert === 'update') {
            get(propertyId);
        }
    }, [paramUpsert]);

    useEffect(() => {
        Axios.get('api/amenity/')
            .then(res => {
                if (res.status === 200) {
                    setAmenities(res.data);
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setError(err.response.data);
                }
            })
    }, []);

    useEffect(() => {
        Axios.get('api/facility/')
            .then(res => {
                if (res.status === 200) {
                    setFacilities(res.data);
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    setError(err.response.data);
                }
            })
    }, []);

    useEffect(() => {
        console.log(selectedDocs);
        console.log(setSelectedDocs)
    }, [selectedDocs, setSelectedDocs])


    if (!allowedPaths.includes(paramUpsert)) {
        return <NotFound404 />
    }
    else {
        return (
            <AuthChecker>
                <Layout>
                    {loading && <Loader />}
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
                                <FormError nbsp>{error?.title}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <FormRadioOption
                                    name='Property Type'
                                    options={{ 'HDB': 'HDB', 'Condominium': 'CONDOMINIUM', 'Landed': 'LANDED' }}
                                    selected={data['propertyType']}
                                    setSelected={(e) => setData({ ...data, propertyType: e.target.value })} />
                                <FormError nbsp>{error?.propertyType}</FormError>
                            </div>


                            <div className="col-span-1 md:col-span-12">
                                <FormRadioOption
                                    name='Room Type'
                                    options={{ 'Single': 'SINGLE', 'Common': 'COMMON', 'Master': 'MASTER', 'Whole Unit': 'WHOLE_UNIT' }}
                                    selected={data['roomType']}
                                    setSelected={(e) => setData({ ...data, roomType: e.target.value })} />
                                <FormError nbsp>{error?.roomType}</FormError>
                            </div>


                            <div className="col-span-1 md:col-span-6">
                                <FormInputNumber
                                    label='Enter Rental Fees'
                                    value={data['rentalFees']}
                                    min='0'
                                    step='50'
                                    onChange={(e) => setData({ ...data, rentalFees: e.target.value })} />
                                <FormError nbsp>{error?.rentalFees}</FormError>
                            </div>


                            <div className="col-span-1 md:col-span-12">
                                <FormInputText
                                    label='Enter Property Address'
                                    value={data['address']}
                                    onChange={(e) => setData({ ...data, address: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' && submit()}
                                />
                                <FormError nbsp>{error?.address}</FormError>
                            </div>


                            <div className="col-span-1 md:col-span-12">
                                <FormInputText
                                    label='Enter Postal Code'
                                    value={data['postalCode']}
                                    maxLength='6'
                                    onChange={(e) => setData({ ...data, postalCode: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' && submit()}
                                />
                                <FormError nbsp>{error?.postalCode}</FormError>
                            </div>


                            <div className="col-span-1 md:col-span-12">
                                <FormRadioOption
                                    name='Proeprty Furnishment'
                                    options={{ 'Furnished': 'FURNISHED', 'Partial': 'PARTIAL_FURNISHED', 'Unfurnished': 'UNFURNISHED' }}
                                    selected={data['furnishment'] ? data['furnishment'] : ''}
                                    setSelected={(e) => setData({ ...data, furnishment: e.target.value })} />
                                <FormError nbsp>{error?.furnishment}</FormError>
                            </div>

                            {
                                data?.roomType === 'WHOLE_UNIT' &&
                                <div className="col-span-1 md:col-span-12">
                                    <FormSelectOption
                                        name='Number of Bedrooms'
                                        options={{ 'default': 'Select Number of Bedrooms', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' }}
                                        selected={data['numBedrooms'] ? data['numBedrooms'] : ''}
                                        setSelected={(e) => setData({ ...data, numBedrooms: e.target.value })} />
                                </div>
                            }

                            {
                                data?.roomType === 'WHOLE_UNIT' &&
                                <div className="col-span-1 md:col-span-12">
                                    <FormSelectOption
                                        name='Number of Bathrooms'
                                        options={{ 'default': 'Select Number of Bathrooms', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' }}
                                        selected={data['numBathrooms'] ? data['numBathrooms'] : ''}
                                        setSelected={(e) => setData({ ...data, numBathrooms: e.target.value })} />
                                </div>
                            }

                            {
                                data?.roomType === 'WHOLE_UNIT' &&
                                <div className="col-span-1 md:col-span-12">
                                    <FormSelectOption
                                        name='Number of Tenants'
                                        options={{ 'default': 'Select Number of Tenants', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6' }}
                                        selected={data['numTenants'] ? data['numTenants'] : ''}
                                        setSelected={(e) => setData({ ...data, numTenants: e.target.value })} />
                                </div>
                            }

                            <div className="col-span-1 md:col-span-12">
                                <ImageSelector
                                    selectedImages={selectedImages}
                                    setSelectedImages={setSelectedImages}
                                    concurrentImageLimit={5} />
                                <FormError nbsp>{error?.propertyImages}</FormError>
                            </div>

                            <div className="col-span-1 md:col-span-12">
                                <ButtonFilled
                                    onClick={() => submit()}>
                                    {paramUpsert === 'create'
                                        ? 'Create Property Advertisement'
                                        : 'Update Property Advertisement'}
                                </ButtonFilled>
                            </div>
                            <div className="col-span-1 md:col-span-12 mt-1">
                                <ButtonFilled
                                    onClick={() => navigate('/renter/properties')}>
                                    Cancel
                                </ButtonFilled>
                            </div>

                            <div className="col-span-1 md:col-span-12 mt-1">
                                <FileSelector
                                    selectedFiles={selectedDocs}
                                    setSelectedFiles={setSelectedDocs} />
                            </div>

                            <div className="col-span-1 md:col-span-12 mt-1">
                                <div onClick={() => setToggleAmenity(!toggleAmenity)}>
                                    <div className='font-semibold cursor-pointer'>
                                        {
                                            selectedAmenities.length === 0
                                                ? '0 amenity selected'
                                                : `${selectedAmenities.length} amenities selected`
                                        }
                                    </div>
                                </div>
                                {toggleAmenity && (
                                    <div className="border-gray-200 border border-solid">
                                        {amenities.map((amenity, index) => (
                                            <label key={index} className="block">
                                                <input
                                                    type='checkbox'
                                                    className='m-3 cursor-pointer'
                                                    name={amenity.amenityName}
                                                    value={amenity.id}
                                                    onChange={() => selectedAmenities.includes(amenity.id)
                                                        ? setSelectedAmenities(
                                                            selectedAmenities.filter(item => item !== amenity.id))
                                                        : setSelectedAmenities([...selectedAmenities, amenity.id])} />
                                                {amenity.amenityName}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-12 mt-1">
                                <div onClick={() => setToggleFacility(!toggleFacility)}>
                                    <div className='font-semibold cursor-pointer'>
                                        {
                                            selectedFacilities.length === 0
                                                ? '0 facility selected'
                                                : `${selectedFacilities.length} facilities selected`
                                        }
                                    </div>
                                </div>
                                {toggleFacility && (
                                    <div className="border-gray-200 border border-solid">
                                        {facilities.map((facility, index) => (
                                            <label key={index} className="block">
                                                <input
                                                    type='checkbox'
                                                    className='m-3 cursor-pointer'
                                                    name={facility.facilityName}
                                                    value={facility.id}
                                                    onChange={() => selectedFacilities.includes(facility.id)
                                                        ? setSelectedFacilities(
                                                            selectedFacilities.filter(item => item !== facility.id))
                                                        : setSelectedFacilities([...selectedFacilities, facility.id])} />
                                                {facility.facilityName}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Layout>
            </AuthChecker>
        );
    }
}

export default ListingUpsert;