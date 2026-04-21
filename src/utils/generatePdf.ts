import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = async (
  title: string,
  description: string,
  columns: string[],
  data: any[]
) => {
  const doc = new jsPDF();

  // 🖼️ LOGO
  const img = new Image();
  img.src = "/src/assets/images/logo.png";

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  doc.addImage(img, "PNG", 14, 10, 20, 20);

  // 🧾 HEADER
  doc.setFontSize(18);
  doc.text("Hogar Infantil", 40, 20);

  doc.setFontSize(12);
  doc.text(title, 40, 28);

  doc.setFontSize(10);
  doc.text(description, 14, 40);

  // 📅 FECHA
  const fecha = new Date().toLocaleDateString();
  doc.text(`Fecha: ${fecha}`, 150, 20);

  // 📊 TABLA
  autoTable(doc, {
    startY: 50,
    head: [columns],
    body: data,
    styles: { fontSize: 9 },
    headStyles: {
      fillColor: [100, 149, 237], // azul pastel bonito
    },
  });

  doc.save(`${title}.pdf`);
};