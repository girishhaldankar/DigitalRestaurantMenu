import React from "react";
import { ChefHat } from "lucide-react";
import { menuItems, categories } from "../data/menuData";

/* ================= GROUP DATA ================= */

const groupedMenu = categories
  .filter((cat) => cat !== "All")
  .map((category) => ({
    title: category,
    items: menuItems.filter((item) => item.category === category),
  }))
  .filter((section) => section.items.length > 0);

/* ================= SETTINGS ================= */

const MAX_ITEMS_PER_COLUMN = 16;
const COLUMNS_PER_PAGE = 3;

/* ================= BUILD COLUMNS ================= */

const createColumns = () => {
  const columns: any[] = [];

  let currentColumn: any[] = [];
  let count = 0;

  groupedMenu.forEach((section) => {
    const size = section.items.length + 1;

    if (size > MAX_ITEMS_PER_COLUMN) {
      let chunk: any[] = [];

      section.items.forEach((item: any) => {
        if (chunk.length >= MAX_ITEMS_PER_COLUMN - 1) {
          columns.push([{ title: section.title, items: chunk }]);
          chunk = [];
        }
        chunk.push(item);
      });

      if (chunk.length) {
        columns.push([{ title: section.title, items: chunk }]);
      }

      return;
    }

    if (count + size > MAX_ITEMS_PER_COLUMN) {
      columns.push(currentColumn);
      currentColumn = [];
      count = 0;
    }

    currentColumn.push(section);
    count += size;
  });

  if (currentColumn.length) columns.push(currentColumn);

  return columns;
};

/* ================= BUILD PAGES ================= */

const createPages = () => {
  const cols = createColumns();
  const pages: any[] = [];

  for (let i = 0; i < cols.length; i += COLUMNS_PER_PAGE) {
    pages.push(cols.slice(i, i + COLUMNS_PER_PAGE));
  }

  return pages;
};

const pages = createPages();

/* ================= MENU SECTION ================= */

const MenuSection = ({ section }: any) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      {/* TITLE */}
      <div
        style={{
          marginBottom: "4px",
          paddingBottom: "3px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "11pt",
            fontWeight: 700,
            color: "#5eead4",
            margin: 0,
            letterSpacing: "1px",
          }}
        >
          {section.title.toUpperCase()}
        </h2>
      </div>

      {/* ITEMS */}
      {section.items.map((item: any, i: number) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2px",
          }}
        >
          {/* Veg/NonVeg Dot */}
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: item.isVeg ? "#22c55e" : "#ef4444",
              marginRight: "6px",
              flexShrink: 0,
            }}
          />

          {/* NAME */}
          <span
            style={{
              fontSize: "8.5pt",
              color: "#e5e7eb",
              flex: 1,
            }}
          >
            {item.name}
          </span>

          {/* LINE */}
          <div
            style={{
              flex: 1,
              borderBottom: "1px dotted rgba(255,255,255,0.15)",
              margin: "0 6px",
            }}
          />

          {/* PRICE */}
          <span
            style={{
              fontSize: "8.5pt",
              fontWeight: 600,
              color: "#facc15", // gold tone
              minWidth: "55px",
              textAlign: "right",
            }}
          >
            {item.price
              ? `₹${item.price}`
              : item.priceHalf && item.priceFull
              ? `₹${item.priceHalf}/${item.priceFull}`
              : item.priceHalf
              ? `₹${item.priceHalf}`
              : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ================= PAGE ================= */

const Page = ({ columns, pageIndex }: any) => {
  return (
    <div
      style={{
        width: "297mm",
        height: "210mm",
        background: "#021a1a",
        padding: "12mm",
        boxSizing: "border-box",
        pageBreakAfter: "always",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* SUBTLE BG */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/food-bg.jpg')",
          backgroundSize: "cover",
          opacity: 0.15,
          filter: "blur(4px)",
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14mm",
          padding: "8mm",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
      {/* TEXT BLOCK */}
<div
  style={{
    display: "flex",
    flexDirection: "column",
    lineHeight: 1,
    alignItems: "center",   // ✅ THIS FIXES CENTERING
  }}
>
  {/* CIBO */}
  <h1
    style={{
      fontSize: pageIndex === 0 ? "18pt" : "14pt",
      fontWeight: 900,
      letterSpacing: "3px",
      margin: 0,
      textAlign: "center",  // ✅ optional (extra safe)
      background: "linear-gradient(90deg, #4fd1c5, #2c7a7b)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    CIBO
  </h1>

  {/* Kitchen */}
  <h2
    style={{
      fontSize: pageIndex === 0 ? "12pt" : "10pt",
      margin: "-18px 0 0 0",
      fontFamily: "'Allura', cursive",
      color: "#ffffff",
      textAlign: "center",   // ✅ centers under CIBO
    }}
  >
    Kitchen
  </h2>

  {/* TAGLINE */}
  {pageIndex === 0 && (
  <p
    style={{
      marginTop: "4px",
      padding: "4px 8px 2px 8px",
      fontSize: "7pt",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#e5e7eb",

      background: "rgba(20, 184, 166, 0.4)",   // teal glass effect
      backdropFilter: "blur(6px)",              // glass blur
      borderRadius: "999px",                    // pill shape

      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      textAlign: "center",
      display: "inline-block",
    }}
  >
    Yummy Food
  </p>
)}
</div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "6mm",
            flex: 1,
          }}
        >
          {columns.map((col: any, i: number) => (
            <div key={i}>
              {col.map((section: any, j: number) => (
                <MenuSection key={j} section={section} />
              ))}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div
          style={{
            textAlign: "center",
            fontSize: "8pt",
            color: "#6b7280",
            marginTop: "3mm",
          }}
        >
          Page {pageIndex + 1}
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN ================= */

export const MenuPDF = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref}>
      {pages.map((page, i) => (
        <Page key={i} columns={page} pageIndex={i} />
      ))}
    </div>
  );
});

MenuPDF.displayName = "MenuPDF";