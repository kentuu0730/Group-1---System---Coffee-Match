class Post {
  constructor(text, imageFile) {
    this.text = text;
    this.image = imageFile ? URL.createObjectURL(imageFile) : null;
    this.user = {
      avatar: 'user-profile.jpg',
      name: 'Anonymous User'
    };
    this.likes = 0;
    this.comments = [];
  }

  createElement() {
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');
    const userAvatar = document.createElement('img');
    userAvatar.src = this.user.avatar;
    userAvatar.alt = 'User';
    userAvatar.classList.add('user-avatar');
    const userName = document.createElement('span');
    userName.classList.add('user-name');
    userName.textContent = this.user.name;
    postHeader.appendChild(userAvatar);
    postHeader.appendChild(userName);

    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    const postTextContent = document.createElement('p');
    postTextContent.textContent = this.text;
    postContent.appendChild(postTextContent);

    if (this.image) {
      const postImageElement = document.createElement('div');
      postImageElement.classList.add('post-image');
      const image = document.createElement('img');
      image.src = this.image;
      image.alt = 'Post Image';
      postImageElement.appendChild(image);
      postContent.appendChild(postImageElement);
    }

    const postActions = document.createElement('div');
    postActions.classList.add('post-actions');
    
    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    likeButton.innerHTML = `<ion-icon name="heart-outline"></ion-icon> Like (${this.likes})`;
    likeButton.addEventListener('click', () => this.toggleLike(likeButton));
    
    const commentButton = document.createElement('button');
    commentButton.classList.add('comment-btn');
    commentButton.innerHTML = '<ion-icon name="chatbubble-outline"></ion-icon> Comment';
    commentButton.addEventListener('click', this.handleComment.bind(this, newPost));
    
    postActions.appendChild(likeButton);
    postActions.appendChild(commentButton);

    newPost.appendChild(postHeader);
    newPost.appendChild(postContent);
    newPost.appendChild(postActions);

    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container');
    newPost.appendChild(commentContainer);

    return newPost;
  }

  toggleLike(likeButton) {
    this.likes++;
    likeButton.innerHTML = `<ion-icon name="heart"></ion-icon> Like (${this.likes})`;
  }

  handleComment(postElement) {
    const commentText = prompt('Enter your comment:');
    if (commentText) {
      const commentContainer = postElement.querySelector('.comment-container');

      const commentItem = document.createElement('div');
      commentItem.classList.add('comment-item');

      const commentHeader = document.createElement('div');
      commentHeader.classList.add('comment-header');
      
      const commentUser = document.createElement('span');
      commentUser.classList.add('comment-user');
      commentUser.textContent = 'Anon';

      commentHeader.appendChild(commentUser);
          
      const commentTextElement = document.createElement('p');
      commentTextElement.classList.add('comment-text');
      commentTextElement.textContent = commentText;

      commentItem.appendChild(commentHeader);
      commentItem.appendChild(commentTextElement);

      commentContainer.appendChild(commentItem);
    }
  }
}

class PostHandler {
  constructor(postButtonId, postTextId, postImageId, postFeedId) {
    this.postButton = document.getElementById(postButtonId);
    this.postText = document.getElementById(postTextId);
    this.postImage = document.getElementById(postImageId);
    this.postFeed = document.getElementById(postFeedId);

    this.postButton.addEventListener('click', this.handlePostSubmission.bind(this));
  }

  handlePostSubmission() {
    const postText = this.postText.value;
    const postImage = this.postImage.files[0];

    if (!postText && !postImage) {
      alert('Please enter some text or upload an image to post.');
      return;
    }

    const post = new Post(postText, postImage);
    const postElement = post.createElement();

    this.postFeed.prepend(postElement);

    this.postText.value = '';
    this.postImage.value = '';
  }
}

new PostHandler('submit-post', 'post-text', 'post-image', 'post-feed');
