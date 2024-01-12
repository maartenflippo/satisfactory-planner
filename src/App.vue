<script setup lang="ts">
import { ref, type Ref } from "vue";
import { type MenuItem } from "primevue/menuitem";
import PanelMenu from "primevue/panelmenu";

import CreateProductionLine from "./components/CreateProductionLine.vue";
import ProductionLineView from "./components/ProductionLine.vue";

import { type ProductionLine, use_production_lines_store, persist_state } from "./core/production_line.ts";

const store = use_production_lines_store();
store.$subscribe(persist_state);

const selected_production_line: Ref<ProductionLine | null> = ref(null);

window.addEventListener('popstate', on_location_change);

on_location_change();

function on_location_change() {
    const { hash } = document.location;

    if (!hash.startsWith('#/')) {
        window.history.pushState({}, "", "/");
        selected_production_line.value = null;

        return;
    }

    const slug = hash.substring(2);
    load_production_line(slug);
}

function get_route(menu_item: MenuItem): string {
    return `/#/${menu_item.slug}`;
}

function load_production_line(slug: string) {
    const production_line = store.production_lines.find(line => line.slug === slug);

    if (production_line) {
        selected_production_line.value = production_line;
    } else {
        console.error(`Failed to load production line with slug '${slug}'.`);
    }
}

function on_new_production_line(name: string, success: () => void, failure: () => void) {
    const production_line = store.create_production_line(name);
    if (production_line) {
        window.history.pushState({}, "", `#/${production_line.slug}`);
        success();
    } else {
        failure();
    }
}
</script>

<template>
    <div class="flex flex-row">
        <aside class="px-3">
            <h2>Production Lines</h2>

            <CreateProductionLine @on-new="on_new_production_line" />

            <PanelMenu :model="store.production_lines" class="w-full md:w-20rem">
                <template #item="{ item }">
                    <a class="flex align-items-center cursor-pointer text-color px-3 py-2" :href="get_route(item)">
                        <span class="ml-2 text-color">{{ item.name }}</span>
                    </a>
                </template>
            </PanelMenu>
        </aside>

        <main class="flex-grow-1 px-3">
            <ProductionLineView v-if="selected_production_line" :production_line="selected_production_line" />
        </main>
    </div>
</template>

<style scoped></style>
