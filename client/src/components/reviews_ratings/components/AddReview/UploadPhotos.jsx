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
const uploadFiles = (e) => {
  e.preventDefault()
  console.log('this is photos', photos)
}

return (
  <section>
      <div className="multi-preview">
          {(photos || []).map((url, ind) => (
              <img src={url} alt="..." width={"100px"} key={ind}/>
          ))}
      </div>
      <div className="form-group">
          <input name="photos"
          type="file"
          disabled={false}
          id="form-control"
          onChange={uploadMultipleFiles} multiple />
      </div>
      <button type="button" onClick={uploadFiles}>Upload</button>
  </section>
  )
  // );
  // return (
  //   <div>
  //     {uploadImage && (
  //       <div>
  //         <img
  //           alt="not found"
  //           width={"100px"}
  //           src={URL.createObjectURL(uploadImage)}
  //         />
  //         <br />
  //         <button onClick={() => setUploadImage('')}>Remove</button>
  //       </div>
  //     )}

  //     <br />
  //     <br />

  //     <input
  //       type="file"
  //       id="myImage"
  //       onChange={(event) => {
  //         console.log(event.target.files[0]);
  //         // thumbnails()
  //         setUploadImage(event.target.files[]);
  //       }}
  //     />
  //   </div>
  // );

}

export default UploadPhotos