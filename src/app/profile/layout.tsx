import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import PageToggle from "@/components/PageToggle/PageToggle";
import styles from "./profile.module.css";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.profilePageWrapper}>
      <section className={styles.topSection}>
        <TravellerInfo
          name="Денис Орлик"
          description="Мандрівник зі стажем 5 років. Люблю гори та каву."
          isOwnProfile={true}
        />
      </section>

      <nav className={styles.navigation}>
        <PageToggle />
      </nav>

      <div className={styles.contentArea}>{children}</div>
    </div>
  );
}
