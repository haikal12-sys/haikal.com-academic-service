// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
  }
})

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""
  element.style.borderRight = "3px solid #00FFFF"

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    } else {
      // Blinking cursor animation
      setInterval(() => {
        element.style.borderRight =
          element.style.borderRight === "3px solid transparent" ? "3px solid #00FFFF" : "3px solid transparent"
      }, 500)
    }
  }
  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const typingElement = document.querySelector(".typing-text")
  if (typingElement) {
    typeWriter(typingElement, "Muhammad Haikal", 150)
  }
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
window.addEventListener("load", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".about-card, .skill-category, .portfolio-card, .contact-form, .contact-card",
  )

  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Parallax effect for floating elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-element")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
  })
})

// Contact form handling
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    // Create WhatsApp message
    const whatsappMessage = `Halo Muhammad Haikal!%0A%0ANama: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0APesan:%0A${encodeURIComponent(message)}`

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/6281234567890?text=${whatsappMessage}`, "_blank")

    // Reset form
    this.reset()

    // Show success message
    showNotification("Pesan berhasil disiapkan! WhatsApp akan terbuka.", "success")
  })
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "rgba(0, 255, 0, 0.1)" : "rgba(0, 255, 255, 0.1)"};
        border: 1px solid ${type === "success" ? "#00FF00" : "#00FFFF"};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
    `

  document.body.appendChild(notification)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.remove()
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Add CSS for notification animation
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`
document.head.appendChild(style)

// Skill category hover effects
document.querySelectorAll(".skill-category").forEach((category) => {
  category.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  category.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Portfolio card click effects
document.querySelectorAll(".portfolio-card").forEach((card) => {
  card.addEventListener("click", function () {
    // Add a subtle click animation
    this.style.transform = "scale(0.98)"
    setTimeout(() => {
      this.style.transform = "translateY(-10px) scale(1)"
    }, 100)
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Add active link styles
const activeStyle = document.createElement("style")
activeStyle.textContent = `
    .nav-link.active {
        color: #00FFFF !important;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`
document.head.appendChild(activeStyle)

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Navbar background change
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
  }

  // Parallax effect
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-element")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`
  })
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Preload critical resources
window.addEventListener("load", () => {
  // Preload any images or resources that might be needed
  const preloadLinks = [
    // Add any external resources here if needed
  ]

  preloadLinks.forEach((href) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.href = href
    link.as = "image"
    document.head.appendChild(link)
  })
})

// Add loading animation for page transitions
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
})

// Video Portfolio Functionality
const portfolioVideo = document.getElementById("portfolioVideo")
const videoOverlay = document.getElementById("videoOverlay")
const playButton = document.getElementById("playButton")

if (portfolioVideo && videoOverlay && playButton) {
  // Handle play button click
  playButton.addEventListener("click", () => {
    portfolioVideo.play()
    videoOverlay.classList.add("hidden")
  })

  // Handle video click
  portfolioVideo.addEventListener("click", () => {
    if (portfolioVideo.paused) {
      portfolioVideo.play()
      videoOverlay.classList.add("hidden")
    } else {
      portfolioVideo.pause()
      videoOverlay.classList.remove("hidden")
    }
  })

  // Handle video pause
  portfolioVideo.addEventListener("pause", () => {
    videoOverlay.classList.remove("hidden")
  })

  // Handle video play
  portfolioVideo.addEventListener("play", () => {
    videoOverlay.classList.add("hidden")
  })

  // Handle video ended
  portfolioVideo.addEventListener("ended", () => {
    videoOverlay.classList.remove("hidden")
  })
}

// Video Portfolio Section Animation
const videoPortfolioSection = document.querySelector(".video-portfolio")
if (videoPortfolioSection) {
  observer.observe(videoPortfolioSection)
}

// Enhanced scroll animations for video section
const videoElements = document.querySelectorAll(".video-frame, .video-caption")
videoElements.forEach((el) => {
  el.classList.add("fade-in")
  observer.observe(el)
})

// Video loading optimization
window.addEventListener("load", () => {
  if (portfolioVideo) {
    // Preload video metadata
    portfolioVideo.preload = "metadata"

    // Add loading state
    portfolioVideo.addEventListener("loadstart", () => {
      console.log("Video loading started")
    })

    portfolioVideo.addEventListener("canplay", () => {
      console.log("Video ready to play")
    })

    portfolioVideo.addEventListener("error", (e) => {
      console.error("Video loading error:", e)
      // Fallback: show a message or alternative content
      const videoFrame = document.querySelector(".video-frame")
      if (videoFrame) {
        videoFrame.innerHTML = `
          <div style="padding: 60px; text-align: center; color: #cccccc;">
            <h3 style="color: #00ffff; margin-bottom: 20px;">Video Tidak Dapat Dimuat</h3>
            <p>Maaf, video portofolio tidak dapat dimuat saat ini.</p>
            <a href="https://drive.google.com/your-video-link" target="_blank" 
               style="display: inline-block; margin-top: 20px; padding: 12px 24px; 
                      background: linear-gradient(135deg, #00ffff, #1e90ff); 
                      color: #000000; text-decoration: none; border-radius: 25px; 
                      font-weight: 600;">
              Tonton Video Portofolio
            </a>
          </div>
        `
      }
    })
  }
})

// Smooth scroll to video section
function scrollToVideo() {
  const videoSection = document.getElementById("video-portfolio")
  if (videoSection) {
    videoSection.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }
}

// Add video section to navigation (optional)
// You can call scrollToVideo() from anywhere in your site

// Background Music Control
const backgroundMusic = document.getElementById("backgroundMusic")
const musicBtn = document.getElementById("musicBtn")
const musicIcon = document.getElementById("musicIcon")
let isPlaying = false

if (backgroundMusic && musicBtn && musicIcon) {
  // Set initial volume
  backgroundMusic.volume = 0.3

  // Music control button click handler
  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  })

  // Play music function
  function playMusic() {
    musicBtn.classList.add("loading")

    backgroundMusic
      .play()
      .then(() => {
        isPlaying = true
        musicIcon.textContent = "⏸"
        musicBtn.classList.remove("loading")
        musicBtn.classList.add("playing")
        showNotification("🎵 Background music started", "success")
      })
      .catch((error) => {
        console.error("Error playing music:", error)
        musicBtn.classList.remove("loading")
        showNotification("❌ Could not play music. Please try again.", "error")
      })
  }

  // Pause music function
  function pauseMusic() {
    backgroundMusic.pause()
    isPlaying = false
    musicIcon.textContent = "▶"
    musicBtn.classList.remove("playing")
    showNotification("🎵 Background music paused", "info")
  }

  // Handle music ended (if not looped)
  backgroundMusic.addEventListener("ended", () => {
    isPlaying = false
    musicIcon.textContent = "▶"
    musicBtn.classList.remove("playing")
  })

  // Handle music loading
  backgroundMusic.addEventListener("loadstart", () => {
    console.log("Music loading started")
  })

  backgroundMusic.addEventListener("canplay", () => {
    console.log("Music ready to play")
  })

  backgroundMusic.addEventListener("error", (e) => {
    console.error("Music loading error:", e)
    musicBtn.classList.remove("loading")
    showNotification("❌ Music file could not be loaded", "error")
  })

  // Volume control with scroll (optional feature)
  let volumeTimeout
  document.addEventListener("wheel", (e) => {
    if (e.ctrlKey && isPlaying) {
      e.preventDefault()

      const volumeChange = e.deltaY > 0 ? -0.1 : 0.1
      const newVolume = Math.max(0, Math.min(1, backgroundMusic.volume + volumeChange))
      backgroundMusic.volume = newVolume

      // Show volume indicator
      clearTimeout(volumeTimeout)
      showVolumeIndicator(Math.round(newVolume * 100))

      volumeTimeout = setTimeout(() => {
        hideVolumeIndicator()
      }, 1500)
    }
  })
}

// Volume indicator functions
function showVolumeIndicator(volume) {
  let indicator = document.getElementById("volumeIndicator")

  if (!indicator) {
    indicator = document.createElement("div")
    indicator.id = "volumeIndicator"
    indicator.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: #00ffff;
      padding: 10px 15px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 10001;
      border: 1px solid rgba(0, 255, 255, 0.3);
      backdrop-filter: blur(10px);
      transition: opacity 0.3s ease;
    `
    document.body.appendChild(indicator)
  }

  indicator.textContent = `🔊 Volume: ${volume}%`
  indicator.style.opacity = "1"
}

function hideVolumeIndicator() {
  const indicator = document.getElementById("volumeIndicator")
  if (indicator) {
    indicator.style.opacity = "0"
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator)
      }
    }, 300)
  }
}

// Keyboard shortcuts for music control
document.addEventListener("keydown", (e) => {
  // Space bar to toggle music (when not in input fields)
  if (e.code === "Space" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
    e.preventDefault()
    if (backgroundMusic && musicBtn) {
      musicBtn.click()
    }
  }

  // M key to toggle music
  if (e.key.toLowerCase() === "m" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
    if (backgroundMusic && musicBtn) {
      musicBtn.click()
    }
  }
})

// Save music state in localStorage
function saveMusicState() {
  localStorage.setItem("musicPlaying", isPlaying)
  localStorage.setItem("musicVolume", backgroundMusic.volume)
}

function loadMusicState() {
  const savedPlaying = localStorage.getItem("musicPlaying") === "true"
  const savedVolume = localStorage.getItem("musicVolume")

  if (savedVolume) {
    backgroundMusic.volume = Number.parseFloat(savedVolume)
  }

  // Don't auto-play, just restore the UI state
  if (savedPlaying) {
    // Just update the UI, don't actually play
    musicIcon.textContent = "▶"
    musicBtn.classList.remove("playing")
  }
}

// Load music state on page load
window.addEventListener("load", () => {
  if (backgroundMusic) {
    loadMusicState()
  }
})

// Save music state before page unload
window.addEventListener("beforeunload", () => {
  if (backgroundMusic) {
    saveMusicState()
  }
})

// Pause music when page is hidden (tab switching)
document.addEventListener("visibilitychange", () => {
  if (backgroundMusic && isPlaying) {
    if (document.hidden) {
      backgroundMusic.pause()
    } else {
      backgroundMusic.play()
    }
  }
})
