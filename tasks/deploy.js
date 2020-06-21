import s3 from '@auth0/s3'

const client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET,
  }
})

export default () => {
  console.log('Uploading to S3 bucket', process.env.S3_BUCKET)

  const uploader = client.uploadDir({
    localDir: 'build',
    deleteRemoved: true,
    s3Params: {
      Bucket: process.env.S3_BUCKET,
    },
  })

  return new Promise((resolve, reject) => {
    uploader.on('error', reject)
    uploader.on('end', () => {
      console.log('Done')
      resolve()
    })
  })
}
