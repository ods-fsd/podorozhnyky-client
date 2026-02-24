import React from "react";
import LoginForm from "@/components/Auth/LoginForm/LoginForm";
import mainCss from "@/app/Home.module.css"; // Для контейнера

export default function LoginPage() {
  return (
    <main style={{ paddingTop: "12vh", paddingBottom: "60px", minHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <div className={mainCss.container}>
        <div style={{ maxWidth: "480px", margin: "0 auto", width: "100%" }}>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
