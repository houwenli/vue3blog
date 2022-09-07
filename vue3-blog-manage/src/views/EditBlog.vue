<template>
    <div>
        <el-input
            v-model="blogTitle"
            :rows="2"
            type="textarea"
            placeholder="Please input"
        />
        <editor-comp 
            @change="dealBlogContent"
            :content="blogContent"></editor-comp>

        <el-button type="primary" class="publish" @click="publishArticle">发布文章</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EditorComp from '@/components/EditorComp.vue';

import { AddBlogApiData, addBlog, BlogDetailApiData, blogDetail } from '../request/api'

import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
    setup () {
        const router = useRouter()
        const route = useRoute()

        const blogTitle = ref('')
        const blogContent = ref('')

        const dealBlogContent = (text: string) => {
            blogContent.value = text
        }

        // 获取文章内容
        const getBlogDetail = () => {

            const data: BlogDetailApiData = {
                id: route.query?.id as string
            }
            blogDetail(data).then((res: any) => {

                blogContent.value = res.data.content
                
                blogTitle.value = res.data.title

            })
        }

        getBlogDetail()

        const publishArticle = () => {
            const data: AddBlogApiData = {
                title: blogTitle.value,
                content: blogContent.value
            }
            // 获取数据
            addBlog(data).then((res: any) => {
                if (res.errno == 0) {
                    // 跳转到列表页
                    router.push({
                        name: 'bloglist'
                    })
                }
            })
        }
        return {
            dealBlogContent,
            blogTitle,
            blogContent,
            publishArticle
        }
    },
    components: {
        editorComp: EditorComp
    }
})
</script>

<style scoped>
    .publish {
        margin: 20px;
    }
</style>