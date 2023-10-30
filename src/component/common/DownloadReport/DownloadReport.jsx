import moment from "moment";
import axios from "axios";
import './DownloadReport.scss'


const DownloadReport = ({ dataSource, headerField, reportType, reportName, lenadenaHeading, balanceData }) => {

  const date = new Date();
  const newDate = moment(date).format("DD-MM-YYYY hh:mm:ss A");

  const downloadReport = () => {
    let data = JSON.stringify({
      data: dataSource,
      reportColumnName: headerField,
      reportType: reportType,
      balanceDataName:lenadenaHeading,
      lenaDenaResponse:balanceData
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={{ marginBottom: "12px" }}>
      <button onClick={downloadReport} className="download">
        <span>Download</span>
      </button>
    </div>
  );
};

export default DownloadReport;
