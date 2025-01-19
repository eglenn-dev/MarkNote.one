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
const postsRef = db.ref("posts");

interface Post {
    title: string;
    content: string;
    userId: string;
    lastUpdated: string;
}

export async function createPost(post: Post) {
    const newPostRef = postsRef.push();
    await newPostRef.set(post);
    return newPostRef.key;
}

export async function updatePost(key: string, post: Post) {
    await postsRef.child(key).update(post);
}

export async function getPostByKey(key: string) {
    if (!key || /[.#$[\]]/.test(key)) {
        throw new Error(
            'Invalid key. Paths must be non-empty strings and cannot contain ".", "#", "$", "[", or "]"'
        );
    }
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

export async function deletePost(key: string) {
    await postsRef.child(key).remove();
}

export async function createDemoPost(userId: string) {
    const noteContent = `MarkNote.one is a great, free, and easy to use Markdown note taking application. 

## Home Screen

Right click your notes to preview, edit, or delete them. If you are on mobile try long pressing the cards.

![Welcome note context menu](/welcome-note/context-menu.png)

### New Notes

When creating a new note, after you enter a title and note, it will start auto saving. There are two ways to create a new note,

1. Click the \`+ New Note\` button on the home screen
2. Navigate to [marknote.one/new-note](https://marknote.one/new-note)

## Live Note Preview

You are able to see a live preview of your markdown notes by clicking on the \`Show Preview\` button. 

![Show Preview button image](/welcome-note/show-preview-image.png)

You can also press \`Alt + P\` on your keyboard to toggle live preview.

## Saving Notes

All your notes are set to auto save! Once you are done typing, after a few seconds you notes will auto save. You can also manually save by pressing \`Crtl + S\`.
                    `;

    const demoPost = {
        title: "Welcome to MarkNote.one",
        content: noteContent,
        userId: userId,
        lastUpdated: new Date().toISOString(),
    };
    return createPost(demoPost);
}
