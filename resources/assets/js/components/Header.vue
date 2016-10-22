<template>
	<header>
		<nav class="nav has-shadow">
			<div class="container is-fluid">
				<div class="nav-left">
				  <router-link to="/" class="nav-item is-brand">
				      <h1>SANAJSCU</h1>
			      </router-link>
			    </div>

				<span class="nav-toggle">
					<span></span>
					<span></span>
					<span></span>
				</span>

				<div class="nav-right nav-menu">
					<router-link to="/" exact class="nav-item is-tab" active-class="is-active">Acasa</router-link>
					<router-link to="/about" class="nav-item is-tab" active-class="is-active">Despre</router-link>
				</div>
			</div>
		</nav>
	</header>
</template>

<script type="text/javascript">
export default {
	name: 'main-header',
	data () {
		return {

		}
	},

}
</script>