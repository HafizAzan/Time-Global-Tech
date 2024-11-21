import { useState } from "react";
import Swal from "sweetalert2";
import CustomButton from "./CustomButton";

const modal = Swal;

const CreatePopup = ({ addPostData, loader, refetchData }) => {
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

    addPostData(data, {
      onSuccess: () => {
        modal.fire("Your Form Is Submitted!", "", "success");
        setValue({ input: "", textarea: "" });
        window.$("#create-post").modal("hide");
        refetchData();
      },
      onError: (error) => {
        console.error(error);
        window.$("#create-post").modal("hide");
        modal.fire("Your Form Is Not Submitted!", "Please try again!", "error");
      },
    });
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div className="modal fade" id="create-post">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
            <h4 className="modal-title">Create Post</h4>
          </div>
          <div className="modal-body">
            <form method="POST" id="create-post-form" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="post_title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="post_title"
                  name="input"
                  placeholder="Title"
                  onChange={onChangeValue}
                  value={value.input}
                />
              </div>

              <div className="form-group">
                <label htmlFor="post_body">Body</label>
                <textarea
                  id="post_body"
                  name="textarea"
                  cols="30"
                  rows="10"
                  placeholder="Body"
                  className="form-control"
                  onChange={onChangeValue}
                  value={value.textarea}
                ></textarea>
              </div>

              <CustomButton
                type="submit"
                className="btn btn-primary"
                disabled={!Boolean(value.input) && !Boolean(value.textarea)}
              >
                {loader ? "Submitting..." : "Submit"}
              </CustomButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePopup;
