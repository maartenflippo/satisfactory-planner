<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import hotkeys from 'hotkeys-js';

const emit = defineEmits<{
    (e: 'on-new', slug: string, success: () => void, failure: () => void): boolean
}>()

const visible = ref(false);
const production_line_name = ref("");

hotkeys('ctrl+a', (event) => {
    event.preventDefault()
    open_modal();
});

function open_modal() {
    production_line_name.value = "";
    visible.value = true;
}

function cancel() {
    visible.value = false;
}

function create() {
    emit('on-new', production_line_name.value, () => visible.value = false, () => { });
}

function submit(e: Event) {
    e.preventDefault();
    create();
}
</script>

<template>
    <Button label="New Production Line" icon="pi pi-plus" @click="open_modal" />
    <Dialog v-model:visible="visible" modal header="Create new production line">
        <form @submit="submit" class="flex flex-column gap-2">
            <label for="production_line_name">Name</label>
            <InputText id="production_line_name" v-model="production_line_name" aria-describedby="production-line-name-help"
                autofocus />
            <small id="production-line-name-help">Provide the name of the production line.</small>
        </form>

        <template #footer>
            <Button label="Create" icon="pi pi-check" @click="create" />
            <Button label="Cancel" icon="pi pi-times" @click="cancel" severity="secondary" />
        </template>
    </Dialog>
</template>

<style scoped></style>
