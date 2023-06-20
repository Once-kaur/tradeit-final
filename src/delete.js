import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

// Create a reference to the file to delete
const desertRef = ref(storage, 'images/ai.png');

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
}).catch((error) => {
  // Uh-oh, an error occurred!
});