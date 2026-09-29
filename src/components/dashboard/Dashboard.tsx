import { useNavigate } from "react-router";
import { PlusIcon } from "../icons/PlusIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import "./Dashboard.css";

export function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="top-bar"
        style={{
          margin: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Design Repository</h2>
        <div className="settings-icon">
          <SettingsIcon />
        </div>
      </div>
      <div className="recents" style={{ margin: "2rem" }}>
        <h3>Recent designs</h3>
        <div
          className="recent-designs-list"
          style={{
            scrollbarColor: "var(--secondary) transparent",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "16px",
            marginTop: "8px",
            paddingBlock: "8px",
            paddingRight: "8px",
            flexDirection: "row",
          }}
        >
          <div
            className="add-new-design"
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              height: "auto",
              width: "auto",
              backgroundColor: "hsl(from var(--secondary) h s l)",
              borderRadius: "16px",
              ...({ cornerShape: "squircle" } as React.CSSProperties),
            }}
            onClick={() => navigate("/edit")}
          >
            <div style={{ height: "64px", width: "64px", margin: "auto" }}>
              <PlusIcon />
            </div>
            <div
              className="design-name"
              style={{ padding: "16px", paddingTop: "0" }}
            >
              <h4>Add new design</h4>
            </div>
          </div>
          {Array(3)
            .fill(0)
            .map(() => (
              <div
                className="design"
                style={{
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                  width: "auto",
                  backgroundColor: "hsla(from var(--primary) h s l / 5%)",
                  borderRadius: "16px",
                  ...({ cornerShape: "squircle" } as React.CSSProperties),
                }}
              >
                <img
                  src="/image.png"
                  style={{
                    padding: "16px",
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "32px",
                    ...({ cornerShape: "squircle" } as React.CSSProperties),
                  }}
                />
                <div
                  className="design-name"
                  style={{ padding: "16px", paddingTop: "0" }}
                >
                  <h4>Design</h4>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="all-designs" style={{ margin: "32px" }}>
        <h3>All Designs</h3>
        <div
          className="recent-designs-list"
          style={{
            scrollbarColor: "var(--secondary) transparent",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "16px",
            marginTop: "8px",
            paddingBlock: "8px",
            paddingRight: "8px",
            flexDirection: "row",
          }}
        >
          {Array(10)
            .fill(0)
            .map(() => (
              <div
                className="design"
                style={{
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "auto",
                  width: "auto",
                  backgroundColor: "hsla(from var(--primary) h s l / 5%)",
                  borderRadius: "16px",
                  ...({ cornerShape: "squircle" } as React.CSSProperties),
                }}
              >
                <img
                  src="/image.png"
                  style={{
                    padding: "16px",
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "32px",
                    ...({ cornerShape: "squircle" } as React.CSSProperties),
                  }}
                />
                <div
                  className="design-name"
                  style={{ padding: "16px", paddingTop: "0" }}
                >
                  <h4>Design</h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
