// Scene2 idol cards and detail overlay.
const projects = [
  {
    id: "idol-1",
    title: "劳大",
    type: "闪闪发光的存在",
    description: "一个让人感到温暖和力量的人。",
    summary: "闪闪发光的存在，照亮了我的日常。",
    background: "在低落的时候看到ta，就会觉得世界还是有美好的事情。",
    features: ["治愈的笑容", "认真的态度", "温暖的作品"],
    role: ["带来快乐", "传递正能量", "激励前行"],
    tags: ["偶像", "温暖", "力量"],
    status: "一直喜欢",
    image: "assets/gallery/idol1.jpg",
    demoUrl: "",
    githubUrl: "",
    demoAvailable: false,
    githubPublic: false
  },
  {
    id: "idol-2",
    title: "圆头耄耋",
    type: "闪闪发光的存在",
    description: "为了哈气而生。",
    summary: "为了哈气而生。",
    background: "圆头耄耋，天生就是来哈气的，气场两米八。",
    features: ["出色的才华", "不懈的努力", "真诚的心"],
    role: ["带来感动", "传递热爱", "激励成长"],
    tags: ["偶像", "才华", "热爱"],
    status: "一直喜欢",
    image: "assets/gallery/idol2.jpg",
    demoUrl: "",
    githubUrl: "",
    demoAvailable: false,
    githubPublic: false
  }
];

let activeProject = null;
let isAnimating = false;
let modalElements = {};

function initProjectCards() {
  modalElements = {
    overlay: document.getElementById("projectModal"),
    backdrop: document.getElementById("projectModalBackdrop") || document.querySelector(".project-modal-backdrop"),
    card: document.getElementById("projectModalCard"),
    closeBtn: document.getElementById("projectModalClose"),
    closeTextBtn: document.getElementById("projectModalCloseText"),
    media: document.getElementById("projectModalMedia"),
    type: document.getElementById("projectModalType"),
    title: document.getElementById("projectModalTitle"),
    summary: document.getElementById("projectModalSummary"),
    background: document.getElementById("projectModalBackground"),
    features: document.getElementById("projectModalFeatures"),
    role: document.getElementById("projectModalRole"),
    tech: document.getElementById("projectModalTech"),
    status: document.getElementById("projectModalStatus"),
    demo: document.getElementById("projectModalDemo"),
    github: document.getElementById("projectModalGithub")
  };

  if (!modalElements.overlay || !modalElements.card) return;

  if (modalElements.overlay.parentElement !== document.body) document.body.appendChild(modalElements.overlay);
  modalElements.overlay.style.display = "none";
  modalElements.overlay.setAttribute("aria-hidden", "true");

  modalElements.backdrop?.addEventListener("click", closeProjectModal);
  modalElements.closeBtn?.addEventListener("click", closeProjectModal);
  modalElements.closeTextBtn?.addEventListener("click", closeProjectModal);
  modalElements.demo?.addEventListener("click", handlePlaceholderLink);
  modalElements.github?.addEventListener("click", handlePlaceholderLink);
  modalElements.card.addEventListener("click", (event) => event.stopPropagation());
  modalElements.card.addEventListener("wheel", (event) => event.stopPropagation(), { passive: true });
  modalElements.card.addEventListener("touchstart", (event) => event.stopPropagation(), { passive: true });
  modalElements.card.addEventListener("touchend", (event) => event.stopPropagation(), { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeProject) closeProjectModal();
  });
}

function handlePlaceholderLink(event) {
  const target = event.currentTarget;
  const href = target.getAttribute("href");
  if (target.classList.contains("is-disabled") || target.getAttribute("aria-disabled") === "true" || !href || href === "#") {
    event.preventDefault();
  }
}

function handleCardClick(event) {
  if (isAnimating || activeProject) return;
  const project = projects.find((item) => item.id === String(event.currentTarget.dataset.projectId));
  if (!project) return;
  openProjectModal(project);
}

function openProjectModal(project) {
  isAnimating = true;
  activeProject = project;
  renderProject(project);

  document.body.classList.add("project-detail-open");
  modalElements.overlay.style.display = "grid";
  modalElements.overlay.setAttribute("aria-hidden", "false");
  modalElements.card.scrollTop = 0;

  requestAnimationFrame(() => {
    modalElements.overlay.classList.add("is-open");
    modalElements.card.focus({ preventScroll: true });
  });

  setTimeout(() => {
    isAnimating = false;
  }, 360);
}

function closeProjectModal() {
  if (isAnimating || !activeProject) return;
  isAnimating = true;
  modalElements.overlay.classList.remove("is-open");
  modalElements.overlay.classList.add("is-closing");

  setTimeout(() => {
    modalElements.overlay.classList.remove("is-closing");
    modalElements.overlay.style.display = "none";
    modalElements.overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("project-detail-open");
    activeProject = null;
    isAnimating = false;
  }, 280);
}

function forceCloseProjectModal() {
  modalElements.overlay?.classList.remove("is-open", "is-closing");
  if (modalElements.overlay) {
    modalElements.overlay.style.display = "none";
    modalElements.overlay.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("project-detail-open");
  activeProject = null;
  isAnimating = false;
}

function renderProject(project) {
  modalElements.type.textContent = project.type;
  modalElements.title.textContent = project.title;
  modalElements.summary.textContent = project.summary;
  modalElements.background.textContent = project.background || project.description;
  modalElements.status.textContent = project.status;
  renderProjectLink(modalElements.demo, {
    isAvailable: project.demoAvailable,
    url: project.demoUrl,
    availableText: "查看主页",
    unavailableText: "暂无链接",
  });
  renderProjectLink(modalElements.github, {
    isAvailable: project.githubPublic,
    url: project.githubUrl,
    availableText: "相关链接",
    unavailableText: "暂无链接",
  });
  renderMedia(project);
  renderList(modalElements.features, project.features);
  renderList(modalElements.role, project.role);
  renderTech(project.tags);
}

function renderProjectLink(element, { isAvailable, url, availableText, unavailableText }) {
  const canOpen = Boolean(isAvailable && url);
  element.textContent = canOpen ? availableText : unavailableText;
  element.classList.toggle("is-disabled", !canOpen);
  element.setAttribute("aria-disabled", canOpen ? "false" : "true");

  if (canOpen) {
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
    element.tabIndex = 0;
    return;
  }

  element.removeAttribute("href");
  element.removeAttribute("target");
  element.removeAttribute("rel");
  element.tabIndex = -1;
}

function renderMedia(project) {
  modalElements.media.textContent = "";
  if (project.video) {
    const video = document.createElement("video");
    video.src = project.video;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";
    modalElements.media.appendChild(video);
    return;
  }

  const image = document.createElement("img");
  image.src = project.image;
  image.alt = project.title;
  modalElements.media.appendChild(image);
}

function renderList(container, items = []) {
  container.textContent = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderTech(items = []) {
  modalElements.tech.textContent = "";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    modalElements.tech.appendChild(chip);
  });
}

window.addEventListener("scene:change", () => {
  if (activeProject) forceCloseProjectModal();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectCards);
} else {
  initProjectCards();
}
