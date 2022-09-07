<template>
    <div>
        <v-md-editor
            :disabled-menus="[]"
            :height="height"
            @change="handleChange"
            v-model="newValue"
            ></v-md-editor>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, watch } from 'vue'

export default defineComponent({
    props: {
        height: {
            type: String,
            default: '400px'
        },
        content: {
            type: String,
            default: ''
        }
    },
    emits: ['change'],
    setup (props, { emit }) {
        let newValue = ref('')

        watch(() => props.content, () => {
            if (props.content) {
                newValue.value = props.content
            }
        });
    
        const handleChange = (text: string, html: string) => {
            emit('change', text)
        }

        return {
            newValue,
            handleChange,
        }
    }
})
</script>

<style scoped>

</style>