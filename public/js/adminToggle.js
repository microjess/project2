const adminToggleEl = document.querySelector("#adminTools");

adminToggleEl.addEventListener("click", (event) => {
  const status = adminToggleEl.dataset.status;
  const postAdminTools = document.querySelector("#adminButtons");
  const commentAdminTools = [...document.querySelectorAll(".adminCommentUserButtons")]
  if (status == "on") {
    if (postAdminTools) {
      postAdminTools.style.display = "none";
    }
    if (commentAdminTools) {
      commentAdminTools.map((c) => {
          c.style.display = "none";
      })
    }
    
    adminToggleEl.dataset.status = "off";
    adminToggleEl.innerText = "Admin Tools: Off"
}
if (status == "off") {
    if (postAdminTools) {
        postAdminTools.style.display = "block";
      }
      if (commentAdminTools) {
          commentAdminTools.map((c) => {
              c.style.display = "block";
          })
      }
    adminToggleEl.dataset.status = "on";
    adminToggleEl.innerText = "Admin Tools: On"
  }
});
