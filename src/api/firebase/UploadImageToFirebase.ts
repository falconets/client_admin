import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: "zamhub-ddb47.appspot.com", // import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGE_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function uploadImageToFirebaseStorage(
  file: File
): Promise<string | null> {
  const imgRef = ref(storage, "admin_profile_picture");
  const filename = new Date().getTime().toString() + "_" + file.name;

  const spaceRef = ref(imgRef, filename);

  try {
    await uploadBytes(spaceRef, file);
    const imageUrl = await getDownloadURL(spaceRef);
    const modifiedUrl = imageUrl.replace(/&token=[^&]+/, "");
    return modifiedUrl;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    return null;
  }
}

async function deleteImageFromFirebaseStorage(imageUrl: string): Promise<void> {
  // Extracting the path from the URL
  const pathArray = imageUrl.split("/");
  const filename = pathArray[pathArray.length - 1].split("?")[0];

  const imgRef = ref(storage, "admin_profile_picture");
  const spaceRef = ref(imgRef, filename);

  try {
    await deleteObject(spaceRef);
    console.log("Image deleted successfully.");
  } catch (error) {
    console.error("Error deleting image from Firebase Storage:", error);
  }
}

export { uploadImageToFirebaseStorage, deleteImageFromFirebaseStorage };
