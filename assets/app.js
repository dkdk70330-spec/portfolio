(() => {
  const data = window.PORTFOLIO_DATA;
  const state = {
    query: "",
    genre: "전체",
    platform: "전체",
    world: "전체",
    worldExpanded: false,
    charactersExpanded: false
  };

  const els = {
    siteTitle: document.querySelector("#siteTitle"),
    siteDescription: document.querySelector("#siteDescription"),
    creatorAvatar: document.querySelector("#creatorAvatar"),
    creatorAvatarFallback: document.querySelector("#creatorAvatarFallback"),
    creatorName: document.querySelector("#creatorName"),
    creatorHandle: document.querySelector("#creatorHandle"),
    creatorBio: document.querySelector("#creatorBio"),
    creatorLinks: document.querySelector("#creatorLinks"),
    featuredSection: document.querySelector("#featuredSection"),
    featuredGrid: document.querySelector("#featuredGrid"),
    worldGrid: document.querySelector("#worldGrid"),
    worldToggleWrap: document.querySelector("#worldToggleWrap"),
    worldToggle: document.querySelector("#worldToggle"),
    characterGrid: document.querySelector("#characterGrid"),
    characterToggleWrap: document.querySelector("#characterToggleWrap"),
    characterToggle: document.querySelector("#characterToggle"),
    genreFilters: document.querySelector("#genreFilters"),
    platformFilters: document.querySelector("#platformFilters"),
    worldFilters: document.querySelector("#worldFilters"),
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
    characterWorldPanel: document.querySelector("#characterWorldPanel"),
    openWorldButton: document.querySelector("#openWorldButton"),
    characterWorldName: document.querySelector("#characterWorldName"),
    characterWorldSummary: document.querySelector("#characterWorldSummary"),

    worldModal: document.querySelector("#worldModal"),
    worldModalClose: document.querySelector("#worldModalClose"),
    worldModalImage: document.querySelector("#worldModalImage"),
    worldModalTitle: document.querySelector("#worldModalTitle"),
    worldModalSummary: document.querySelector("#worldModalSummary"),
    worldModalTags: document.querySelector("#worldModalTags"),
    worldModalDescription: document.querySelector("#worldModalDescription"),
    worldModalSections: document.querySelector("#worldModalSections"),
    worldCharacterList: document.querySelector("#worldCharacterList"),

    themeToggle: document.querySelector("#themeToggle")
  };

  const imagePath = (file) => `./images/${file}`;
  const unique = (items) => [...new Set(items)].sort((a, b) => a.localeCompare(b, "ko"));
  const platformCatalog = new Map((data.platforms || []).map((platform) => [platform.id, platform]));
  const worldCatalog = new Map((data.worlds || []).map((world) => [world.id, world]));
  const profileLinkCatalog = new Map((data.profileLinkServices || []).map((service) => [service.id, service]));

  function getPlatform(platformLink) {
    const id = typeof platformLink === "string" ? platformLink : platformLink.id;
    return platformCatalog.get(id) || {
      id,
      name: platformLink.name || id,
      icon: platformLink.icon || "platforms/default.png"
    };
  }

  function getWorld(worldId) {
    if (!worldId) return null;
    return worldCatalog.get(worldId) || null;
  }

  function charactersInWorld(worldId) {
    return data.characters.filter((character) => character.worldId === worldId);
  }

  const genres = unique(data.characters.flatMap((character) => character.genres));
  const platforms = unique(data.characters.flatMap((character) => character.platforms.map((item) => getPlatform(item).name)));

  els.characterCount.textContent = data.characters.length;
  els.platformCount.textContent = platforms.length;
  els.genreCount.textContent = genres.length;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderSiteAndCreator() {
    const site = data.site || {};
    const creator = data.creator || {};
    const title = site.title || "캐릭터 포트폴리오";
    const description = site.description || "";

    if (els.siteTitle) els.siteTitle.textContent = title;
    if (els.siteDescription) {
      els.siteDescription.textContent = description;
      els.siteDescription.hidden = !description;
    }
    document.title = `${title} | ${creator.name || "AI 캐릭터 포트폴리오"}`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) metaDescription.setAttribute("content", description);

    if (els.creatorName) els.creatorName.textContent = creator.name || "";
    if (els.creatorHandle) {
      els.creatorHandle.textContent = creator.handle || "";
      els.creatorHandle.hidden = !creator.handle;
    }

    const bio = Array.isArray(creator.bio) ? creator.bio : creator.bio ? [creator.bio] : [];
    if (els.creatorBio) {
      els.creatorBio.innerHTML = bio.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
      els.creatorBio.hidden = bio.length === 0;
    }

    if (els.creatorAvatar && els.creatorAvatarFallback) {
      const fallbackText = creator.fallbackText || creator.name?.trim()?.slice(0, 1) || "✦";
      els.creatorAvatarFallback.textContent = fallbackText;

      if (creator.avatar) {
        els.creatorAvatar.src = imagePath(creator.avatar);
        els.creatorAvatar.alt = creator.name ? `${creator.name} 프로필 이미지` : "제작자 프로필 이미지";
        els.creatorAvatar.onload = () => {
          els.creatorAvatar.hidden = false;
          els.creatorAvatarFallback.hidden = true;
        };
        els.creatorAvatar.onerror = () => {
          els.creatorAvatar.hidden = true;
          els.creatorAvatarFallback.hidden = false;
        };
      } else {
        els.creatorAvatar.hidden = true;
        els.creatorAvatarFallback.hidden = false;
      }
    }

    if (els.creatorLinks) {
      els.creatorLinks.innerHTML = (creator.links || []).map((link) => {
        const service = profileLinkCatalog.get(link.id) || { name: link.name || link.id };
        if (!link.url) return "";
        return `<a href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(service.name)}</a>`;
      }).join("");
      els.creatorLinks.hidden = !els.creatorLinks.childElementCount;
    }
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

  function worldCard(world) {
    const related = charactersInWorld(world.id);
    const tags = (world.tags || []).slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const faces = related.slice(0, 4).map((character) => `
      <span class="world-face" title="${escapeHtml(character.name)}">
        <img src="${imagePath(character.images[0])}" alt="" loading="lazy" />
      </span>
    `).join("");

    return `
      <article class="world-card">
        <button class="world-card-button" type="button" data-world-id="${escapeHtml(world.id)}" aria-label="${escapeHtml(world.name)} 세계관 보기">
          <div class="world-card-image">
            <img src="${imagePath(world.image)}" alt="" loading="lazy" />
            <div class="world-face-stack" aria-label="연결된 캐릭터">${faces}</div>
          </div>
          <div class="world-card-body">
            <div class="world-card-meta"><span>${related.length} Characters</span><b aria-hidden="true">↗</b></div>
            <h3>${escapeHtml(world.name)}</h3>
            <p>${escapeHtml(world.subtitle)}</p>
            <div class="world-card-tags">${tags}</div>
          </div>
        </button>
      </article>
    `;
  }

  function gridColumnCount(grid) {
    if (!grid) return 1;
    const template = getComputedStyle(grid).gridTemplateColumns;
    if (!template || template === "none") return 1;
    return Math.max(1, template.split(/\s+/).filter(Boolean).length);
  }

  function updateArchiveToggle({ grid, wrap, button, expanded, forceExpanded = false, noun }) {
    if (!grid || !wrap || !button) return;

    const items = [...grid.children];
    const visibleLimit = gridColumnCount(grid) * 2;
    const canCollapse = !forceExpanded && items.length > visibleLimit;
    const isExpanded = forceExpanded || expanded || !canCollapse;

    items.forEach((item, index) => {
      item.hidden = !isExpanded && index >= visibleLimit;
    });

    wrap.hidden = !canCollapse;
    button.setAttribute("aria-expanded", String(isExpanded));
    button.classList.toggle("is-expanded", isExpanded);

    const label = button.querySelector("span");
    if (label) {
      const hiddenCount = Math.max(0, items.length - visibleLimit);
      label.textContent = isExpanded ? `${noun} 접기` : `${noun} 더보기 +${hiddenCount}`;
    }
  }

  function hasActiveCharacterFilters() {
    return Boolean(
      state.query.trim()
      || state.genre !== "전체"
      || state.platform !== "전체"
      || state.world !== "전체"
    );
  }

  function updateWorldArchiveLimit() {
    updateArchiveToggle({
      grid: els.worldGrid,
      wrap: els.worldToggleWrap,
      button: els.worldToggle,
      expanded: state.worldExpanded,
      noun: "세계관"
    });
  }

  function updateCharacterArchiveLimit() {
    updateArchiveToggle({
      grid: els.characterGrid,
      wrap: els.characterToggleWrap,
      button: els.characterToggle,
      expanded: state.charactersExpanded,
      forceExpanded: hasActiveCharacterFilters(),
      noun: "캐릭터"
    });
  }

  function renderFeatured() {
    const preferred = data.characters.filter((character) => character.featured);
    const fallback = data.characters.filter((character) => !character.featured);
    const featuredCharacters = [...preferred, ...fallback]
      .filter((character, index, list) => list.findIndex((item) => item.id === character.id) === index)
      .slice(0, 3);

    els.featuredGrid.innerHTML = featuredCharacters
      .map((character) => characterCard(character, true))
      .join("");

    if (els.featuredSection) els.featuredSection.hidden = featuredCharacters.length === 0;
  }

  function renderWorlds() {
    const worlds = data.worlds || [];
    if (!els.worldGrid) return;
    els.worldGrid.innerHTML = worlds.map(worldCard).join("");
    const section = els.worldGrid.closest(".world-section");
    if (section) section.hidden = worlds.length === 0;
    updateWorldArchiveLimit();
  }

  function filterButton(label, group, active, value = label) {
    return `<button class="filter-chip ${active ? "active" : ""}" type="button" aria-pressed="${active}" data-filter-group="${group}" data-filter-value="${escapeHtml(value)}">${escapeHtml(label)}</button>`;
  }

  function renderFilters() {
    els.genreFilters.innerHTML = ["전체", ...genres]
      .map((genre) => filterButton(genre, "genre", state.genre === genre))
      .join("");
    els.platformFilters.innerHTML = ["전체", ...platforms]
      .map((platform) => filterButton(platform, "platform", state.platform === platform))
      .join("");

    const worldOptions = [
      { label: "전체", value: "전체" },
      ...(data.worlds || []).map((world) => ({ label: world.name, value: world.id })),
      { label: "독립 캐릭터", value: "__independent__" }
    ];

    els.worldFilters.innerHTML = worldOptions
      .map((world) => filterButton(world.label, "world", state.world === world.value, world.value))
      .join("");
  }

  function filteredCharacters() {
    const normalizedQuery = state.query.trim().toLocaleLowerCase("ko");
    return data.characters.filter((character) => {
      const world = getWorld(character.worldId);
      const searchable = [
        character.name,
        character.subtitle,
        ...character.genres,
        ...character.tags,
        ...character.platforms.map((platform) => getPlatform(platform).name),
        world?.name || "",
        ...(world?.tags || [])
      ].join(" ").toLocaleLowerCase("ko");

      const queryMatch = !normalizedQuery || searchable.includes(normalizedQuery);
      const genreMatch = state.genre === "전체" || character.genres.includes(state.genre);
      const platformMatch = state.platform === "전체" || character.platforms.some((item) => getPlatform(item).name === state.platform);
      const worldMatch = state.world === "전체"
        || (state.world === "__independent__" ? !character.worldId : character.worldId === state.world);
      return queryMatch && genreMatch && platformMatch && worldMatch;
    });
  }

  function renderCharacters() {
    const characters = filteredCharacters();
    els.characterGrid.innerHTML = characters.map((character) => characterCard(character)).join("");
    els.resultSummary.textContent = `총 ${data.characters.length}명 중 ${characters.length}명 표시`;
    els.emptyState.hidden = characters.length !== 0;
    els.characterGrid.hidden = characters.length === 0;
    updateCharacterArchiveLimit();
  }

  function renderAll() {
    renderFilters();
    renderCharacters();
  }

  function findCharacter(id) {
    return data.characters.find((character) => character.id === id);
  }

  function syncModalOpenState() {
    document.body.classList.toggle("modal-open", Boolean(els.modal.open || els.worldModal.open));
  }


  function enableHorizontalDrag(rail) {
    if (!rail) return () => {};

    const wrapper = rail.closest(".platform-rail-wrap");
    let pointerId = null;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;
    let suppressNextClick = false;

    const updateRailState = () => {
      if (!wrapper) return;

      const maxScrollLeft = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const overflowing = maxScrollLeft > 2;

      wrapper.classList.toggle("is-overflowing", overflowing);
      wrapper.classList.toggle("can-scroll-left", overflowing && rail.scrollLeft > 2);
      wrapper.classList.toggle(
        "can-scroll-right",
        overflowing && rail.scrollLeft < maxScrollLeft - 2
      );
    };

    rail.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      if (event.pointerType === "mouse" && event.button !== 0) return;

      pointerId = event.pointerId;
      startX = event.clientX;
      startScrollLeft = rail.scrollLeft;
      moved = false;
      rail.setPointerCapture(pointerId);
    });

    rail.addEventListener("pointermove", (event) => {
      if (pointerId !== event.pointerId) return;

      const distance = event.clientX - startX;
      if (Math.abs(distance) > 5) {
        moved = true;
        suppressNextClick = true;
        rail.classList.add("is-dragging");
      }

      if (moved) {
        event.preventDefault();
        rail.scrollLeft = startScrollLeft - distance;
        updateRailState();
      }
    });

    const finishDrag = (event) => {
      if (pointerId !== event.pointerId) return;

      if (rail.hasPointerCapture(pointerId)) {
        rail.releasePointerCapture(pointerId);
      }

      pointerId = null;
      rail.classList.remove("is-dragging");
      updateRailState();
    };

    rail.addEventListener("pointerup", finishDrag);
    rail.addEventListener("pointercancel", finishDrag);
    rail.addEventListener("scroll", updateRailState, { passive: true });

    rail.addEventListener(
      "click",
      (event) => {
        if (!suppressNextClick) return;

        event.preventDefault();
        event.stopPropagation();
        suppressNextClick = false;
      },
      true
    );

    window.addEventListener("resize", updateRailState);
    requestAnimationFrame(updateRailState);

    return updateRailState;
  }

  function openCharacter(character) {
    if (!character) return;
    if (els.worldModal.open) els.worldModal.close();

    const galleryImages = (character.images || []).slice(0, 5);
    const hasMainImage = galleryImages.length > 0;

    els.modalMainImage.hidden = !hasMainImage;
    if (hasMainImage) {
      els.modalMainImage.src = imagePath(galleryImages[0]);
      els.modalMainImage.alt = `${character.name} 이미지 1`;
    } else {
      els.modalMainImage.removeAttribute("src");
      els.modalMainImage.alt = "";
    }

    const showThumbnails = galleryImages.length > 1;
    els.galleryThumbnails.hidden = !showThumbnails;
    els.galleryThumbnails.innerHTML = showThumbnails
      ? galleryImages
          .map((image, index) => `
            <button class="thumbnail-button ${index === 0 ? "active" : ""}" type="button" data-gallery-image="${imagePath(image)}" data-gallery-alt="${escapeHtml(character.name)} 이미지 ${index + 1}" aria-label="${escapeHtml(character.name)} 이미지 ${index + 1} 보기">
              <img src="${imagePath(image)}" alt="" />
            </button>
          `)
          .join("")
      : "";

    els.modalKicker.textContent = character.genres.join(" · ");
    els.modalTitle.textContent = character.name;
    els.modalSummary.textContent = character.subtitle;
    els.modalTags.innerHTML = [...character.genres, ...character.tags]
      .map((tag) => `<span>${escapeHtml(tag)}</span>`)
      .join("");
    els.modalDescription.innerHTML = character.description.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");

    const world = getWorld(character.worldId);
    els.characterWorldPanel.hidden = !world;
    if (world) {
      els.openWorldButton.dataset.worldId = world.id;
      els.characterWorldName.textContent = world.name;
      els.characterWorldSummary.textContent = world.subtitle;
    } else {
      delete els.openWorldButton.dataset.worldId;
      els.characterWorldName.textContent = "";
      els.characterWorldSummary.textContent = "";
    }

    const platformLinks = character.platforms || [];
    const platformPanel = els.modalPlatforms.closest(".platform-panel");
    if (platformPanel) platformPanel.hidden = platformLinks.length === 0;

    els.modalPlatforms.innerHTML = platformLinks
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
            draggable="false"
          >
            <img src="${imagePath(platform.icon)}" alt="" draggable="false" />
            <span class="sr-only">${escapeHtml(platform.name)}에서 대화하기</span>
          </a>
        `;
      })
      .join("");

    requestAnimationFrame(updateModalPlatformRail);

    const contents = normalizeContents(character);
    els.characterContentSection.hidden = contents.length === 0;
    els.modalContents.innerHTML = contents.map(contentBlock).join("");

    els.modal.showModal();
    syncModalOpenState();
  }

  function closeCharacterModal() {
    if (els.modal.open) els.modal.close();
    syncModalOpenState();
  }

  function worldInfoSection(section) {
    return `
      <article class="world-info-block">
        <h3>${escapeHtml(section.title || "세계관 정보")}</h3>
        <div>${contentParagraphs(section.content || section.body || "")}</div>
      </article>
    `;
  }

  function openWorld(world) {
    if (!world) return;
    if (els.modal.open) els.modal.close();

    const related = charactersInWorld(world.id);
    els.worldModalImage.src = imagePath(world.image);
    els.worldModalImage.alt = `${world.name} 세계관 대표 이미지`;
    els.worldModalTitle.textContent = world.name;
    els.worldModalSummary.textContent = world.subtitle || "";
    els.worldModalTags.innerHTML = (world.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    els.worldModalDescription.innerHTML = (world.description || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    els.worldModalSections.innerHTML = (world.sections || []).map(worldInfoSection).join("");
    els.worldModalSections.hidden = !(world.sections || []).length;
    els.worldCharacterList.innerHTML = related.map((character) => `
      <button class="world-character-button" type="button" data-world-character-id="${escapeHtml(character.id)}" aria-label="${escapeHtml(character.name)} 상세 보기">
        <img src="${imagePath(character.images[0])}" alt="" />
        <span>
          <strong>${escapeHtml(character.name)}</strong>
          <small>${escapeHtml(character.subtitle)}</small>
        </span>
      </button>
    `).join("");

    els.worldModal.showModal();
    syncModalOpenState();
  }

  function closeWorldModal() {
    if (els.worldModal.open) els.worldModal.close();
    syncModalOpenState();
  }

  const updateModalPlatformRail = enableHorizontalDrag(els.modalPlatforms);

  document.addEventListener("click", (event) => {
    const worldCharacter = event.target.closest("[data-world-character-id]");
    if (worldCharacter) {
      openCharacter(findCharacter(worldCharacter.dataset.worldCharacterId));
      return;
    }

    const worldTarget = event.target.closest("[data-world-id]");
    if (worldTarget) {
      openWorld(getWorld(worldTarget.dataset.worldId));
      return;
    }

    const card = event.target.closest("[data-character-id]");
    if (card) {
      openCharacter(findCharacter(card.dataset.characterId));
      return;
    }

    const filter = event.target.closest("[data-filter-group]");
    if (filter) {
      state[filter.dataset.filterGroup] = filter.dataset.filterValue;
      renderAll();
      return;
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
    state.world = "전체";
    els.searchInput.value = "";
    renderAll();
  });

  els.worldToggle?.addEventListener("click", () => {
    state.worldExpanded = !state.worldExpanded;
    updateWorldArchiveLimit();
    if (!state.worldExpanded) {
      document.querySelector("#worlds")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  els.characterToggle?.addEventListener("click", () => {
    state.charactersExpanded = !state.charactersExpanded;
    updateCharacterArchiveLimit();
    if (!state.charactersExpanded) {
      document.querySelector("#characters")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  let archiveResizeFrame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(archiveResizeFrame);
    archiveResizeFrame = requestAnimationFrame(() => {
      updateWorldArchiveLimit();
      updateCharacterArchiveLimit();
    });
  });

  els.modalClose.addEventListener("click", closeCharacterModal);
  els.modal.addEventListener("click", (event) => {
    if (event.target === els.modal) closeCharacterModal();
  });
  els.modal.addEventListener("close", syncModalOpenState);

  els.worldModalClose.addEventListener("click", closeWorldModal);
  els.worldModal.addEventListener("click", (event) => {
    if (event.target === els.worldModal) closeWorldModal();
  });
  els.worldModal.addEventListener("close", syncModalOpenState);

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

  renderSiteAndCreator();
  renderFeatured();
  renderWorlds();
  renderAll();
})();
