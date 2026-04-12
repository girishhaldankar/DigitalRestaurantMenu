import React from "react";
import { useMenu } from "../hooks/useMenu";

/* ================= SETTINGS ================= */

const MAX_ITEMS_PER_COLUMN = 16;
const COLUMNS_PER_PAGE = 3;

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
          key={item.id || i}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2px",
          }}
        >
          {/* Veg / NonVeg */}
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: item.isVeg ? "#22c55e" : "#ef4444",
              marginRight: "6px",
            }}
          />

          {/* NAME */}
          <span style={{ fontSize: "8.5pt", color: "#e5e7eb", flex: 1 }}>
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
              color: "#facc15",
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
      {/* BACKGROUND */}
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
          borderRadius: "14mm",
          padding: "8mm",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "8mm" }}>
          <h1
            style={{
              fontSize: pageIndex === 0 ? "18pt" : "14pt",
              fontWeight: 900,
              margin: 0,
              letterSpacing: "3px",
              background: "linear-gradient(90deg, #4fd1c5, #2c7a7b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CIBO
          </h1>

          <h2
            style={{
              fontSize: pageIndex === 0 ? "12pt" : "10pt",
              marginTop: "-10px",
              fontFamily: "'Allura', cursive",
              color: "#fff",
            }}
          >
            Kitchen
          </h2>

          {pageIndex === 0 && (
            <p
              style={{
                fontSize: "7pt",
                color: "#e5e7eb",
                marginTop: "4px",
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
  const { menuItems, categories } = useMenu();

  if (!menuItems.length || !categories.length) {
    return <div>Loading...</div>;
  }

  // GROUP MENU (Firebase-based)
  const groupedMenu = categories
    .filter((cat) => cat.value !== "All")
    .map((cat) => ({
      title: cat.label,
      items: menuItems.filter((item) => item.category === cat.value),
    }))
    .filter((section) => section.items.length > 0);

  // BUILD COLUMNS
  const createColumns = () => {
    const columns: any[] = [];
    let currentColumn: any[] = [];
    let count = 0;

    groupedMenu.forEach((section) => {
      const size = section.items.length + 1;

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

  // BUILD PAGES
  const createPages = () => {
    const cols = createColumns();
    const pages: any[] = [];

    for (let i = 0; i < cols.length; i += COLUMNS_PER_PAGE) {
      pages.push(cols.slice(i, i + COLUMNS_PER_PAGE));
    }

    return pages;
  };

  const pages = createPages();

  return (
    <div ref={ref}>
      {pages.map((page, i) => (
        <Page key={i} columns={page} pageIndex={i} />
      ))}
    </div>
  );
});

MenuPDF.displayName = "MenuPDF";