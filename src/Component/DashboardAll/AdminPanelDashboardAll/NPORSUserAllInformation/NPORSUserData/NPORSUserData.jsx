import { useState } from 'react';
import "./NPORSUserData.css"
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
// import { TbBoxPadding } from 'react-icons/tb';
// import download from "downloadjs"
import { toPng } from "html-to-image";
import axios from 'axios';
import Swal from 'sweetalert2';

const NPORSUserData = ({ NporsUserData, HandleDelete }) => {

    // console.log(allUser)

    let {
        TransactionNumber, PaymentID, TotalPayment, TransactionDate,

        DocumentType, ApplicantName, EmailId, PhoneNumber,

        VerifierName, VerificationStatus, VerificationDateTime,

        date, VerificationNo, _id

    } = NporsUserData


    // ===================================================
    // Dynamic URL Start || and See User Information
    // ===================================================
    const navigate = useNavigate();

    const handleVerify = (id) => {

        navigate(`/User/&/page/preview/${id}`);

    };

    // ===================================================
    // Dynamic URL End
    // ===================================================

    // ===================================================
    // QR code download of png Start
    // ===================================================

    const QRDownload = () => {
        let node = document.getElementById("QRDownloader");

        if (!node) {
            console.log("Element not found!");
            return;
        }
        toPng(node)
            .then((dataURL) => {
                let link = document.createElement("a");
                link.href = dataURL;
                link.download = "qr-code.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log("Error in downloading QR Code:", error);
            });
    };

    // ===================================================
    // Update User Information Start
    // ===================================================

    function UpdateInformation(id) {

        navigate(`/dashboard/UpdateUserInformation/${id}`)
    }



    // ===================================================
    // Modal One Start
    // ===================================================
    let [modalOne, setModalOne] = useState(false)
    let [OriginalId, setOriginalId] = useState("")
    let [OriginalLoading, setOriginalLoading] = useState(false)

    const closeAlertButtonOne = () => {
        setModalOne(false)
    }
    const handleAdOriginalDocument = (id) => {
        setModalOne(true)
        setOriginalId(id)
    }

    // ===========================================================
    // User Original Document PDf Add Start
    // ===========================================================
    const [OriginalFile, setOriginalFile] = useState(null);

    const HandleOriginalDocumentPDFAdd = async () => {
        const formData = new FormData();
        formData.append('file', OriginalFile);
        // console.log(formData)
        setOriginalLoading(true)
        try {
            const result = await axios.put(`https://server.docswallat.com/Original-upload-files/${OriginalId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.status === 200) {
                setModalOne(false)
                setOriginalLoading(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your PDF File Upload Is Success",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            // console.log(result)
        } catch (error) {
            setModalOne(false)
            setOriginalLoading(false)
            console.error("There was an error uploading the file!", error);
            alert("File upload failed!");
        }
    };
    // ===========================================================
    // User Original Document PDf Add End
    // ===========================================================





    // ===================================================
    // Modal Two Start
    // ===================================================
    let [modalTwo, setModalTwo] = useState(false)
    let [AttestedId, setAttestedId] = useState("")
    let [AttestedLoading, setAttestedLoading] = useState(false)

    const closeAlertButtonTwo = () => {
        setModalTwo(false)
    }
    const handleAdAttestedDocument = (id) => {
        setModalTwo(true)
        setAttestedId(id)
    }

    // ===========================================================
    // User Attested Document PDf Add Start
    // ===========================================================
    const [AttestedFile, setAttestedFile] = useState(null);

    const HandleAttestedDocumentPDFAdd = async () => {
        const formData = new FormData();
        formData.append('file', AttestedFile);
        // console.log(formData)
        setAttestedLoading(true)
        try {
            const result = await axios.put(`https://server.docswallat.com/Attested-upload-files/${AttestedId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.status === 200) {
                setModalTwo(false)
                setAttestedLoading(false)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your PDF File Upload Is Success",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            // console.log(result)
        } catch (error) {
            setModalTwo(false)
            setAttestedLoading(false)
            console.error("There was an error uploading the file!", error);
            alert("File upload failed!");
        }
    };
    // ===========================================================
    // User Attested Document PDf Add End
    // ===========================================================


    return (
        <tr className='UserAllData'>

            <td>
                <h3>{VerifierName}</h3>
                <h3>{EmailId}</h3>
                <h3>{PhoneNumber}</h3>
            </td>
            <td>
                <h3>Name: {ApplicantName}</h3>
                <h3>Document Type: {DocumentType}</h3>
            </td>
            <td>
                <h3>PAy Id :{PaymentID}</h3>
                <h3>PAy Id :{TotalPayment}</h3>
            </td>
            <td>
                <h3>Trx Id: {TransactionNumber}</h3>
                <h3>{date}</h3>
            </td>
            <td>
                <div id='QRDownloader'>
                    <QRCode
                        size={140}
                        bgColor="white"
                        fgColor="black"
                        value={`https://omanpost.doscwallet.com/User/&/page/preview/${VerificationNo}`}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                </div>
            </td>
            <td>
                <button onClick={QRDownload}>QR Download</button>
                <br />
                <button onClick={() => handleVerify(VerificationNo)}>See Info</button>
                <br />
                <button onClick={() => UpdateInformation(_id)}>Update Info</button>
                <br />
                <button onClick={() => HandleDelete(_id,OriginalId,AttestedId)}>Delete</button>
                <br />
                <button onClick={() => handleAdOriginalDocument(_id)}>Original Document</button>
                <br />
                <button onClick={() => handleAdAttestedDocument(_id)}>Attested Document</button>
            </td>

            {/* ========================================================================================= */}
            {/* Original Document PDF Add Start*/}
            {/* ========================================================================================= */}

            <div className={`alertContainer rounded-[8px]  px-4  lg:px-0 w-full lg:w-[38%]  ${modalOne === true && "showAlertJs"}`} >

                <div className="Modal">
                    <div className="popInfo px-4 py-4 mt-3">

                        <h6>Add Original Document PDF</h6>

                        <div className='AllToyData'>

                            {/* mainImage  */}
                            <div className=" form-control">
                                <label className="label">
                                    <span className="ToyName label-text">Add Original Document PDF</span>
                                </label>
                                <label className=" input-group w-full">
                                    <span>Original Document PDF</span>
                                    <input type="file" name='OriginalPDF'
                                        onChange={(e) => setOriginalFile(e.target.files[0])}
                                        className="file-input file-input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        <button className='UpdateButton' onClick={HandleOriginalDocumentPDFAdd}>{OriginalLoading ? "Loading..." : "Original PDF Add"}</button>
                    </div>
                    <button onClick={closeAlertButtonOne} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>
            </div>

            {/* ========================================================================================= */}
            {/* Original Document PDF Add End*/}
            {/* ========================================================================================= */}

            {/* ========================================================================================= */}
            {/* Attested Document PDF Add Start*/}
            {/* ========================================================================================= */}

            <div className={`alertContainer rounded-[8px]  px-4  lg:px-0 w-full lg:w-[38%]  ${modalTwo === true && "showAlertJs"}`} >

                <div className="Modal">
                    <div className="popInfo px-4 py-4 mt-3">

                        <h6>Add Attested Document PDF</h6>

                        <div className='AllToyData'>

                            {/* mainImage  */}
                            <div className=" form-control">
                                <label className="label">
                                    <span className="ToyName label-text">Add Attested Document PDF</span>
                                </label>
                                <label className=" input-group w-full">
                                    <span>Attested Document PDF</span>
                                    <input type="file" name='AttestedPDF'
                                        onChange={(e) => setAttestedFile(e.target.files[0])}
                                        className="file-input file-input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        <button className='UpdateButton' onClick={HandleAttestedDocumentPDFAdd}>{AttestedLoading ? "Loading..." : "Attested PDF Add"}</button>
                    </div>
                    <button onClick={closeAlertButtonTwo} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>
            </div>

            {/* ========================================================================================= */}
            {/* Attested Document PDF Add End*/}
            {/* ========================================================================================= */}



        </tr>
    );
};

export default NPORSUserData;