import React, { useState } from 'react';

/* CSS Impoerts */
import './ImageUploader.css';

/* MUI Imports */
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';

/* Utility Imports */
import Axios from 'utils/Axios';

function ImageUploader({
    selectedImages, setSelectedImages,
    allowedExtensions, concurrentImageLimit
}) {

    /* Constants & Variables */
    // ['.jpg', '.jpeg', '.png', '.webp', '.bmp']
    const _allowedExtensions =
        allowedExtensions
            ? allowedExtensions
            : [];
    const _concurrentImageLimit =
        concurrentImageLimit
            ? concurrentImageLimit
            : 100;

    /* Functions */
    const fileTypeFilter = (files, allowedExtensions) => {
        return files.filter((file) => {
            return allowedExtensions.some((ext) => {
                return file.name.toLowerCase().endsWith(ext)
            });
        });
    }

    const updateSelectedFiles = (
        originalImages, appendImages) => {
        appendImages =
            _allowedExtensions.length === 0
                ? appendImages
                : fileTypeFilter(appendImages, _allowedExtensions);
        if (originalImages) {
            if (originalImages.length + appendImages.length <= _concurrentImageLimit) {
                setSelectedImages([...originalImages, ...appendImages]);
                console.log([...originalImages, ...appendImages]);
            } else {
                alert(`Selected Images must be less than ${_concurrentImageLimit}`);
            }
        }
        else {
            if (appendImages.length <= _concurrentImageLimit) {
                setSelectedImages([...appendImages]);
            } else {
                alert(`Selected Images must be less than ${_concurrentImageLimit}`);
            }
        }
    };

    const delImages = (index, setSelectedImages) => {
        const initialImages = selectedImages;
        initialImages.splice(index, 1);
        setSelectedImages([...initialImages]);
    };

    const fileUpload = (files) => {
        const formData = new FormData();
        if (files) {
            files.map((file) => {
                formData.append('propertyImages', file, file.name);
            })
        };
        Axios.post('/file/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            // onUploadProgress: (e) => {
            //     setUploadProgress(e.loaded / e.total * 100)
            // }
        }).then((res) => {
            if (res.status === 201) {
                console.log('OK');
                setSelectedImages(null);
            }
        });
    };

    if (!selectedImages || !setSelectedImages) {
        throw new Error('\'selectedImages\' and \'setSelectedImages\'  must be specified');
    }
    return (
        <div className='imgup'>
            <div className='imgup_body'>
                <div className='imgup_img addimg'>
                    <AddCircleIcon style={{ fontSize: '40px' }} />
                    <input
                        type='file' multiple
                        accept='image/*'
                        name='myImage'
                        onChange={(e) => {
                            updateSelectedFiles(
                                selectedImages, [...e.target.files]);
                        }} />
                </div>
                {selectedImages && selectedImages.map((img, index) => (
                    <div key={index} className='imgup_img'>
                        <img src={URL.createObjectURL(img)} alt={img.name} />
                        <CancelIcon id='delete'
                            onClick={() => delImages(index, setSelectedImages)} />
                    </div>
                ))}
            </div>
            {/* <div className='imgup_progressbar_wrapper'>
                <div className='imgup_progressbar'>
                    <div
                        className='imgup_progressbar_progress'
                        style={{ width: `${uploadProgress}%` }}>
                    </div>
                    <p className='imgup_progress'>
                        {`${Math.floor(uploadProgress)}%`}
                    </p>
                </div>
            </div> */}
            <div className='imgup_footer'>
                <button
                    className='btn outlined'
                    onClick={() => setSelectedImages(null)}>
                    Clear All
                </button>
                {/* <button
                    className='btn filled'
                    onClick={() => fileUpload(selectedImages)}>
                    Upload
                </button> */}
            </div>
        </div>
    )
};

export default ImageUploader;