(() => {
  const data = window.PORTFOLIO_DATA;
  const state = {
    query: "",
    genre: "전체",
    platform: "전체"
  };

  const els = {
    featuredGrid: document.querySelector("#featuredGrid"),
    characterGrid: document.querySelector("#characterGrid"),
    genreFilters: document.querySelector("#genreFilters"),
    platformFilters: document.querySelector("#platformFilters"),
    searchInput: document.querySelector("#searchInput"),
    resultSummary: document.querySelector("#resultSummary"),
    emptyState: document.querySelector("#emptyState"),
    resetFilters: document.querySelector("#resetFilters"),
    characterCount: document.querySelector("#characterCount"),
    platformCount: document.querySelector("#platformCount"),
    genreCount: document.querySelector("#genreCount"),
    modal: document.querySelector("#characterModal"),
    modalClose: document.querySelector("#modalClose"),
    modalMainImage: document.querySelector("#modalMainImage"),
    galleryThumbnails: document.querySelector("#galleryThumbnails"),
    modalKicker: document.querySelector("#modalKicker"),
    modalTitle: document.querySelector("#modalTitle"),
    modalSummary: document.querySelector("#modalSummary"),
    modalTags: document.querySelector("#modalTags"),
    modalDescription: document.querySelector("#modalDescription"),
    modalPlatforms: document.querySelector("#modalPlatforms"),
    characterContentSection: document.querySelector("#characterContentSection"),
    modalContents: document.querySelector("#modalContents"),
    themeToggle: document.querySelector("#themeToggle")
  };

  const imagePath = (file) => `./images/${file}`;
  const unique = (items) => [...new Set(items)].sort((a, b) => a.localeCompare(b, "ko"));
  const platformCatalog = new Map((data.platforms || []).map((platform) => [platform.id, platform]));

  function getPlatform(platformLink) {
    const id = typeof platformLink === "string" ? platformLink : platformLink.id;
    return platformCatalog.get(id) || {
      id,
      name: platformLink.name || id,
      icon: platformLink.icon || "platforms/default.svg"
    };
  }

  const genres = unique(data.characters.flatMap((character) => character.genres));
  const platforms = unique(data.characters.flatMap((character) => character.platforms.map((item) => getPlatform(item).name)));

  els.characterCount.textContent = data.characters.length;
  els.platformCount.textContent = platforms.length;
  els.genreCount.textContent = genres.length;

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function platformDots(character) {
    return character.platforms
      .map((platformLink) => {
        const platform = getPlatform(platformLink);
        return `
          <span class="platform-dot" title="${escapeHtml(platform.name)}" aria-label="${escapeHtml(platform.name)}">
            <img src="${imagePath(platform.icon)}" alt="" />
          </span>
        `;
      })
      .join("");
  }

  function normalizeContents(character) {
    if (Array.isArray(character.contents)) return character.contents;

    // 이전 버전의 단일 spoiler 객체도 계속 표시합니다.
    if (character.spoiler) {
      return [{
        id: "legacy-spoiler",
        type: "비밀 설정",
        title: character.spoiler.title,
        content: [character.spoiler.content],
        spoiler: true,
        warning: character.spoiler.warning
      }];
    }

    return [];
  }

  function contentParagraphs(content) {
    const paragraphs = Array.isArray(content) ? content : [content];
    return paragraphs
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
  }

  function contentBlock(item, index) {
    const isSpoiler = Boolean(item.spoiler);
    const type = item.type || "추가 이야기";
    const title = item.title || type;
    const warning = item.warning || "스포일러가 포함되어 있습니다.";
    const body = contentParagraphs(item.content || item.body || "");

    if (isSpoiler) {
      return `
        <details class="content-box is-spoiler" data-content-index="${index}">
          <summary>
            <span class="content-icon" aria-hidden="true">⚠</span>
            <span class="content-heading">
              <small>${escapeHtml(type)}</small>
              <strong>${escapeHtml(title)}</strong>
              <span>${escapeHtml(warning)}</span>
            </span>
            <span class="content-arrow" aria-hidden="true">⌄</span>
          </summary>
          <div class="content-body">${body}</div>
        </details>
      `;
    }

    return `
      <article class="content-box is-public" data-content-index="${index}">
        <header class="content-public-heading">
          <span class="content-icon" aria-hidden="true">✦</span>
          <span class="content-heading">
            <small>${escapeHtml(type)}</small>
            <strong>${escapeHtml(title)}</strong>
          </span>
        </header>
        <div class="content-body">${body}</div>
      </article>
    `;
  }

  function characterCard(character, featured = false) {
    const tagMarkup = character.genres
      .slice(0, 2)
      .map((genre) => `<span>${escapeHtml(genre)}</span>`)
      .join("");

    return `
      <article class="character-card ${featured ? "featured-card" : ""}" data-character-id="${escapeHtml(character.id)}">
        <button class="card-button" type="button" aria-label="${escapeHtml(character.name)} 상세 보기">
          <div class="card-image-wrap">
            <img class="card-image" src="${imagePath(character.images[0])}" alt="${escapeHtml(character.name)} 대표 이미지" loading="lazy" />
            <div class="card-platforms" aria-label="이용 가능 플랫폼">${platformDots(character)}</div>
          </div>
          <div class="card-body">
            <div class="card-tags">${tagMarkup}</div>
            <h3>${escapeHtml(character.name)}</h3>
            <p>${escapeHtml(character.subtitle)}</p>
            <span class="card-more">상세 보기 <b aria-hidden="true">↗</b></span>
          </div>
        </button>
      </article>
    `;
  }

  function renderFeatured() {
    els.featuredGrid.innerHTML = data.characters
      .filter((character) => character.featured)
      .map((character) => characterCard(character, true))
      .join("");
  }

  function filterButton(label, group, active) {
    return `<button class="filter-chip ${active ? "active" : ""}" type="button" data-filter-group="${group}" data-filter-value="${escapeHtml(label)}">${escapeHtml(label)}</button>`;
  }

  function renderFilters() {
    els.genreFilters.innerHTML = ["전체", ...genres]
      .map((genre) => filterButton(genre, "genre", state.genre === genre))
      .join("");
    els.platformFilters.innerHTML = ["전체", ...platforms]
      .map((platform) => filterButton(platform, "platform", state.platform === platform))
      .join("");
  }

  function filteredCharacters() {
    const normalizedQuery = state.query.trim().toLocaleLowerCase("ko");
    return data.characters.filter((character) => {
      const searchable = [
        character.name,
        character.subtitle,
        ...character.genres,
        ...character.tags,
        ...character.platforms.map((platform) => getPlatform(platform).name)
      ].join(" ").toLocaleLowerCase("ko");

      const queryMatch = !normalizedQuery || searchable.includes(normalizedQuery);
      const genreMatch = state.genre === "전체" || character.genres.includes(state.genre);
      const platformMatch = state.platform === "전체" || character.platforms.some((item) => getPlatform(item).name === state.platform);
      return queryMatch && genreMatch && platformMatch;
    });
  }

  function renderCharacters() {
    const characters = filteredCharacters();
    els.characterGrid.innerHTML = characters.map((character) => characterCard(character)).join("");
    els.resultSummary.textContent = `총 ${data.characters.length}명 중 ${characters.length}명 표시`;
    els.emptyState.hidden = characters.length !== 0;
    els.characterGrid.hidden = characters.length === 0;
  }

  function renderAll() {
    renderFilters();
    renderCharacters();
  }

  function findCharacter(id) {
    return data.characters.find((character) => character.id === id);
  }

  function openCharacter(character) {
    if (!character) return;

    els.modalMainImage.src = imagePath(character.images[0]);
    els.modalMainImage.alt = `${character.name} 이미지 1`;
    els.galleryThumbnails.innerHTML = character.images
      .map((image, index) => `
        <button class="thumbnail-button ${index === 0 ? "active" : ""}" type="button" data-gallery-image="${imagePath(image)}" data-gallery-alt="${escapeHtml(character.name)} 이미지 ${index + 1}">
          <img src="${imagePath(image)}" alt="" />
        </button>
      `)
      .join("");

    els.modalKicker.textContent = character.genres.join(" · ");
    els.modalTitle.textContent = character.name;
    els.modalSummary.textContent = character.subtitle;
    els.modalTags.innerHTML = [...character.genres, ...character.tags]
      .map((tag) => `<span>${escapeHtml(tag)}</span>`)
      .join("");
    els.modalDescription.innerHTML = character.description.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    els.modalPlatforms.innerHTML = character.platforms
      .map((platformLink) => {
        const platform = getPlatform(platformLink);
        return `
          <a
            class="platform-link"
            href="${escapeHtml(platformLink.url)}"
            target="_blank"
            rel="noreferrer"
            title="${escapeHtml(platform.name)}"
            aria-label="${escapeHtml(platform.name)}에서 대화하기"
            data-platform-name="${escapeHtml(platform.name)}"
          >
            <img src="${imagePath(platform.icon)}" alt="" />
            <span class="sr-only">${escapeHtml(platform.name)}에서 대화하기</span>
          </a>
        `;
      })
      .join("");

    const contents = normalizeContents(character);
    els.characterContentSection.hidden = contents.length === 0;
    els.modalContents.innerHTML = contents.map(contentBlock).join("");

    els.modal.showModal();
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    els.modal.close();
    document.body.classList.remove("modal-open");
  }

  document.addEventListener("click", (event) => {
    const card = event.target.closest("[data-character-id]");
    if (card) openCharacter(findCharacter(card.dataset.characterId));

    const filter = event.target.closest("[data-filter-group]");
    if (filter) {
      state[filter.dataset.filterGroup] = filter.dataset.filterValue;
      renderAll();
    }

    const thumbnail = event.target.closest("[data-gallery-image]");
    if (thumbnail) {
      els.modalMainImage.src = thumbnail.dataset.galleryImage;
      els.modalMainImage.alt = thumbnail.dataset.galleryAlt;
      els.galleryThumbnails.querySelectorAll(".thumbnail-button").forEach((button) => button.classList.remove("active"));
      thumbnail.classList.add("active");
    }
  });

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderCharacters();
  });

  els.resetFilters.addEventListener("click", () => {
    state.query = "";
    state.genre = "전체";
    state.platform = "전체";
    els.searchInput.value = "";
    renderAll();
  });

  els.modalClose.addEventListener("click", closeModal);
  els.modal.addEventListener("click", (event) => {
    if (event.target === els.modal) closeModal();
  });
  els.modal.addEventListener("close", () => document.body.classList.remove("modal-open"));

  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem("portfolio-theme");
  } catch (error) {
    console.info("테마 저장소를 사용할 수 없습니다.", error);
  }
  if (storedTheme === "light") document.documentElement.dataset.theme = "light";
  updateThemeButton();

  function updateThemeButton() {
    const isLight = document.documentElement.dataset.theme === "light";
    els.themeToggle.textContent = isLight ? "☾" : "☀";
    els.themeToggle.setAttribute("aria-label", isLight ? "어두운 테마로 변경" : "밝은 테마로 변경");
  }

  els.themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      console.info("테마를 저장할 수 없습니다.", error);
    }
    updateThemeButton();
  });

  renderFeatured();
  renderAll();
})();
