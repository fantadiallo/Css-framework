const createPostForm = document.getElementById('create-post-form');
const postContent = document.getElementById('post-content');
const postThumbnail = document.getElementById('post-thumbnail');
const postList = document.getElementById('post-list');
const searchBar = document.getElementById('search-bar');
const sortOptions = document.getElementById('sort-options');

let posts = [
  { title: 'Post 1', content: 'Lorem ipsum dolor sit amet.', image: 'https://via.placeholder.com/300' },
  { title: 'Post 2', content: 'Sed cursus ante dapibus diam.', image: 'https://via.placeholder.com/300' },
  { title: 'Post 3', content: 'Nulla metus metus, ullamcorper.', image: 'https://via.placeholder.com/300' }
];

function renderPosts(filteredPosts) {
  postList.innerHTML = '';
  filteredPosts.forEach(post => {
    const postCard = document.createElement('div');
    postCard.classList.add('col-md-4', 'mb-4');
    postCard.innerHTML = `
      <div class="card feed-item">
        <img src="${post.image}" class="card-img-top" alt="Post Thumbnail">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.content}</p>
          <a href="#" class="btn btn-secondary">Read More</a>
        </div>
      </div>
    `;
    postList.appendChild(postCard);
  });
}

createPostForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newPost = {
    title: `New Post ${posts.length + 1}`,
    content: postContent.value,
    image: URL.createObjectURL(postThumbnail.files[0])
  };
  posts.push(newPost);
  renderPosts(posts);
  postContent.value = '';
  postThumbnail.value = '';
});

searchBar.addEventListener('input', function () {
  const searchQuery = searchBar.value.toLowerCase();
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery) || post.content.toLowerCase().includes(searchQuery)
  );
  renderPosts(filteredPosts);
});

sortOptions.addEventListener('change', function () {
  const sortOption = sortOptions.value;
  let sortedPosts = [...posts];

  if (sortOption === 'newest') sortedPosts = sortedPosts.reverse();
  else if (sortOption === 'oldest') sortedPosts = sortedPosts.reverse();
  
  renderPosts(sortedPosts);
});

renderPosts(posts);
