<script setup>
import { API } from '@/api/endpoints'
import { request } from '@/api/http'

const handleSendMessage = async () => {
  try {
    const response = await request({
      url: API.links.random,
      method: 'GET',
      params: {
        type: 1,
        link_type: 2,
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
  }
}
</script>

<template>
  <div class="blank-page">
    <div class="center-stack">
      <img
        class="telegram-icon"
        src="https://dehraflicks.com/wp-content/uploads/2025/07/Telegram-icon-bg-png-dehraflicks.png"
        alt="Telegram"
      />
      <button class="send-button" type="button" @click="handleSendMessage">
        Send Message
      </button>
    </div>
  </div>
</template>

<style scoped>
.blank-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #ffffff;
}

.center-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: clamp(280px, 70vw, 420px);
}

.telegram-icon {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 24px;
}

.send-button {
  appearance: none;
  border: none;
  border-radius: 999px;
  padding: 22px 56px;
  font-size: 1.35rem;
  font-weight: 600;
  cursor: pointer;
  background: #111111;
  color: #ffffff;
  width: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.send-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.send-button:active {
  transform: translateY(0);
}

@media (max-width: 600px) {
  .send-button {
    width: 100%;
    max-width: none;
  }

  .telegram-icon {
    width: 100%;
    height: auto;
  }
}
</style>
