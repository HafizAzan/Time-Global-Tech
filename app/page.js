"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import CreatePopup from "./components/Create-Popup";
import CustomButton from "./components/CustomButton";
import EditPost from "./components/Edit-Post";
import SpinnerLoader from "./components/Spinner-Loader";
import usePosts from "./Hooks/usePosts";

const modal = Swal;

export default function Home() {
  const {
    getPostData,
    getPostLoader,
    addPostData,
    addPostLoader,
    refetchData,
    editPostData,
    editPostLoader,
    addPostDataId,
    getPostById,
    deletePostData,
  } = usePosts();

  const [editId, setEditId] = useState(null);

  const DeleteBtnSingleRow = (event, postId) => {
    event.preventDefault();
    const swalWithBootstrapButtons = modal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePostData(postId, {
            onSuccess: () => {
              modal.fire("Row Deleted SuccessFully!", "", "success");
              refetchData();
            },
          });
        } else {
          modal.fire("This Post Is Not Deleted SuccessFully!", " ", "error");
        }
      });
    console.log("deleted!");
  };

  const PopupOpenEdit = (event, PostId) => {
    event.preventDefault();
    window.$("#edit-post").modal("show");
    setEditId(PostId);
    addPostDataId(PostId);
  };

  return (
    <React.Fragment>
      <SpinnerLoader loader={getPostLoader || addPostLoader} />
      <div className="container">
        <h1>Posts</h1>
        <a className="btn btn-primary" data-toggle="modal" href="#create-post">
          Create Post
        </a>
        <CreatePopup
          addPostData={addPostData}
          loader={addPostLoader}
          refetchData={refetchData}
        />
        <EditPost
          editId={editId}
          editPostData={editPostData}
          editPostLoader={editPostLoader}
          refetchData={refetchData}
          getPostById={getPostById}
        />
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Post Id</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="todos-listing">
            {getPostData?.map((singlePost) => {
              return (
                <tr key={singlePost.id}>
                  <td>{singlePost.id}</td>
                  <td>{singlePost.userId}</td>
                  <td>{singlePost.title}</td>
                  <td>
                    <CustomButton
                      onClick={(event) => PopupOpenEdit(event, singlePost.id)}
                    >
                      Edit
                    </CustomButton>
                  </td>
                  <td>
                    <CustomButton
                      className="btn btn-danger"
                      onClick={(event) =>
                        DeleteBtnSingleRow(event, singlePost.id)
                      }
                    >
                      Delete
                    </CustomButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
