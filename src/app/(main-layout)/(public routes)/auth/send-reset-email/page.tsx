import { Metadata } from "next";
import SendResetEmailForm from "@/components/Auth/SendResetEmail/SendResetEmailForm";
import mainCss from "@/app/Home.module.css"; 

export const metadata: Metadata = {
    title: "Скидання паролю",
    description: "Скидання паролю",
};

export default function SendResetEmailPage() {
    return (
        <main style={{ paddingTop: "12vh", paddingBottom: "60px", minHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <div className={mainCss.container}>
                <div style={{ maxWidth: "480px", margin: "0 auto", width: "100%" }}>
                    <SendResetEmailForm />
                </div>
            </div>
        </main>
    );
}