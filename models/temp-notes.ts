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
const postsRef = db.ref("temp-notes");

interface TempNote {
    creationDate: string;
    viewDate: string;
    noteContent: string;
}

export async function createTempNote(noteContent: string) {
    const newNoteRef = postsRef.push();
    const tempNote: TempNote = {
        noteContent,
        creationDate: new Date().toISOString(),
        viewDate: "",
    };
    await newNoteRef.set(tempNote);
    return newNoteRef.key;
}

export async function readNote(key: string) {
    if (!key || /[.#$[\]]/.test(key)) {
        throw new Error(
            'Invalid key. Paths must be non-empty strings and cannot contain ".", "#", "$", "[", or "]"'
        );
    }
    const noteContent = (
        await postsRef.child(key).child("noteContent").once("value")
    ).val();
    await postsRef.child(key).update({
        noteContent: null,
        viewDate: new Date().toISOString(),
    });
    return noteContent as string;
}
