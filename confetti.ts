import confetti from "canvas-confetti";

export function fireConfetti() {
  const colors = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"];
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
    colors,
  });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  }, 250);
}

export function fireSmallBurst() {
  confetti({
    particleCount: 30,
    spread: 60,
    startVelocity: 25,
    origin: { y: 0.7 },
    colors: ["#8b5cf6", "#ec4899", "#f59e0b"],
  });
}
