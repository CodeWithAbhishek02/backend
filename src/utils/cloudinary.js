import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadonCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) throw new Error('localFilePath is required');
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log('file uploaded on cloudinary', response.url);
        return response;
    
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.error('Upload failed:', error.message);
        throw error;
    }

}


export { uploadonCloudinary }