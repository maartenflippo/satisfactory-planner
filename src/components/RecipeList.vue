<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import { type RecipeInstance, compute_power_consumption, compute_power_production } from "../core/production_line";
import { type RecipeComponent, ItemRecipeComponent } from "../core/recipes";
import { items } from "../core/items";

const { value: recipes } = defineModel<RecipeInstance[]>();

function get_items(components: RecipeComponent[]): ItemRecipeComponent[] {
    return components.filter(component => component.type === "item") as ItemRecipeComponent[];
}
</script>

<template>
    <table class="w-full" style="border-collapse: collapse;">
        <thead>
            <tr>
                <th class="border-1 border-200 p-4">Machine</th>
                <th class="border-1 border-200 p-3">Clock Speed</th>
                <th class="border-1 border-200 p-3">Machine Count</th>
                <th class="border-1 border-200 p-3">Inputs</th>
                <th class="border-1 border-200 p-3">Outputs</th>
                <th class="border-1 border-200 p-3">Power Consumption</th>
                <th class="border-1 border-200 p-3">Power Production</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="recipe in recipes">
                <td class="border-1 border-200 p-3 flex flex-column align-items-center">
                    <img :src="recipe.machine.image_url" alt="Icon of the machine" />
                    <p>{{ recipe.machine.name }}</p>
                </td>

                <td class="border-1 border-200 p-3">
                    <InputNumber v-model="recipe.clock_speed" suffix="%" :maxFractionDigits="4" class="w-full" />
                </td>

                <td class="border-1 border-200 p-3">
                    <InputNumber v-model="recipe.machine_count" class="w-full" />
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
                    <p class="text-right" v-else>{{ compute_power_consumption(recipe) }} MW</p>
                </td>

                <td class="border-1 border-200 p-3">
                    <p class="text-center" v-if="recipe.machine.base_power_production === 0">-</p>
                    <p class="text-right" v-else>{{ compute_power_production(recipe) }} MW</p>
                </td>
            </tr>

            <tr v-if="recipes?.length === 0">
                <td class="border-1 border-200 p-3" colspan="7">
                    <p class="text-center">Add a first recipe</p>
                </td>
            </tr>
        </tbody>
    </table>
</template>
