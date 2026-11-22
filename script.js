const postsContainer = document.getElementById("posts-container");

// Fetch posts from online API
async function loadPosts() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/krisolate/webapp-dev/main/db.json",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    const posts = Array.isArray(data) ? data : data.posts;

    displayPosts(posts);
  } catch (error) {
    console.error("Error loading posts:", error);
    postsContainer.textContent = "Could not load posts.";
  }
}

function displayPosts(posts) {
  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const article = document.createElement("article");
    article.classList.add("post");

    const postMeta = document.createElement("div");
    postMeta.classList.add("post-meta");

    const avatar = document.createElement("img");
    avatar.classList.add("small-avatar");

    avatar.src = "./images/anon.png";
    avatar.alt = "Anon";

    const time = document.createElement("time");
    time.dateTime = post.createdAt;

    const date = new Date(post.createdAt);

    time.textContent = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);

    postMeta.appendChild(avatar);
    postMeta.appendChild(time);

    article.appendChild(postMeta);

    if (post.imageUrl) {
      const image = document.createElement("img");

      image.classList.add("post-image");
      image.src = post.imageUrl;
      image.alt = "Image attached to post by " + post.authorName;
      image.loading = "lazy";

      article.appendChild(image);
    }

    const postBody = document.createElement("p");

    postBody.classList.add("post-body");
    postBody.textContent = post.content;

    article.appendChild(postBody);

    const postActions = document.createElement("div");
    postActions.classList.add("post-actions");

    const likeButton = document.createElement("button");

    likeButton.classList.add("like-button");
    likeButton.type = "button";
    likeButton.setAttribute("aria-label", "Like post");
    likeButton.textContent = "👍";

    postActions.appendChild(likeButton);

    article.appendChild(postActions);

    postsContainer.appendChild(article);
  });
}

const profileButton = document.getElementById("profile-button");
const profileDropdown = document.getElementById("profile-dropdown");
const logoutButton = document.getElementById("logout-button");

profileButton.addEventListener("click", () => {
  const isOpen = !profileDropdown.hidden;
  profileDropdown.hidden = isOpen;
  profileButton.setAttribute("aria-expanded", String(!isOpen));
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".profile-menu")) {
    profileDropdown.hidden = true;
    profileButton.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    profileDropdown.hidden = true;
    profileButton.setAttribute("aria-expanded", "false");
  }
});

logoutButton.addEventListener("click", () => {
  window.location.href = "login.html";
});

loadPosts();
