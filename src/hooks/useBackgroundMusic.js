import { useEffect, useRef, useState } from 'react';

export default function useBackgroundMusic(src, { volume = 0.35 } = {}) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;
        audio.preload = 'auto';
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [src, volume]);

    // Try autoplay on mount (browsers may block)
    useEffect(() => {
        const tryAutoplay = async () => {
            if (!audioRef.current) return;
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                setStarted(true);
            } catch {
                // Autoplay blocked — wait for first user interaction
                const onFirstInteraction = async () => {
                    try {
                        await audioRef.current?.play();
                        setIsPlaying(true);
                        setStarted(true);
                    } catch { }
                    window.removeEventListener('pointerdown', onFirstInteraction);
                    window.removeEventListener('keydown', onFirstInteraction);
                };
                window.addEventListener('pointerdown', onFirstInteraction, { once: true });
                window.addEventListener('keydown', onFirstInteraction, { once: true });
            }
        };
        tryAutoplay();
    }, []);

    const toggle = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    };

    return { isPlaying, started, toggle };
}