import { MenuPDF } from "./components/MenuPDF";
import { Printer } from "lucide-react";

export default function MenuPreviewPage() {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">

      {/* Buttons */}
      <div className="flex gap-4 mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded"
        >
          <Printer size={18} />
          Print / Save PDF
        </button>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 border rounded"
        >
          Back
        </button>
      </div>

      {/* Preview wrapper */}
      <div className="preview-wrapper">
        <div className="pdf-menu-container">
          <MenuPDF />
        </div>
      </div>

    </div>
  );
}