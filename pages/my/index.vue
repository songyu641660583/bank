<template>
	<view class="my-page">
		<uni-nav-bar right-width="280rpx" :fixed="true" :border="false" :style="{paddingTop: statusBarHeight + 'px'}">
			<template #left>
				<view class="nav-left">
					<image src="@/static/close-icon.png" mode="widthFix"></image>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<view>Aa</view>
						<view>English</view>
					<image src="@/static/search-icon.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.my-page {
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
	}
}
		
</style>
