import { SharedLayout, PrivacyContent } from "../shared";

export default function PrivacyPage() {
  return (
    <SharedLayout 
      title="Prywatność" 
      subtitle="Szanujemy Twoją prywatność. Dowiedz się, jakie dane przechowujemy i jak dbamy o ich bezpieczeństwo."
      currentPath="/privacy"
    >
      <PrivacyContent />
    </SharedLayout>
  );
}
