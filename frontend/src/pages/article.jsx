import React from "react";

const AIImpactArticle = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        The Hidden Cost of AI: How Artificial Intelligence is Straining the Planet
      </h1>
      <p className="text-gray-600 mb-4">
        Artificial intelligence isn’t just transforming the digital world—it’s reshaping the physical one, with a growing environmental toll. Each AI-generated response, image, or video relies on massive data centers, which collectively consume <strong>2–3% of global electricity</strong> and contribute as much carbon pollution as the airline industry.
      </p>
      <p className="text-gray-600 mb-4">
        The scale of this impact is staggering. A single AI model, trained once, can emit as much carbon as <strong>five cars over their lifetimes</strong>. Running a chatbot like ChatGPT requires real-time computing power, drawing from energy-hungry GPUs housed in data centers that demand constant cooling. The water consumption alone is immense: <strong>Google’s AI operations used 5.6 billion gallons of water in 2022</strong>, enough to sustain a small city.
      </p>
      <p className="text-gray-600 mb-4">
        As AI adoption skyrockets, so does its footprint. By 2026, global AI electricity demand could surpass countries like Argentina or the Netherlands. Some cloud providers are pivoting to renewable energy, but many still rely on fossil fuels, intensifying emissions.
      </p>
      <p className="text-gray-600 mb-4">
        Efficiency offers a path forward. Smarter AI usage—fewer redundant queries, better prompt engineering, and low-power model deployment—can cut waste. Companies investing in greener data centers, like Google’s push for <strong>24/7 carbon-free AI by 2030</strong>, signal progress. But unless AI development prioritizes sustainability, its environmental cost will only rise.
      </p>
      <p className="text-gray-600 font-semibold">
        AI is revolutionizing industries, but at what cost? Without urgent action, its energy appetite could outpace its benefits, accelerating the climate crisis it’s being trained to solve.
      </p>
    </div>
  );
};

export default AIImpactArticle;