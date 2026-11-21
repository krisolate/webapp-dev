<template>
  <header class="site-header">
    <nav class="navbar" aria-label="Main navigation">
      <RouterLink
        to="/"
        class="nav-link"
        active-class="active"
        exact-active-class="active"
      >
        Home
      </RouterLink>

      <RouterLink
        to="/signup"
        class="nav-link signup-nav-link"
        active-class="active"
      >
        Sign Up
      </RouterLink>
    </nav>
  </header>
</template>
