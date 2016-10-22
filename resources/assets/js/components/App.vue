<template>
<div>
    <main-header></main-header>
    <main-sidebar></main-sidebar>
    <main-content></main-content>
    <main-footer></main-footer>
</div>
</template>

<script>
import mainHeader from 'src/components/Header.vue'
import mainSidebar from 'src/components/Sidebar.vue'
import mainContent from 'src/components/MainContent.vue'
import mainFooter from 'src/components/Footer.vue'

export default {
    name: 'app',
    components: {
    	mainHeader,
    	mainSidebar,
    	mainContent,
    	mainFooter
    },
}
</script>