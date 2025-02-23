// article.jsx
import React from "react";
import "./articles.css";

// Import all your monkey images (adjust paths if needed)
import peanutMonkey from "./peanutmonkey-removebg-preview.png";
import bananaMonkey from "./monkeybanana-removebg-preview.png";
import confusedMonkey from "./confusedmonkey-removebg-preview.png";
import momAndBabyMonkey from "./momandbabymonkey-removebg-preview.png";
import eatingBananaMonkey from "./eatingbananamonkey-removebg-preview.png";
import screenshotMonkey from "./Screenshot_2025-02-23_at_2.53.30_PM-removebg-preview.png";
import happyMonkey from "./HAPPYMONKEY.gif"; // The swinging GIF

const AIImpactArticle = () => {
  return (
    <div className="page-container">
      {/* Title Section */}
      <h1 className="main-title">
        The Hidden Cost of AI: How Artificial Intelligence is Straining the Planet
      </h1>

      {/* Hexagon Layout */}
      <div className="hexagon-layout">
        <div className="hexagon-container">
          {/* Hex 1 */}
          <div className="hexagon-section hex1">
            <img
              src={peanutMonkey}
              alt="Peanut Monkey"
              /* Changed width to 200px for a bigger image */
              style={{ width: "150px", marginBottom: "0.75rem" }}
            />
            <div className="icon">⚡</div>
            <h2>Energy Consumption</h2>
            <p>
              AI data centers consume <strong>2-3% of global electricity</strong>,<br />
              contributing significantly to carbon emissions.
            </p>
          </div>

          {/* Hex 2 */}
          <div className="hexagon-section hex2">
            <img
              src={bananaMonkey}
              alt="Banana Monkey"
              style={{ width: "150px", marginBottom: "0.75rem" }}
            />
            <div className="icon">💧</div>
            <h2>Water Usage</h2>
            <p>
              AI operations used <strong>5.6 billion gallons</strong> of water in 2022,<br />
              equivalent to sustaining a small city.
            </p>
          </div>

          {/* Hex 3 */}
          <div className="hexagon-section hex3">
            <img
              src={confusedMonkey}
              alt="Confused Monkey"
              style={{ width: "150px", marginBottom: "0.75rem" }}
            />
            <div className="icon">🌍</div>
            <h2>Carbon Footprint</h2>
            <p>
              A single AI model can emit as much carbon as<br />
              <strong>five cars over their lifetimes</strong>.
            </p>
          </div>

          {/* "main" Hex (GIF in center) */}
          <div className="hexagon-section main">
            <img
              src={happyMonkey}
              alt="Happy Swinging Monkey GIF"
              style={{ width: "150px", marginBottom: "0.75rem" }}
            />
            <div className="icon">🌱</div>
            <h1>Our Solution</h1>
            <p>
              We aim to make AI greener with sustainable models,<br />
              efficient energy use, and optimized queries.
            </p>
          </div>

          {/* Hex 4 */}
          <div className="hexagon-section hex4">
            <img
              src={momAndBabyMonkey}
              alt="Mom and Baby Monkey"
              style={{ width: "150px", marginBottom: "0.75rem" }}
            />
            <div className="icon">🌞</div>
            <h2>Renewable Energy</h2>
            <p>
              Companies like Google aim for <strong>24/7 carbon-free AI by 2030</strong>,<br />
              pushing sustainability efforts.
            </p>
          </div>

          {/* Hex 5 */}
          <div className="hexagon-section hex5">
            <img
              src={eatingBananaMonkey}
              alt="Eating Banana Monkey"
              style={{ width: "100px", marginBottom: "0.75rem" }}
            />
            <div className="icon">🔋</div>
            <h2>Efficiency Solutions</h2>
            <p>
              Smarter AI usage, fewer redundant queries, and<br />
              low-power model deployment can cut waste.
            </p>
          </div>

          {/* Hex 6 */}
          <div className="hexagon-section hex6">
            <img
              src={screenshotMonkey}
              alt="Screenshot Monkey"
              style={{ width: "150px", marginBottom: "0.75rem" }}
            />
            <div className="icon">📊</div>
            <h2>Future Impact</h2>
            <p>
              By 2026, AI electricity demand could surpass<br />
              countries like Argentina or the Netherlands.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImpactArticle;
