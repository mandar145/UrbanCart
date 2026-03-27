export default function Logo({ inverted = false }) {
  const ink = inverted ? "#FFFFFF" : "#0F0F0F";
  const fill = inverted ? "#FFFFFF" : "#0F0F0F";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", userSelect: "none" }}>
      {/* Shopping bag icon */}
      <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Bag body */}
        <rect x="1.5" y="11" width="27" height="21" rx="3" stroke={ink} strokeWidth="2.2" fill="none" />
        {/* Left handle arc */}
        <path d="M9 11 C9 6 11 2.5 15 2.5 C19 2.5 21 6 21 11" stroke={ink} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        {/* Lock dot */}
        <circle cx="15" cy="22" r="2.2" fill={fill} />
        {/* Small horizontal bar on lock */}
        <rect x="12.5" y="21" width="5" height="2" rx="1" fill={inverted ? "#0F0F0F" : "#FFFFFF"} />
      </svg>

      {/* Wordmark */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: "1px" }}>
        <span style={{
          color: ink,
          fontSize: "11px",
          fontWeight: "400",
          letterSpacing: "0.28em",
          fontFamily: "'Roboto Slab', serif",
          textTransform: "uppercase",
        }}>Urban</span>
        <span style={{
          color: ink,
          fontSize: "17px",
          fontWeight: "900",
          letterSpacing: "0.14em",
          fontFamily: "'Roboto Slab', serif",
          textTransform: "uppercase",
          marginTop: "-1px",
        }}>Cart</span>
      </div>
    </div>
  );
}
