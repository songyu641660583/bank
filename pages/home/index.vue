<template>
	<view>
		<homeLogin v-if="isLogin"></homeLogin>
		<homeUnlogin v-else></homeUnlogin>
		<loadingComponent v-if="loading"></loadingComponent>
	</view>
</template>

<script>
	import homeLogin from './login.vue'
	import homeUnlogin from './unLogin.vue'
		import loadingComponent from '../../components/loading.vue'
	export default {
		components: {homeLogin, homeUnlogin,loadingComponent},
		data() {
			return {
				isLogin: true,
				loading: true
			}
		},
		mounted(){
			setTimeout(() => {
        this.loading =false
			}, 1000)
			// this.isLogin = 	localStorage.getItem('isLogin') === '1'
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
