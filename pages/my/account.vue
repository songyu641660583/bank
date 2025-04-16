<template>
	<view class="my-page">
		<uni-nav-bar right-width="280rpx" :fixed="true" :border="false" :style="{paddingTop: statusBarHeight + 'px'}">
			<template #left>
				<view class="nav-left" @click="handleHome">
					<image src="@/static/close-icon.png" mode="widthFix"></image>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<view>A<text class="small">A</text></view>
					<view>English</view>
					<image src="@/static/search-icon.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="info-head">
				<view class="my-info flex-between">
					<view class="my-info-data">
						<view class="my-name">WENG LANG</view>
						<view class="flex-align-center account-opt">
							<text>账户概览</text>
							<image src="@/static/right-arrow2.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="logout">
						登出
					</view>
				</view>

				<view class="my-options">
					<image src="@/static/my-head.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="options-wrap" v-for="(item, index) in rowList" :key="index">
				<view class="options-item flex-between" v-for="(optItem, optIndex) in item" :key="optIndex">
					<view class="flex-align-center">{{optItem.name}}<text class="sub-text" v-if="optItem.subText">{{optItem.subText}}</text></view>
					<image v-if="optItem.showIcon" src="@/static/down-black.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="tips-data">
				<view class="tips1">无障碍服务</view>
					<view class="tips2">更多中国银行（香港）服务，请浏览：</view>
					<view class="tips1">网上银行</view>
					<view class="tips3" style="margin-top: 42rpx;">版本7.2.9手机</view>
					<view class="tips3">流动保安编码：已启用</view>
					<view class="tips3">版权所有 © 中国银行(香港)有限公司</view>
			</view>
		</view>
		<view class="last-login">最后一次成功登入: (香港时间) 2025/4/16 15:55:47 (手机) 地理位置: 中国</view>
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
				rowList: [
					[{
							name: '转账及缴费',
							showIcon: true,
						},
						{
							name: '分行服务',
							showIcon: true,
						},
					],
					[{
							name: '智慧赏',
							subText: '新'
						},
						{
							name: '投资市场评论',
						},
						{
							name: '推荐亲友',
						},
					],
					[{
							name: '账户',
							showIcon: true,
						},
						{
							name: '发薪账户',
						},
						{
							name: '存款',
							showIcon: true,
						},
						{
							name: '外汇',
							showIcon: true,
						},
						{
							name: '信用卡',
							showIcon: true,
						},
						{
							name: '财富策划',
							showIcon: true,
						},
						{
							name: '保险',
							showIcon: true,
							subText: '新'
						},
						{
							name: '证券',
							showIcon: true,
						},
						{
							name: '基金',
							showIcon: true,
						},
						{
							name: '债券/存款证',
							showIcon: true,
						},
						{
							name: '跨境理财通',
						},
						{
							name: '按揭',
							showIcon: true,
						},
						{
							name: '贷款',
							showIcon: true,
						},
						{
							name: '强积金',
						},
						{
							name: '其他投资',
							showIcon: true,
						},
					],
					[{
							name: '设定'
						},
						{
							name: '意见反应(一般查询/删除账户)',
						},
					]
				]
			}
		},
		methods: {

			handleHome() {
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-page {
		z-index: 9999;
		padding-bottom: 130rpx;
		background-color: #f5f5f5;

		.nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}

		}

		.nav-right {
			width: 100%;
			display: flex;
			justify-content: space-between !important;
			align-items: center;
			color: #333;
			font-size: 28rpx;

			.small {
				font-size: 20rpx;
			}
		}

		.content {
			flex: auto;
			display: flex;
			flex-direction: column;
			.tips-data {
				padding: 0 32rpx;
				font-size: 24rpx;
				.tips1 {
					margin-top: 42rpx;
					color: #C53455;
				}
				.tips2 {
					margin-top: 42rpx;
					color: #666;
				}
				.tips3 {
					color: #666;
				}
			}
			
			.options-wrap {
				padding: 0 32rpx;
				border-top: 10rpx solid #EBEBEB;
				background: #fff;
				.options-item {
					padding: 32rpx 0;
					color: #333;
					text-align: center;
					font-size: 34rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 100%; /* 18px */
					border-top: 1px solid #F1F1F1;
					.sub-text {
						background-color: #C53455;
						padding: 0rpx 24rpx;
						border-radius: 100px;
						font-size: 18rpx;
						color: #fff;
						margin-left: 12rpx;
						
					}
					&:first-child{
						border-top: 0;
					}
					image {
						width: 22rpx;
					}
				}
			}

			.my-options {
				margin-top: -30rpx;

				image {
					width: 100%;
				}
			}

			.my-info {
				background-color: #fff;
				padding: 16rpx 32rpx 32rpx;

				.my-name {
					font-weight: bold;
					font-size: 40rpx;
					color: #000;
				}

				&-data {
					image {
						margin-left: 26rpx;
						width: 42rpx;
						height: 42rpx;
					}
				}
			}

			.logout {
				border-radius: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #333;
				padding: 12rpx 36rpx;
				border: 1px solid #999;
				font-size: 22rpx;
			}
		}

		.last-login {
			position: fixed;
			left: 0;
			right: 0;
			background-color: #fff;
			padding: 12rpx 24rpx;
			bottom: 0;
			font-size: 24rpx;
			color: #666;
		}
	}
</style>