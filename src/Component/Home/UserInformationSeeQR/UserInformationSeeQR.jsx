import { useState, useEffect } from "react";
import "./UserInformationSeeQR.css";
import logoOne from "../../../assets/logo.png";
import logoTwo from "../../../assets/logo-two.png";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../../Hook/useRole";
import LoadingComponent from "../../Shaired/LoadingComponent/LoadingComponent";

// ===============================
import { Document, Page, pdfjs } from "react-pdf";
import PdfViewerLoading from "./PdfViewerLoading/PdfViewerLoading";

// Setup for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UserInformationSeeQR = () => {

  const [seeModalOne, setSeeModalOne] = useState(false);
  const [seeModalTwo, setSeeModalTwo] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [roles] = useRole();
  const ad = roles?.role === "admin";
  const { id } = useParams();

  // =====================================================================================
  // We are received data from use params | 1st come component after load all data start
  // =====================================================================================
  const { data: dataUser = null, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["UserMAINInfo", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await fetch(`https://server.docswallat.com/UserMAINInfo/${id}?nocache=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    },
    enabled: !!id,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    cacheTime: 30 * 24 * 60 * 60 * 1000,
    retry: 3,
  });
  // ========================================================
  //  If Data Is not found. It will be redirect in google
  // ========================================================
  useEffect(() => {
    if (id && !isLoading) {
      if (id && !dataUser || isError) {
        window.location.href = "https://www.google.com";
      }
    }
  }, [dataUser, isError, isLoading, id]);

  // ===================
  // PDF all Url Find
  // ===================
  const pdfUrlOriginal = dataUser ? `https://server.docswallat.com/files/${dataUser.originalPDF}` : null;
  const stampedPdfViewUrl = dataUser ? `https://server.docswallat.com/download/attested-hq/${dataUser._id}?action=view` : null;


  // ==============================================
  // Others work bellow !!
  // ==============================================
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSeeDocument = (modalSetter) => {
    setLoadingPDF(true);
    setTimeout(() => {
      setLoadingPDF(false);
      modalSetter(true);
      document.body.style.overflow = "hidden";
    }, 1500);
  };

  const closeAlert = (modalSetter) => {
    modalSetter(false);
    document.body.style.overflow = "auto";
  };


  return (
    <div className="bg-[#F5F7FA]">

      {/* User information and details show bellow */}
      {/* ============================================= */}
      <div className="UserInformationSeeQRParent md:ml-[17%] md:mr-[17%] min-h-screen bg-white pb-[52px] pt-[52px] relative">

        {/* User information and details show bellow */}
        {/* ============================================= */}
        {isLoading ? <LoadingComponent /> :
          <>
            <div className="vertical-text"> Powered by VFS Global </div>
            {ad && (
              <Link to="/dashboard">
                <div className="AdminPanelButton">Admin</div>
              </Link>
            )}

            <div className="UserInformationSee">
              {/* ======================== */}
              {/* Header Logo Section */}
              {/* ======================== */}
              <div className=" flex justify-between items-center">
                <div className="Image p-[10px] w-full md:w-[45%] flex justify-start">
                  <img className="w-[70%]" src={logoTwo} alt="image" />
                </div>
                <div className="Image p-[10px] w-full md:w-[45%] flex justify-end">
                  <img className="w-[50%]" src={logoOne} alt="image" />
                </div>
              </div>

              {/* ======================== */}
              {/* Heading Section */}
              {/* ======================== */}
              <div className="div w-[70%] mx-auto">
                <h1 className="block md:hidden text-right leading-[40px]">بيانات  التصديق <br />الرقمي</h1>
                <h1 className="hidden md:block text-center">بيانات التصديق الرقمي</h1>

                <h2 className="block md:hidden text-left pt-[12px] leading-[40px]">Digital Attestation Result</h2>
                <h2 className="hidden md:block text-center">Digital Attestation Result</h2>
              </div>

              {/* ======================== */}
              {/* One User Info */}
              {/* ======================== */}
              <table className="Heading mt-[16px] md:mt-[14px] w-[25.8%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px]">
                <tr><td className="leading-[20px] md:leading-[0px]">Transaction Details</td></tr>
              </table>

              <table className="UserData w-[86%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px] mb-[16px]">
                <tr>
                  <td className="left w-[26%]">Transaction Number</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.TransactionNumber ? dataUser?.TransactionNumber : "VN204389"}</td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Payment ID</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.PaymentID ? dataUser?.PaymentID : "202509925854166"}</td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Total Payment</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.TotalPayment ? dataUser?.TotalPayment : "OMR 20.50"}</td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Transaction Date</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.TransactionDate ? dataUser?.TransactionDate : "OMR 09 Apr 2025"}</td>
                </tr>
              </table>
              {/* ======================== */}
              {/* Two User Info */}
              {/* ======================== */}
              <table className="Heading w-[25.8%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px]">
                <tr><td className="leading-[20px] md:leading-[0px]">Candidate Details</td></tr>
              </table>

              <table className="UserData w-[86%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px] mb-[16px]">
                <tr>
                  <td className="left w-[26%]">Document Type</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.DocumentType ? dataUser?.DocumentType : "Civil Document- ID Card Driving license birth certificate passport"}</td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Applicant Name</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.ApplicantName ? dataUser?.ApplicantName : "HARUN OR RASHID"}</td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Email Id</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.EmailId ? dataUser?.EmailId : "taufeeqsalem@hotmail.com"}</td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Phone Number</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.PhoneNumber ? dataUser?.PhoneNumber : "92158980"}</td>
                </tr>
              </table>
              {/* ======================== */}
              {/* Three User Info */}
              {/* ======================== */}
              <table className="Heading w-[25.8%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px]">
                <tr><td className="leading-[20px] md:leading-[0px]">Verification Details</td></tr>
              </table>

              <table className="UserData w-[86%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px] mb-[16px]">
                <tr>
                  <td className="left w-[26%]">Verifier Name</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.VerifierName ? dataUser?.VerifierName : "Foreign Ministry - Oman"}</td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Verification Status</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.VerificationStatus ? dataUser?.VerificationStatus : "Approved"}</td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Verification Date & Time</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.VerificationDateTime ? dataUser?.VerificationDateTime : "2025-04-09 11:19:47"}</td>
                </tr>
              </table>
              {/* ======================== */}
              {/* Four User Info */}
              {/* ======================== */}
              <table className="Heading w-[25.8%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px]">
                <tr><td className="leading-[20px] md:leading-[0px]">Document Details</td></tr>
              </table>

              <table className="UserData w-[86%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px] mb-[16px]">
                <tr>
                  <td className="left w-[26%]">Original Document</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]">
                    <button disabled={!dataUser?.originalPDF} onClick={() => handleSeeDocument(setSeeModalOne)} className="DocumentView">View Document</button>
                  </td>
                </tr>
                <tr>
                  <td className="left w-[26%]">Attested Document</td>
                  <td className="right leading-[20px] md:leading-[23px] w-[60%]" >
                    <button disabled={!dataUser?.attestedPDF} onClick={() => handleSeeDocument(setSeeModalTwo)} className="DocumentView">View Document</button>
                  </td>
                </tr>
              </table>
            </div>
          </>
        }
      </div>


      {/* Loading Overlay for PDF Clicking only */}
      {/* =============================================== */}
      {loadingPDF && <PdfViewerLoading />}

      {/* =====================================*/}
      {/* Original Document PDF Add Start*/}
      {/* ===================================== */}
      <div className={`alertContainerTwo bg-[#F5F7FA] w-full  ${seeModalOne && "showAlertJs"}`}>
        <div className="bg-[#F5F7FA] w-full md:w-[960px] mx-auto max-h-[100vh] overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center mx-auto bg-white ">
            {pdfUrlOriginal && seeModalOne && (
              <Document
                file={pdfUrlOriginal}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="bar-spinner">
                    {[...Array(12)].map((_, i) => (<div key={i} className="bar" style={{ transform: `rotate(${i * 30}deg)` }}></div>))}
                  </div>
                }
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_wrapper_${index}`} style={{ borderBottom: "10px solid #F5F7FA" }}>
                    <Page
                      pageNumber={index + 1}
                      width={window.innerWidth < 768 ? window.innerWidth - 32 : 960}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </Document>
            )}
          </div>
        </div>
      </div>

      {/* =====================================*/}
      {/* Attested Document PDF Add Start*/}
      {/* ===================================== */}
      <div className={`alertContainerTwo bg-[#F5F7FA] w-full ${seeModalTwo && "showAlertJs"}`}>
        <div className="bg-[#F5F7FA] w-full md:w-[960px] mx-auto max-h-[100vh] overflow-y-auto overflow-x-hidden">
          <div className="flex items-center justify-center mx-auto bg-white">
            {stampedPdfViewUrl && seeModalTwo && (
              <Document
                file={stampedPdfViewUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="bar-spinner">
                    {[...Array(12)].map((_, i) => (<div key={i} className="bar" style={{ transform: `rotate(${i * 30}deg)` }}></div>))}
                  </div>
                }
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_wrapper_${index}`} style={{ borderBottom: "10px solid #F5F7FA" }}>
                    <Page
                      pageNumber={index + 1}
                      width={window.innerWidth < 768 ? window.innerWidth - 32 : 960}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                ))}
              </Document>
            )}
          </div>
        </div>
      </div>


      {seeModalOne && (
        <button
          onClick={() => closeAlert(setSeeModalOne)}
          className="removeAlertBtnSeePDF"
        >
          Close/<span>اغلاق</span>
        </button>
      )}

      {seeModalTwo && (
        <>
          <button
            onClick={() => closeAlert(setSeeModalTwo)}
            className="removeAlertBtnSeePDF"
          >
            Close/<span>اغلاق</span>
          </button>
          {
            ad &&
            <a
              href={`https://server.docswallat.com/download/attested-hq/${dataUser._id}`}
              className="AttestedPDFDownloadF"
            >
              🖨️ Download as PDF
            </a>
          }
        </>
      )}

    </div>
  );
};

export default UserInformationSeeQR;