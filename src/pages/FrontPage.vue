<script setup>
import { reactive } from 'vue'

const imageSet1 = reactive([
  { id: 1, src: '/images/front-1.jpg', alt: 'Image 1', label: 'Image 1', loaded: false },
  { id: 2, src: '/images/front-2.jpg', alt: 'Image 2', label: 'Image 2', loaded: false },
  { id: 3, src: '/images/front-3.jpg', alt: 'Image 3', label: 'Image 3', loaded: false },
])

const imageSet2 = reactive([
  { id: 4, src: '/images/front-4.jpg', alt: 'Image 4', label: 'Image 4', loaded: false },
  { id: 5, src: '/images/front-5.jpg', alt: 'Image 5', label: 'Image 5', loaded: false },
  { id: 6, src: '/images/front-6.jpg', alt: 'Image 6', label: 'Image 6', loaded: false },
])

const imageSet3 = reactive([
  { id: 7, src: '/images/front-7.jpg', alt: 'Image 7', label: 'Image 7', loaded: false },
  { id: 8, src: '/images/front-8.jpg', alt: 'Image 8', label: 'Image 8', loaded: false },
  { id: 9, src: '/images/front-9.jpg', alt: 'Image 9', label: 'Image 9', loaded: false },
  { id: 10, src: '/images/front-10.jpg', alt: 'Image 10', label: 'Image 10', loaded: false },
])

const markLoaded = (image, isLoaded) => {
  image.loaded = isLoaded
}

const whatsappLinks = [
  'https://api.whatsapp.com/send?phone=12202036657',
  'https://api.whatsapp.com/send?phone=18142801338',
  'https://api.whatsapp.com/send?phone=12154540741',
]

const handleCtaClick = () => {
  const choice = whatsappLinks[Math.floor(Math.random() * whatsappLinks.length)]
  window.location.href = choice
}
</script>

<template>
  <div class="page">
    <header class="hero">
      <div class="hero-text">
        <h1>Back in the USA &amp; Ready for You ✨</h1>
        <p class="lead">
          20 years in Korea taught me a lot, but I’m back in the States and looking for the one
          thing I couldn’t find there: a real, successful American man. 🇺🇸✨
        </p>
      </div>
      <div class="image-grid cols-3" aria-label="Image placeholders - set 1">
        <div v-for="image in imageSet1" :key="image.id" class="image-card">
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            @load="markLoaded(image, true)"
            @error="markLoaded(image, false)"
          />
          <span v-if="!image.loaded" class="image-label" aria-hidden="true">
            {{ image.label }}
          </span>
        </div>
      </div>
    </header>

    <section class="section">
      <p class="body">
        I’m at a stage in my life where I know exactly what I want. 💄 I’m looking for an
        established gentleman (40+) who appreciates a woman with classic beauty and a worldly
        soul. 🌏🥂 I value security, generosity, and chemistry. 💎
      </p>
      <div class="image-grid cols-3" aria-label="Image placeholders - set 2">
        <div v-for="image in imageSet2" :key="image.id" class="image-card">
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            @load="markLoaded(image, true)"
            @error="markLoaded(image, false)"
          />
          <span v-if="!image.loaded" class="image-label" aria-hidden="true">
            {{ image.label }}
          </span>
        </div>
      </div>
    </section>

    <section class="section">
      <p class="body">
        I’m done with the games. 🚫 I want to be taken out, taken care of, and treated like the
        lady I am. 👸 If you’re the kind of man who leads with confidence and lives a life of
        luxury, I’d love to be the one by your side. 🌹
      </p>
      <div class="image-grid cols-4" aria-label="Image placeholders - set 3">
        <div v-for="image in imageSet3" :key="image.id" class="image-card">
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            @load="markLoaded(image, true)"
            @error="markLoaded(image, false)"
          />
          <span v-if="!image.loaded" class="image-label" aria-hidden="true">
            {{ image.label }}
          </span>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Message me, and let's not waste another night. 🍾💋</h2>
      <button class="cta-button" type="button" @click="handleCtaClick">Send Message</button>
    </section>
  </div>
</template>
