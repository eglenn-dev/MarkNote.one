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
}

const db = admin.database();

interface Feedback {
    key?: string;
    type: string;
    content: string;
    userId: string;
}

export async function recordFeedback(feedback: Feedback) {
    const feedbackRef = db.ref("feedback").push();
    await feedbackRef.set(feedback);
}

export async function getFeedback() {
    const snapshot = await db.ref("feedback").once("value");
    const feedbackData = snapshot.val();
    const feedbackList: Feedback[] = [];
    if (feedbackData) {
        Object.keys(feedbackData).forEach((key) => {
            feedbackData[key].key = key;
            feedbackList.push(feedbackData[key]);
        });
    }
    return feedbackList;
}

export async function deleteFeedback(key: string) {
    await db.ref("feedback").child(key).remove();
}
