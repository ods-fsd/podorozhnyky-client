import { Metadata } from "next";
import React, { Suspense } from "react";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm/ResetPasswordForm";
import mainCss from "@/app/Home.module.css"; 

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset your password",
};

export default function ResetPasswordPage() {
    return (
        <main style={{ paddingTop: "12vh", paddingBottom: "60px", minHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <div className={mainCss.container}>
                <div style={{ maxWidth: "480px", margin: "0 auto", width: "100%" }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
