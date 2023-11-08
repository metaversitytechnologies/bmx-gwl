import axios from "axios";
import moment from "moment";
import { AiOutlineFileExcel, AiOutlineFilePdf } from "react-icons/ai";
import "./DownloadReport.scss";

// const DownloadReport = ({dataSource, headerField, reportType, reportName, balanceData, lenadenaHeading}) => {
const DownloadReport = ({
  headerField,
  reportType,
  reportName,
  lenadenaHeading,
  userType,
  type,
  parentId,
  userId,
  startDate,
  endDate,
  isModalOpen,
  setIsModalOpen
}) => {
 

  const showdownlodData = () => {
    setIsModalOpen(!isModalOpen);
  };

  const downloadReport = () => {
    const date = new Date();
    const newDate = moment(date).format("DD-MM-YYYY hh:mm:ss A");
    let data = JSON.stringify({
      reportColumnName: headerField,
      reportType: reportType,
      balanceDataName: lenadenaHeading,
      userType: userType,
      type: type,
      parentId,
      userId:userId || "",
      startDate,
      endDate,
    });
    let config = {
      responseType: "blob",
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.247365.exchange/admin-new-apis/bmx/excel-file-download",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        function download(blob) {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.setAttribute("download", `${reportName}_${newDate}.xlsx`);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
        function showInOtherTab(blob) {
          download(blob, "myledger-report.xlsx");
        }
        showInOtherTab(response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadPdf = () => {
    const date = new Date();
    const newDate = moment(date).format("DD-MM-YYYY hh:mm:ss A");
    let data = JSON.stringify({
      reportColumnName: headerField,
      reportType: reportType,
      balanceDataName: lenadenaHeading,
      userType: userType,
      type: type,
      parentId,
      userId:userId || "",
      startDate,
      endDate,
    });
    let config = {
      responseType: "blob",
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.247365.exchange/admin-new-apis/bmx/pdf-file-download",
      // url: "http://192.168.0.65/admin-new-apis/bmx/excel-file-download",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        function download(blob) {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.setAttribute("download", `${reportName}_${newDate}.pdf`);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }
        function showInOtherTab(blob) {
          download(blob, "myledger-report.xlsx");
        }
        showInOtherTab(response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main_download">
      <div className="overlay_report"></div>
      <button onClick={showdownlodData} className="download">
        <span>Download</span>
      </button>
      {isModalOpen && (
        <div className="report_excel">
          <p onClick={downloadReport}>
            <span className="excel_icon">
              <AiOutlineFileExcel />
              <span>Excel</span>
            </span>
          </p>
          <p onClick={downloadPdf}>
            <span className="pdf_icon">
              <AiOutlineFilePdf />
              <span>Pdf</span>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DownloadReport;
