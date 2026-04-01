<template>
  <div class="contact-page">
    <div class="contact-box">
      <h1>CONTACT US</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
      <form @submit.prevent="handleSubmit" class="contact-form">
        <input type="text" placeholder="Your Name" v-model="form.name" required />
        <input type="email" placeholder="Your Mail" v-model="form.email" required />
        <input type="text" placeholder="Your Message" v-model="form.message" required />
        <button type="submit">SUBMIT →</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      alert(`Message envoyé!\nNom: ${this.form.name}\nEmail: ${this.form.email}\nMessage: ${this.form.message}`);
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
    },
  },
};
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4a90e2, #1f3c88);
  position: relative;
  overflow: hidden;
}

.contact-page::before,
.contact-page::after {
  content: "";
  position: absolute;
  border-style: solid;
  opacity: 0.1;
  z-index: 0;
  filter: blur(10px);
}

.contact-page::before {
  top: 10%;
  left: 5%;
  border-width: 80px 80px 0 0;
  border-color: #2a5298 transparent transparent transparent;
  transform: rotate(45deg);
}

.contact-page::after {
  bottom: 15%;
  right: 10%;
  width: 60px;
  height: 60px;
  background: rgba(255 255 255 / 0.15);
  border-radius: 50%;
}

.contact-box {
  position: relative;
  z-index: 1;
  background-color: #374785; 
  border: 6px solid #4883c7;
  padding: 40px 50px;
  border-radius: 8px;
  width: 380px;
  text-align: center;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.contact-box h1 {
  margin-bottom: 12px;
  font-weight: 900;
  font-size: 28px;
  letter-spacing: 1.5px;
}

.contact-box p {
  margin-bottom: 30px;
  font-size: 14px;
  line-height: 1.4;
  color: #d0d7f7;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-form input {
  background: transparent;
  border: none;
  border-bottom: 1.5px solid #4883c7;
  color: #a9b9f9;
  font-size: 14px;
  padding: 8px 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.contact-form input::placeholder {
  color: #7a96d4;
}

.contact-form input:focus {
  border-bottom-color: #ffa500; 
  color: white;
}

.contact-form button {
  margin-top: 10px;
  background: transparent;
  border: 2px solid white;
  color: white;
  font-weight: 700;
  font-size: 14px;
  padding: 10px 25px;
  border-radius: 0;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background-color 0.3s ease, color 0.3s ease;
  align-self: center;
}

.contact-form button:hover {
  background-color: #ffa500;
  border-color: #ffa500;
  color: #222;
  font-weight: 800;
  letter-spacing: 2px;
  transition-duration: 0.4s;
}

@media (max-width: 420px) {
  .contact-box {
    width: 90vw;
    padding: 30px 20px;
  }
}
</style>