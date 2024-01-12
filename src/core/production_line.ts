import { defineStore } from "pinia";
import { Recipe } from "./recipes";

export type RecipeInstance = Recipe & {
    /**
     * The clock speed at which to run this recipe.
     */
    clock_speed: number,

    /**
     * The number of machines running this recipe instance.
     */
    machine_count: number,
};

export const compute_power_production = (recipe_instance: RecipeInstance): number => {
    // TODO: Account for clock speed.
    return recipe_instance.machine.base_power_production * recipe_instance.machine_count;
};

export const compute_power_consumption = (recipe_instance: RecipeInstance): number => {
    // TODO: Account for clock speed.
    return recipe_instance.machine.base_power_consumption * recipe_instance.machine_count;
};

/**
 * The data associated with a production line.
 */
export type ProductionLine = {
    /**
     * The name of this production line.
     */
    name: string,

    /**
     * A url-friendly encoding of the name of this production line.
     */
    slug: string,

    /**
     * Instances of the recipes used in this production line.
     */
    recipes: RecipeInstance[],
};

function slugify(str: string): string {
    return str.toLowerCase()
        .replace(' ', '-');
}

const STORAGE_KEY = "production_lines";

export const use_production_lines_store = defineStore('production_lines', {
    state: () => {
        const stored_value = window.localStorage.getItem(STORAGE_KEY) ?? "[]";
        const production_lines = JSON.parse(stored_value) as ProductionLine[];

        return {
            production_lines,
        };
    },

    actions: {
        /**
         * Create a fresh production line, given its name.
         *
         * @param name The name of the production line.
         * @returns A new production line, with the given name. Its slug will be created 
         * based on the name, with a possible number as a suffix to make it unique.
         */
        create_production_line(name: string): ProductionLine {
            const slug = slugify(name);

            const production_line: ProductionLine = { name, slug, recipes: [] };
            this.production_lines.push(production_line);

            return production_line;
        },
    }
});

import { MutationType } from 'pinia'
export const persist_state = (_: MutationType, state: { production_lines: ProductionLine[] }) => {
    window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.production_lines),
    );
};
