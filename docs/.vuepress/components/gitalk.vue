<!-- <template>
  <div id="gitalk-container"></div>
</template>
<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
export default {
  name: 'gitalk',
  data () {
    return {
    }
  },
  mounted (){
  	this.init();
  },
  methods: {
  	init() {
  		var gitalk = new Gitalk({
		  clientID: '54a8ac68921be8b45ec0',
		  clientSecret: '230aa0c74e191ee05e7233cb324a52fe5588e391',
		  repo: 'https://chenyejun.github.io',
		  owner: 'chenyejun',
		  admin: ['chenyejun'],
		  id: location.pathname,      // Ensure uniqueness and length less than 50
		  distractionFreeMode: false  // Facebook-like distraction free mode
		})

		gitalk.render('gitalk-container');
  	}
  }
};
</script>
<style>
</style>
 -->