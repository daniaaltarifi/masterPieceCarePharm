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
import EditDialog from "layouts/profile/EditDialog.js";
import CreateNewsDialog from "./CreateNews.Dialog.js";
import EditNewsDilaog from "./EditNewsDialog.js";
function News() {
  const [news, setNews] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/news");
        setNews(response.data);
      } catch (error) {
        console.log(`Error getting news from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id, index) => {
    try {
      const response = await axios.delete(`http://localhost:5000/news/delete/${id}`);
      console.log(id);
      console.log(response);

      setNews((prevNews) => prevNews.filter((news) => news._id !== id));
      setDeleteSuccess(true);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The News Has Been Deleted Successfully.",
      });

      setNewsToDelete((prev) => prev.filter((_, i) => i !== index));
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
  //combine the priviousNews with new post POST
  const handleSaveNews = (newNews) => {
    // Update the news state with the new data
    setNews((prevNews) => [...prevNews, newNews]);
  };

  // Define the editNews function
  // const editNewsData = (_id, title, summary, description) => {
  //   handleUpdate(_id, title, summary, description);
  // };
  const handleUpdate = async (_id, title, summary, description) => {
    try {
      const response = await axios.patch(`http://localhost:5000/news/update/${_id}`, {
        title: title, // Use the provided title
        summary: summary, // Use the provided summary
        description: description, // Use the provided description
      });
console.log("hello")
setNews(response.data)
      console.log(response.data);
      // setNews(response.data);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };
  // Define a state to hold the currently edited news item
  const [editNews, setEditNews] = useState(null);

  // Function to handle the edit button click and set the currently edited news item
  const handleEdit = (item) => {
    setEditNews(item);
  };

  // Function to handle the save action
  const handleSaveUpdate = (editedTitle, editedSummary, editedDescription) => {
    // Check if an item is being edited
    if (editNews) {
      // Make the update here using the editedTitle, editedSummary, and editedDescription
      // You can use the handleUpdate function to make the API call
      handleUpdate(editNews._id, editedTitle, editedSummary, editedDescription);

      // Clear the edit state
      setEditNews(null);
    }
  };

  return (
    <div>
      <Tables tabletitle="News Table" addPost="Add News" onClick={handleOpen}>
        <CreateNewsDialog open={open} setOpen={setOpen} onSave={handleSaveNews} />
        <div className="table-responsive">
          <MDBTable align="middle">
            <MDBTableHead>
              <tr className="table-secondary">
                <th scope="col">title</th>
                <th scope="col">summary</th>
                <th scope="col">desc</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {
                 news.map((item, idx) => (
                    <tr key={item._id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{item.title}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-muted mb-0">{item.summary}</p>
                      </td>
                      <td>
                        <p className="text-muted mb-0">{item.description}</p>
                      </td>
                      <td>
                        <MDBBtn
                          color="link"
                          rounded
                          size="sm"
                          onClick={() => setNewsToDelete((prev) => [...prev, item._id])}
                        >
                          <SoftButton variant="text" color="error">
                            <Icon>delete</Icon>&nbsp;delete
                          </SoftButton>
                        </MDBBtn>
                        <MDBBtn color="link" rounded size="sm" onClick={() => handleEdit(item)}>
                          <EditNewsDilaog
                            initialTitle={item.title}
                            initialSummary={item.summary}
                            initialDescription={item.description}
                            onSave={handleSaveUpdate}
                          />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))
                }

              {newsToDelete.map((id, index) => (
                <AlertDelete key={id} onConfirm={() => handleDelete(id, index)} />
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </Tables>
    </div>
  );
}

export default News;
