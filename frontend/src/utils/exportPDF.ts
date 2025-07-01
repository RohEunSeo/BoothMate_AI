// src/utils/exportPDF.ts
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export function exportToPDF() {
  const target = document.querySelector('canvas')
  if (!target) return

  html2canvas(target as HTMLElement).then((canvas) => {
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF()
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 148) // A4 기준
    pdf.save('layout.pdf')
  })
}
