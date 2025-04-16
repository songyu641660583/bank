<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				bottomBarHeight: 0
			}
		},
		onLaunch: function() {
			uni.getSystemInfo({
				success: (res) => {
					
					this.statusBarHeight = res.statusBarHeight
					this.bottomBarHeight = res.platform === 'h5' ? 50 : 48; // h5 50, Android 48px
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';
	@import '@/static/customicons.css';

	page {
		background-color: #fff;
	}

	:root {
		--status-bar-height: var(--status-bar-height, 20px);
		--safe-area-top: env(safe-area-inset-top);
	}

	.custom-navbar {
		padding-top: calc(var(--status-bar-height) + var(--safe-area-top));
		height: calc(44px + var(--status-bar-height) + var(--safe-area-top));
	}
	.nav-right{
		mix-blend-mode: multiply;
	}

	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	.flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.flex-align-center {
		display: flex;
		align-items: center;
	}
</style>