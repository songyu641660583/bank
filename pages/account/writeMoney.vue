<template>
	<view class="write-money">
		<uni-nav-bar left-width="52rpx" right-width="52rpx" :border="false"
			:style="{paddingTop: statusBarHeight + 'px', flex:'none'}">
			<template #left>
				<view class="nav-left" @click="goBack()">
					<image src="@/static/back.png" mode="widthFix"></image>
				</view>
			</template>
			<template #default>
				<view class="nav-step">
					<view class="active"></view>
					<view class="active"></view>
					<view></view>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="title">输入转账金额</view>
			<view>
				<uni-forms-item name="sendValue">
					<uni-easyinput type="digit" @blur="handleIptBlur" placeholder="0.00" :clearable="false" v-model="sendValue">
						<template #left>
							<view class="input-place">港元</view>
						</template>
					</uni-easyinput>
				</uni-forms-item>
			</view>
			<view class="tips2">转账日期</view>
			<view class="send-type">
				<view class="send-type-item" @click="handleType(1)">
					<image v-if="sendType === 1" src="@/static/radio-checked.png" mode="widthFix"></image>
					<image v-else src="@/static/radio.png" mode="widthFix"></image>
					<text>实时</text>
				</view>
				<view class="send-type-item" @click="handleType(2)">
					<image v-if="sendType === 2" src="@/static/radio-checked.png" mode="widthFix"></image>
					<image v-else src="@/static/radio.png" mode="widthFix"></image>
					<text>稍后</text>
				</view>
			</view>
			<view class="remark flex-between" @click="handleShowAccount('remarkPopup')">
				<view class="flex-align-center">
					<text>备注/附言</text>
					<image src="@/static/right-arrow2.png" mode="widthFix"></image>
				</view>
				<text class="edit" v-if="formData.remark || formData.message">编辑</text>
			</view>
			<view class="remark-info-title" v-if="formData.remark">个人备注</view>
			<view class="remark-info-content" v-if="formData.remark">{{formData.remark}}</view>
			<view class="remark-info-title" v-if="formData.message">给收款人的讯息</view>
			<view class="remark-info-content" v-if="formData.message">{{formData.message}}</view>
			<view class="choose-submit" :class="{disabled: disabled}" @click="handleSubmit">
				继续
			</view>
		</view>
		<uni-popup ref="remarkPopup">
			<view class="account-pop" :style="{height: `calc(100vh - ${statusBarHeight || 30}px)`}">
				<view class="my-account-head flex-between">
					<image src="@/static/close-icon.png" mode="aspectFit" @click="handleClosePop('remarkPopup')">
					</image>
				</view>
				<view class="my-account-title">备注/附言</view>
				<view class="formData">
					<uni-forms-item name="remark">
						<view class="input-top-label" :style="{'opacity': (remarkFocus || formData.remark) ? 1: 0 }">
							个人备注</view>
						<uni-easyinput maxlength="35" ref="remarkInput" :clearable="false" @blur="handleBlur('remark')"
							@focus="handleFocus('remark')" type="text" v-model="formData.remark"
							placeholder-class="custom-placeholder">
							<template #left>
								<view class="input-place" v-if="!formData.remark && !remarkFocus">个人备注</view>
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<view class="length-text">{{formData.remark.length}}/35</view>
					<uni-forms-item name="message">
						<view class="input-top-label" :style="{'opacity': (formData.message || messageFocus) ? 1: 0 }">
							给收款人的讯息
						</view>
						<uni-easyinput maxlength="140" ref="messageInput" :clearable="false"
							@blur="handleBlur('message')" @focus="handleFocus('message')" autoHeight type="text"
							v-model="formData.message">
							<template #left>
								<view class="input-place" v-if="!formData.message && !messageFocus">给收款人的讯息</view>
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<view class="length-text">{{formData.message.length}}/140</view>
					<view class="bank-submit" :class="{disabled: remarkDisabled}" @click="handleRemarkSubmit">
						继续
					</view>
				</view>

			</view>
		</uni-popup>


	</view>
</template>

<script>
	export default {
		onLoad() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
		},
		data() {
			return {
				disabled: true,
				sendValue: '',
				sendType: 1, // 1 实时 2 稍后
				messageFocus: false,
				remarkFocus: false,
				formData: {
					remark: '',
					message: ''
				},
				remarkDisabled: true
			}
		},
		watch: {
			'formData': {
				handler(newValue, oldValue) {
					this.remarkDisabled = !(newValue.remark && newValue.message)
				},
				deep: true
			},
			'sendValue'(newValue){
				this.disabled = !newValue.length
			}
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
			handleIptBlur(){
				let [integer, decimal] = this.sendValue.split('.')
				if(!decimal) {
					this.sendValue = this.sendValue + '.00'
					return
				} 
				else if(decimal && decimal.length === 1) {
					this.sendValue = integer + '.' + decimal + '0'
					return
				}else if (decimal && decimal.length > 2) {
					this.sendValue = integer + '.' +decimal.substr(0, 2)
					return
				}
			},
			handleSubmit(){
				if(this.disabled) return
				uni.navigateTo({
					url: '/pages/account/accountLimit'
				});
				
			},
			handleBlur(type) {
				if (type === 'remark') {
					this.remarkFocus = false
				} else if (type === 'message') {
					this.messageFocus = false
				}
			},
			handleFocus(type) {
				if (type === 'remark') {
					this.remarkFocus = true
				} else if (type === 'message') {
					this.messageFocus = true
				}
			},
			handleType(type) {
				this.sendType = type
			},
			handleShowAccount(type, posi) {
				this.$refs[type].open(posi || 'bottom')

			},
			handleClosePop(type) {
				this.$refs[type].close()
			},
			handleRemarkSubmit() {
				if (this.remarkDisabled) return

				this.handleClosePop('remarkPopup')
			}
		}
	}
</script>

<style lang="scss">
	.write-money {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.nav-step {
			margin: 0 auto;
			width: 90%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 16rpx;

			view {
				flex: 1;
				height: 4rpx;
				border-radius: 7px;
				background: #D8D8D8;

				&.active {
					background-color: #C53455;
				}
			}
		}


		.nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}
		}

		.length-text {
			color: #999;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 32rpx;
			text-align: right;
		}


		.content {
			flex: auto;
			padding: 0 32rpx;
			display: flex;
			flex-direction: column;

			.remark-info-title {
				margin-top: 16rpx;
				color: #999;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;
			}

			.remark-info-content {
				margin-top: 6rpx;
				color: #333;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;
			}



			.remark {
				margin-top: 96rpx;
				margin-bottom: 14rpx;
				display: flex;
				align-items: center;


				text {
					color: #333;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 32rpx;
					/* 123.077% */
				}

				.edit {
					color: #5F325D;
					font-size: 26rpx;
				}

				image {
					margin-left: 16rpx;
					width: 48rpx;
					height: 48rpx;
				}
			}


			.is-input-border {
				border: none !important;
				border-bottom: 2rpx solid #DEDEDE !important;
				border-radius: 0 !important;
				padding: 0 !important;

				&.is-focused {
					border-bottom: 2rpx solid #000 !important;

				}
			}

			.input-place {
				color: #000;
				font-size: 40rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 56rpx;

			}

			.uni-easyinput__content,
			.uni-easyinput__content-input {
				height: 110rpx;
			}

			.uni-input-input {
				padding-bottom: 20rpx;
				text-align: right;
				font-size: 84rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 84rpx;
				/* 100% */
			}

			.uni-input-placeholder {
				text-align: right;
				font-size: 84rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 84rpx;
				color: #666;
			}

			.title {
				margin-top: 52rpx;
				margin-bottom: 120rpx;
				color: #666;
				font-size: 40rpx;
				font-style: normal;
				font-weight: 300;
				line-height: 56rpx;
				/* 140% */
			}

			.tips2 {
				margin-top: 70rpx;
				color: #999;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;
				/* 123.077% */
			}

			.send-type {
				&-item {
					margin-top: 32rpx;
					display: flex;
					align-items: center;

					image {
						width: 72rpx;
						height: 72rpx;
					}

					text {
						margin-left: 24rpx;
						color: #666;
						font-size: 26rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 32rpx;

						/* 123.077% */
						&.active {
							color: #333;
						}
					}
				}
			}

			.choose-submit {
				display: flex;
				margin-top: auto;
				margin-bottom: 60rpx;
				width: 100%;
				height: 86rpx;
				justify-content: center;
				align-items: center;
				border-radius: 10000px;
				background: #C53455;
				color: #fff;
				border: none;

				&.disabled {
					background-color: #EBEBEB;
					color: #828282;
				}
			}

		}

		.account-pop {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding-top: 48rpx;
			box-sizing: border-box;

			.formData {
				flex: auto;
				display: flex;
				flex-direction: column;
				padding: 0 32rpx;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.uni-forms-item {
				margin-top: 20rpx;
			}

			.bank-submit {
				margin-top: auto;
				margin-bottom: 60rpx;
				display: flex;
				width: 100%;
				height: 76rpx;
				justify-content: center;
				align-items: center;
				gap: 16rpx;
				flex-shrink: 0;
				border-radius: 10000px;
				background: #C53455;
				border: none;
				color: #fff !important;

				&.disabled {
					background-color: #EBEBEB;
					color: #828282;
				}
			}


			.input-top-label {
				color: #888;
				font-size: 26rpx;
				font-style: normal;
				font-weight: 400;
			}

			.input-place {
				position: absolute;
				color: #888;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				z-index: 0;
			}

			.is-input-border {
				border: none !important;
				border-bottom: 2rpx solid #DEDEDE !important;
				border-radius: 0 !important;
				padding: 0 !important;

				&.is-focused {
					border-bottom: 4rpx solid #000 !important;

				}
			}

			.is-disabled {
				background-color: #fff !important;


			}

			.uni-input-input {
				color: #333;
				font-size: 28rpx;
				letter-spacing: 1rpx;
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

			.custom-placeholder {
				color: red;
				font-size: 52rpx !important;
			}

			.my-account-head {
				flex: none;
				padding: 0 32rpx;
				color: #5F325D;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}




			.my-account-title {
				flex: none;
				margin-top: 20rpx;
				margin-bottom: 100rpx;
				padding: 0 32rpx;
				color: #333;
				font-size: 40rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 50rpx;
			}
		}
	}

</style>