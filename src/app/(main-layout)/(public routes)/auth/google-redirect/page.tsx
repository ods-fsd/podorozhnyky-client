import React, { Suspense } from "react";
import { GoogleCallback } from "@/components/Auth/GetOauthUrl/GetOauthUrl";
import mainCss from "@/app/Home.module.css"; 

export default function GoogleRedirectPage() {
    return (
        <main style={{ paddingTop: "12vh", paddingBottom: "60px", minHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <div className={mainCss.container}>
                <div style={{ maxWidth: "480px", margin: "0 auto", width: "100%", textAlign: "center", paddingTop: "50px" }}>
                    <Suspense fallback={<div>Завантаження...</div>}>
                        <GoogleCallback />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
