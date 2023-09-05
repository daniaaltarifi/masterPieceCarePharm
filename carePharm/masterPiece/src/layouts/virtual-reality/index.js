// /**
// =========================================================
// * Soft UI Dashboard React - v4.0.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

import React, { useState } from "react";
import Tables from "../tables/index.js";
import DataTable from "layouts/tables/data/DataTable.js";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import { useEffect } from "react";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import AlertDelete from "../../components/AlertDelete/AlertDelete.js";
import Swal from "sweetalert2";
import CreateGeneralDialog from "./components/CreateGeneralDialog.js";
function index() {
  const [available, setAvailable] = useState([]);
  const [generalToDelete, setgeneralToDelete] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Use an async function inside useEffect to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/medicineAvailable");
        console.log(response.data);
        setAvailable(response.data); // Store the fetched data in the state
        console.log(available);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(`http://localhost:5000/medicineAvailable/del/${id}`);
      console.log(id);
      console.log(response);

      setAvailable((prevGeneral) => prevGeneral.filter((general) => general._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The general Has Been Deleted Successfully.",
      });

      setgeneralToDelete((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the general item.",
      });
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSaveGeneral = (newGeneral) => {
    // Update the news state with the new data
    setAvailable((prevGeneral) => [...prevGeneral, newGeneral]);
  };
  return (
    <div>
      <Tables tabletitle="General Information Table" addPost="add general" onClick={handleOpen}>
      <CreateGeneralDialog open={open} setOpen={setOpen} onSave={handleSaveGeneral} />
        {/* Use "tabletitle" prop */}
        <div className="table-responsive">
          {/* MDB Table */}
          <MDBTable align="middle">
            <MDBTableHead>
              <tr className="table-secondary">
                <th scope="col">NAME</th>
                <th scope="col">DRG_SERIAL_NO</th>
                <th scope="col">BARCODE</th>
                <th scope="col">DRG_FILLING</th>
                <th scope="col">DOSAGE</th>
                <th scope="col">DRG_CONCENTRATE</th>
                <th scope="col">STORES_DESC_L</th>
                <th scope="col">ATCCODE</th>
                <th scope="col">DRG_PRIMARY_CMP_COUNTRY</th>
                <th scope="col">JPP</th>
                <th scope="col">PHARM_P</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {available.map((available, idx) => (
                <tr key={available._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      {/* <img
                     src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                     alt=''
                     style={{ width: '45px', height: '45px' }}
                     className='rounded-circle'
                   /> */}
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{available.NAME}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.DRG_SERIAL_NO}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.BARCODE}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.DRG_FILLING}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.DOSAGE}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.DRG_CONCENTRATE}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.STORES_DESC_L}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.ATCCODE}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.DRG_PRIMARY_CMP_COUNTRY}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.JPP}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{available.PHARM_P}</p>
                  </td>
                  <td>
                    <MDBBtn
                      color="link"
                      rounded
                      size="sm"
                      onClick={() => setgeneralToDelete((prev) => [...prev, available._id])}
                    >
                      <SoftButton variant="text" color="error">
                        <Icon>delete</Icon>&nbsp;delete
                      </SoftButton>
                    </MDBBtn>
                    <MDBBtn color="link" rounded size="sm">
                      <SoftButton variant="text" color="error">
                        <SoftButton variant="text" color="dark">
                          <Icon>edit</Icon>&nbsp;edit
                        </SoftButton>{" "}
                      </SoftButton>
                    </MDBBtn>
                  </td>
                  {/* <td>
                     <MDBBtn color="link" rounded size="sm">
                       Edit
                     </MDBBtn>
                   </td> */}
                </tr>
              ))}
              {generalToDelete.map((id, index) => (
                <AlertDelete key={id} onConfirm={() => handleDelete(id, index)} />
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </Tables>
    </div>
  );
}

export default index;
