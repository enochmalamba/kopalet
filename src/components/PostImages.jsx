import { useState, useRef, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./PostImages.css";

// -- Icons ---------------------------------------------------------------

const IconChevronLeft = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconChevronRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconFile = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const IconDownload = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconBrokenImage = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="3" x2="21" y2="21" />
  </svg>
);

// -- Helpers -------------------------------------------------------------

const CAROUSEL_HEIGHT = 400;
const SINGLE_MAX_HEIGHT = 560;

function formatBytes(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getMimeLabel(mimeType) {
  if (!mimeType) return "File";
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("word") || mimeType.includes("docx")) return "Word";
  if (
    mimeType.includes("excel") ||
    mimeType.includes("xlsx") ||
    mimeType.includes("spreadsheet")
  )
    return "Excel";
  if (
    mimeType.includes("powerpoint") ||
    mimeType.includes("pptx") ||
    mimeType.includes("presentation")
  )
    return "PPT";
  if (mimeType.includes("zip") || mimeType.includes("rar")) return "Archive";
  if (mimeType.includes("text")) return "Text";
  return "File";
}

// -- ImageSkeleton -------------------------------------------------------

function ImageSkeleton({ dominantColor, style }) {
  return (
    <div
      className="pi-skeleton"
      style={{
        ...style,
        backgroundColor: dominantColor || "var(--surface-alt)",
      }}
    >
      <div className="pi-shimmer" />
    </div>
  );
}

// -- SingleImage ---------------------------------------------------------

function SingleImage({ attachment, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { url, width, height, dominant_color, alt } = attachment;

  const containerStyle = {
    width: width && height ? `min(100%, ${width}px)` : "100%",
    aspectRatio: width && height ? `${width} / ${height}` : "16 / 9",
    maxHeight: `${SINGLE_MAX_HEIGHT}px`,
    backgroundColor: dominant_color || "var(--surface-alt)",
  };

  return (
    <div
      className="pi-single"
      style={containerStyle}
      onClick={!error ? onClick : undefined}
    >
      {!loaded && !error && (
        <ImageSkeleton
          dominantColor={dominant_color}
          style={{ position: "absolute", inset: 0, borderRadius: "inherit" }}
        />
      )}
      {error ? (
        <div className="pi-error">
          <IconBrokenImage />
          <span>Failed to load</span>
        </div>
      ) : (
        <img
          src={url}
          alt={alt || ""}
          className={`pi-single-img ${loaded ? "pi-img-visible" : "pi-img-hidden"}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          draggable={false}
        />
      )}
    </div>
  );
}

// -- CarouselItem --------------------------------------------------------

function CarouselItem({ attachment, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { url, width, height, dominant_color, alt } = attachment;

  const itemWidth =
    width && height
      ? `${(width / height) * CAROUSEL_HEIGHT}px`
      : `${CAROUSEL_HEIGHT}px`;

  return (
    <div
      className="pi-carousel-item"
      style={{
        width: itemWidth,
        height: `${CAROUSEL_HEIGHT}px`,
        backgroundColor: dominant_color || "var(--surface-alt)",
      }}
      onClick={!error ? onClick : undefined}
    >
      {!loaded && !error && (
        <ImageSkeleton
          dominantColor={dominant_color}
          style={{ position: "absolute", inset: 0, borderRadius: "inherit" }}
        />
      )}
      {error ? (
        <div className="pi-error">
          <IconBrokenImage />
        </div>
      ) : (
        <img
          src={url}
          alt={alt || ""}
          className={`pi-carousel-img ${loaded ? "pi-img-visible" : "pi-img-hidden"}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          draggable={false}
        />
      )}
    </div>
  );
}

// -- DocumentCard --------------------------------------------------------

function DocumentCard({ attachment }) {
  const { url, file_name, mime_type, size_bytes } = attachment;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="pi-doc-card"
      download={file_name}
    >
      <div className="pi-doc-icon">
        <IconFile />
        <span className="pi-doc-label">{getMimeLabel(mime_type)}</span>
      </div>
      <div className="pi-doc-meta">
        <span className="pi-doc-name">{file_name || "Download file"}</span>
        {size_bytes && (
          <span className="pi-doc-size">{formatBytes(size_bytes)}</span>
        )}
      </div>
      <div className="pi-doc-download">
        <IconDownload />
      </div>
    </a>
  );
}

// -- Carousel ------------------------------------------------------------

function ImageCarousel({ images, onImageClick }) {
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(images.length <= 1);

  const getItemWidth = useCallback((img) => {
    return img.width && img.height
      ? (img.width / img.height) * CAROUSEL_HEIGHT
      : CAROUSEL_HEIGHT;
  }, []);

  const scrollToIndex = useCallback(
    (index) => {
      const el = trackRef.current;
      if (!el) return;
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += getItemWidth(images[i]) + 4; // 4px gap
      }
      el.scrollTo({ left: offset, behavior: "smooth" });
    },
    [images, getItemWidth],
  );

  const checkBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);

    // Update counter based on which image is most visible
    let offset = 0;
    for (let i = 0; i < images.length; i++) {
      const w = getItemWidth(images[i]) + 4;
      if (offset + w / 2 > el.scrollLeft) {
        setCurrentIndex(i);
        break;
      }
      offset += w;
    }
  }, [images, getItemWidth]);

  const scroll = useCallback(
    (dir) => {
      const next =
        dir === "left"
          ? Math.max(0, currentIndex - 1)
          : Math.min(images.length - 1, currentIndex + 1);
      setCurrentIndex(next);
      scrollToIndex(next);
    },
    [currentIndex, images.length, scrollToIndex],
  );

  return (
    <div className="pi-carousel-root">
      {images.length > 1 && (
        <div className="pi-counter">
          {currentIndex + 1}/{images.length}
        </div>
      )}

      <div className="pi-carousel-track" ref={trackRef} onScroll={checkBounds}>
        {images.map((img, i) => (
          <CarouselItem
            key={img.id ?? i}
            attachment={img}
            onClick={() => onImageClick(i)}
          />
        ))}
        {/* End spacer: makes the last image not fully scroll into view, preserving peek from the previous item */}
        <div className="pi-carousel-end-spacer" />
      </div>

      {!atStart && (
        <button
          className="pi-arrow pi-arrow-left"
          onClick={() => scroll("left")}
          aria-label="Previous"
        >
          <IconChevronLeft />
        </button>
      )}
      {!atEnd && (
        <button
          className="pi-arrow pi-arrow-right"
          onClick={() => scroll("right")}
          aria-label="Next"
        >
          <IconChevronRight />
        </button>
      )}
    </div>
  );
}

// -- PostImages (main export) --------------------------------------------

export default function PostImages({ attachments = [] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!attachments.length) return null;

  const images = attachments.filter((a) => a.type === "image");
  const documents = attachments.filter((a) => a.type === "document");

  const lightboxSlides = images.map((img) => ({
    src: img.url,
    width: img.width,
    height: img.height,
    alt: img.alt || "",
  }));

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pi-root">
      {images.length === 1 && (
        <SingleImage attachment={images[0]} onClick={() => openLightbox(0)} />
      )}
      {images.length > 1 && (
        <ImageCarousel images={images} onImageClick={openLightbox} />
      )}
      {documents.length > 0 && (
        <div className="pi-documents">
          {documents.map((doc, i) => (
            <DocumentCard key={doc.id ?? i} attachment={doc} />
          ))}
        </div>
      )}
      {lightboxSlides.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={lightboxIndex}
        />
      )}
    </div>
  );
}
