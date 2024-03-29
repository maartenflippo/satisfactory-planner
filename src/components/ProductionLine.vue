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

            <Fieldset legend="Items"
                :pt="{ root: { class: 'p-0' }, legend: { class: 'ml-3' }, content: { class: 'p-0 pt-3' } }">
                <DataTable :value="items_overview">
                    <Column header="Item" body-class="flex align-items-center gap-3">
                        <template #body="slotProps">
                            <img :src="slotProps.data.item.image_url" :alt="`${slotProps.data.item_name} icon`" width="48"
                                height="48" />
                            <span>{{ slotProps.data.item_name }}</span>
                        </template>
                    </Column>
                    <Column field="gross_production" header="Production" data-type="numeric" body-class="text-center" />
                    <Column field="consumption" header="Consumption" data-type="numeric" body-class="text-center" />
                    <Column field="net_production" header="Net Production" body-class="text-center" />

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
