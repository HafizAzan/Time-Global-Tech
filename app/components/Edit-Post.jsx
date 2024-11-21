import { useState } from "react";
import Swal from "sweetalert2";
import CustomButton from "./CustomButton";

const modal = Swal;

function EditPost({
  editId,
  editPostData,
  refetchData,
  editPostLoader,
  getPostById,
}) {
  const [value, setValue] = useState({
    input: "",
    textarea: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();

    if (!value.input || !value.textarea) {
      modal.fire("Please Fill This Form", "", "error");
      return;
    }

    const data = {
      input: value.input,
      textarea: value.textarea,
    };

    editPostData(
      { data, id: editId },
      {
        onSuccess: () => {
          modal.fire("Your Form Is Submitted!", "", "success");
          setValue({ input: "", textarea: "" });
          window.$("#edit-post").modal("hide");
          refetchData();
        },
        onError: (error) => {
          console.error(error);
          window.$("#edit-post").modal("hide");
          modal.fire(
            "Your Form Is Not Submitted!",
            "Please try again!",
            "error"
          );
        },
      }
    );
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div className="modal fade" id="edit-post">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <CustomButton
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </CustomButton>
            <h4 className="modal-title">Edit Post</h4>
          </div>
          <div className="modal-body">
            <form
              action=""
              method="POST"
              role="form"
              id="edit-post-form"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="id" id="edit_post_id" value={editId} />
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="edit_post_title"
                  placeholder="Title"
                  name="input"
                  onChange={onChangeValue}
                  value={value.input || getPostById?.title}
                />
              </div>

              <div className="form-group">
                <label>Body</label>
                <textarea
                  name="textarea"
                  id="edit_post_body"
                  cols="30"
                  rows="10"
                  placeholder="Body"
                  className="form-control"
                  onChange={onChangeValue}
                  value={value.textarea || getPostById?.body}
                ></textarea>
              </div>

              <CustomButton
                type="submit"
                className="btn btn-primary"
                disabled={!Boolean(value.input) && !Boolean(value.textarea)}
              >
                {editPostLoader ? "Submitting..." : "Submit"}
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
