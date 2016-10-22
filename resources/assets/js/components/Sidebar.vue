<template>
    <aside class="menu">
      <p class="menu-label">
        Statistici
      </p>
      <ul class="menu-list">
        <li><a href="#">Achizitii</a></li>
        <li><a href="#">Epidemii</a></li>
        <li><a href="#">Spitale</a></li>
      </ul>
      <p class="menu-label">
        Alerte
      </p>
      <ul class="menu-list">
        <li><a href="#">Team Settings</a></li>
        <li>
          <a class="is-active" href="#">Manage Your Team</a>
          <ul>
            <li><a href="#">Members</a></li>
            <li><a href="#">Plugins</a></li>
            <li><a href="#">Add a member</a></li>
          </ul>
        </li>
      </ul>
</template>

<script>
    export default {
        mounted() {
            console.log('Component ready.')
        }
    }
</script>
