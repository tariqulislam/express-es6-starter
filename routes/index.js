import  express from 'express'
const router = express.Router();
import Busboy from 'busboy'
import dotenv from 'dotenv'
const env = dotenv.config()

const BUCKET_NAME = 'bucketnewnamefortest'
const IAM_USER_KEY= ''
const IAM_USER_SECRET = ''

function uploadToS3 (file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });

  s3bucket.createBucket(() => {
    var param = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    };

    s3bucket.upload(param, (err, data) => {
      if(err) {
        console.log('error in call back');
        console.log(err);
      }

      console.log('success');
      console.log(data);
    })
  })
}

router.post('/api/upload/s3', (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers})

  busboy.on('finish', () => {
    console.log('upload finish')
    const file = req.files.exampleImage
    console.log(file)
    uploadToS3(file)
  })

  req.pipe(busboy)
})


export default router
