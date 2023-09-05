import React, { useState } from "react";
import Tables from "../tables/index.js";
import DataTable from "layouts/tables/data/DataTable.js";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import axios from "axios";
import { useEffect } from "react";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import AlertDelete from "../../components/AlertDelete/AlertDelete.js";
import CreatePharmacyDialog from "./CreatePharmacyDialog.js";
function Pharmacy() {
  const [pharmacy, setPharmacy] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [pharmacyToDelete, setPharmacyToDelete] = useState([]); // for extract the id from handledelete btn
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Use an async function inside useEffect to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pharmacy");
        console.log(response.data);
        setPharmacy(response.data); // Store the fetched data in the state
        console.log(pharmacy);
      } catch (error) {
        console.log(` error get pharmacy from frontend ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(`http://localhost:5000/pharmacy/delete/${id}`);
      console.log(id);
      console.log(response);

      setPharmacy((prevPharmacy) => prevPharmacy.filter((pharmacy) => pharmacy._id !== id));
      setDeleteSuccess(true);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The Pharmacy Has Been Deleted Successfully.",
      });

      setPharmacyToDelete((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
      setDeleteSuccess(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the news item.",
      });
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSavePharmacy = (newPharmacy) => {
    // Update the news state with the new data
    setPharmacy((prevPharmacy) => [...prevPharmacy, newPharmacy]);
  };
  return (
    <div>
      <Tables tabletitle="pharmacy Table" addPost="add Pharmacy" onClick={handleOpen}>
        <CreatePharmacyDialog open={open} setOpen={setOpen} onSave={handleSavePharmacy} />

        {/* Use "tabletitle" prop */}
        <div className="table-responsive">
          {/* MDB Table */}
          <MDBTable align="middle">
            <MDBTableHead>
              <tr className="table-secondary">
                <th scope="col">name</th>
                <th scope="col">city</th>
                <th scope="col">street</th>
                <th scope="col">state</th>
                <th scope="col">postal_code</th>
                <th scope="col">phone</th>
                <th scope="col">email</th>
                <th scope="col">website</th>
                <th scope="col">hours_of_operation</th>
                <th scope="col">services</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {pharmacy.map((pharmacy, idx) => (
                <tr key={pharmacy._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{pharmacy.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {pharmacy.address && pharmacy.address.city ? pharmacy.address.city : "N/A"}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {pharmacy.address && pharmacy.address.street
                          ? pharmacy.address.street
                          : "N/A"}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {pharmacy.address && pharmacy.address.state
                          ? pharmacy.address.state
                          : "N/A "}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {pharmacy.address && pharmacy.address.postal_code
                          ? pharmacy.address.postal_code
                          : "N/A "}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{pharmacy.phone}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{pharmacy.email}</p>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{pharmacy.website}</p>
                  </td>
                  <td>
                    <div className="ms-3">
                      <p className="text-muted mb-0">
                        Monday:
                        {pharmacy.hours_of_operation && pharmacy.hours_of_operation.monday
                          ? pharmacy.hours_of_operation.monday
                          : "N/A"}
                      </p>
                      <p className="text-muted mb-0">Tuesday:
                        {pharmacy.hours_of_operation && pharmacy.hours_of_operation.tuesday
                          ? pharmacy.hours_of_operation.tuesday
                          : "N/A"}
                      </p>
                      <p className="text-muted mb-0">Wednesday:
                        {pharmacy.hours_of_operation && pharmacy.hours_of_operation.wednesday
                          ? pharmacy.hours_of_operation.wednesday
                          : "N/A"}
                      </p>

                      <p className="text-muted mb-0">Thursday:
                        {pharmacy.hours_of_operation && pharmacy.hours_of_operation.thursday
                          ? pharmacy.hours_of_operation.thursday
                          : "N/A"}
                      </p>
                      <p className="text-muted mb-0">Friday
                        {pharmacy.hours_of_operation && pharmacy.hours_of_operation.friday
                          ? pharmacy.hours_of_operation.friday
                          : "N/A"}
                      </p>
                      <p className="text-muted mb-0">Saturday:
                        {pharmacy.hours_of_operation && pharmacy.hours_of_operation.saturday
                          ? pharmacy.hours_of_operation.saturday
                          : "N/A"}
                      </p>
                      <p className="text-muted mb-0">Sunday:
                        {pharmacy.hours_of_operation && pharmacy.hours_of_operation.sunday
                          ? pharmacy.hours_of_operation.sunday
                          : "N/A"}
                      </p>
                    </div>
                  </td>
                  {/* <td>
                    {pharmacy.hours_of_operation && Object.entries(pharmacy.hours_of_operation).map(([day, hours]) => (
                      <div key={day}>
                        <p className="text-muted mb-0">
                          {day}: {hours}
                        </p>
                      </div>
                    ))}{" "}
                  </td> */}
                  <td>
                    <p className="text-muted mb-0">{pharmacy.services}</p>
                  </td>
                  <td>
                    <MDBBtn
                      color="link"
                      rounded
                      size="sm"
                      onClick={() => setPharmacyToDelete((prev) => [...prev, pharmacy._id])}
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
                </tr>
              ))}
              {pharmacyToDelete.map((id, index) => (
                <AlertDelete key={id} onConfirm={() => handleDelete(id, index)} />
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </Tables>
    </div>
  );
}

export default Pharmacy;
