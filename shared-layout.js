(() => {
  const currentPage = document.body.dataset.page || "";
  const pageTitles = {
    home: "Sabya Mishra",
    research: "Research",
    publications: "Publications",
    students: "Students",
    teaching: "Teaching",
    products: "Products"
  };

  const nav = `
    <header class="site-header">
      <nav class="navbar navbar-expand-lg faculty-navbar" aria-label="Primary">
        <div class="container">
          <a class="navbar-brand faculty-brand" href="homepage.html">
            <span class="faculty-brand__name">Sabya Mishra</span>
            <span class="faculty-brand__meta">${pageTitles[currentPage] || "Professor of Civil Engineering"}</span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar"
            aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavbar">
            <ul class="navbar-nav ms-auto align-items-lg-center">
              <li class="nav-item"><a class="nav-link ${currentPage === "home" ? "active" : ""}" ${currentPage === "home" ? 'aria-current="page"' : ""} href="homepage.html">Home</a></li>
              <li class="nav-item"><a class="nav-link ${currentPage === "publications" ? "active" : ""}" ${currentPage === "publications" ? 'aria-current="page"' : ""} href="Journals.html">Publications</a></li>
              <li class="nav-item"><a class="nav-link ${currentPage === "research" ? "active" : ""}" ${currentPage === "research" ? 'aria-current="page"' : ""} href="research.html">Research</a></li>
              <li class="nav-item"><a class="nav-link ${currentPage === "teaching" ? "active" : ""}" ${currentPage === "teaching" ? 'aria-current="page"' : ""} href="teaching.html">Teaching</a></li>
              <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
              <li class="nav-item"><a class="nav-link ${currentPage === "students" ? "active" : ""}" ${currentPage === "students" ? 'aria-current="page"' : ""} href="students.html">Students</a></li>
              <li class="nav-item"><a class="nav-link nav-link--cta" href="homepage.html#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="container footer-content">
        <div>
          <p class="site-footer__title">Sabya Mishra</p>
          <p>Professor, Department of Civil Engineering</p>
          <p>University of Memphis</p>
        </div>
        <div class="footer-links" aria-label="Footer links">
          <a href="homepage.html">Home</a>
          <a href="Journals.html">Publications</a>
          <a href="research.html">Research</a>
          <a href="teaching.html">Teaching</a>
          <a href="students.html">Students</a>
        </div>
      </div>
    </footer>`;

  const headerTarget = document.getElementById("site-header");
  const footerTarget = document.getElementById("site-footer");
  if (headerTarget) headerTarget.innerHTML = nav;
  if (footerTarget) footerTarget.innerHTML = footer;

  document.querySelectorAll("img").forEach((img) => {
    if (!img.getAttribute("loading")) img.loading = "lazy";
    if (!img.getAttribute("decoding")) img.decoding = "async";
    const alt = (img.getAttribute("alt") || "").trim();
    if (!alt) {
      const container = img.closest(".research-container, .student-profile-container, .course-card, .profile-card");
      const heading = container?.querySelector("h2, h3, h4");
      if (heading) {
        img.alt = `${heading.textContent.trim()} image`;
      }
    }
  });

  const searchBar = document.getElementById("searchBar");
  const yearFilter = document.getElementById("yearFilter");
  if (searchBar || yearFilter) {
    const projects = [...document.querySelectorAll(".research-container")];
    const runFilter = () => {
      const query = (searchBar?.value || "").toLowerCase().trim();
      const selectedYear = yearFilter?.value || "";
      let visibleCount = 0;
      projects.forEach((project) => {
        const text = project.innerText.toLowerCase();
        const year = project.dataset.year || "";
        const matchesText = !query || text.includes(query);
        const matchesYear = !selectedYear || year === selectedYear;
        const show = matchesText && matchesYear;
        project.hidden = !show;
        if (show) visibleCount += 1;
      });
      const countTarget = document.getElementById("resultsCount");
      if (countTarget) {
        countTarget.textContent = `${visibleCount} project${visibleCount === 1 ? "" : "s"} shown`;
      }
    };
    searchBar?.addEventListener("input", runFilter);
    yearFilter?.addEventListener("change", runFilter);
    runFilter();
  }

  const sourceList = document.getElementById("publication-archive");
  const groupsTarget = document.getElementById("publication-groups");
  if (sourceList && groupsTarget) {
    const items = [...sourceList.querySelectorAll(":scope > li")];
    const groups = new Map();
    const yearPattern = /(20\d{2}|19\d{2})/;

    items.forEach((item, index) => {
      const raw = item.textContent.replace(/\s+/g, " ").trim();
      const yearMatch = raw.match(yearPattern);
      const year = yearMatch ? yearMatch[1] : "Archive";
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push({ index, html: item.innerHTML });
    });

    [...groups.keys()]
      .sort((a, b) => {
        if (a === "Archive") return 1;
        if (b === "Archive") return -1;
        return Number(b) - Number(a);
      })
      .forEach((year) => {
        const section = document.createElement("section");
        section.className = "publication-year-group";

        const heading = document.createElement("h3");
        heading.className = "publication-year-heading";
        heading.textContent = year;
        section.appendChild(heading);

        groups.get(year).forEach((entry) => {
          const article = document.createElement("article");
          article.className = "publication-item";
          article.innerHTML = `
            <div class="publication-item__header">
              <span class="archive-number">${entry.index + 1}</span>
              <h4>Journal publication</h4>
            </div>
            <div class="publication-item__content">${entry.html}</div>`;
          section.appendChild(article);
        });

        groupsTarget.appendChild(section);
      });

    sourceList.hidden = true;
  }
})();
