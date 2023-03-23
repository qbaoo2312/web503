import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
const router = express.Router()
import { __dirname } from '../server.js'
import { getRandomFileName } from '../ultilities.js'
// Multer
const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});


router.post('/image', upload.single('image'), async function (req, res) {
    const imageName = getRandomFileName() + ".png"
    const imagePath = path.join(__dirname, `/public/${imageName}`);
    await sharp(req.file.buffer).toFile(imagePath)
    res.end(imageName)
});

export default router