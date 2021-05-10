{
  let createPost = function () {
    //method to submit the data form for new post using ajax
    let newPostFrom = $("#new-post-form");

    newPostFrom.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/post/create",
        data: newPostFrom.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (err) {
          console.log(err.responseTexr);
        },
      });
      //   return false;
    });
  };
  //method to create a post in dom
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
    <p>
        
        <small>
            <a class="delete-post-button"  href="/post/destroy/${post._id}">delete</a>
        </small>
        <br/>
        <small>
      <a href="/post/${post._id}">show</a>
      <br />
    </small>
        ${post.content}
        <br>
        <small>
        ${post.user.name}
        </small>
    </p>
    <div class="post-comments">
        
            <form action="/comment/create/${post._id}" method="POST">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${post._id}" >
                <input type="submit" value="Add Comment">
            </form>


        <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
                
            </ul>
        </div>
    </div>
    
</li>`);
  };

  //method to delete a post from dom
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
    return false;
  };

  createPost();
}
