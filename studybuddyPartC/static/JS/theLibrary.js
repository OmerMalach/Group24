const libraryContainer = document.querySelector("#posts-container");

fetch("/getLibraryPosts")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data && data.length > 0) {
      data.forEach(generateLibraryPostElement);
    }
  })
  .catch((error) => {
    console.error("Error fetching library posts:", error);
  });

function validateComment() {
  const commentContent = document.getElementById("comment-input").value;

  if (!commentContent || commentContent.trim() === "") {
    alert("Comment cannot be empty");
    return false; // This will prevent the form from being submitted
  }
  return true; // This will allow the form to be submitted
}
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Adjust the formatting as per your requirements
}
function addCommentButtonListener(button) {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent button's default action

    // Find the parent form element
    const form = button.closest("form");
    const postID = form.dataset.postId; // Get the post ID from the form
    let commentInput = form.querySelector(".comment-input");
    const commentContent = commentInput.value;
    commentInput.value = "";
    if (!commentContent || commentContent.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    // Send the comment data to the server
    fetch("/newComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: postID,
        comment: commentContent,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Don't try to parse the response as JSON
        window.location.href = response.url; // Redirects the browser to the new page
      })
      .catch((error) => {
        console.error("Error submitting comment:", error);
      });
  });
}

function generateLibraryPostElement(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  const postHeader = document.createElement("div");
  postHeader.classList.add("post-header");

  const authorPhoto = document.createElement("img");
  authorPhoto.classList.add("author-photo");
  authorPhoto.src = "/photos/nullProfilePic.png";
  authorPhoto.alt = "Author Photo";
  postHeader.appendChild(authorPhoto);

  const authorName = document.createElement("h2");
  authorName.textContent = post.Nickname;
  postHeader.appendChild(authorName);

  const timestamp = document.createElement("p");
  timestamp.textContent = formatTimestamp(post.DateTime);
  postHeader.appendChild(timestamp);

  const email = document.createElement("p");
  email.textContent = post.Email;
  postHeader.appendChild(email);

  postContainer.appendChild(postHeader);

  const postContent = document.createElement("p");
  postContent.classList.add("postText");
  postContent.textContent = post.Text;
  postContainer.appendChild(postContent);

  const commentSection = document.createElement("div");
  commentSection.classList.add("comment-section");

  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");
  commentForm.dataset.postId = post.Post_ID;
  commentSection.appendChild(commentForm);

  const commentInput = document.createElement("input");
  commentInput.classList.add("comment-input");
  commentInput.name = "comment";
  commentForm.appendChild(commentInput);

  const commentButton = document.createElement("button");
  commentButton.classList.add("comment-button");
  commentButton.type = "button";
  commentButton.textContent = "Post Comment";
  addCommentButtonListener(commentButton);
  commentForm.appendChild(commentButton);
  //addCommentFormListener(commentForm);

  commentSection.appendChild(commentForm);

  const commentList = document.createElement("ul");
  commentList.classList.add("comment-list");
  commentList.id = `comment-list-${post.Post_ID}`;
  commentSection.appendChild(commentList);

  postContainer.appendChild(commentSection);

  libraryContainer.appendChild(postContainer);

  // Display comments for the current post
  post.comments.forEach(generateCommentElement);
}
function generateCommentElement(comment) {
  const commentList = document.querySelector(
    `#comment-list-${comment.Post_ID}`
  );

  const commentItem = document.createElement("li");
  commentItem.textContent = `${comment.Nickname}: ${comment.Text}`;
  commentItem.classList.add("commentText");
  const commentTimestamp = document.createElement("p");
  commentTimestamp.textContent = formatTimestamp(comment.DateTime);
  commentItem.appendChild(commentTimestamp);

  commentList.appendChild(commentItem);
}
