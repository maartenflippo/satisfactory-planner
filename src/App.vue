<script setup lang="ts">
import { computed, ref, type ComputedRef } from "vue";
import { type MenuItem } from "primevue/menuitem";
import TabMenu, { TabMenuChangeEvent } from "primevue/tabmenu";

import TopNav from "./components/TopNav.vue";
import ProductionLineView from "./components/ProductionLine.vue";

import { type ProductionLine, use_production_lines_store, persist_production_lines } from "./core/production_line.ts";

const store = use_production_lines_store();
store.$subscribe((_, state) => persist_production_lines(state.production_lines));

const menu_items: ComputedRef<MenuItem[]> = computed(() => {
    return store.production_lines.map(line => {
        return {
            label: line.name,
            key: line.slug,
        };
    });
});

const compute_selected_tab_index = () => {
    const active_slug = get_slug_from_location();
    for (let idx = 0; idx < store.production_lines.length; idx++) {
        const production_line = store.production_lines[idx];

        if (production_line.slug === active_slug) {
            return idx;
        }
    }

    return 0;
};

const selected_tab_index = ref(compute_selected_tab_index());

const selected_production_line: ComputedRef<ProductionLine | null> = computed(() => store.production_lines[selected_tab_index.value]);

window.addEventListener('popstate', on_location_change);

on_location_change();

function on_location_change() {
    selected_tab_index.value = compute_selected_tab_index();
}

function on_new_production_line(name: string, success: () => void, failure: () => void) {
    const production_line = store.create_production_line(name);
    if (production_line) {
        window.history.pushState({}, "", `#/${production_line.slug}`);
        on_location_change();
        success();
    } else {
        failure();
    }
}

function on_tab_change(event: TabMenuChangeEvent) {
    const menu_item = menu_items.value[event.index];
    window.history.pushState({}, "", `#/${menu_item.key}`);
}

function get_slug_from_location(): string {
    const { hash } = document.location;

    if (!hash.startsWith('#/')) {
        return "";
    }

    return hash.substring(2);
}

function on_delete_production_line() {
    store.remove_production_line(selected_production_line.value?.slug ?? "");
}
</script>

<template>
    <div class="flex flex-column h-full">
        <TopNav @on-new="on_new_production_line" @on-delete="on_delete_production_line"
            :show-delete="!!selected_production_line" />

        <nav class="px-3">
            <TabMenu :model="menu_items" @tab-change="on_tab_change" v-model:activeIndex="selected_tab_index" />
        </nav>

        <main class="flex-grow-1 px-3">
            <ProductionLineView v-if="selected_production_line" :production_line="selected_production_line"
                class="h-full" />

            <p v-if="!selected_production_line"
                class="w-full h-full flex align-items-center justify-content-center text-4xl">
                Create a new production line to get started.
            </p>
        </main>
    </div>
</template>

<style scoped></style>
