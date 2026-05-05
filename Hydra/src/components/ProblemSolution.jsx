import React from 'react';
import './ProblemSolution.css';
import Pic1 from '../assets/images/products.png';
import Need from '../assets/images/Need.jpg';
import Solution from '../assets/images/Solution.png';
const ProblemSolution = () => {
  const sections = [
    {
      title: " You’re Not Just Tired — You’re Likely Dehydrated",
      text: "In hot climates, your body loses fluids constantly through heat, movement, and long daily commutes.What feels like normal tiredness, low focus, or lack of energy is often your body signaling mild dehydration.Because it builds up gradually, most people don’t recognize it—they just accept feeling drained as part of everyday life.",
      image: Need,
      reverse: false,
    },
    {
      title: "Most Drinks Make Hydration Worse, Not Better.",
      text: "When you reach for a quick refreshment, the options are often loaded with sugar, artificial colours, and unnecessary additives.These drinks may give a short burst of energy, but they don’t truly hydrate your body—and can even leave you feeling more fatigued later.Instead of solving the problem, they mask it.",
      image: Pic1,
      reverse: true,
    },
    {
      title: "HYDRA — Built for Everyday Hydration in the Heat",
      text: "HYDRA is a clean, low-sugar electrolyte drink designed specifically for daily life in hot climates.It provides a balanced and transparent blend of electrolytes that supports your body’s natural fluid needs—without excess sugar or artificial additives.Unlike traditional hydration products, HYDRA is made for consistent, everyday use, helping you stay physically refreshed, mentally clear, and in control of your energy from morning to evening.",
      image: Solution,
      reverse: false,
    }
  ];

  return (
    <div className="page-container" id="problem-solution">
      <header className="page-header">
        <h1>Health is a process.</h1>
        <p>Hydra Co-Founder Sharon shares the health journey that sparked a Refreshement Rebellion.</p>
      </header>

      <main className="content-stack">
        {sections.map((section, index) => (
          <section key={index} className={`feature-row ${section.reverse ? 'row-reverse' : ''}`}>
            <div className="text-content">
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
            <div className="image-content">
              <img src={section.image} alt={section.title} />
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default ProblemSolution;