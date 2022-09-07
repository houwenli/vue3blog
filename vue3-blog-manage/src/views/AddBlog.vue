<template>
    <div>
        <el-input
            v-model="textarea"
            :rows="2"
            type="textarea"
            placeholder="Please input"
        />
        <editor-comp @change="dealBlogContent"></editor-comp>

        <el-button type="primary" class="publish" @click="publishArticle">发布文章</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EditorComp from '@/components/EditorComp.vue';

import { AddBlogApiData, addBlog } from '../request/api'

import { useRouter } from 'vue-router'

export default defineComponent({
    setup () {
        const router = useRouter()

        const textarea = ref('')
        const blogContent = ref('')

        const dealBlogContent = (text: string) => {
            blogContent.value = text
        }

        const publishArticle = () => {
            const data: AddBlogApiData = {
                title: textarea.value,
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
            textarea,
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