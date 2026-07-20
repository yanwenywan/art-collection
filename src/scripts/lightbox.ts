const SELECTOR =
    ".sliding-gallery img, .image-grid-wrap figure img, .feature img";

let overlay: HTMLDivElement;
let lbImg: HTMLImageElement;
let lbCap: HTMLElement;

function ensureOverlay(): void {
    const existing = document.getElementById("lightbox") as HTMLDivElement | null;
    if (existing) {
        overlay = existing;
        lbImg = document.getElementById("lightbox-img") as HTMLImageElement;
        lbCap = document.getElementById("lightbox-caption") as HTMLElement;
        return;
    }

    overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.id = "lightbox";

    lbImg = document.createElement("img");
    lbImg.id = "lightbox-img";
    lbImg.src = "";
    lbImg.alt = "";

    lbCap = document.createElement("figcaption");
    lbCap.id = "lightbox-caption";

    overlay.append(lbImg, lbCap);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e: MouseEvent) => {
        if (e.target !== lbImg) overlay.classList.remove("active");
    });
    document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape") overlay.classList.remove("active");
    });
}

function open(img: HTMLImageElement): void {
    lbImg.src = img.src;
    lbImg.alt = img.alt;

    const caption =
        img.dataset.caption ??
        img.closest("figure")?.querySelector("figcaption")?.innerHTML ??
        "";
    lbCap.innerHTML = caption;
    lbCap.style.display = caption ? "" : "none";

    overlay.classList.add("active");
}

ensureOverlay();

document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const img = target?.closest<HTMLImageElement>(SELECTOR);
    if (img) open(img);
});
