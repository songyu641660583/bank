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
					<view class="active"></view>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="title">请确认以下资料</view>
			<view class="info-model">
				<view class="info-head flex-between">
					<view class="info-title">转入/转出账户</view>
					<view class="info-edit">编辑</view>
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
				<view class="info-tips">转账时，收款人名称或不会被复核。请小心核对收款人户口号码及其他付款资料。</view>
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
			<view class="info-content-item flex-between" style="border-top:1px solid #DEDEDE;padding-top: 32rpx;align-items: center;">
				<view class="info-content-title">
					金额
				</view>
				<view class="info-content-account">
					<view class="account-info-balance" >
						<text class="type">{{transferInfo.type}}</text>
						<text class="value"> {{transferInfo.money}} </text>
						<text class="decimal">.{{transferInfo.decimal}}</text>
					</view>
					<view class="info-account-tips3">豁免转账费用</view>
				</view>
			</view>
		</view>
	
		<view class="bottom-tips">
			<view style="margin-bottom:32rpx">
				备注：收款人在一般情况下可实时收到款项，惟收款银行/机构或设有收款限制，实际收款情况及时间或会按收款银行/机构的处理而不同。如有需要，请向有关收款银行/机构了解。
			</view>
			<view style="margin-bottom:32rpx">
				您可于30天内在本行网页www.bochk.com下载并储存以下条款及细 则，有关限期过后您未必能够下载或储存同一版本的该等资料。
			</view>
			<view style="margin-bottom:32rpx">
				本人已阅悉、明白及接受<text class="link">「小额转账使用条款及细则」</text>、<text class="link">「汇款条款」</text>及<text class="link">「服务条款」</text>中有关「快速支付系统」的相关条款及细则。
			</view>
			<view>
				此交易将扣减当日的非登记收款人每天转账总限额。
			</view>
		</view>
		<view class="choose-submit"  @click="handleSubmit">
			同意及确认
		</view>
				
		</view>


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
			goBack() {
				uni.navigateBack()
			},
			handleSubmit() {
				if (this.disabled) return
				uni.navigateTo({
					url: '/pages/account/accountLimit'
				});

			},
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


		.content {
			flex: auto;
			padding: 0 32rpx;
			display: flex;
			flex-direction: column;
			.bottom-tips {
				color: #888;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 180%; /* 21.6px */
				letter-spacing: 1rpx;
				.link {
					color: #5F325D;
				}
			}
			.choose-submit {
			
				margin-top: 48rpx;
				margin-bottom: 40rpx;
				display: flex;
				width: 100%;
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

			.title {
				margin-top: 52rpx;
				margin-bottom: 20rpx;
				color: #666;
				font-size: 48rpx;
				font-style: normal;
				font-weight: 300;
				line-height: 60rpx;
				/* 140% */
			}

		}


	}
</style>