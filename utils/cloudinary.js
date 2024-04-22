import {v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUDNAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APISECRET,
    secure:true
})

export async function uploadImage(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'replit'
    })
}


export async function deleteImage(publicId) {
    return await cloudinary.uploader.destroy(publicId)
}