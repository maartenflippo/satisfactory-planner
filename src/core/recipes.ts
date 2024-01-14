import { type ItemId } from "./items";
import { type Machine, machines } from "./machines";

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
     * Whether this is an alternate recipe.
     */
    alternate: boolean,

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

// function MinerRecipe(machine_id: MachineId, produces: ItemId, rate: number): Recipe {
//     return {
//         name: `${machines[machine_id].name}: ${produces}`,
// 
//         get machine() {
//             return machines[machine_id];
//         },
// 
//         inputs: [
//             { type: "power", amount: machines[machine_id].base_power_production },
//         ],
// 
//         outputs: [
//             { type: "item", item: produces, rate },
//         ]
//     };
// }

function SmelterRecipe(name: string, input: ItemRecipeComponent, output: ItemRecipeComponent): Recipe {
    const power_input: PowerRecipeComponent = {
        type: "power",
        amount: machines["machine_smelter"].base_power_consumption,
    };

    return {
        name,
        inputs: [power_input, input],
        outputs: [output],
        alternate: false,
        get machine() {
            return machines["machine_smelter"];
        }
    };
}

function ConstructorRecipe(name: string, input: ItemRecipeComponent, output: ItemRecipeComponent, alternate: boolean = false): Recipe {
    const power_input: PowerRecipeComponent = {
        type: "power",
        amount: 4,
    };

    return {
        name,
        alternate,
        inputs: [power_input, input],
        outputs: [output],
        get machine() {
            return machines["machine_constructor"];
        }
    };
}


function AssemblerRecipe(name: string, inputs: [ItemRecipeComponent, ItemRecipeComponent], output: ItemRecipeComponent, alternate: boolean = false): Recipe {
    const power_input: PowerRecipeComponent = {
        type: "power",
        amount: 15,
    };

    return {
        name,
        alternate,
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
    | CreateRecipeId<"copper_ingot">
    | CreateRecipeId<"caterium_ingot">
    | CreateRecipeId<"aluminum_ingot">
    | CreateRecipeId<"iron_plate">
    | CreateRecipeId<"iron_rod">
    | CreateRecipeId<"screw">
    | CreateRecipeId<"aluminum_casing">
    | CreateRecipeId<"biocoal">
    | CreateRecipeId<"cable">
    | CreateRecipeId<"cast_screw">
    | CreateRecipeId<"caterium_wire">
    | CreateRecipeId<"charcoal">
    | CreateRecipeId<"concrete">
    | CreateRecipeId<"copper_powder">
    | CreateRecipeId<"copper_sheet">
    | CreateRecipeId<"empty_canister">
    | CreateRecipeId<"empty_fluid_tank">
    | CreateRecipeId<"iron_wire">
    | CreateRecipeId<"quartz_crystal">
    | CreateRecipeId<"quickwire">
    | CreateRecipeId<"silica">
    | CreateRecipeId<"steel_beam">
    | CreateRecipeId<"steel_canister">
    | CreateRecipeId<"steel_pipe">
    | CreateRecipeId<"steel_rod">
    | CreateRecipeId<"steel_screw">
    | CreateRecipeId<"wire">
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

    recipe_copper_ingot: SmelterRecipe(
        "Copper Ingot",
        ItemComponent("item_copper_ore", 30),
        ItemComponent("item_copper_ingot", 30),
    ),

    recipe_aluminum_ingot: SmelterRecipe(
        "Aluminum Ingot",
        ItemComponent("item_aluminum_scrap", 60),
        ItemComponent("item_aluminum_ingot", 30),
    ),

    recipe_caterium_ingot: SmelterRecipe(
        "Caterium Ingot",
        ItemComponent("item_caterium_ore", 45),
        ItemComponent("item_caterium_ingot", 15),
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

    recipe_wire: ConstructorRecipe(
        "Wire",
        ItemComponent("item_copper_ingot", 15),
        ItemComponent("item_wire", 30),
    ),

    recipe_steel_screw: ConstructorRecipe(
        "Steel Screw",
        ItemComponent("item_steel_beam", 5),
        ItemComponent("item_screw", 52),
        true,
    ),

    recipe_steel_rod: ConstructorRecipe(
        "Steel Rod",
        ItemComponent("item_steel_ingot", 5),
        ItemComponent("item_iron_rod", 48),
        true,
    ),

    recipe_steel_pipe: ConstructorRecipe(
        "Steel Pipe",
        ItemComponent("item_steel_ingot", 12),
        ItemComponent("item_steel_pipe", 20),
    ),

    recipe_steel_canister: ConstructorRecipe(
        "Steel Canister",
        ItemComponent("item_steel_ingot", 60),
        ItemComponent("item_empty_canister", 40),
        true,
    ),

    recipe_steel_beam: ConstructorRecipe(
        "Steel Beam",
        ItemComponent("item_steel_ingot", 60),
        ItemComponent("item_steel_beam", 15),
    ),

    recipe_silica: ConstructorRecipe(
        "Silica",
        ItemComponent("item_raw_quartz", 22.5),
        ItemComponent("item_silica", 37.5),
    ),

    recipe_quickwire: ConstructorRecipe(
        "Quickwire",
        ItemComponent("item_caterium_ingot", 12),
        ItemComponent("item_quickwire", 60),
    ),

    recipe_quartz_crystal: ConstructorRecipe(
        "Quartz Crystal",
        ItemComponent("item_raw_quartz", 37.5),
        ItemComponent("item_quartz_crystal", 22.5),
    ),

    recipe_iron_wire: ConstructorRecipe(
        "Iron Wire",
        ItemComponent("item_iron_ingot", 12.5),
        ItemComponent("item_wire", 22.5),
        true,
    ),

    recipe_empty_fluid_tank: ConstructorRecipe(
        "Empty Fluid Tank",
        ItemComponent("item_aluminum_ingot", 60),
        ItemComponent("item_empty_fluid_tank", 60),
    ),

    recipe_empty_canister: ConstructorRecipe(
        "Empty Canister",
        ItemComponent("item_plastic", 30),
        ItemComponent("item_empty_canister", 60),
    ),

    recipe_copper_sheet: ConstructorRecipe(
        "Copper Sheet",
        ItemComponent("item_copper_ingot", 20),
        ItemComponent("item_copper_sheet", 10),
    ),

    recipe_copper_powder: ConstructorRecipe(
        "Copper Powder",
        ItemComponent("item_copper_ingot", 300),
        ItemComponent("item_copper_powder", 50),
    ),

    recipe_concrete: ConstructorRecipe(
        "Concrete",
        ItemComponent("item_limestone", 45),
        ItemComponent("item_concrete", 15),
    ),

    recipe_charcoal: ConstructorRecipe(
        "Charcoal",
        ItemComponent("item_wood", 15),
        ItemComponent("item_coal", 150),
        true,
    ),

    recipe_caterium_wire: ConstructorRecipe(
        "Caterium Wire",
        ItemComponent("item_caterium_ingot", 15),
        ItemComponent("item_wire", 120),
        true,
    ),

    recipe_cast_screw: ConstructorRecipe(
        "Cast Screw",
        ItemComponent("item_iron_ingot", 12.5),
        ItemComponent("item_screw", 50),
        true,
    ),

    recipe_cable: ConstructorRecipe(
        "Cable",
        ItemComponent("item_wire", 60),
        ItemComponent("item_cable", 30),
    ),

    recipe_biocoal: ConstructorRecipe(
        "Biocoal",
        ItemComponent("item_biomass", 37.5),
        ItemComponent("item_coal", 45),
        true,
    ),

    recipe_aluminum_casing: ConstructorRecipe(
        "Aluminum Casing",
        ItemComponent("item_aluminum_ingot", 90),
        ItemComponent("item_aluminum_casing", 60),
    ),

    recipe_reinforced_iron_plate: AssemblerRecipe(
        "Reinforced Iron Plates",
        [ItemComponent("item_iron_plate", 30), ItemComponent("item_screw", 60)],
        ItemComponent("item_reinforced_iron_plate", 5),
    ),

};

