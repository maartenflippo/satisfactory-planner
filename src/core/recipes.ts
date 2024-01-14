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

function ConstructorRecipe(name: string, input: ItemRecipeComponent, output: ItemRecipeComponent): Recipe {
    const power_input: PowerRecipeComponent = {
        type: "power",
        amount: 4,
    };

    return {
        name,
        inputs: [power_input, input],
        outputs: [output],
        get machine() {
            return machines["machine_constructor"];
        }
    };
}

function SmelterRecipe(name: string, input: ItemRecipeComponent, output: ItemRecipeComponent): Recipe {
    const power_input: PowerRecipeComponent = {
        type: "power",
        amount: 4,
    };

    return {
        name,
        inputs: [power_input, input],
        outputs: [output],
        get machine() {
            return machines["machine_smelter"];
        }
    };
}

function AssemblerRecipe(name: string, inputs: [ItemRecipeComponent, ItemRecipeComponent], output: ItemRecipeComponent): Recipe {
    const power_input: PowerRecipeComponent = {
        type: "power",
        amount: 15,
    };

    return {
        name,
        inputs: [power_input, ...inputs],
        outputs: [output],
        get machine() {
            return machines["machine_assembler"];
        }
    };
}

type CreateRecipeId<Id extends string> = `recipe_${Id}`

export type RecipeId =
    /* CreateRecipeId<"iron_ore">
    | CreateRecipeId<"coal_ore">
    |*/
    CreateRecipeId<"iron_ingot">
    | CreateRecipeId<"iron_plate">
    | CreateRecipeId<"iron_rod">
    | CreateRecipeId<"screw">
    | CreateRecipeId<"reinforced_iron_plate">
    ;

function ItemComponent(item: ItemId, rate: number): ItemRecipeComponent {
    return { type: "item", item, rate };
}

/**
 * The available recipes in the game.
 */
export const recipes: Record<RecipeId, Recipe> = {
    // "recipe_iron_ore": MinerRecipe("machine_miner_mk1", "item_iron_ore", 60),
    // "recipe_coal_ore": MinerRecipe("machine_miner_mk1", "item_coal_ore", 60),

    recipe_iron_ingot: SmelterRecipe(
        "Iron Ingot",
        ItemComponent("item_iron_ore", 30),
        ItemComponent("item_iron_ingot", 30),
    ),

    recipe_iron_plate: ConstructorRecipe(
        "Iron Plates",
        ItemComponent("item_iron_ingot", 30),
        ItemComponent("item_iron_plate", 20),
    ),

    recipe_iron_rod: ConstructorRecipe(
        "Iron Rods",
        ItemComponent("item_iron_ingot", 15),
        ItemComponent("item_iron_rod", 15),
    ),

    recipe_screw: ConstructorRecipe(
        "Screws",
        ItemComponent("item_iron_rod", 10),
        ItemComponent("item_screw", 40),
    ),

    recipe_reinforced_iron_plate: AssemblerRecipe(
        "Reinforced Iron Plates",
        [ItemComponent("item_iron_plate", 30), ItemComponent("item_screw", 60)],
        ItemComponent("item_reinforced_iron_plate", 5),
    ),
};

