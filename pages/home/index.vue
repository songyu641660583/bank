<template>
	<view>
		<homeLogin v-if="isLogin"></homeLogin>
		<homeUnlogin v-else></homeUnlogin>
	</view>
</template>

<script>
	import homeLogin from './login.vue'
	import homeUnlogin from './unLogin.vue'
	export default {
		components: {homeLogin, homeUnlogin},
		data() {
			return {
				isLogin: false
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
