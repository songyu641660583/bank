<template>
  <view class="loading-wrap">
    <view class="model">
      <image src="@/static/loading.gif" mode="widthFix"></image>
    </view>
  </view>
</template>
<style>
.loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;


}

.model {
  width: 230rpx;
  height: 180rpx;
  background: #666;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.model image {
  width: 130rpx;
}
</style>