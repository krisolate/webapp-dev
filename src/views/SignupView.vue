<template>
  <main class="form-page">
    <section class="form-card" aria-labelledby="signup-heading">
      <form @submit.prevent="submitForm">
        <div class="signup-field">
          <label for="email">Email</label>

          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            required
          />
        </div>

        <div class="signup-field">
          <label for="password">Password</label>

          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
            autocomplete="new-password"
            required
          />
        </div>

        <div
          v-if="password.length > 0 && !isPasswordValid"
          class="password-errors"
        >
          <p>Password is invalid. It must:</p>

          <ul>
            <li v-for="error in passwordErrors" :key="error">
              {{ error }}
            </li>
          </ul>
        </div>

        <div class="signup-button-container">
          <button
            class="primary-button"
            type="submit"
            :disabled="!isPasswordValid"
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  computed: {
    passwordErrors() {
      const errors = [];

      if (this.password.length < 8) {
        errors.push("Be at least 8 characters long.");
      }

      if (this.password.length >= 15) {
        errors.push("Be fewer than 15 characters long.");
      }

      if (!/[A-Z]/.test(this.password)) {
        errors.push("Contain at least one uppercase letter.");
      }

      if ((this.password.match(/[a-z]/g) || []).length < 2) {
        errors.push("Contain at least two lowercase letters.");
      }

      if (!/[0-9]/.test(this.password)) {
        errors.push("Contain at least one number.");
      }

      if (!/^[A-Z]/.test(this.password)) {
        errors.push("Start with an uppercase letter.");
      }

      if (!this.password.includes("_")) {
        errors.push("Contain an underscore (_).");
      }

      return errors;
    },

    isPasswordValid() {
      return this.passwordErrors.length === 0;
    },
  },

  methods: {
    submitForm() {
      if (!this.isPasswordValid) {
        return;
      }

      alert("Account created!");
    },
  },
};
</script>
