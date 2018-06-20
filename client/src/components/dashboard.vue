<template>
    <div class="container">
        <div class="youtube">
            <img src="http://pngimg.com/uploads/youtube/youtube_PNG21.png" alt="">
            <div class="section primary subscribers">
                <span class="heading">Subscribers</span>
                <span class="counter">
                    {{ subscribers }}
                </span>
            </div>
            <div class="secondary-sections">
                <div class="section secondary totalChannelViews">
                    <span class="heading">View count</span>
                    <span class="counter">
                    {{ viewCount }}
                </span>
                </div>
                <div class="section secondary totalChannelViews">
                    <span class="heading">Video count</span>
                    <span class="counter">
                    {{ videoCount }}
                </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import axios from 'axios'

  export default {
    name: 'Dashboard',
    methods: {
      async pollYoutubeStatistics () {
        const response = await axios.get('http://localhost:8080/youtube/statistics')
        const {subscriberCount, viewCount, videoCount} = response.data.statistics
        this.subscribers = subscriberCount
        this.viewCount = viewCount
        this.videoCount = videoCount
      }
    },
    data () {
      return {
        videoCount: '',
        subscribers: '',
        viewCount: ''
      }
    },
    created () {
      this.pollYoutubeStatistics()

      setInterval(function () {
        this.pollYoutubeStatistics()
      }.bind(this), 60000)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #555;
        color: white;

        .youtube {
            .section {
                overflow: hidden;
                background-color: #333;
                box-shadow: 0 0 0.05em black inset;
                position: relative;
                display: block;
                min-width: 200px;

                &.primary {
                    .counter {
                        font-size: 8em;
                        padding: 0px 200px;
                    }
                }

                &.secondary {
                    .counter {
                        font-size: 3em;
                        padding: 40px 20px;
                    }
                    .heading {
                        font-size: 14px;
                    }
                }
            }

            .counter {
                display: block;
            }

            .secondary-sections {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 30px 0;
                background: #4c4c4c;
                margin-top: 10px;
            }
            .heading {
                position: absolute;
                left: 10px;
                top: 10px;
            }

        }
    }
</style>
