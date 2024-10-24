
import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc, getDocs, getDoc, doc  } from "firebase/firestore"



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export const addProduct = async (data) => {
    try{
        const docRef = await addDoc(collection(fireStore,"products"),data)
        console.log("Document written with ID: ", docRef.id);
    }
    catch(err){
        console.error("Error adding document: ", err);
    }
    
}

export const getAllProducts = async () => {
    const products = [];
    try{
        const querySnapshot = await getDocs(collection(fireStore, "products"));
        querySnapshot.forEach((doc) => {
            // Lấy data và ID rồi gán vào object
            products.push({
                id: doc.id,       // Lấy ID của document
                ...doc.data()      // Lấy dữ liệu của document
            });
        });
        return products;
        
    }
    catch(err){
        console.log("Error get all products: ", err);
    }
}

export const getProductById = async (id) => {
    try {
        const querySnapshot = await getDoc(doc(fireStore,"products",id));
        const productData = querySnapshot.data();
        return productData;
        
    } catch (err) {
        console.log("Error get product by id: ", err);
    }
}