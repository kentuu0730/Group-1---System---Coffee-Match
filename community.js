// Pure function to create a new post object
const createPost = (text, imageFile) => {
    return {
      text,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      user: {
        avatar: 'user-profile.jpg',
        name: 'Anonymous User' // Replace with actual user info
      }
    };
  };
  
  // Pure function to create a post element from the post object
  const createPostElement = (post) => {
    const newPost = document.createElement('div');
    newPost.classList.add('post');
  
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    const userAvatar = document.createElement('img');
    userAvatar.src = post.user.avatar;
    userAvatar.alt = 'User';
    userAvatar.classList.add('user-avatar');
    const userName = document.createElement('span');
    userName.classList.add('user-name');
    userName.textContent = post.user.name;
    postHeader.appendChild(userAvatar);
    postHeader.appendChild(userName);
  
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    const postTextContent = document.createElement('p');
    postTextContent.textContent = post.text;
    postContent.appendChild(postTextContent);
  
    if (post.image) {
      const postImageElement = document.createElement('div');
      postImageElement.classList.add('post-image');
      const image = document.createElement('img');
      image.src = post.image;
      image.alt = 'Post Image';
      postImageElement.appendChild(image);
      postContent.appendChild(postImageElement);
    }
  
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions');
    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    likeButton.innerHTML = '<ion-icon name="heart-outline"></ion-icon> Like';
    const commentButton = document.createElement('button');
    commentButton.classList.add('comment-btn');
    commentButton.innerHTML = '<ion-icon name="chatbubble-outline"></ion-icon> Comment';
    const shareButton = document.createElement('button');
    shareButton.classList.add('share-btn');
    shareButton.innerHTML = '<ion-icon name="share-social-outline"></ion-icon> Share';
    postActions.appendChild(likeButton);
    postActions.appendChild(commentButton);
    postActions.appendChild(shareButton);
  
    newPost.appendChild(postHeader);
    newPost.appendChild(postContent);
    newPost.appendChild(postActions);
  
    return newPost;
  };
  
  // Function to handle post submission in a functional style
  document.getElementById('submit-post').addEventListener('click', function () {
    const postText = document.getElementById('post-text').value;
    const postImage = document.getElementById('post-image').files[0];
  
    if (!postText && !postImage) {
      alert('Please enter some text or upload an image to post.');
      return;
    }
  
    const post = createPost(postText, postImage);
    const postElement = createPostElement(post);
  
    // Append the new post to the post feed
    document.getElementById('post-feed').prepend(postElement);
  
    // Clear the form after posting
    document.getElementById('post-text').value = '';
    document.getElementById('post-image').value = '';
  });
  