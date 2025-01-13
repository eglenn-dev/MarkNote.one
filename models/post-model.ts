import admin from "firebase-admin";

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!serviceAccountString) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT not set");
}

const serviceAccount = JSON.parse(serviceAccountString);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(
            serviceAccount as admin.ServiceAccount
        ),
        databaseURL: "https://marknotes-f903b-default-rtdb.firebaseio.com/",
    });
    console.log("Firebase Admin Initialized");
}

const db = admin.database();
const postsRef = db.ref("posts");

interface Post {
    title: string;
    content: string;
    userId: string;
}

export async function createPost(post: Post) {
    const newPostRef = postsRef.push();
    await newPostRef.set(post);
    return newPostRef.key;
}

export async function getPostByKey(key: string) {
    const postSnapshot = await postsRef.child(key).once("value");
    return postSnapshot.val();
}

export async function getPostsByUser(userId: string) {
    const postsSnapshot = await postsRef
        .orderByChild("userId")
        .equalTo(userId)
        .once("value");
    return postsSnapshot.val();
}
