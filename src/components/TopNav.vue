<script setup lang="ts">
import Button from "primevue/button";
import CreateProductionLine from "./CreateProductionLine.vue";

const props = defineProps<{ showDelete: boolean }>();

const emit = defineEmits<{
    (e: 'on-new', slug: string, success: () => void, failure: () => void): boolean,
    (e: 'on-delete'): void,
}>();

function on_new(slug: string, success: () => void, failure: () => void) {
    emit('on-new', slug, success, failure);
}

</script>

<template>
    <div class="flex justify-content-between align-items-center p-3">
        <h1>Satisfactory Planner</h1>

        <div class="flex gap-3">
            <CreateProductionLine @on-new="on_new" />
            <Button v-if="props.showDelete" severity="danger" label="Delete" icon="pi pi-trash"
                @click="emit('on-delete')" />
        </div>

    </div>
</template>
