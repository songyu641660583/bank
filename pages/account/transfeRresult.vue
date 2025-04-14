<template>
	<view class="transfer-result">
		<uni-nav-bar left-width="52rpx" right-width="52rpx" :border="false"
			:style="{paddingTop: statusBarHeight + 'px', flex:'none'}">
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="transfer-status">
				<view class="status-img">
					<image v-if="status === 'loading'" class="loading" src="@/static/result-loading.png"
						mode="widthFix"></image>
					<image v-else class="success" src="@/static/result-success.png" mode="widthFix"></image>
				</view>
				<view class="status-text">
					<view v-if="status === 'loading'" class="loading" style="margin-bottom: 32rpx">待收款银行/机构确认（2）</view>
					<view v-else class="success">
						<view>款项已成功发送给收款人</view>
						<view class="success-date">2024/09/09 16:27:56入账</view>
					</view>
				</view>
				<view class="status-number">参考编号 2425312441945</view>
				<view class="status-options">
					<view class="options-item flex-align-center">
						<image src="@/static/download.png" mode="widthFix"></image>
						<text>储存详情</text>
					</view>
					<view class="options-item flex-align-center">
						<image src="@/static/share.png" mode="widthFix"></image>
						<text>分享</text>
					</view>
				</view>
			</view>
		<view class="info-model">
				<view class="info-head flex-between" style="justify-content: center;">
					<view class="info-title">转入/转出账户</view>
				</view>
				<view class="info-content-item flex-between">
					<view class="info-content-title">
						付款人/账户
					</view>
					<view class="info-content-account">
						<view class="info-account-name" v-if="payerAccount.userName">{{payerAccount.userName}}</view>
						<view class="info-account-text" v-if="payerAccount.name">{{payerAccount.name}}</view>
						<view class="info-account-text">{{payerAccount.accountNumber}}</view>
					</view>
				</view>
				<view class="info-content-item flex-between">
					<view class="info-content-title">
						收款人/账户
					</view>
					<view class="info-content-account">
						<view class="info-account-name">{{payeeAccount.name}}</view>
						<view class="info-account-text">{{payeeAccount.accountNumber}}</view>
						<view class="info-account-text" v-if="payeeAccount.bank">{{payeeAccount.bank}}</view>
					</view>
				</view>
			</view>
		<view class="info-model">
			<view class="info-head flex-between">
				<view class="info-title">转账详情</view>
				<view class="info-edit">编辑</view>
			</view>
			<view class="info-content-item flex-between" style="align-items: center;">
				<view class="info-content-title">
					转账日期
				</view>
				<view class="info-content-account">
					<view class="info-account-date">实时</view>
				</view>
			</view>
			<view class="info-content-item flex-between" style="align-items: center;">
				<view class="info-content-title">
					转账编号
				</view>
				<view class="info-content-account">
					<view class="info-account-date">12240909F478824188</view>
					<view class="options-copy flex-align-center">
						<image src="@/static/copy.png" mode="widthFix"></image>
						<text>复制编号</text>
					</view>
				</view>
			</view>
			<view class="info-content-item flex-between">
				<view class="info-content-title">
					金额
				</view>
				<view class="info-content-account">
					<view class="account-info-balance" style="margin-top: -54rpx;">
						<text class="type">{{transferInfo.type}}</text>
						<text class="value"> {{transferInfo.money}} </text>
						<text class="decimal">.{{transferInfo.decimal}}</text>
					</view>
					<view class="info-account-tips3">豁免转账费用</view>
				</view>
			</view>
		</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'success',
				transferInfo: {
					type: '港元',
					money: '266',
					decimal: '00'
				},
				payerAccount: {},
				payeeAccount: {}
			}
		},
		mounted(){
			this.payerAccount = localStorage.getItem('payerAccount') && JSON.parse(localStorage.getItem('payerAccount')) || {}
			this.payeeAccount = localStorage.getItem('payeeAccount') && JSON.parse(localStorage.getItem('payeeAccount')) || {}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.transfer-result {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}
		}


		.content {
			flex: auto;
			padding: 0 32rpx;
			display: flex;
			flex-direction: column;
			.options-copy {
				margin-top: 10rpx;
				color: #5F325D;
				font-size: 26rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 36rpx; /* 138.462% */
				justify-content: flex-end;
				image {
					margin-right: 16rpx;
					width: 48rpx;
					height: 48rpx;
				}
			}

	.info-model {
				margin-bottom: 64rpx;
				border-radius: 16rpx;
				background: #FFF;
				box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.24);
				overflow: hidden;
				.info-tips {
					margin: 0 32rpx;
					padding: 24rpx 0;
					border-top: 2rpx solid  #DEDEDE;
					color: #888;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 42rpx; /* 150% */
					letter-spacing: 2rpx;
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
					padding: 32rpx;
					min-height: 64rpx;
					align-items: flex-start;
					
					.info-content-title {
						width: 160rpx;
						flex: none;
						color: #333;
						font-size: 28rpx;
						font-weight: 400;
						line-height: 36rpx; /* 128.571% */
					}
					.info-content-account {
						flex: auto;
						color: #888;
						text-align: right;
						font-size: 24rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 36rpx; /* 150% */
						letter-spacing: 1rpx;
						.info-account-name {
							margin-bottom: 4rpx;
							color: #333;
							font-size: 26rpx;
							line-height: 36rpx; /* 138.462% */
						}
						.info-account-text {
							margin-bottom: 6rpx;
						}
					}
				}

				.info-head {
					padding: 16rpx 32rpx;
					height: 96rpx;
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

			.transfer-status {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 16rpx 0 64rpx;
				.status-options {
					margin-top: 64rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 48rpx;
					color:  #5F325D;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
					line-height:36rpx; /* 150% */
					image {
						margin-right: 16rpx;
						width: 32rpx;
						height: 32rpx;
					}
				}

				.status-img {
					image {
						width: 105rpx;
						height: 105rpx;
					}
				}

				.status-number {
					color: #333;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 36rpx;
					/* 128.571% */
				}

				.status-text {
					margin-top: 32rpx;
					margin-bottom: 4rpx;
					color: #666;
					text-align: center;
					font-size: 48rpx;
					font-style: normal;
					font-weight: 300;
					line-height: 56rpx;

					/* 116.667% */
					.success-date {
						margin-top: 8rpx;
						margin-bottom: 16rpx;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 36rpx;
						/* 128.571% */
					}
				}

			}
		}
	}
</style>