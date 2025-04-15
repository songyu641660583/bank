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
		mounted(){
			console.log(localStorage.getItem('isLogin') === '1')
			this.isLogin = 	localStorage.getItem('isLogin') === '1'
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
