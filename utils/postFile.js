const multer = require('multer')
const URL = require('./url')

class postFile {
  postCoverImg() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, URL.coverImgUpload)
      },
      filename: (req, file, cb) => {
        const filename = file.originalname
        cb(null, filename)
      }
    })
    const uploader = multer({ storage: storage })
    return uploader
  }

  postChapterContent() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, URL.chapterContentUpload)
      },
      filename: (req, file, cb) => {
        const filename = file.originalname
        cb(null, filename)
      }
    })
    const uploader = multer({ storage: storage })
    return uploader
  }

  postwxImg() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, URL.swiperAndIconsUpload)
      },
      filename: (req, file, cb) => {
        const filename = file.originalname
        cb(null, filename)
      }
    })
    const uploader = multer({ storage: storage })
    return uploader
  }

  postLinkCoverImg() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, URL.linkCoverImgUpload)
      },
      filename: (req, file, cb) => {
        const filename = file.originalname
        cb(null, filename)
      }
    })
    const uploader = multer({ storage: storage })
    return uploader
  }

  // OCR图片上传
  postOCRImg() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, URL.OCRImgUpload)
      },
      filename: (req, file, cb) => {
        const filename = file.originalname
        cb(null, filename)
      }
    })
    const uploader = multer({ storage: storage })
    return uploader
  }
}

const upload = new postFile()

module.exports = upload