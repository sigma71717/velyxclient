import { SharedLayout, ToSContent } from "../shared";

export default function ToSPage() {
  return (
    <SharedLayout 
      title="Regulamin" 
      subtitle="Zasady korzystania z usług Zyn Client. Zapoznaj się z nimi przed zakupem subskrypcji."
      currentPath="/tos"
    >
      <ToSContent />
    </SharedLayout>
  );
}
