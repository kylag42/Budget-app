import cow from "@/assets/cow_mascot.png"
import coin from "@/assets/coin_icon.png"

const icons = [coin, cow]

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {Array.from({ length: 20 }).map((_, i) => {
        const icon = icons[i % icons.length]

        return (
          <img
            key={i}
            src={icon}
            alt="floating icon"
            className="absolute float-down opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 800}px`,
              width: `${40 + Math.random() * 40}px`,
              animationDuration: `${18 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        )
      })}
    </div>
  )
}