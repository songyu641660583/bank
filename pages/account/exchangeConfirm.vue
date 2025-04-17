<template>
	<view class="exchange-confirm-page">
		<uni-nav-bar :border="false" :style="{ paddingTop: statusBarHeight + 'px', flex: 'none' }">
			<template #left>
				<view class="nav-left" @click="goBack()">
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
			<view class="content-title">
				请确认以下资料是否正确。
			</view>
			<view class="info-model" v-if="exchangeInfo">
				<view class="info-head flex-between">
					<view class="info-title">账户</view>
				</view>
				<view class="info-content-item flex-between">
					<view class="info-content-title">
						提款账户
					</view>
					<view class="info-content-account">
						<view class="info-account-name">{{ exchangeInfo.type === '买入' ? exchangeInfo.getAccountInfo.name :
							exchangeInfo.setAccountInfo.name}}</view>
						<view class="info-account-text">{{ exchangeInfo.type === '买入' ? exchangeInfo.getAccountInfo.accountNumber :
							exchangeInfo.setAccountInfo.accountNumber}}</view>
					</view>
				</view>
				<view class="info-content-item flex-between">
					<view class="info-content-title">
						存款账户
					</view>
					<view class="info-content-account">
						<view class="info-account-name">{{ exchangeInfo.type === '买入' ? exchangeInfo.setAccountInfo.name :
							exchangeInfo.getAccountInfo.name}}</view>
						<view class="info-account-text">{{ exchangeInfo.type === '买入' ? exchangeInfo.setAccountInfo.accountNumber :
							exchangeInfo.getAccountInfo.accountNumber}}</view>
					</view>
				</view>
			</view>
			<view class="info-model" v-if="exchangeInfo">
				<view class="info-head flex-between">
					<view class="info-title">交易详情</view>
				</view>
				<view class="info-content-item flex-between" style="align-items: center;">
					<view class="info-content-title">
						{{ exchangeInfo.type }}
					</view>
					<view class="info-content-account">
						<view class="info-account-name red" :class="{ green: exchangeInfo.type === '买入' }">
							{{ exchangeInfo.setCurrencyInfo.name }} <text class="money">{{ exchangeInfo.setValue }}</text></view>
					</view>
				</view>
				<view class="info-content-item flex-between" style="align-items: center;margin-top: -0rpx;">
					<view class="info-content-title">
						{{ exchangeInfo.type2 }}
					</view>
					<view class="info-content-account">
						<view class="info-account-name red" :class="{ green: exchangeInfo.type === '卖出' }">
							{{ exchangeInfo.getCurrencyInfo.name }} <text class="money">{{ exchangeInfo.getValue }}</text></view>
					</view>
				</view>
				<view class="info-tips flex-between">
					<view>
						兑换率
					</view>
					<view>
						<view class="rateText">
							{{ exchangeInfo.rateText }}
						</view>
						<view class="update-tips flex-align-center">
							<image src="@/static/tanhao.png" mode="widthFix"></image>
							<text> 兑换率已更新。</text>
						</view>
					</view>
				</view>
			</view>
			<view class="write-tips">
				请阅读<text>风险披露</text>及<text>备注</text>
			</view>
			<view class="choose-submit" @click="handleSubmit">
				同意及确认
			</view>

		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			exchangeInfo: null
		}
	},
	onLoad() {
		const app = getApp()
		this.statusBarHeight = app.statusBarHeight
	},
	mounted() {
		
		uni.getStorage({
		  key: 'exchangeInfo',
		  success: (res) => {
			if (res) {
				this.exchangeInfo = JSON.parse(res.data)
			}
		  },
		});
	
	},

	methods: {
		handleSubmit() {
			uni.navigateTo({
				url: '/pages/account/exchangeLimit'
			})
		},
		goBack() {
			uni.navigateBack()
		},
	}
}
</script>

<style lang="scss">
.exchange-confirm-page {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #fff;

	.nav-left,
	.nav-right {
		image {
			width: 48rpx;
		}
	}

	.content {
		padding: 64rpx 32rpx 32rpx;
		display: flex;
		flex-direction: column;
		flex: auto;
		overflow-y: hidden;
		box-sizing: border-box;

		.write-tips {
			margin-top: 68rpx;
			color: #666;
			font-size: 26rpx;

			text {
				color: #5F325D
			}
		}

		.update-tips {
			margin-top: 12rpx;
			justify-content: flex-end;

			image {
				margin-right: 4rpx;
				width: 32rpx;
				height: 32rpx;
			}

		}

		.content-title {
			// color: #5F325D;
			color: #333;
			font-size: 46rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 48rpx;
			letter-spacing: 1rpx;
		}

		.info-model {
			margin-top: 40rpx;
			padding-bottom: 32rpx;
			border-radius: 16rpx;
			background: #FFF;
			box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.24);
			overflow: hidden;

			.info-tips {
				align-items: flex-start;
				margin: 30rpx 32rpx 0;
				padding: 30rpx 0 0;
				border-top: 2rpx solid #DEDEDE;
				color: #666;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 42rpx;
				/* 150% */
				letter-spacing: 2rpx;
				text-align: right;

				.rateText {
					color: #333;
				}
			}

			.info-account-date {
				color: #333;
			}

			.account-info-balance {

				color: #333;
				text-align: right;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;

				.type {
					color: #888;
					font-size: 26rpx;
				}

				/* 114.286% */
				.value {
					margin-left: 4rpx;
					font-size: 72rpx;
					font-weight: 400;
					line-height: 150%;
					/* 60px */
					letter-spacing: 2rpx;
				}
			}

			.info-content-item {
				margin-top: 32rpx;
				padding: 0rpx 32rpx;
				min-height: 64rpx;
				align-items: flex-start;

				.info-content-title {
					width: 160rpx;
					flex: none;
					color: #666;
					font-size: 28rpx;
					font-weight: 400;
					line-height: 36rpx;
					/* 128.571% */
				}

				.info-content-account {
					flex: auto;
					color: #888;
					text-align: right;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 36rpx;

					/* 150% */
					.info-account-name {
						margin-bottom: 4rpx;
						color: #333;
						font-size: 28rpx;
						line-height: 36rpx;
						/* 138.462% */
						font-weight: 400;

						&.red {
							color: #9D1425;
						}

						.money {
							font-size: 34rpx;
						}

						&.green {
							color: #327274 !important;
						}
					}

					.info-account-text {
						margin-bottom: 6rpx;

					}
				}
			}

			.info-head {
				padding: 16rpx 32rpx;
				height: 80rpx;
				background: #F8F8F8;
				color: #333;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 36rpx;

				/* 128.571% */
				.info-edit {
					color: #5F325D;
					font-size: 24rpx;
				}
			}

		}


		.choose-submit {

			margin: auto 32rpx 40rpx;
			display: flex;
			height: 96rpx;
			justify-content: center;
			align-items: center;
			gap: 16rpx;
			flex-shrink: 0;
			border-radius: 10000px;
			background: #C53455;
			color: #fff;
			border: none;
		}
	}
}
</style>
