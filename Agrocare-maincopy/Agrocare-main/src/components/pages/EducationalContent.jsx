import React from 'react';

const EducationalContent = ({ isDarkMode }) => {
  const bgClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const cardClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const accentClass = 'text-emerald-400';

  const topics = [
    {
      title: '🌾 Best Wheat Cultivation Practices',
      image: 'https://images.unsplash.com/photo-1581092335366-1f3a8f1f8c2c',
      desc: `Wheat is one of the most important cereal crops in India. 
      To achieve maximum yield, farmers should focus on timely sowing, 
      high-quality certified seeds, balanced fertilizer application, and 
      regular irrigation at critical stages. Integrated pest management 
      (IPM) helps protect crops from rust and aphid attacks without 
      excessive pesticide use.`,
      link: 'https://agricoop.gov.in/sites/default/files/wheat_guidelines.pdf',
      linkText: 'View Official Wheat Cultivation Guide',
    },
    {
      title: '🌿 Organic Farming Basics',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      desc: `Organic farming is a sustainable method that avoids synthetic fertilizers 
      and pesticides. Instead, it focuses on composting, crop rotation, and 
      using natural manure to maintain soil health. Organic techniques not only 
      improve biodiversity but also help in producing chemical-free food, 
      enhancing long-term productivity.`,
      link: 'https://ncof.dacnet.nic.in/Organic_Farming.aspx',
      linkText: 'Learn More from National Centre of Organic Farming',
    },
    {
      title: '🚜 Agri-Tech Innovations',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
      desc: `Technology is revolutionizing agriculture through drones, IoT-based sensors, 
      and artificial intelligence. These tools help in real-time crop monitoring, 
      smart irrigation, and predictive yield analysis. Startups are building 
      solutions to help farmers increase efficiency and sustainability with data-driven decisions.`,
      link: 'https://www.digitalgreen.org/',
      linkText: 'Explore Agri-Tech Solutions',
    },
  ];

  return (
    <main className={`min-h-screen py-12 px-6 md:px-16 ${bgClass}`}>
      <section className="max-w-6xl mx-auto text-center mb-12">
        <h1 className={`text-4xl font-bold mb-4 ${accentClass}`}>
          📚 Educational Content
        </h1>
        <p className="text-lg text-gray-400">
          Explore modern techniques, sustainable practices, and the latest innovations 
          transforming Indian agriculture. Learn from reliable sources and take your 
          farming journey to the next level.
        </p>
      </section>

      <div className="space-y-16">
        {topics.map((topic) => (
          <article
            key={topic.title}
            className={`flex flex-col md:flex-row items-center gap-8 rounded-2xl shadow-lg overflow-hidden border border-emerald-400/20 ${cardClass}`}
          >
            {/* Image Section */}
            <img
              src={topic.image}
              alt={topic.title}
              className="w-full md:w-1/2 h-64 object-cover"
            />

            {/* Text Section */}
            <div className="p-6 md:w-1/2 text-left">
              <h2 className="text-2xl font-semibold mb-3">{topic.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-4">{topic.desc}</p>
              <a
                href={topic.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition"
              >
                {topic.linkText}
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default EducationalContent;
