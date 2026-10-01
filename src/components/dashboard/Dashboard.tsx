import { SettingsIcon } from "../icons/SettingsIcon";
import "./Dashboard.css";
import { Design } from "./design/Design";
import { AddDesignButton } from "./design/AddDesignBtn";

export function Dashboard() {
  return (
    <div>
      <div className="top-bar">
        <h2 className="dashboard-title">Design Repository</h2>
        <div className="settings-icon">
          <SettingsIcon />
        </div>
      </div>
      <div className="recents">
        <h3>Recent designs</h3>
        <div className="recent-designs-list">
          <AddDesignButton/>
          {Array(3)
            .fill(0)
            .map(() => (
              <Design/>
            ))}
        </div>
      </div>

      <div className="all-designs">
        <h3>All Designs</h3>
        <div className="recent-designs-list">
          {Array(10)
            .fill(0)
            .map(() => (
              <Design/>
            ))}
        </div>
      </div>
    </div>
  );
}
