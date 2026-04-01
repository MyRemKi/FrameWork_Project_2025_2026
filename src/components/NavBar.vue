<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>

      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>

      <ul :class="['nav-links', menuOpen ? 'active' : '']">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/vols">Vols</router-link></li>
        <li><router-link to="/hotels">Hôtels</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/apropos">À propos</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  padding: 1rem 2rem;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  background: linear-gradient(270deg, #ffffff, #d8b9ff, #ffffff);
  background-size: 300% 100%;
  animation: gradientLoop 3s linear infinite;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  max-height: 50px;
  width: auto;
  background-color: transparent;
  transition: transform 0.3s ease;
}

.logo img:hover {
  transform: scale(1.05);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li a {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: color 0.3s ease;
}

.nav-links li a::after {
  content: '';
  display: block;
  height: 2px;
  width: 0%;
  background-color: #8a4fff;
  position: absolute;
  bottom: -4px;
  left: 0;
  transition: width 0.3s ease;
}

.nav-links li a:hover {
  color: #8a4fff;
}

.nav-links li a:hover::after {
  width: 100%;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #333;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger span.open:nth-child(2) {
  opacity: 0;
}
.hamburger span.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.95);
    padding: 1rem 0;
    gap: 1rem;
    display: none;
  }
  .nav-links.active {
    display: flex;
  }
}

@keyframes gradientLoop {
  0% { background-position: 100% 50%; }
  50% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
</style>