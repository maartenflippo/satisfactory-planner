<script setup lang="ts">
import { computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Divider from "primevue/divider";
import Fieldset from "primevue/fieldset";

import AddRecipe from "./AddRecipe.vue";
import RecipeList from "./RecipeList.vue";
import { type ProductionLine, type RecipeInstance, Summary, compute_power_production, compute_power_consumption } from "../core/production_line";

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

const total_power_production = computed(() => {
    const value = props.production_line.recipes
        .map(recipe => compute_power_production(recipe))
        .reduce((acc, item) => acc + item, 0);

    return format_power(value);
});

const total_power_consumption = computed(() => {
    const value = props.production_line.recipes
        .map(recipe => compute_power_consumption(recipe))
        .reduce((acc, item) => acc + item, 0);

    return format_power(value);
});

function add_recipe(instance: RecipeInstance) {
    props.production_line.recipes.push(instance);
}

function format_power(value: number): string {
    const formatted = parseFloat(value.toFixed(4));
    return `${formatted} MW`;
}
</script>

<template>
    <div v-if="production_line" class="w-full flex">
        <div class="w-7 px-3">
            <h3>Recipes</h3>

            <AddRecipe @add-recipe="add_recipe" class="mb-5" />
            <RecipeList v-model="production_line.recipes" class="bg-white" />
        </div>
        <Divider layout="vertical" />
        <div class="w-5 px-3">
            <h3>Overview</h3>

            <Fieldset legend="Items">
                <DataTable :value="items_overview">
                    <Column field="item_name" header="Item" />
                    <Column field="gross_production" header="Production" />
                    <Column field="consumption" header="Consumption" />
                    <Column field="net_production" header="Net Production" />

                    <template #empty>
                        <p class="text-center">Add a recipe to start with a production line.</p>
                    </template>
                </DataTable>
            </Fieldset>

            <Fieldset legend="Power" class="mt-3 text-base">
                <DataTable :value="[{ total_power_production, total_power_consumption }]">
                    <Column field="total_power_production" header="Production" />
                    <Column field="total_power_consumption" header="Consumption" />
                </DataTable>
            </Fieldset>
        </div>
    </div>
</template>

<style scoped></style>
