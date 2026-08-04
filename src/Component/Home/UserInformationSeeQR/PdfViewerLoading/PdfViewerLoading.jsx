import React, { useState } from "react";
import "./PdfViewerLoading.css";

let PdfViewerLoading = () => {

    return (
        <div className="PdfViewerLoadingParent">
            <div className="loading-overlay">
                {/* <div className="loading_overlay"> */}
                <div className="Spinner"></div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default PdfViewerLoading;









// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import PDF from "../../../../assets/2.pdf"; // নিজের PDF path

// // ✅ WORKER SETUP (cdn-based, matches version 3.4.120)
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`;

// const PdfViewer = () => {
//   const [numPages, setNumPages] = useState(null);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div style={{ width: "942px", margin: "0 auto", backgroundColor: "white" }}>
//       <Document file={PDF} onLoadSuccess={onDocumentLoadSuccess}>
//         {Array.from({ length: numPages }, (_, index) => (
//           <div key={`page_${index + 1}`} style={{ marginBottom: "20px" }}>
//             <Page
//               pageNumber={index + 1}
//               width={900}
//               renderTextLayer={false}
//               renderAnnotationLayer={false}
//             />
//           </div>
//         ))}
//       </Document>
//       <p style={{ textAlign: "center" }}>Total Pages: {numPages}</p>
//     </div>
//   );
// };

// export default PdfViewer;

