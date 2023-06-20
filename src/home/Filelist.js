// import { useState, useEffect } from "react";
// import { storage } from '../firebase';
// import { ref, listAll, getDownloadURL } from "firebase/storage";

// function FileList() {
//   const [fileUrls, setFileUrls] = useState([]);

//   useEffect(() => {
//     const storageRef = ref(storage, 'files');

//     listAll(storageRef)
//       .then((res) => {
//         const promises = res.items.map((item) =>
//           getDownloadURL(item).catch((error) => console.log(error))
//         );

//         Promise.all(promises)
//           .then((urls) => {
//             setFileUrls(urls);
//           })
//           .catch((error) => console.log(error));
//       })
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <div>
//       <h1>List of Files</h1>
//       {fileUrls.length > 0 ? (
//         <div>
//           {fileUrls.map((url) => (
//             <div key={url}>
//               <img src={url} alt="uploaded file" height={200} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No files found</p>
//       )}
//     </div>
//   );
// }

// export default FileList;

import { useState, useEffect } from "react";
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from "firebase/storage";

function FileList() {
  const [fileUrls, setFileUrls] = useState([]);

  useEffect(() => {
    const storageRef = ref(storage, 'files');

    listAll(storageRef)
      .then((res) => {
        const promises = res.items.map((item) =>
          getDownloadURL(item).catch((error) => {
            console.log("Error getting download URL:", error);
            return null;
          })
        );

        Promise.all(promises)
          .then((urls) => {
            console.log("Download URLs:", urls); // Added console log
            setFileUrls(urls.filter(url => url !== null));
          })
          .catch((error) => {
            console.log("Error resolving promises:", error);
          });
      })
      .catch((error) => {
        console.log("Error listing files:", error);
      });
  }, []);

  return (
    <div>
      <h1>List of Files</h1>
      {fileUrls.length > 0 ? (
        <div>
          {fileUrls.map((url) => (
            <div key={url}>
              <img src={url} alt="uploaded file" height={200} />
            </div>
          ))}
        </div>
      ) : (
        <p>No files found</p>
      )}
    </div>
  );
}

export default FileList;
