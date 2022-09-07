<template>
    <div>
        <h1>{{title}}</h1>
        <v-md-editor :model-value="previewData" mode="preview"></v-md-editor>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

import { blogDetail, BlogDetailApiData } from '../request/api'

import { useRoute } from 'vue-router'

export default defineComponent({
    setup () {
        const previewData: Ref<string> = ref('')
        const title: Ref<string> = ref('') 
        
        const route = useRoute()
        
        const getBlogDetail = () => {

            const data: BlogDetailApiData = {
                id: route.query?.id as string
            }
            blogDetail(data).then((res: any) => {
                

                previewData.value = res.data.content
                title.value = res.data.title

            })
        }

        getBlogDetail()

        return {
            previewData,
            title
        }
    }
})
</script>

<style scoped>

</style>