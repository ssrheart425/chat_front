<script setup>
import { computed, ref, watchEffect } from 'vue'
import { API } from '@/api/endpoints'
import { request } from '@/api/http'

const currentLanguage = ref('es')

const navItems = [
  { key: 'why', target: 'porque' },
  { key: 'women', target: 'mujeres' },
  { key: 'stories', target: 'historias' },
  { key: 'contact', target: 'unete' },
]

const translations = {
  es: {
    nav: {
      why: '¿Por qué Lazo?',
      women: 'Mujeres',
      stories: 'Historias',
      contact: 'Contactar por WhatsApp',
    },
    hero: {
      title: 'Donde la pasión española encuentra su destino',
      description:
        'En España, el amor no espera. Conecta con miles de mujeres locales que buscan autenticidad, emoción y conexiones reales. Sin juegos, solo pasión.',
      cta: '💬 CONTACTAR POR WHATSAPP',
    },
    features: {
      title: '¿Por qué elegir Lazo?',
      items: [
        {
          icon: '🔥',
          title: 'Pasión Directa',
          description:
            'Olvídate del "swipe" infinito. En Lazo, fomentamos la comunicación directa y honesta. Las mujeres aquí saben lo que quieren y no tienen miedo de dar el primer paso.',
        },
        {
          icon: '💃',
          title: 'Cultura de Socialización',
          description:
            'Diseñado para el estilo de vida español. Desde encuentros en terrazas de Madrid hasta paseos por la playa en Barcelona. Facilitamos citas que encajan con tu ritmo social.',
        },
        {
          icon: '🔒',
          title: 'Exclusividad y Respeto',
          description:
            'Nuestra comunidad valora la exclusividad. Entendemos que en España nos gusta centrarnos en una persona cuando hay química. Seguridad y perfiles verificados al 100%.',
        },
      ],
    },
    women: {
      title: 'Mujeres activas ahora',
      description: 'Hay miles de mujeres cerca de ti esperando una conversación real.',
      profiles: [
        {
          name: 'Elena',
          age: 28,
          city: 'Madrid',
          bio: '"Buscando alguien para tapear y reír."',
          image:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Carmen',
          age: 32,
          city: 'Sevilla',
          bio: '"Apasionada del arte y las noches largas."',
          image:
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Lucía',
          age: 25,
          city: 'Valencia',
          bio: '"La vida es mejor compartida frente al mar."',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Marta',
          age: 30,
          city: 'Barcelona',
          bio: '"¿Cena romántica o aventura urbana?"',
          image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    stories: {
      title: 'Historias de éxito',
      items: [
        {
          text: '"Después de meses en otras apps sin sentido, encontré a Sofía en Lazo. Lo que empezó como una caña en una terraza de Malasaña se convirtió en la relación más intensa de mi vida. Aquí la gente busca de verdad."',
          author: '— Javier, 34 años (Madrid)',
        },
        {
          text: '"Me sorprendió lo directas y seguras que son las mujeres en esta plataforma. No hay rodeos. Conocí a alguien especial en apenas una semana. El ambiente es muy diferente, mucho más cálido y real."',
          author: '— Marc, 29 años (Barcelona)',
        },
      ],
    },
    contact: {
      title: 'Contactar por WhatsApp',
      description:
        'Da el primer paso en segundos. Escríbenos por WhatsApp y conecta de inmediato con nuestra comunidad.',
      body:
        'Haz clic en el botón de abajo para añadirnos a WhatsApp y empezar a conectar con mujeres reales cerca de ti. Sin formularios, sin esperas.',
      button: 'AÑADIR EN WHATSAPP',
      legal: 'Al contactarnos, aceptas nuestros Términos de Servicio y Política de Privacidad.',
    },
    footer: {
      copyright: '© 2026 Lazo Dating España. Todos los derechos reservados.',
      note: 'Hecho con pasión para el público español.',
    },
  },
  en: {
    nav: {
      why: 'Why Lazo?',
      women: 'Women',
      stories: 'Stories',
      contact: 'Contact on WhatsApp',
    },
    hero: {
      title: 'Where Spanish passion finds its destiny',
      description:
        'In Spain, love does not wait. Connect with thousands of local women looking for authenticity, excitement, and real connections. No games, just passion.',
      cta: '💬 CONTACT ON WHATSAPP',
    },
    features: {
      title: 'Why choose Lazo?',
      items: [
        {
          icon: '🔥',
          title: 'Direct Passion',
          description:
            'Forget endless swiping. At Lazo, we encourage direct and honest communication. The women here know what they want and are not afraid to make the first move.',
        },
        {
          icon: '💃',
          title: 'A Social Lifestyle',
          description:
            'Designed for the Spanish way of life. From terrace meetups in Madrid to walks on the beach in Barcelona, we make dates fit naturally into your social rhythm.',
        },
        {
          icon: '🔒',
          title: 'Exclusivity and Respect',
          description:
            'Our community values exclusivity. We understand that in Spain, when there is chemistry, people like to focus on one person. Safety and 100% verified profiles.',
        },
      ],
    },
    women: {
      title: 'Women active right now',
      description: 'There are thousands of women near you waiting for a real conversation.',
      profiles: [
        {
          name: 'Elena',
          age: 28,
          city: 'Madrid',
          bio: '"Looking for someone to share tapas and laughter with."',
          image:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Carmen',
          age: 32,
          city: 'Seville',
          bio: '"Passionate about art and long nights."',
          image:
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Lucia',
          age: 25,
          city: 'Valencia',
          bio: '"Life is better when shared by the sea."',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        },
        {
          name: 'Marta',
          age: 30,
          city: 'Barcelona',
          bio: '"Romantic dinner or urban adventure?"',
          image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        },
      ],
    },
    stories: {
      title: 'Success stories',
      items: [
        {
          text: '"After months on other pointless apps, I found Sofia on Lazo. What started as a beer on a terrace in Malasana became the most intense relationship of my life. People here are genuinely looking for something real."',
          author: '— Javier, 34 (Madrid)',
        },
        {
          text: '"I was surprised by how direct and confident the women are on this platform. No beating around the bush. I met someone special in barely a week. The atmosphere is very different, much warmer and much more real."',
          author: '— Marc, 29 (Barcelona)',
        },
      ],
    },
    contact: {
      title: 'Contact on WhatsApp',
      description:
        'Take the first step in seconds. Message us on WhatsApp and connect with our community right away.',
      body:
        'Click the button below to add us on WhatsApp and start connecting with real women near you. No forms, no waiting.',
      button: 'ADD ON WHATSAPP',
      legal: 'By contacting us, you accept our Terms of Service and Privacy Policy.',
    },
    footer: {
      copyright: '© 2026 Lazo Dating Spain. All rights reserved.',
      note: 'Made with passion for the Spanish audience.',
    },
  },
}

const copy = computed(() => translations[currentLanguage.value])
const isSending = ref(false)

watchEffect(() => {
  document.documentElement.lang = currentLanguage.value
})

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'es' ? 'en' : 'es'
}

const scrollToSection = (sectionId) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const handleSendMessage = async () => {
  if (isSending.value) {
    return
  }

  isSending.value = true

  try {
    const response = await request({
      url: API.links.random,
      method: 'GET',
      params: {
        type: 1,
        link_type: 1,
      },
    })

    const link = response?.data?.data?.link
    if (link) {
      window.location.href = link
      return
    }

    console.warn('Random link response missing link field:', response?.data)
  } catch (error) {
    console.error('Send message request failed:', error)
  } finally {
    isSending.value = false
  }
}
</script>

<template>
  <div class="lazo-page">
    <header class="site-header">
      <div class="header-left">
        <div class="logo">LAZO</div>
      </div>

      <div class="header-right">
        <nav class="nav-links" aria-label="Primary">
          <a
            v-for="item in navItems"
            :key="item.key"
            :class="{ 'nav-accent': item.key === 'contact' }"
            :href="`#${item.target}`"
            @click.prevent="scrollToSection(item.target)"
          >
            {{ copy.nav[item.key] }}
          </a>
        </nav>

        <button class="language-toggle" type="button" @click="toggleLanguage">
          {{ currentLanguage === 'es' ? 'EN' : 'ES' }}
        </button>
      </div>
    </header>

    <section class="hero">
      <h1>{{ copy.hero.title }}</h1>
      <p>{{ copy.hero.description }}</p>
      <button class="cta-button" type="button" :disabled="isSending" @click="handleSendMessage">
        {{ copy.hero.cta }}
      </button>
    </section>

    <section id="porque">
      <h2 class="section-title">{{ copy.features.title }}</h2>
      <div class="features">
        <div v-for="feature in copy.features.items" :key="feature.title" class="feature-card">
          <i>{{ feature.icon }}</i>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section id="mujeres" class="active-women">
      <h2 class="section-title">{{ copy.women.title }}</h2>
      <p class="section-description">{{ copy.women.description }}</p>
      <div class="profile-grid">
        <div v-for="profile in copy.women.profiles" :key="`${profile.name}-${profile.city}`" class="profile-card">
          <div class="profile-img" :style="{ backgroundImage: `url('${profile.image}')` }"></div>
          <div class="profile-info">
            <h4>{{ profile.name }}, {{ profile.age }} <span class="status-dot"></span></h4>
            <p>{{ profile.city }} • {{ profile.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="historias" class="success-stories">
      <h2 class="section-title section-title-light">{{ copy.stories.title }}</h2>
      <div class="story-container">
        <div v-for="story in copy.stories.items" :key="story.author" class="story-item">
          <p>{{ story.text }}</p>
          <div class="story-author">{{ story.author }}</div>
        </div>
      </div>
    </section>

    <section id="unete" class="join-today">
      <h2 class="section-title section-title-light">{{ copy.contact.title }}</h2>
      <p class="contact-description">{{ copy.contact.description }}</p>
      <div class="form-container">
        <p class="contact-body">{{ copy.contact.body }}</p>
        <button class="submit-btn" type="button" :disabled="isSending" @click="handleSendMessage">
          <svg class="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
          {{ copy.contact.button }}
        </button>
        <p class="legal-copy">{{ copy.contact.legal }}</p>
      </div>
    </section>

    <footer>
      <div class="logo footer-logo">LAZO</div>
      <p>{{ copy.footer.copyright }}</p>
      <p>{{ copy.footer.note }}</p>
    </footer>
  </div>
</template>

<style scoped>
.lazo-page {
  min-height: 100vh;
  background-color: #ffffff;
  color: #333333;
  line-height: 1.6;
  overflow-x: hidden;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.site-header {
  background: rgba(31, 28, 44, 0.95);
  padding: 1rem 5%;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header-left {
  display: flex;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.language-toggle {
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border-radius: 999px;
  padding: 0.55rem 0.95rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.language-toggle:hover {
  background: rgba(255, 215, 0, 0.18);
  transform: translateY(-1px);
}

.logo {
  font-size: 2rem;
  font-weight: 800;
  color: #ff4b2b;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #ffd700;
}

.nav-accent {
  color: #ff4b2b;
}

.hero {
  min-height: 100vh;
  background:
    linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  padding: 0 20px;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  animation: fadeInDown 1s ease;
  max-width: 980px;
}

.hero p {
  font-size: 1.5rem;
  max-width: 800px;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

.cta-button {
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: #ffffff;
  padding: 15px 40px;
  border-radius: 50px;
  border: none;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(255, 75, 43, 0.4);
}

.cta-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 75, 43, 0.6);
}

.cta-button:disabled,
.submit-btn:disabled {
  cursor: wait;
  opacity: 0.85;
}

section {
  padding: 80px 10%;
  scroll-margin-top: 96px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  position: relative;
}

.section-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background: #ff4b2b;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.section-title-light {
  color: #ffffff;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s;
  border-top: 5px solid #ff4b2b;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-card i {
  font-size: 3rem;
  color: #ff4b2b;
  margin-bottom: 20px;
  display: block;
  font-style: normal;
}

.active-women {
  background-color: #fdf2f2;
}

.section-description,
.contact-description {
  text-align: center;
  margin-bottom: 40px;
  font-size: 1.2rem;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.profile-card {
  background: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  min-height: 360px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.profile-img {
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s;
}

.profile-card:hover .profile-img {
  transform: scale(1.1);
}

.profile-info {
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #ffffff;
}

.status-dot {
  height: 10px;
  width: 10px;
  background-color: #2ecc71;
  border-radius: 50%;
  display: inline-block;
  margin-left: 6px;
  vertical-align: middle;
}

.success-stories {
  background: #1f1c2c;
  color: #ffffff;
}

.story-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
}

.story-item {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 15px;
  font-style: italic;
}

.story-item p {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.story-author {
  font-style: normal;
  font-weight: 700;
  color: #ffd700;
  display: flex;
  align-items: center;
}

.join-today {
  background: linear-gradient(135deg, #1f1c2c, #2c3e50);
  color: #ffffff;
  text-align: center;
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  color: #333333;
}

.contact-body {
  font-size: 1.1rem;
  margin-bottom: 25px;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: #25d366;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: #1ebe57;
}

.whatsapp-icon {
  width: 26px;
  height: 26px;
  fill: #ffffff;
  flex-shrink: 0;
}

.legal-copy {
  font-size: 0.8rem;
  margin-top: 15px;
  color: #666666;
}

footer {
  background: #111111;
  color: #777777;
  text-align: center;
  padding: 40px 20px;
}

.footer-logo {
  margin-bottom: 20px;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
    position: sticky;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .nav-links {
    width: auto;
    justify-content: flex-start;
  }

  .nav-links a {
    margin-left: 0;
    margin-right: 18px;
    margin-top: 10px;
  }

  .hero {
    min-height: calc(100vh - 140px);
    padding-top: 180px;
    padding-bottom: 72px;
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1.1rem;
  }

  section {
    padding: 60px 5%;
  }

  .hero {
    min-height: calc(100vh - 160px);
    padding-top: 210px;
  }
}

@media (max-width: 520px) {
  .header-left {
    width: 100%;
  }

  .header-right {
    flex-direction: column-reverse;
    align-items: flex-start;
  }

  .language-toggle {
    padding: 0.5rem 0.85rem;
  }

  .hero {
    min-height: calc(100vh - 180px);
    padding-top: 230px;
  }
}
</style>
