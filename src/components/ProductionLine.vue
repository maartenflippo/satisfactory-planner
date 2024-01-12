<script setup lang="ts">
import { type Ref, ref } from "vue";
import AddRecipe from "./AddRecipe.vue";
import RecipeList from "./RecipeList.vue";
import { type ProductionLine, type RecipeInstance } from "../core/production_line";

const { production_line } = defineProps<{ production_line: ProductionLine }>();

const added_recipes: Ref<RecipeInstance[]> = ref(production_line.recipes);

function add_recipe(instance: RecipeInstance) {
    added_recipes.value.push(instance);
}
</script>

<template>
    <div v-if="production_line" class="w-full">
        <h2>Production Line: {{ production_line.name }}</h2>

        <div class="w-full flex flex-row gap-5">
            <div class="flex-grow-1">
                <h3>Recipes</h3>

                <AddRecipe @add-recipe="add_recipe" class="mb-5" />
                <RecipeList v-model="added_recipes" />
            </div>
            <div class="flex-grow-1">
                <h3>Overview</h3>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
