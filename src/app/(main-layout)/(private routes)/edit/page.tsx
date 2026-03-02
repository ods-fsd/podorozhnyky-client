import { Metadata } from "next";
import ProfileEditForm from "@/components/ProfileEditForm/ProfileEditForm";

export const metadata: Metadata = {
  title: "Редагувати профіль | Podorozhnyky",
  description: "Оновіть свої дані профілю: ім'я, розповідь про себе, аватарку.",
};

export default function UserEditPage() {
  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "80px 24px", minHeight: "80vh" }}>
      <ProfileEditForm />
    </div>
  );
}
