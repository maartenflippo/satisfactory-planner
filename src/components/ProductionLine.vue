<script setup lang="ts">
import { computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Divider from "primevue/divider";

import AddRecipe from "./AddRecipe.vue";
import RecipeList from "./RecipeList.vue";
import { type ProductionLine, type RecipeInstance, Summary } from "../core/production_line";

const props = defineProps<{ production_line: ProductionLine }>();

const items_overview = computed(() => {
    const overview = props.production_line
        .recipes
        .reduce((acc, recipe) => {
            acc.extend(recipe);
            return acc;
        }, new Summary());

    return overview.items;
});

function add_recipe(instance: RecipeInstance) {
    props.production_line.recipes.push(instance);
}
</script>

<template>
    <div v-if="production_line" class="w-full flex">
        <div class="w-6 px-3">
            <h3>Recipes</h3>

            <AddRecipe @add-recipe="add_recipe" class="mb-5" />
            <RecipeList v-model="production_line.recipes" />
        </div>
        <Divider layout="vertical" />
        <div class="w-6 px-3">
            <h3>Overview</h3>

            <DataTable :value="items_overview">
                <Column field="item_name" header="Item" />
                <Column field="gross_production" header="Production" />
                <Column field="consumption" header="Consumption" />
                <Column field="net_production" header="Net Production" />
            </DataTable>
        </div>
    </div>
</template>

<style scoped></style>
