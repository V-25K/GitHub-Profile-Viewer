window.addEventListener('DOMContentLoaded', (event) => {
    const defaultUsername = document.getElementById('searchInput').value;
    const apikey = `https://api.github.com/users/${defaultUsername ? defaultUsername : "V-25K"}`;
    getInfo(apikey);
});

const search = document.getElementById("searchForm");

search.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('searchInput').value;
    const apikey = `https://api.github.com/users/${username ? username : "V-25K"}`;
    console.log(apikey);
    await getInfo(apikey);
});

async function getInfo(apikey) {
  try {
    const response = await fetch(apikey);
    const data = await response.json();
    console.log(data)
    if(response.status === 200){
        profileData(data)
    }
    else if(response.status === 404){
        errorProfile()
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

function profileData({ name, login, html_url, bio, avatar_url, followers, following }) {
  let username = name;
  let handle = login;
  let link = html_url;
  let usersBio = bio;
  let userProfileImg = avatar_url;
  let followersCount = followers;
  let followingCount = following;

  const card = document.querySelector(`.card`);
  const cardContent = `
        <div class="img-container">
            <img src="${userProfileImg}" alt="${username} + image"/>
        </div>
        <div class="username-container">
            <h3 class="heading">${username ? username : "No Username"}</h3>
            <a href="${link}" target="_blank"><p title="Click to visit user's profile">${handle}</p></a> 
        </div>
        <p class="bio">${
          usersBio
            ? usersBio
            : "User has no bio... "
        }</p>
        <div class="followers-container">
            <p>Followers: ${followersCount}</p>
            <p>Following: ${followingCount}</p>
        </div>
    `;

  card.innerHTML = cardContent;
}

function errorProfile(){
    const card = document.querySelector(`.card`);
  const cardContent = `
        <div class="error-container">
            <h1>This profile doesn't exist...</h1>
            <p>Recheck the entered user login or try again later.</p>
        </div>
    `;

  card.innerHTML = cardContent;
}
