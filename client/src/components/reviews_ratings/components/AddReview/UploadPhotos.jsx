import React, {useState, useEffect} from 'react';

const UploadPhotos = ({photos, setPhotos}) => {
  const [count, setCount] = useState(1)
  let fileObj = []
  let fileArr = []

  const uploadMultipleFiles = (e) => {
    fileObj.push(e.target.files)
    for (let i = 0; i < fileObj[0].length; i++) {
      // console.log('photos', fileObj[0][i])
      fileArr.push(URL.createObjectURL(fileObj[0][i]))
      // console.log('photos', fileArr)
    }
    setPhotos([...photos, fileArr[0]])
    setCount(count + 1)
    if (count === 5) {
      let maxPhotos = document.getElementById('form-control')
      maxPhotos.disabled = true
  }}
  const handleDelete = (url) => {
    const newList = photos.filter((photo) => photo !== url )
    setPhotos(newList)
    setCount(count - 1)
    if(count < 5) {
      let maxPhotos = document.getElementById('form-control')
      maxPhotos.disabled = false
    }
  }
  // const uploadFiles = (e) => {
  //   e.preventDefault()
  //   console.log(photos)
  // }

  return (
    <section className="upload">
        <div className="multi-preview">
            {(photos || []).map((url) => (
                <div>
                <img src={url} alt="thumbnail" width={"100px"} key={url}/>
                <button className="delete-photo" type="button"
                  onClick={() => handleDelete(url)}>x</button>
                </div>
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
        {/* <button type="button"
          onClick={uploadFiles}
          aria-label="upload" >Upload</button> */}
    </section>
    )
}

export default UploadPhotos