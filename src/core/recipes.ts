import { type ItemId } from "./items";
import { type MachineId, type Machine, machines } from "./machines";

export type ItemRecipeComponent = {
    type: "item",

    /**
     * The item that is consumed while making this recipe.
     */
    item: ItemId,

    /**
     * The items per minute that allows the machine to operate at 100%.
     */
    rate: number
};

export type PowerRecipeComponent = {
    type: "power",

    /**
     * The MW required for this recipe to be processed at 100%.
     */
    amount: number
};

export type RecipeComponent = ItemRecipeComponent | PowerRecipeComponent;

export type Recipe = {
    /**
     * The human-friendly name of the recipe.
     */
    name: string,

    /**
     * The machine this recipe belongs to.
     */
    get machine(): Machine;

    /**
     * The inputs that are required for this recipe, given the machine runs at 
     * 100%. This includes power consumption of the machine, if the machine 
     * consumes power.
     */
    get inputs(): RecipeComponent[],

    /**
     * The inputs that are required for this recipe, given the machine runs at 
     * 100%. This includes power production of the machine, if it produces
     * power.
     */
    get outputs(): RecipeComponent[],
};

function MinerRecipe(machine_id: MachineId, produces: ItemId, rate: number): Recipe {
    return {
        name: `${machines[machine_id].name}: ${produces}`,

        get machine() {
            return machines[machine_id];
        },

        inputs: [
            { type: "power", amount: machines[machine_id].base_power_production },
        ],

        outputs: [
            { type: "item", item: produces, rate },
        ]
    };
}

type CreateRecipeId<Id extends string> = `recipe_${Id}`

export type RecipeId = CreateRecipeId<"iron_ore">
    | CreateRecipeId<"coal_ore">;

/**
 * The available recipes in the game.
 */
export const recipes: Record<RecipeId, Recipe> = {
    "recipe_iron_ore": MinerRecipe("miner_mk1", "item_iron_ore", 60),
    "recipe_coal_ore": MinerRecipe("miner_mk1", "item_coal_ore", 60),

    // {
    //     name: "Iron Plates",

    //     inputs: [
    //         { type: "item", item: "iron_ingot", amount: 30 },
    //         { type: "power", amount: 4 },
    //     ],

    //     outputs: [
    //         { type: "item", item: "iron_plate", amount: 20 },
    //     ],
    // }
};

