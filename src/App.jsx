import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const JSON_URL = "https://www.reddit.com/r/reactjs.json";
    const fetchData = async () => {
      try {
        const response = await fetch(JSON_URL);
        const jsonData = await response.json();
        setData(jsonData.data.children);
        console.log(jsonData.data.children); // Logging the updated data
      } catch (e) {
        console.log(e.message);
      } finally {
        console.log("Fetch process completed!");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>ContenTerra | JSON Challenge</h1>
      <div className="card_container">
        {data &&
          data.map((item, index) => (
            <div className="cards" key={index}>
              {/* TITLE */}
              <div className="title">Title: {item.data.title}</div>

              {/* URL */}
              <div>
                <span>URL: </span>
                <a
                  href={item.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click to redirect URL
                </a>
              </div>

              {/* SCORE */}
              <div>
                Score:{" "}
                <span style={{ color: "orange" }}>{item.data.score}</span>
              </div>

              {/* SELF TEXT HTML */}
              {item.data.selftext_html ? ( // Check if selftext_html exists
                <div>
                  Self Text HTML:
                  <div
                    style={{ color: "gray" }}
                    dangerouslySetInnerHTML={{
                      __html: item.data.selftext_html,
                    }}
                  />
                </div>
              ) : (
                <div>NO SELF TEXT HTML</div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
