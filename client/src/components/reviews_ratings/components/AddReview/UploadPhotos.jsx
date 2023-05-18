import React, {useState, useEffect} from 'react';

const UploadPhotos = ({photos, setPhotos}) => {
  let fileObj = []
  let fileArr = []
  // const [uploadImage, setUploadImage] = useState(null)

  const uploadMultipleFiles = (e) => {
    fileObj.push(e.target.files)
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArr.push(URL.createObjectURL(fileObj[0][i]))
    }
    setPhotos([...photos, fileArr[0]])

    if (photos.length === 4) {
      let maxPhotos = document.getElementById('form-control')
      maxPhotos.disabled = true
      // alert('you can only upload 5 images')
    }
}
// const uploadFiles = (e) => {
//   e.preventDefault()
//   console.log('this is photos', photos)
// }

return (
  <section>
      <div className="multi-preview">
          {(photos || []).map((url, ind) => (
              <img src={url} alt="..." width={"100px"} key={ind}/>
          ))}
      </div>
      <div className="form-group">
          <input name="photos"
          aria-label="photos"
          type="file"
          disabled={false}
          id="form-control"
          onChange={uploadMultipleFiles} multiple />
      </div>
      <button type="button"
        // onClick={uploadFiles}
        aria-label="upload" >Upload</button>
  </section>
  )
}

export default UploadPhotos