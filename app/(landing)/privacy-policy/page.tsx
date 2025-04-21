import LandingHeader from "@/components/landing-header";
import LandingFooter from "@/components/landing-footer";

export const metadata = {
    title: "Privacy Policy | MarkNote.one",
};

export default async function PrivacyPolicy() {
    return (
        <div className="container mx-auto min-h-screen flex flex-col mb-10">
            <LandingHeader />
            <div className="px-8 md:px-20 prose mx-auto p-6">
                <h1 className="text-3xl font-bold">
                    Privacy Policy for Marknote
                </h1>
                <p className="text-sm text-gray-500">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>
                <p>
                    Thank you for using Marknote! This Privacy Policy explains
                    how we handle your information when you use our note-taking
                    application.
                </p>

                <h2 className="text-2xl font-semibold mt-6">
                    Information We Collect
                </h2>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Account Information:</strong> When you sign up
                        or log in using third-party authentication providers
                        like Google or GitHub, we receive basic profile
                        information as provided by those services (e.g., your
                        name, email address). This is used solely for
                        identifying you within the app.
                    </li>
                    <li>
                        <strong>Note Content:</strong> The notes you create and
                        store within Marknote are saved locally or synchronized
                        according to your settings. We do not access, view, or
                        process the content of your notes unless required for
                        technical support initiated by you or as necessary to
                        comply with legal obligations.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">
                    How We Use Your Information
                </h2>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>To Provide the Service:</strong> We use your
                        account information to authenticate you and enable
                        access to the Marknote application features.
                    </li>
                    <li>
                        <strong>To Improve the Service:</strong> We may collect
                        anonymized usage data to understand how the app is used
                        and identify areas for improvement. This data does not
                        include the content of your notes.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">
                    Information Sharing
                </h2>
                <p>
                    <strong>
                        We do not share your personal information or the content
                        of your notes with any third parties, except in the
                        following limited circumstances:
                    </strong>
                </p>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>With Your Consent:</strong> If you explicitly
                        authorize us to share information.
                    </li>
                    <li>
                        <strong>For Legal Reasons:</strong> If required by law,
                        regulation, or valid legal process.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">
                    Third-Party Integrations
                </h2>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Authentication:</strong> We use Google and
                        GitHub OAuth for user authentication. When you choose to
                        log in via these services, you are subject to their
                        respective privacy policies. We only receive the
                        necessary information to create and manage your Marknote
                        account. We do not share your note content with Google
                        or GitHub.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">Data Security</h2>
                <p>
                    We implement reasonable measures to protect your information
                    from unauthorized access, use, or disclosure. However, no
                    internet-based service is completely secure.
                </p>

                <h2 className="text-2xl font-semibold mt-6">
                    Changes to This Policy
                </h2>
                <p>
                    We may update this Privacy Policy from time to time. We will
                    notify you of any significant changes by posting the new
                    policy within the application or on our website.
                </p>

                <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at{" "}
                    <a
                        href="https://marknote.one/feedback"
                        className="text-blue-500 underline"
                    >
                        MarkNote.one/feedback
                    </a>
                    .
                </p>
            </div>
            <LandingFooter />
        </div>
    );
}
