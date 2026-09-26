import confetti from 'canvas-confetti';

export function burstLoveConfetti() {
    const colors = ['#ff5f9e', '#d946ef', '#c4b5fd', '#f0abfc', '#ffffff'];

    // Big center burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors,
        scalar: 1.1,
    });

    // Side cannons
    setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0 }, colors });
        confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1 }, colors });
    }, 220);

    // Gentle heart-shaped drizzle
    setTimeout(() => {
        confetti({
            particleCount: 40,
            spread: 140,
            startVelocity: 25,
            gravity: 0.5,
            origin: { y: 0.4 },
            colors,
            shapes: ['circle'],
            scalar: 0.9,
        });
    }, 500);
}