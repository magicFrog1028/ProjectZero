<template>
    <button @click="generateImg({
    'argumentStr':'123'
})">click</button>
    <img :src="`data:image/png;base64,${defaultImg}`" />
</template>
<script>

import decodeImg from '@/utils/decodeImg';
import { txt2Img } from '@/api/graphics.js'
export default 


{
    data () {
				return {
                    defaultImg:""
				  }
		 },

         methods:{
            async generateImg(args){
        console.log("hi");
        let img = await  txt2Img(args);
        console.log(img.data[0]);
        this.defaultImg = img.data[0];
        decodeImg(img);
    },
         }
}

</script>