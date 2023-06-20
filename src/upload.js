//import './App.css';
import { useState } from "react";
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Upload() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }

  return (
    <div >
      <form onSubmit={handleSubmit} className='form'>
        <input type='file' />
        <button type='submit'>Upload</button>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }
    </div>
  );
}
export default Upload;
// import React, { useState } from 'react'
// import { storage, db } from '../src/firebase'

// export const AddProducts = () => {

//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState(0);
//     const [productImg, setProductImg] = useState(null);
//     const [error, setError] = useState('');

//     const types = ['image/png', 'image/jpeg']; // image types

//     const productImgHandler = (e) => {
//         let selectedFile = e.target.files[0];
//         if (selectedFile && types.includes(selectedFile.type)) {
//             setProductImg(selectedFile);
//             setError('')
//         }
//         else {
//             setProductImg(null);
//             setError('Please select a valid image type (jpg or png)');
//         }
//     }

//     // add product
//     const addProduct = (e) => {
//         e.preventDefault();
//         const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
//         uploadTask.on('state_changed', snapshot => {
//             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log(progress);
//         }, err => setError(err.message)
//             , () => {
//                 storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
//                     db.collection('Products').add({
//                         ProductName: productName,
//                         ProductPrice: Number(productPrice),
//                         ProductImg: url
//                     }).then(() => {
//                         setProductName('');
//                         setProductPrice(0)
//                         setProductImg('');
//                         setError('');
//                         document.getElementById('file').value = '';
//                     }).catch(err => setError(err.message))
//                 })
//             })
//     }

//     return (
//         <div className='container'>
//             <br />
//             <h2>ADD PRODUCTS</h2>
//             <hr />
//             <form autoComplete="off" className='form-group' onSubmit={addProduct}>
//                 <label htmlFor="product-name">Product Name</label>
//                 <input type="text" className='form-control' required
//                     onChange={(e) => setProductName(e.target.value)} value={productName} />
//                 <br />
//                 <label htmlFor="product-price">Product Price</label>
//                 <input type="number" className='form-control' required
//                     onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
//                 <br />
//                 <label htmlFor="product-img">Product Image</label>
//                 <input type="file" className='form-control' id="file" required
//                     onChange={productImgHandler} />
//                 <br />
//                 <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
//             </form>
//             {error && <span className='error-msg'>{error}</span>}
//         </div>
//     )
// }