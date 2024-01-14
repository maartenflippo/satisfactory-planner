<script setup lang="ts">
// import InputNumber from "primevue/inputnumber";
import { computed } from "vue";
import Button from "primevue/button";
import { type RecipeInstance, compute_power_consumption, compute_power_production } from "../core/production_line";
import { type RecipeComponent, ItemRecipeComponent } from "../core/recipes";
import { items } from "../core/items";

const model = defineModel<RecipeInstance[]>();

const is_empty = computed(() => model.value?.length === 0);

function get_items(components: RecipeComponent[]): ItemRecipeComponent[] {
    return components.filter(component => component.type === "item") as ItemRecipeComponent[];
}

function remove_recipe(recipe_idx: number) {
    model.value?.splice(recipe_idx, 1);
}
</script>

<template>
    <table class="w-full" style="border-collapse: collapse;">
        <thead>
            <tr>
                <th class="border-1 border-200 p-3" rowspan="2">#</th>
                <th class="border-1 border-200 p-4" rowspan="2">Machine</th>
                <th class="border-1 border-200 p-3" colspan="2">Items</th>
                <th class="border-1 border-200 p-3" colspan="2">Power</th>
            </tr>

            <tr>
                <th class="border-1 border-200 p-3">Inputs</th>
                <th class="border-1 border-200 p-3">Outputs</th>
                <th class="border-1 border-200 p-3">Consumption</th>
                <th class="border-1 border-200 p-3">Production</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(recipe, idx) in model" :key="idx">
                <td class="border-1 border-200 p-3">
                    <div class="flex flex-column align-items-center">
                        <input v-model="recipe.machine_count"
                            class="block w-4rem p-2 mb-2 border-round border-1 border-300 hover:border-primary focus:border-primary outline-none focus:outline-primary text-center text-color text-base"
                            type="number" min="1" />

                        <Button icon="pi pi-trash" severity="danger" aria-label="Delete" size="small"
                            @click="remove_recipe(idx)" />
                    </div>
                </td>

                <td class="border-1 border-200 p-3 flex flex-column align-items-center">
                    <!-- <img :src="recipe.machine.image_url" alt="Icon of the machine" /> -->
                    <p>{{ recipe.machine.name }}</p>
                    <input v-model="recipe.clock_speed"
                        class="block w-5rem p-2 border-round border-1 border-300 hover:border-primary focus:border-primary outline-none focus:outline-primary text-center text-color text-base"
                        type="number" min="0" max="250" />
                </td>

                <td class="border-1 border-200 p-3">
                    <p v-for="recipe_component in get_items(recipe.inputs)">
                        {{ items[recipe_component.item].name }}
                    </p>
                </td>

                <td class="border-1 border-200 p-3">
                    <p v-for="recipe_component in get_items(recipe.outputs)">
                        {{ items[recipe_component.item].name }}
                    </p>
                </td>

                <td class="border-1 border-200 p-3">
                    <p class="text-center" v-if="recipe.machine.base_power_consumption === 0">-</p>
                    <p class="text-right" v-else>{{ parseFloat(compute_power_consumption(recipe).toFixed(4)) }} MW</p>
                </td>

                <td class="border-1 border-200 p-3">
                    <p class="text-center" v-if="recipe.machine.base_power_production === 0">-</p>
                    <p class="text-right" v-else>{{ parseFloat(compute_power_production(recipe).toFixed(4)) }} MW</p>
                </td>
            </tr>

            <tr v-if="is_empty">
                <td class="border-1 border-200 p-3" colspan="7">
                    <p class="text-center">Add a first recipe</p>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.focus:outline-primary:focus {
    outline: 0 none;
    outline-offset: 0;
    box-shadow: 0 0 0 0.2rem #a7f3d0;
    border-color: #10b981;
}
</style>
