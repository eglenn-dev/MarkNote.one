"use client";
import Script from "next/script";

const Analytics = () => {
    if (process.env.NODE_ENV === "development") return null;

    return (
        <div>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-Y1D6ED8PKV"
                async={true}
                strategy="afterInteractive"
            ></Script>
            <Script
                id="google-analytics"
                async={true}
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-Y1D6ED8PKV');
                    `,
                }}
            ></Script>
        </div>
    );
};

export default Analytics;
