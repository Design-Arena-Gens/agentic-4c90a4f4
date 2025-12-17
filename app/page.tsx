'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const socials = [
    { name: 'Discord', icon: '💬', url: '#', color: '#5865F2' },
    { name: 'Instagram', icon: '📷', url: '#', color: '#E4405F' },
    { name: 'YouTube', icon: '▶', url: '#', color: '#FF0000' },
    { name: 'Steam', icon: '🎮', url: '#', color: '#171a21' },
    { name: 'Spotify', icon: '🎵', url: '#', color: '#1DB954' },
  ]

  const games = ['VALORANT', 'APEX', 'ELDEN RING', 'GENSHIN']

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.vignette}></div>
        <div className={styles.grain}></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.smoke} style={{ left: `${20 + i * 30}%`, animationDelay: `${i * 8}s` }}></div>
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={styles.symbol}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {['⚔', '✦', '◆', '⬟', '❖'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div
        className={styles.cursorGlow}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>

      <div className={styles.card}>
        <div className={styles.cardInner}>
          <div className={styles.mainContent}>
            <h1 className={styles.gamerTag}>VOIDWALKER</h1>
            <p className={styles.quote}>"In darkness, we find our true selves"</p>

            <p className={styles.bio}>
              Nocturnal soul wanderer • aesthetic enthusiast<br/>
              lost in digital realms and pixel dreams
            </p>

            <div className={styles.games}>
              {games.map((game, i) => (
                <span key={i} className={styles.gameTag}>{game}</span>
              ))}
            </div>

            <div className={styles.socials}>
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  className={styles.socialIcon}
                  title={social.name}
                  style={{ '--hover-color': social.color } as any}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.audioPlayer}>
            <button onClick={togglePlay} className={styles.playButton}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className={styles.volumeSlider}
            />
            <span className={styles.volumeLabel}>🔊</span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} loop>
        <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" type="audio/wav" />
      </audio>
    </div>
  )
}
