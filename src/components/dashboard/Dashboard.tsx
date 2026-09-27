export function Dashboard() {
  return (
      <div>
          <div className="top-bar" style={{margin: "0.5rem"}}>
            <h2>Design Repository</h2>   
          </div>
          <div className="recents" style={{margin: "0.5rem"}}>
            <h3>Recent designs</h3>
              <div className="recent-designs-list" style={{ display: "flex", overflowX: "auto" }}>
                  {Array(10).fill(0).map(() => (
                      <div className="design" style={{margin: "0.5rem"}}>
                          <h4>Design</h4>
                          <img src="/image.png" style={{ height: "50px", width: "50px", objectFit: "cover"}} />
                      </div>
                  ))}
                </div>
          </div>

      <div className="">
        <img />
      </div>
    </div>
  );
}