const postAdminButtons = document.querySelector("#adminButtons");
const comments = document.querySelector("#comments");
const deletePostConfirmationEl = document.querySelector(
  "#adminDeleteConfirmation"
);
const confirmPostButtonEl = document.querySelector("#adminConfirmButton");
const cancelPostButtonEl = document.querySelector("#adminCancelButton");
if (postAdminButtons) {
  postAdminButtons.addEventListener("click", async (event) => {
    event.preventDefault();
    //post admin delete button
    if (event.target.matches("#adminDeleteButton")) {
      event.target.classList.add("hidden");
      deletePostConfirmationEl.classList.remove("hidden");
      confirmPostButtonEl.classList.remove("hidden");
      cancelPostButtonEl.classList.remove("hidden");
    }
    //post admin cancel button
    if (event.target.matches("#adminCancelButton")) {
      event.preventDefault();
      window.location.reload();
    }
    //post admin confirm delete button
    if (event.target.matches("#adminConfirmButton")) {
      const response = await fetch(
        `/api/admin/posts/${event.target.dataset.postid}`,
        {
          method: "DELETE",
          body: "",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        window.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  });
}

comments.addEventListener("click", async (event) => {
  event.preventDefault();
  if (event.target.matches(".adminCommentDeleteButton")) {
    console.log(event.target.parentElement);
    const commentDeleteConfirmationEl =
      event.target.parentElement.querySelector(
        ".adminDeleteCommentConfirmation"
      );
    const confirmCommentButtonEl = event.target.parentElement.querySelector(
      ".adminConfirmCommentDeleteButton"
    );
    const cancelCommentButtonEl = event.target.parentElement.querySelector(
      ".adminCancelUpdateButton"
    );

    event.target.classList.add("hidden");
    commentDeleteConfirmationEl.classList.remove("hidden");
    confirmCommentButtonEl.classList.remove("hidden");
    cancelCommentButtonEl.classList.remove("hidden");
  }

  if (event.target.matches(".adminCancelUpdateButton")) {
    event.preventDefault();
    window.location.reload();
  }

  if (event.target.matches(".adminConfirmCommentDeleteButton")) {
    const response = await fetch(
      `/api/admin/comments/${event.target.dataset.comment_id}`,
      {
        method: "DELETE",
        body: "",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      window.location.reload();
    } else {
      alert(response.statusText);
    }
  }
});
