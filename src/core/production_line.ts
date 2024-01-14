import { defineStore } from "pinia";
import { ItemRecipeComponent, Recipe } from "./recipes";
import { Item, ItemId, items } from "./items";

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

export class Summary {
    private _items: Map<ItemId, ItemSummary> = new Map();

    private get_or_create_summary(item: ItemId): ItemSummary {
        if (!this._items.has(item)) {
            this._items.set(item, new ItemSummary(items[item], 0, 0));
        }

        // TODO: Remove this cast. It should be possible to tell the TypeScript
        // compiler that `this._items` contains the key `item` at this point.
        return this._items.get(item) as ItemSummary;
    }

    /**
     * Extend the current summary with another recipe.
     *
     * @param recipe The recipe to include in the summary.
     */
    extend(recipe: RecipeInstance) {
        recipe.outputs
            .filter((output): output is ItemRecipeComponent => output.type === "item")
            .forEach(output => {
                const item_summary = this.get_or_create_summary(output.item);
                item_summary.gross_production += output.rate * recipe.machine_count;
            });

        recipe.inputs
            .filter((input): input is ItemRecipeComponent => input.type === "item")
            .forEach(input => {
                const item_summary = this.get_or_create_summary(input.item);
                item_summary.consumption += input.rate * recipe.machine_count;
            });
    }

    get items(): ItemSummary[] {
        return Array.from(this._items.values())
            .sort((a, b) => a.item.topographic_order - b.item.topographic_order);
    }
}

export class ItemSummary {
    constructor(
        public item: Item,
        public gross_production: number,
        public consumption: number
    ) { }

    extend(other: ItemSummary) {
        console.assert(this.item === other.item, "Merging two item summaries with different item.");

        this.gross_production += other.gross_production;
        this.consumption += other.consumption;
    }

    get item_name(): string {
        return this.item.name;
    }

    get net_production(): number {
        return this.gross_production - this.consumption;
    }
}

export const compute_power_production = (recipe_instance: RecipeInstance): number => {
    // Power production scales linearly with the clock speed.
    const base_power_production = recipe_instance.machine.base_power_production * recipe_instance.clock_speed / 100;

    return base_power_production * recipe_instance.machine_count;
};

export const compute_power_consumption = (recipe_instance: RecipeInstance): number => {
    const base_power_consumption = recipe_instance.machine.base_power_consumption * Math.pow((recipe_instance.clock_speed / 100), 1.321928);

    return base_power_consumption * recipe_instance.machine_count;
};

export const compute_production = (recipe_instance: RecipeInstance, item: ItemId): number => {
    return recipe_instance
        .outputs
        .filter((output): output is ItemRecipeComponent => output.type === "item")
        .filter(output => output.item === item)
        .reduce((acc, output) => acc + output.rate * recipe_instance.machine_count, 0);
}

export const compute_consumption = (recipe_instance: RecipeInstance, item: ItemId): number => {
    return recipe_instance
        .outputs
        .filter((input): input is ItemRecipeComponent => input.type === "item")
        .filter(input => input.item === item)
        .reduce((acc, input) => acc + input.rate * recipe_instance.machine_count, 0);
}

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

export const persist_production_lines = (production_lines: ProductionLine[]) => {
    window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(production_lines),
    );
};
