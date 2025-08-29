import jsPDF from 'jspdf';

export const exportNoteToPDF = (note) => {
  const doc = new jsPDF();
  
  // Set font and size
  doc.setFont('helvetica');
  doc.setFontSize(20);
  
  // Add title
  doc.text('Note: ' + note.title, 20, 30);
  
  // Add content
  doc.setFontSize(12);
  const contentLines = doc.splitTextToSize(note.content, 170); // 170 is the width
  doc.text(contentLines, 20, 50);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const timestamp = new Date(note.updatedAt).toLocaleString();
  doc.text(`Last updated: ${timestamp}`, 20, 280);
  
  // Save the PDF
  doc.save(`${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_note.pdf`);
}; 