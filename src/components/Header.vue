<template>
  <header class="header black-bg no-underline py-3">
    <div class="container">
      <div class="row align-items-center">
        <div class="logo-container text-md-center py-2">
          <g-link href="/" title="Think Code Play">
            <g-image
              src="../../static/from-blog/assets/Think-code-play-logo-dark.png"
              class="img-fluid"
              width="60"
            />
          </g-link>
          <g-link class="website-text">Think Code Play</g-link>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
:root {
  --white: #ffffff;
  --black: #393e42;
  --futura: Futura, Trebuchet MS, Arial Black, Arial Bold, Arial, sans-serif;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.website-text {
  color: #ffffff;
  margin-left: 10px;
  text-decoration: none;
}
.black-bg {
  background-color: #393e42 !important;
}

.header {
  padding: 0.5rem 0;
  font-size: 1.5rem;
  font-family: Futura, Trebuchet MS, Arial Black, Arial Bold, Arial, sans-serif;
  font-weight: 800;
}

.header .logo {
  width: 100%;
  max-width: 200px;
}

.header .menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.header .menu li {
  display: inline-flex;
  padding: 0 0.75rem;
  margin: 0;
}

.header .menu li a {
  color: #ffffff
}

.header .menu li a:hover {
  text-decoration: none;
  text-shadow: 0 0 10px #ffffff !important;
}

.no-underline {
  text-decoration: none !important;
}
</style>
