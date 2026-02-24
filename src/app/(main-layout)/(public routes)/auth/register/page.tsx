import React from "react";
import RegistrationForm from "@/components/Auth/RegistrationForm/RegistrationForm";
import mainCss from "@/app/Home.module.css"; // Для контейнера

export default function RegisterPage() {
  return (
    <main style={{ paddingTop: "12vh", paddingBottom: "60px", minHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
      <div className={mainCss.container}>
        <div style={{ maxWidth: "480px", margin: "0 auto", width: "100%" }}>
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
