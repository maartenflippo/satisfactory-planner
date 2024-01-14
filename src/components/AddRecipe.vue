<script setup lang="ts">
import { type Ref, ref } from "vue";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { type Recipe, recipes } from "../core/recipes";
import { type RecipeInstance } from "../core/production_line";

const emit = defineEmits<{
    (e: 'add-recipe', recipe: RecipeInstance): void
}>()

const recipe_to_add: Ref<Recipe | null> = ref(null);

const available_recipes: Recipe[] = Object.values(recipes);

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
</script>

<template>
    <form @submit="submit" class="flex w-full">
        <!-- Add Recipe -->
        <Dropdown v-model="recipe_to_add" :options="available_recipes" optionLabel="name" editable
            placeholder="Add a recipe" class="flex-grow-1">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    <img alt="Image of the {{ slotProps.value.name }} recipe"
                        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" class="mr-2"
                        style="width: 18px" />
                    <span>{{ slotProps.value.name }}</span>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <img alt="Image of the {{ slotProps.option.name }} recipe"
                        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" class="mr-2"
                        style="width: 18px" />
                    <span>{{ slotProps.option.name }}</span>
                </div>
            </template>
        </Dropdown>

        <Button type="submit" label="Add" class="ml-5" />
    </form>
</template>

