<script setup>
const handleSendMessage = async () => {
  // TODO: Fill in your request URL and method.
  const requestUrl = ''
  const requestMethod = ''

  if (!requestUrl || !requestMethod) {
    console.warn('Please set requestUrl and requestMethod before sending the request.')
    return
  }

  try {
    const response = await fetch(requestUrl, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      // TODO: Put your request payload here.
      body: JSON.stringify({}),
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
  } catch (error) {
    console.error('Send message request failed:', error)
  }
}
</script>

<template>
  <div class="blank-page">
    <button class="send-button" type="button" @click="handleSendMessage">
      Send Message
    </button>
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

.send-button {
  appearance: none;
  border: none;
  border-radius: 999px;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: #111111;
  color: #ffffff;
  min-width: 180px;
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
    max-width: 320px;
  }
}
</style>
