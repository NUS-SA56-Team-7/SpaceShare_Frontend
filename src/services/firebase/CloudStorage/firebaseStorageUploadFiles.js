import { uploadBytes, getDownloadURL, } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const uploadFile = async (fileRef, file) => {
    const response = await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(response.ref);
    return fileURL;
}

const uploadFiles = async (storageRef, files) => {
    const filePromises = files.map(file => {
        const fileExtension = file.name.split('.').pop();
        const fileName = uuidv4() + '.' + fileExtension;

        return uploadFile(storageRef(fileName), file);
    });

    const fileURLs = await Promise.all(filePromises);
    return fileURLs;
}

export default uploadFiles;