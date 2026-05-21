import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TitleHighlight({ children }) {
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const text = el.innerText;
    el.innerHTML = "";

    // Create word spans
    const words = text.split(" ");
    const wordSpans = [];

    words.forEach((word) => {
      const span = document.createElement("span");
      span.className = "word";
      span.innerText = word + " ";
      el.appendChild(span);
      wordSpans.push(span);
    });

    // Detect lines based on offsetTop
    let lines = [];
    let currentLine = [];
    let currentTop = null;

    wordSpans.forEach((word) => {
      const top = word.offsetTop;

      if (currentTop === null) currentTop = top;

      if (top !== currentTop) {
        lines.push(currentLine);
        currentLine = [];
        currentTop = top;
      }

      currentLine.push(word);
    });

    if (currentLine.length) lines.push(currentLine);

    // Wrap lines into <span class="line">
    el.innerHTML = "";

    lines.forEach((lineWords) => {
      const lineSpan = document.createElement("span");
      lineSpan.className = "line";

      lineWords.forEach((w) => lineSpan.appendChild(w));
      el.appendChild(lineSpan);
    });

    // Animate highlight width (marker effect)
    gsap.fromTo(
      el.querySelectorAll(".line"),
      { "--line-width": "0%" },
      {
        "--line-width": "100%",
        stagger: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom center",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <h2 ref={titleRef} className="sec-title title-highlight">
      {children}
    </h2>
  );
}
