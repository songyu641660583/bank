<template>
	<view class="login">
		<loadingComponent v-if="loading"></loadingComponent>
		<uni-nav-bar :border="false" :style="{ paddingTop: statusBarHeight + 'px' }">
			<template #left>
				<view class="nav-left">
					<image src="@/static/back.png" mode="widthFix"></image>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="login-logo">
				<image src="@/static/login-logo.png" mode="widthFix"></image>
			</view>
			<view class="tips1">
				经此渠道提供的服务之相关条款及细则将以电子形式提供。请于申请产品或服务或进行交易前先审阅相关条款及细则、资料及文件。查询请联络在线客服。
			</view>
			<view class="tips1">
				若您想了解手机银行操作，请浏览操作指引。
			</view>
			<uni-forms-item name="account">
				<view class="input-top-label" :style="{ 'opacity': (accountFocus || formData.account) ? 1 : 0 }">网上银行号码
					/
					用户名称</view>
				<uni-easyinput ref="accountInput" @blur="handleBlur('account')" @focus="handleFocus('account')"
					type="text" v-model="formData.account" placeholder-class="custom-placeholder">
					<template #left>
						<view class="input-place" v-if="!formData.account && !accountFocus">网上银行号码 / 用户名称</view>
					</template>
					<template #right>
						<view class="forget-text">忘记?</view>
					</template>
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="pwd">
				<view class="input-top-label" :style="{ 'opacity': (formData.pwd || pwdFocus) ? 1 : 0 }">密码</view>
				<uni-easyinput ref="pwdInput" @blur="handleBlur('pwd')" @focus="handleFocus('pwd')" type="password"
					:passwordIcon="false" v-model="formData.pwd">
					<template #left>
						<view class="input-place" v-if="!formData.pwd && !pwdFocus">密码</view>
					</template>
				</uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="code">
				<view class="input-top-label" :style="{ 'opacity': (formData.code || codeFocus) ? 1 : 0 }">验证码</view>
				<uni-easyinput ref="codeInput" @blur="handleBlur('code')" @focus="handleFocus('code')" type="text"
					v-model="formData.code">
					<template #left>
						<view class="input-place" v-if="!formData.code && !codeFocus">验证码</view>
					</template>
					<template #right>
						<view class="code-view">
							<image class="audio-icon" src="@/static/audio.png" mode="widthFix"></image>
							<view class="code-img" @click="handleCodeNext">
								<image :src="codeArr[codeIndex].url" mode="widthFix"></image>
							</view>
						</view>
					</template>
				</uni-easyinput>
			</uni-forms-item>
			<view class="error-tips" v-if="errorText">{{ errorText }}</view>
			<view class="login-submit" @click="handleSubmit" v-if="!logining">
				登入
			</view>
			<view class="login-submit logining" v-else>
				<text>{{ showSuccess? '' : '处理中'}}</text>
				<image v-if="showSuccess" src="@/static/success.gif" mode="widthFix"></image>

			</view>
			<view class="forget-pwd">忘记密码?</view>
		</view>

	</view>
</template>

<script>
	import code1 from '/static/code2.png'
	import code2 from '/static/code3.png'
	import code3 from '/static/code4.png'
	import code4 from '/static/code5.png'
	import {
		loginAccount
	} from '../../data/data'
	import loadingComponent from '../../components/loading.vue'

	const codeArr = [{
		url: code1,
		value: '82rg'
	}, {
		url: code2,
		value: '7knx'
	}, {
		url: code3,
		value: '28w5'
	}, {
		url: code4,
		value: '4pyk'
	}]
	export default {
		components: {
			loadingComponent
		},
		onLoad() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
		},
		data() {
			return {
				loading: true,
				logining: false,
				showSuccess: false,
				codeArr,
				codeIndex: Math.ceil(Math.random() * 4),
				accountFocus: false,
				pwdFocus: false,
				codeFocus: false,
				formData: {
					account: '',
					pwd: '',
					code: ''
				},
				errorText: '',
				single: '',
				vModelValue: 10,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		mounted() {
			setTimeout(() => {
				this.loading = false
			}, 1500)
		},

		methods: {
			handleCodeNext() {
				if (this.codeIndex >= this.codeArr.length - 1) {
					this.codeIndex = 0
				} else {
					this.codeIndex = this.codeIndex + 1
				}
			},
			handleSubmit() {

				if (this.formData.account !== loginAccount.account || this.formData.pwd !== loginAccount.pwd) {
					this.errorText = '输入账号或密码不正确，请重新输入。'
					return
				}
				if (codeArr[this.codeIndex].value !== this.formData.code) {
					this.errorText = '验证码不正确，请重新输入。'
					return
				}
				this.logining = true
				localStorage.setItem('isLogin', '1')
				setTimeout(() => {
					this.showSuccess = true
				}, 3000)

				setTimeout(() => {
					uni.switchTab({
						url: '/pages/home/index'
					})
				}, 4500)

			},
			handlePlaceFocus(type) {

				// this.$nextTick(() => {
				// 	if(type === 'account'){
				// 	this.$refs.accountInput.onFocus()
				// 	}else if(type === 'pwd'){
				// 		this.$refs.pwdInput.onFocus()
				// 	}else if(type === 'code'){
				// 		this.$refs.codeInput.onFocus()
				// 	}
				//      })
			},
			handleBlur(type) {
				if (type === 'account') {
					this.accountFocus = false
				} else if (type === 'pwd') {
					this.pwdFocus = false
				} else if (type === 'code') {
					this.codeFocus = false
				}
			},
			handleFocus(type) {
				if (type === 'account') {
					this.accountFocus = true
				} else if (type === 'pwd') {
					this.pwdFocus = true
				} else if (type === 'code') {
					this.codeFocus = true
				}
			}
		}
	}
</script>

<style lang="scss">
	.login {
		height: 100vh;
		background: url('@/static/login-bg.png') no-repeat;
		background-size: 85% 120%;
		background-position-x: 100%;
		background-position-y: 20%;

		.nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}
		}

		.input-top-label {
			color: #333;
			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
		}

		.input-place {
			position: absolute;
			color: #666;
			font-size: 30rpx;
			font-style: normal;
			font-weight: 400;
			z-index: 0;
		}

		.uni-navbar__header {
			padding: 0 32rpx !important;
			background-color: transparent !important;
		}

		.uni-navbar__content {
			background-color: transparent !important;
		}

		.forget-text {
			color: #5F325D;
			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 40rpx;
		}

		.uni-forms-item {
			margin-top: 40rpx;
			margin-bottom: 0 !important;
		}

		.is-input-border {
			border: none !important;
			border-bottom: 2rpx solid #DEDEDE !important;
			border-radius: 0 !important;
			padding: 0 !important;

			&.is-focused {
				border-bottom: 2rpx solid #832339 !important;

			}
		}

		.is-focused .content-clear-icon {
			color: rgb(192, 196, 204) !important;
		}

		.uni-easyinput__content-input {
			padding-left: 0 !important;
			width: 100%;
			position: relative;
			z-index: 2 !important;

		}

		.uni-easyinput__content {
			background-color: transparent !important;
		}

		.custom-placeholder {
			color: red;
			font-size: 52rpx !important;
		}

		.content {
			padding: 0 32rpx;
		}

		.login-logo {
			padding: 16rpx;
			margin-bottom: 32rpx;

			image {
				width: 300rpx;
			}
		}

		.tips1 {
			margin-bottom: 32rpx;
			color: #333;
			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 40rpx;


		}

		.code-view {
			height: 50rpx;
			display: flex;
			align-items: center;

			.audio-icon {
				margin-right: 10rpx;
				width: 36rpx;
				height: 36rpx;
			}

			.code-img {
				image {
					height: 40rpx;

					width: 120rpx;
				}
			}
		}

		.login-submit {
			position: relative;
			margin: 50rpx auto 0;
			display: flex;
			width: 100%;
			height: 96rpx;
			justify-content: center;
			align-items: center;
			gap: 16rpx;
			flex-shrink: 0;
			border-radius: 10000px;
			background-color: #C53455;
			color: #fff;
			border: none;
			transition: all 1s;

			&.logining {
				width: 96rpx;
				transition: all 1s;
				animation: submit 3s ease-in forwards;
			}

			image {
				position: absolute;
				top: 0;
				bottom: 0;
				width: 78rpx;
			}
		}

		.forget-pwd {
			margin-top: 32rpx;
			color: #5F325D;
			text-align: center;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 32rpx;
			/* 133.333% */
		}

		.error-tips {
			margin-top: 50rpx;
			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 32rpx;
			/* 133.333% */
			color: #C53455;
		}
	}


	@keyframes submit {
		0% {
			width: 100%;
		}

		85% {
			width: 100%;
		}

		95% {
			color: #fff;
			background-color: #C53455;
		}

		100% {
			width: 0rpx;
			color: transparent;
			background-color: green !important;
		}
	}
</style>