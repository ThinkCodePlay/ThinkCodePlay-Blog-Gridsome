<template>
  <div>
    <header>
<!--      <b-navbar toggleable="lg" type="dark" variant="primary" >-->
<!--        <div class="container">-->
<!--          <b-navbar-brand href="/">ThinkCodePlay</b-navbar-brand>-->
<!--          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->
<!--          <b-collapse is-nav id="nav-collapse">-->
<!--            <b-navbar-nav>-->
<!--              <b-nav-item href="/">Home</b-nav-item>-->
<!--              <b-nav-item href="/about">About</b-nav-item>-->
<!--            </b-navbar-nav>-->
<!--          </b-collapse>-->
<!--        </div>-->

<!--      </b-navbar>-->
      <header class="header black-bg no-underline py-3">
        <div class="container">
          <div class="row align-items-center">

            <div class="col-md-2 text-md-center py-2">
              <a href="/" title="Money Lab" class="no-hover">
                <img src="https://www.moneylab.co/wp-content/themes/moneylab/images/money-lab-logo.svg" class="img-fluid" width="160" height="24">
              </a>
            </div>

            <div class="col-md text-md-center py-2 white">
              <ul class="menu">
                <li><a href="/posts/" class="no-underline">Posts</a></li>
                <li><a href="https://products.moneylab.co" target="_blank" class="no-underline">Courses</a></li>
                <li><a href="https://pages.moneylab.co/pro/" class="no-underline">Pro</a></li>
                <li><a href="/about/" class="no-underline">About</a></li>
              </ul>
            </div>

            <div class="col-md-2 py-2 text-right text-md-center">
              <a href="https://pro.moneylab.co" target="_blank" class="btn btn-sm">Login</a>
            </div>
          </div>
        </div>
      </header>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>

</style>
