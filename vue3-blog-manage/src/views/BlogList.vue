<template>
    <div>
        <div class="top">
            <el-form :inline="true" :model="blogSearch" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="blogSearch.user" placeholder="用户名" />
                </el-form-item>
                <el-form-item label="博客标题">
                    <el-input v-model="blogSearch.keyword" placeholder="博客标题" />
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="onSubmit">Query</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="bottom">
            <el-table @row-click="handleRowClick" :data="blogData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="content" label="内容" width="180" />
                <el-table-column prop="author" label="作者" />
                <el-table-column prop="createtime" label="时间" />
                <el-table-column align="center" label="操作" >
                    <!-- <template #header>
                        操作
                    </template> -->
                    <template #default="scope">
                        <el-button size="small" @click.stop="handleEdit(scope.$index, scope.row)">
                            Edit
                        </el-button>
                        <!-- <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >Delete</el-button
                        > -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <el-pagination 
            @current-change="currentChange" 
            :page-size="blogSearch.pagesize"
            class="pagination" 
            background 
            layout="prev, pager, next" 
            :total="blogSearch.count"
            :current-page="blogSearch.page" />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { ListApiData, getBlogList } from '../request/api'
import { BlogList } from '../type/blog'

export default defineComponent({
    setup () {
        const router = useRouter()
        
        // 博客列表需要数据
        const blogListData = reactive(new BlogList())

        watch(
            [() => blogListData.blogSearch.keyword, () => blogListData.blogSearch.user],
            ([keyword, user])=>{
                if (!keyword && !user) {
                    getList()
                }
            }
        )

        // 进页面获取数据
        getList()
        function getList() {
            const blogSearch = blogListData.blogSearch
            const data: ListApiData = {
                author: blogSearch.user,
                keyword: blogSearch.keyword,
                page: blogSearch.page,
                pagesize: blogSearch.pagesize
            }
            // 获取数据
            getBlogList(data).then((res: any) => {
                const blogData = res.data
                blogListData.blogData = blogData.list
                blogListData.blogSearch.count = blogData.count
            })
        }

        const onSubmit = () => {
            blogListData.blogData = []
            
            getList()
        }

        const currentChange = (page: number) => {
            blogListData.blogSearch.page = page
            blogListData.blogData = []
            
            getList()
        }

        const handleEdit = (index: number, raw: any) => {
            // 去编辑页
            router.push({
                name: 'editblog',
                query: {
                    id: raw.id
                }
            })
        }

        const handleRowClick = (raw: any) => {
            // 去详情页
            router.push({
                name: 'blogdetail',
                query: {
                    id: raw.id
                }
            })
        }
        

        return {
            ...toRefs(blogListData),
            onSubmit,
            currentChange,
            handleEdit,
            handleRowClick
        }
    }
})
</script>

<style scoped>
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>