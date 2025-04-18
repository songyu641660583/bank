<template>
	<view>
		<homeLogin></homeLogin>
<!-- 		<view style="position: fixed;top: 40vh;z-index: 111;" @click="handleCeshi2">测试汇率确认页面</view>
		<view style="position: fixed;top: 20vh;z-index: 111;" @click="handleCeshi1">测试支付确认页面</view> -->
		<loadingComponent v-if="loading"></loadingComponent>
	</view>
</template>

<script>
	import homeLogin from './login.vue'
	import loadingComponent from '../../components/loading.vue'
	export default {
		components: {
			homeLogin,
			loadingComponent
		},
		created() {
			try {
				const value = uni.getStorageSync('isLogin');
				console.log('value',value)
				if (value) {
					console.log(value);
				}else{
					uni.navigateTo({
						url: "/pages/home/unLogin"
					})
				}
			} catch (e) {
				uni.navigateTo({
					url: "/pages/home/unLogin"
				})
			}
		},
		data() {
			return {
				loading: true
			}
		},
		mounted() {
			setTimeout(() => {
				this.loading = false
			}, 1000)

		},
		methods: {
			handleCeshi1() {
				uni.navigateTo({
					url: '/pages/account/accountConfirm'
				})
			},
			handleCeshi2() {
				uni.navigateTo({
					url: '/pages/account/exchangeConfirm'
				})
			}
		}
	}
</script>

<style>

</style>