<script setup lang="ts">
import { type Ref, ref } from "vue";
import Button from "primevue/button";
import AutoComplete, { type AutoCompleteCompleteEvent } from "primevue/autocomplete";
import { type Recipe, recipes } from "../core/recipes";
import { type RecipeInstance } from "../core/production_line";

const emit = defineEmits<{
    (e: 'add-recipe', recipe: RecipeInstance): void
}>()

const recipe_to_add: Ref<Recipe | null> = ref(null);
const suggested_recipes: Ref<Recipe[]> = ref(query(""));

function add_selected_recipe() {
    const new_recipe = recipe_to_add.value;

    if (new_recipe === null) {
        return;
    }

    const recipe_instance: RecipeInstance = {
        ...new_recipe,
        clock_speed: 100.0,
        machine_count: 1,
    };

    emit('add-recipe', recipe_instance);

    recipe_to_add.value = null;
}

function submit(e: Event) {
    e.preventDefault();
    add_selected_recipe();
}

function query(filter: string) {
    return Object.values(recipes)
        .filter(recipe => recipe.name.toLowerCase().includes(filter.toLowerCase()));
}

function search(e: AutoCompleteCompleteEvent) {
    suggested_recipes.value = query(e.query);
}
</script>

<template>
    <form @submit="submit" class="flex w-full">
        <!-- Add Recipe -->

        <AutoComplete v-model="recipe_to_add" optionLabel="name" :suggestions="suggested_recipes" @complete="search"
            placeholder="Add a Recipe" force-selection dropdown class="flex-grow-1">
            <template #option="slotProps">
                <div class="flex align-options-center">
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </AutoComplete>

        <Button type="submit" label="Add" class="ml-5" />
    </form>
</template>

