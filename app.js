const STORAGE_KEY = "sgn-connect-state";
const CITY_EMAIL_DOMAIN = "shriganganagar.com";
const DEMO_MEDIA_MAX_BYTES = 5 * 1024 * 1024;

const starterState = {
  currentUserId: "admin",
  activeChatUserId: "ritu",
  users: [
    {
      id: "admin",
      name: "Mahesh Admin",
      contact: "admin@shriganganagar.local",
      cityEmail: "mahesh.admin@shriganganagar.com",
      area: "Shri Ganga Nagar",
      interest: "Local updates",
      bio: "Founder admin for this Shri Ganga Nagar city network.",
      role: "Admin",
      status: "Active"
    },
    {
      id: "ritu",
      name: "Ritu Sharma",
      contact: "ritu@example.com",
      cityEmail: "ritu.sharma@shriganganagar.com",
      area: "Jawahar Nagar",
      interest: "Events and meetups",
      bio: "Loves local events, food spots, and friendly community meetups.",
      role: "Member",
      status: "Active"
    },
    {
      id: "arjun",
      name: "Arjun Bhatia",
      contact: "arjun@example.com",
      cityEmail: "arjun.bhatia@shriganganagar.com",
      area: "Purani Abadi",
      interest: "Business networking",
      bio: "Interested in connecting with local founders and shop owners.",
      role: "Member",
      status: "Active"
    },
    {
      id: "neha",
      name: "Neha Verma",
      contact: "neha@example.com",
      cityEmail: "neha.verma@shriganganagar.com",
      area: "Sukharia Circle",
      interest: "Study and career",
      bio: "Looking for career discussions, learning groups, and local updates.",
      role: "Member",
      status: "Active"
    }
  ],
  posts: [
    {
      id: "post-1",
      authorId: "ritu",
      text: "Planning a small coffee meetup this weekend near Sukharia Circle. Anyone interested?",
      media: null,
      category: "Meetup",
      createdAt: "Today"
    },
    {
      id: "post-2",
      authorId: "arjun",
      text: "Local business owners can share offers and collaborations here. Happy to connect.",
      media: null,
      category: "Business",
      createdAt: "Yesterday"
    }
  ],
  scraps: [
    {
      id: "scrap-1",
      from: "ritu",
      to: "admin",
      text: "Happy to see a dedicated network for Shri Ganga Nagar.",
      createdAt: "Today"
    }
  ],
  ads: [
    {
      id: "ad-1",
      title: "Weekend Cafe Offer",
      text: "Special discount for Shri Ganga Nagar Connect members near Sukharia Circle.",
      category: "Local business",
      authorId: "admin",
      status: "Active",
      createdAt: "Today"
    },
    {
      id: "ad-2",
      title: "Career Guidance Session",
      text: "Local students can join a small career discussion group this Sunday.",
      category: "Education",
      authorId: "neha",
      status: "Active",
      createdAt: "Yesterday"
    }
  ],
  messages: {
    "admin:ritu": [
      { from: "ritu", text: "Welcome to the city network, Mahesh ji." },
      { from: "admin", text: "Thank you. Let us build a helpful place for Shri Ganga Nagar." }
    ],
    "admin:arjun": [
      { from: "arjun", text: "I would like to connect with more local business people." }
    ],
    "admin:neha": [
      { from: "neha", text: "This can be useful for students and local career groups too." }
    ]
  }
};

let state = loadState();

const elements = {
  appContent: document.querySelector("#appContent"),
  loginPanel: document.querySelector("#loginPanel"),
  loginForm: document.querySelector("#loginForm"),
  loginName: document.querySelector("#loginName"),
  loginContact: document.querySelector("#loginContact"),
  loginCityEmail: document.querySelector("#loginCityEmail"),
  loginInterest: document.querySelector("#loginInterest"),
  logoutButton: document.querySelector("#logoutButton"),
  seedButton: document.querySelector("#seedButton"),
  viewTitle: document.querySelector("#viewTitle"),
  currentAvatar: document.querySelector("#currentAvatar"),
  currentName: document.querySelector("#currentName"),
  currentRole: document.querySelector("#currentRole"),
  navItems: document.querySelectorAll(".nav-item"),
  adminOnly: document.querySelector(".admin-only"),
  postForm: document.querySelector("#postForm"),
  postText: document.querySelector("#postText"),
  postMedia: document.querySelector("#postMedia"),
  mediaPreview: document.querySelector("#mediaPreview"),
  postCategory: document.querySelector("#postCategory"),
  adForm: document.querySelector("#adForm"),
  adTitle: document.querySelector("#adTitle"),
  adText: document.querySelector("#adText"),
  adCategory: document.querySelector("#adCategory"),
  adsGrid: document.querySelector("#adsGrid"),
  feedList: document.querySelector("#feedList"),
  peopleSearch: document.querySelector("#peopleSearch"),
  interestFilter: document.querySelector("#interestFilter"),
  peopleGrid: document.querySelector("#peopleGrid"),
  chatPeople: document.querySelector("#chatPeople"),
  chatAvatar: document.querySelector("#chatAvatar"),
  chatName: document.querySelector("#chatName"),
  chatArea: document.querySelector("#chatArea"),
  chatStatus: document.querySelector("#chatStatus"),
  messages: document.querySelector("#messages"),
  messageForm: document.querySelector("#messageForm"),
  messageText: document.querySelector("#messageText"),
  messageMedia: document.querySelector("#messageMedia"),
  profileForm: document.querySelector("#profileForm"),
  profileAvatar: document.querySelector("#profileAvatar"),
  profilePhoto: document.querySelector("#profilePhoto"),
  profileNameHeading: document.querySelector("#profileNameHeading"),
  profileName: document.querySelector("#profileName"),
  profileCityEmail: document.querySelector("#profileCityEmail"),
  profileArea: document.querySelector("#profileArea"),
  profileInterest: document.querySelector("#profileInterest"),
  profileBio: document.querySelector("#profileBio"),
  memberCount: document.querySelector("#memberCount"),
  postCount: document.querySelector("#postCount"),
  messageCount: document.querySelector("#messageCount"),
  scrapCount: document.querySelector("#scrapCount"),
  adCount: document.querySelector("#adCount"),
  adminMembers: document.querySelector("#adminMembers")
};

let selectedPostMedia = null;
let selectedMessageMedia = null;

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : structuredClone(starterState);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getCurrentUser() {
  return state.users.find((user) => user.id === state.currentUserId);
}

function getUser(id) {
  return state.users.find((user) => user.id === id);
}

function makeEmailLocalPart(name) {
  const cleaned = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
  return cleaned || "member";
}

function createCityEmail(name, existingUserId = "") {
  const base = makeEmailLocalPart(name);
  let localPart = base;
  let counter = 2;

  while (
    state.users.some(
      (user) => user.id !== existingUserId && user.cityEmail === `${localPart}@${CITY_EMAIL_DOMAIN}`
    )
  ) {
    localPart = `${base}${counter}`;
    counter += 1;
  }

  return `${localPart}@${CITY_EMAIL_DOMAIN}`;
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function avatarHtml(user, extraClass = "") {
  const classes = `avatar ${extraClass}`.trim();
  if (user.photo) {
    return `<span class="${classes} photo-avatar"><img src="${user.photo}" alt="${user.name}" /></span>`;
  }
  return `<span class="${classes}">${initials(user.name)}</span>`;
}

function renderAvatar(element, user) {
  element.className = user.photo ? "avatar photo-avatar" : "avatar";
  element.innerHTML = user.photo ? `<img src="${user.photo}" alt="${user.name}" />` : initials(user.name);
}

function chatKey(userA, userB) {
  return [userA, userB].sort().join(":");
}

function ensureArrays() {
  state.scraps = state.scraps || [];
  state.ads = state.ads || [];
  state.posts.forEach((post) => {
    if (!Object.prototype.hasOwnProperty.call(post, "media")) {
      post.media = null;
    }
  });
}

function renderPostMedia(media) {
  if (!media) return "";
  if (media.type === "video") {
    return `<video class="post-media" src="${media.src}" controls></video>`;
  }
  return `<img class="post-media" src="${media.src}" alt="${media.name}" />`;
}

function renderMessageMedia(media) {
  if (!media) return "";
  if (media.type === "video") {
    return `<video class="message-media" src="${media.src}" controls></video>`;
  }
  return `<img class="message-media" src="${media.src}" alt="${media.name}" />`;
}

function setView(viewName) {
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  document.querySelector(`#${viewName}View`).classList.add("active");

  elements.navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewName);
  });

  const titles = {
    feed: "Home",
    people: "People",
    chat: "Chat",
    ads: "Advertisement",
    profile: "Profile",
    admin: "Admin"
  };
  elements.viewTitle.textContent = titles[viewName];
  render();
}

function renderShell() {
  const user = getCurrentUser();
  const isLoggedIn = Boolean(user);

  elements.loginPanel.hidden = isLoggedIn;
  elements.appContent.hidden = !isLoggedIn;
  elements.logoutButton.hidden = !isLoggedIn;

  if (!user) return;

  const isAdmin = user.role === "Admin";
  elements.adminOnly.classList.toggle("hidden", !isAdmin);
  renderAvatar(elements.currentAvatar, user);
  elements.currentName.textContent = user.name;
  elements.currentRole.textContent = isAdmin ? "Founder admin" : "City member";
}

function renderFeed() {
  ensureArrays();
  elements.feedList.innerHTML = state.posts
    .map((post) => {
      const author = getUser(post.authorId) || { name: "Unknown member", area: "Shri Ganga Nagar" };
      return `
        <article class="post-card">
          <div class="post-meta">
            <strong>${author.name}</strong>
            <span>${post.createdAt}</span>
          </div>
          <p>${post.text}</p>
          ${renderPostMedia(post.media)}
          <span class="tag">${post.category}</span>
        </article>
      `;
    })
    .join("");
}

function renderPeople() {
  const term = elements.peopleSearch.value.trim().toLowerCase();
  const interest = elements.interestFilter.value;
  const currentUser = getCurrentUser();

  const people = state.users.filter((user) => {
    const searchable = `${user.name} ${user.area} ${user.interest} ${user.bio}`.toLowerCase();
    const matchesTerm = !term || searchable.includes(term);
    const matchesInterest = !interest || user.interest === interest;
    return user.id !== currentUser.id && matchesTerm && matchesInterest;
  });

  elements.peopleGrid.innerHTML = people
    .map(
      (user) => `
        <article class="person-card">
          <div class="person-card-head">
            ${avatarHtml(user)}
            <div>
              <h3>${user.name}</h3>
              <div class="person-meta"><span>${user.area}</span><span>${user.role}</span></div>
            </div>
          </div>
          <p>${user.bio}</p>
          <p class="city-email">${user.cityEmail || createCityEmail(user.name, user.id)}</p>
          <div class="scrap-panel">
            <strong>Send scrap</strong>
            <textarea rows="2" data-scrap-text="${user.id}" placeholder="Write a quick public message"></textarea>
            <button class="ghost-button" type="button" data-scrap="${user.id}">Send Scrap</button>
            <div class="scrap-list">
              ${renderScrapsForUser(user.id)}
            </div>
          </div>
          <span class="tag">${user.interest}</span>
          <button class="ghost-button" type="button" data-chat="${user.id}">Message</button>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-chat]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeChatUserId = button.dataset.chat;
      saveState();
      setView("chat");
    });
  });

  document.querySelectorAll("[data-scrap]").forEach((button) => {
    button.addEventListener("click", () => {
      const to = button.dataset.scrap;
      const input = document.querySelector(`[data-scrap-text="${to}"]`);
      const text = input.value.trim();
      if (!text) return;
      state.scraps.unshift({
        id: `scrap-${Date.now()}`,
        from: state.currentUserId,
        to,
        text,
        createdAt: "Just now"
      });
      input.value = "";
      saveState();
      renderPeople();
      renderAdmin();
    });
  });
}

function renderScrapsForUser(userId) {
  ensureArrays();
  const scraps = state.scraps.filter((scrap) => scrap.to === userId).slice(0, 2);
  if (!scraps.length) return `<small>No scraps yet</small>`;

  return scraps
    .map((scrap) => {
      const sender = getUser(scrap.from) || { name: "City member" };
      return `<small><strong>${sender.name}:</strong> ${scrap.text}</small>`;
    })
    .join("");
}

function renderAds() {
  ensureArrays();
  elements.adsGrid.innerHTML = state.ads
    .map((ad) => {
      const author = getUser(ad.authorId) || { name: "City member" };
      return `
        <article class="ad-card">
          <div class="post-meta">
            <strong>${ad.title}</strong>
            <span>${ad.createdAt}</span>
          </div>
          <p>${ad.text}</p>
          <div class="ad-footer">
            <span class="tag">${ad.category}</span>
            <small>Posted by ${author.name}</small>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderChat() {
  const currentUser = getCurrentUser();
  const otherUsers = state.users.filter((user) => user.id !== currentUser.id);

  if (!getUser(state.activeChatUserId) || state.activeChatUserId === currentUser.id) {
    state.activeChatUserId = otherUsers[0]?.id || "";
  }

  elements.chatPeople.innerHTML = otherUsers
    .map(
      (user) => `
        <button class="chat-person ${user.id === state.activeChatUserId ? "active" : ""}" type="button" data-person="${user.id}">
          ${avatarHtml(user)}
          <span><strong>${user.name}</strong><small>${user.area}</small></span>
        </button>
      `
    )
    .join("");

  document.querySelectorAll("[data-person]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeChatUserId = button.dataset.person;
      saveState();
      renderChat();
    });
  });

  const selected = getUser(state.activeChatUserId);
  if (!selected) return;

  renderAvatar(elements.chatAvatar, selected);
  elements.chatName.textContent = selected.name;
  elements.chatArea.textContent = selected.area;
  elements.chatStatus.textContent = "Active now";

  const messages = state.messages[chatKey(currentUser.id, selected.id)] || [];
  elements.messages.innerHTML = messages
    .map(
      (message) => `
        <div class="message ${message.from === currentUser.id ? "mine" : ""}">
          ${message.text ? `<p>${message.text}</p>` : ""}
          ${renderMessageMedia(message.media)}
        </div>
      `
    )
    .join("");
  elements.messages.scrollTop = elements.messages.scrollHeight;
}

function renderProfile() {
  const user = getCurrentUser();
  elements.profileAvatar.className = user.photo ? "avatar large photo-avatar" : "avatar large";
  elements.profileAvatar.innerHTML = user.photo ? `<img src="${user.photo}" alt="${user.name}" />` : initials(user.name);
  elements.profileNameHeading.textContent = user.name;
  elements.profileName.value = user.name;
  user.cityEmail = user.cityEmail || createCityEmail(user.name, user.id);
  elements.profileCityEmail.value = user.cityEmail;
  elements.profileArea.value = user.area;
  elements.profileInterest.value = user.interest;
  elements.profileBio.value = user.bio;
}

function renderAdmin() {
  ensureArrays();
  const messageTotal = Object.values(state.messages).reduce((total, thread) => total + thread.length, 0);
  elements.memberCount.textContent = state.users.length;
  elements.postCount.textContent = state.posts.length;
  elements.messageCount.textContent = messageTotal;
  elements.scrapCount.textContent = state.scraps.length;
  elements.adCount.textContent = state.ads.length;
  elements.adminMembers.innerHTML = state.users
    .map(
      (user) => `
        <tr>
          <td>${user.name}</td>
          <td>${user.cityEmail || createCityEmail(user.name, user.id)}</td>
          <td>${user.area}</td>
          <td>${user.interest}</td>
          <td>${user.role}</td>
          <td>${user.status}</td>
        </tr>
      `
    )
    .join("");
}

function render() {
  renderShell();
  if (!getCurrentUser()) return;
  renderFeed();
  renderPeople();
  renderChat();
  renderAds();
  renderProfile();
  renderAdmin();
}

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = elements.loginName.value.trim();
  const contact = elements.loginContact.value.trim();
  const existing = state.users.find((user) => user.contact.toLowerCase() === contact.toLowerCase());

  if (existing) {
    state.currentUserId = existing.id;
  } else {
    const isFounder = name.toLowerCase() === "mahesh admin";
    const user = {
      id: `user-${Date.now()}`,
      name,
      contact,
      cityEmail: createCityEmail(name),
      area: "Shri Ganga Nagar",
      interest: elements.loginInterest.value,
      bio: "New city member.",
      role: isFounder ? "Admin" : "Member",
      status: "Active"
    };
    state.users.push(user);
    state.currentUserId = user.id;
  }

  saveState();
  setView("feed");
});

elements.loginName.addEventListener("input", () => {
  const name = elements.loginName.value.trim();
  elements.loginCityEmail.value = name
    ? createCityEmail(name)
    : `Created automatically at @${CITY_EMAIL_DOMAIN}`;
});

elements.logoutButton.addEventListener("click", () => {
  state.currentUserId = "";
  saveState();
  render();
});

elements.seedButton.addEventListener("click", () => {
  state = structuredClone(starterState);
  saveState();
  setView("feed");
});

elements.navItems.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

elements.postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = elements.postText.value.trim();
  if (!text && !selectedPostMedia) return;

  state.posts.unshift({
    id: `post-${Date.now()}`,
    authorId: state.currentUserId,
    text: text || "Shared a media post.",
    media: selectedPostMedia,
    category: elements.postCategory.value,
    createdAt: "Just now"
  });
  elements.postText.value = "";
  elements.postMedia.value = "";
  selectedPostMedia = null;
  elements.mediaPreview.hidden = true;
  elements.mediaPreview.innerHTML = "";
  saveState();
  renderFeed();
  renderAdmin();
});

elements.postMedia.addEventListener("change", () => {
  const file = elements.postMedia.files[0];
  if (!file) {
    selectedPostMedia = null;
    elements.mediaPreview.hidden = true;
    elements.mediaPreview.innerHTML = "";
    return;
  }

  if (file.size > DEMO_MEDIA_MAX_BYTES) {
    elements.postMedia.value = "";
    selectedPostMedia = null;
    elements.mediaPreview.hidden = false;
    elements.mediaPreview.innerHTML = `<p class="form-note">Please choose a file under 5 MB for this demo.</p>`;
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    selectedPostMedia = {
      name: file.name,
      type: file.type.startsWith("video/") ? "video" : "image",
      src: reader.result
    };
    elements.mediaPreview.hidden = false;
    elements.mediaPreview.innerHTML = renderPostMedia(selectedPostMedia);
  });
  reader.readAsDataURL(file);
});

elements.adForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = elements.adTitle.value.trim();
  const text = elements.adText.value.trim();
  if (!title || !text) return;

  ensureArrays();
  state.ads.unshift({
    id: `ad-${Date.now()}`,
    title,
    text,
    category: elements.adCategory.value,
    authorId: state.currentUserId,
    status: "Active",
    createdAt: "Just now"
  });
  elements.adTitle.value = "";
  elements.adText.value = "";
  saveState();
  renderAds();
  renderAdmin();
});

elements.peopleSearch.addEventListener("input", renderPeople);
elements.interestFilter.addEventListener("change", renderPeople);

elements.messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const currentUser = getCurrentUser();
  const selected = getUser(state.activeChatUserId);
  const text = elements.messageText.value.trim();
  if (!currentUser || !selected || (!text && !selectedMessageMedia)) return;

  const key = chatKey(currentUser.id, selected.id);
  state.messages[key] = state.messages[key] || [];
  state.messages[key].push({
    from: currentUser.id,
    text,
    media: selectedMessageMedia,
    createdAt: "Just now"
  });
  elements.messageText.value = "";
  elements.messageMedia.value = "";
  selectedMessageMedia = null;
  saveState();
  renderChat();
  renderAdmin();
});

elements.messageMedia.addEventListener("change", () => {
  const file = elements.messageMedia.files[0];
  if (!file) {
    selectedMessageMedia = null;
    return;
  }

  if (file.size > DEMO_MEDIA_MAX_BYTES) {
    elements.messageMedia.value = "";
    selectedMessageMedia = null;
    elements.messageText.value = "Please choose a photo or video under 5 MB for this demo.";
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    selectedMessageMedia = {
      name: file.name,
      type: file.type.startsWith("video/") ? "video" : "image",
      src: reader.result
    };
    elements.messageText.placeholder = `${file.name} attached`;
  });
  reader.readAsDataURL(file);
});

elements.profilePhoto.addEventListener("change", () => {
  const user = getCurrentUser();
  const file = elements.profilePhoto.files[0];
  if (!user || !file) return;

  if (file.size > DEMO_MEDIA_MAX_BYTES) {
    elements.profilePhoto.value = "";
    alert("Please choose a profile picture under 5 MB for this demo.");
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    user.photo = reader.result;
    elements.profilePhoto.value = "";
    saveState();
    render();
  });
  reader.readAsDataURL(file);
});

document.querySelectorAll("[data-quick-message]").forEach((button) => {
  button.addEventListener("click", () => {
    const options = {
      thought: "My thought for today: ",
      experience: "I want to share this experience from Shri Ganga Nagar: ",
      video: "I am sharing a video idea about: "
    };
    elements.messageText.value = options[button.dataset.quickMessage] || "";
    elements.messageText.focus();
  });
});

elements.profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = getCurrentUser();
  const currentCityEmail = user.cityEmail;
  user.name = elements.profileName.value.trim();
  user.cityEmail = currentCityEmail || createCityEmail(user.name, user.id);
  user.area = elements.profileArea.value.trim() || "Shri Ganga Nagar";
  user.interest = elements.profileInterest.value;
  user.bio = elements.profileBio.value.trim() || "City member.";
  saveState();
  render();
});

render();
