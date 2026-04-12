import { SharedLayout, FeaturesContent } from "../shared";

export default function FeaturesPage() {
  return (
    <SharedLayout 
      title="Potężne Funkcje" 
      subtitle="Poznaj setki zaawansowanych modułów, które pozwolą Ci na pełną kontrolę nad rozgrywką. Każda funkcja została zoptymalizowana pod kątem wydajności."
      currentPath="/features"
    >
      <FeaturesContent />
    </SharedLayout>
  );
}
