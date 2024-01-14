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

function ItemComponent(item: ItemId, rate: number): ItemRecipeComponent {
    return { type: "item", item, rate };
}

/**
 * The available recipes in the game.
 */
export const recipes: Record<string, Recipe> = {
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

    recipe_adhered_iron_plate: AssemblerRecipe(
        "Adhered Iron Plate",
        [ItemComponent("item_iron_plate", 11.25), ItemComponent("item_rubber", 3.75)],
        ItemComponent("item_reinforced_iron_plate", 3.8),
        true,
    ),

    recipe_ai_limiter: AssemblerRecipe(
        "AI Limiter",
        [ItemComponent("item_copper_sheet", 25), ItemComponent("item_quickwire", 100)],
        ItemComponent("item_ai_limiter", 5),
    ),

    recipe_alclad_aluminum_sheet: AssemblerRecipe(
        "Alclas Aluminum Sheet",
        [ItemComponent("item_aluminum_ingot", 30), ItemComponent("item_copper_ingot", 10)],
        ItemComponent("item_alclad_aluminum_sheet", 30),
    ),

    recipe_alclad_casing: AssemblerRecipe(
        "Alclad Casing",
        [ItemComponent("item_aluminum_ingot", 150), ItemComponent("item_copper_ingot", 75)],
        ItemComponent("item_aluminum_casing", 112.5),
        true,
    ),

    recipe_assembler_director_system: AssemblerRecipe(
        "Assembly Director System",
        [ItemComponent("item_adaptive_control_unit", 1.5), ItemComponent("item_supercomputer", 0.75)],
        ItemComponent("item_assembly_director_system", 0.8),
    ),

    recipe_automated_wiring: AssemblerRecipe(
        "Automated Wiring",
        [ItemComponent("item_stator", 2.5), ItemComponent("item_cable", 50)],
        ItemComponent("item_automated_wiring", 2.5),
    ),

    recipe_black_powder: AssemblerRecipe(
        "Black Powder",
        [ItemComponent("item_coal", 15), ItemComponent("item_sulfur", 15)],
        ItemComponent("item_black_powder", 30),
    ),

    recipe_bolted_frame: AssemblerRecipe(
        "Bolted Frame",
        [ItemComponent("item_reinforced_iron_plate", 7.5), ItemComponent("item_screw", 140)],
        ItemComponent("item_modular_frame", 5),
        true,
    ),

    recipe_bolted_iron_plate: AssemblerRecipe(
        "Bolted Iron Plate",
        [ItemComponent("item_iron_plate", 90), ItemComponent("item_screw", 250)],
        ItemComponent("item_reinforced_iron_plate", 15),
        true,
    ),

    recipe_caterium_circuit_board: AssemblerRecipe(
        "Caterium Circuit Board",
        [ItemComponent("item_plastic", 12.5), ItemComponent("item_quickwire", 37.5)],
        ItemComponent("item_circuit_board", 8.8),
        true,
    ),

    recipe_cheap_silica: AssemblerRecipe(
        "Cheap Silica",
        [ItemComponent("item_raw_quartz", 11.25), ItemComponent("item_limestone", 18.75)],
        ItemComponent("item_silica", 26.3),
        true,
    ),

    recipe_circuit_board: AssemblerRecipe(
        "Circuit Board",
        [ItemComponent("item_copper_sheet", 15), ItemComponent("item_plastic", 30)],
        ItemComponent("item_circuit_board", 7.5),
    ),

    recipe_cluster_nobelisk: AssemblerRecipe(
        "Cluster Nobelisk",
        [ItemComponent("item_nobelisk", 7.5), ItemComponent("item_smokeless_powder", 10)],
        ItemComponent("item_cluster_nobelisk", 2.5),
    ),

    recipe_coated_iron_canister: AssemblerRecipe(
        "Coated Iron Canister",
        [ItemComponent("item_iron_plate", 30), ItemComponent("item_copper_sheet", 15)],
        ItemComponent("item_empty_canister", 60),
        true,
    ),

    recipe_coated_iron_plate: AssemblerRecipe(
        "Coated Iron Plate",
        [ItemComponent("item_iron_ingot", 50), ItemComponent("item_plastic", 10)],
        ItemComponent("item_iron_plate", 75),
        true,
    ),

    recipe_compacted_coal: AssemblerRecipe(
        "Compacted Coal",
        [ItemComponent("item_coal", 25), ItemComponent("item_sulfur", 25)],
        ItemComponent("item_compacted_coal", 25),
    ),

    recipe_copper_rotor: AssemblerRecipe(
        "Copper Rotor",
        [ItemComponent("item_copper_sheet", 22.5), ItemComponent("item_screw", 195)],
        ItemComponent("item_rotor", 11.3),
        true,
    ),

    recipe_crystal_computer: AssemblerRecipe(
        "Crystal Computer",
        [ItemComponent("item_circuit_board", 7.5), ItemComponent("item_crystal_oscillator", 2.8125)],
        ItemComponent("item_computer", 2.8),
        true,
    ),

    recipe_electric_motor: AssemblerRecipe(
        "Electric Motor",
        [ItemComponent("item_electromagnetic_control_rod", 3.75), ItemComponent("item_rotor", 7.5)],
        ItemComponent("item_motor", 7.5),
        true,
    ),

    recipe_electrode_circuit_board: AssemblerRecipe(
        "Electrode Circuit Board",
        [ItemComponent("item_rubber", 30), ItemComponent("item_petroleum_coke", 45)],
        ItemComponent("item_circuit_board", 5),
        true,
    ),

    recipe_electromagnetic_connection_rod: AssemblerRecipe(
        "Electromagnetic Connection Rod",
        [ItemComponent("item_stator", 6), ItemComponent("item_high_speed_connector", 4)],
        ItemComponent("item_electromagnetic_control_rod", 8),
        true,
    ),

    recipe_electromagnetic_control_rod: AssemblerRecipe(
        "Electromagnetic Control Rod",
        [ItemComponent("item_stator", 6), ItemComponent("item_ai_limiter", 4)],
        ItemComponent("item_electromagnetic_control_rod", 4),
    ),

    recipe_encased_industrial_beam: AssemblerRecipe(
        "Encased Industrial Beam",
        [ItemComponent("item_steel_beam", 24), ItemComponent("item_concrete", 30)],
        ItemComponent("item_encased_industrial_beam", 6),
    ),

    recipe_encased_industrial_pipe: AssemblerRecipe(
        "Encased Industrial Pipe",
        [ItemComponent("item_steel_pipe", 28), ItemComponent("item_concrete", 20)],
        ItemComponent("item_encased_industrial_beam", 4),
        true,
    ),

    recipe_encased_plutonium_cell: AssemblerRecipe(
        "Encased Plutonium Cell",
        [ItemComponent("item_plutonium_pellet", 10), ItemComponent("item_concrete", 20)],
        ItemComponent("item_encased_plutonium_cell", 5),
    ),

    recipe_fabric: AssemblerRecipe(
        "Fabric",
        [ItemComponent("item_mycelia", 15), ItemComponent("item_biomass", 75)],
        ItemComponent("item_fabric", 15),
    ),

    recipe_fine_black_powder: AssemblerRecipe(
        "Fine Black Powder",
        [ItemComponent("item_sulfur", 7.5), ItemComponent("item_compacted_coal", 3.75)],
        ItemComponent("item_black_powder", 15),
        true,
    ),

    recipe_fine_concrete: AssemblerRecipe(
        "Fine Concrete",
        [ItemComponent("item_silica", 7.5), ItemComponent("item_limestone", 30)],
        ItemComponent("item_concrete", 25),
        true,
    ),

    recipe_fused_quickwire: AssemblerRecipe(
        "Fused Quickwire",
        [ItemComponent("item_caterium_ingot", 12), ItemComponent("item_copper_ingot", 37.5)],
        ItemComponent("item_quickwire", 90),
        true,
    ),

    recipe_fused_wire: AssemblerRecipe(
        "Fused Wire",
        [ItemComponent("item_copper_ingot", 12), ItemComponent("item_caterium_ingot", 3)],
        ItemComponent("item_wire", 90),
        true,
    ),

    recipe_gas_nobelisk: AssemblerRecipe(
        "Gas Nobelisk",
        [ItemComponent("item_nobelisk", 5), ItemComponent("item_biomass", 50)],
        ItemComponent("item_gas_nobelisk", 5),
    ),

    recipe_heat_exchanger: AssemblerRecipe(
        "Heat Exchanger",
        [ItemComponent("item_aluminum_casing", 30), ItemComponent("item_rubber", 30)],
        ItemComponent("item_heat_sink", 10),
        true,
    ),

    recipe_heat_sink: AssemblerRecipe(
        "Heat Sink",
        [ItemComponent("item_alclad_aluminum_sheet", 37.5), ItemComponent("item_copper_sheet", 22.5)],
        ItemComponent("item_heat_sink", 7.5),
    ),

    recipe_homing_rifle_ammo: AssemblerRecipe(
        "Homing Rifle Ammo",
        [ItemComponent("item_rifle_ammo", 50), ItemComponent("item_high_speed_connector", 2.5)],
        ItemComponent("item_homing_rifle_ammo", 25),
    ),

    recipe_insulated_cable: AssemblerRecipe(
        "Insulated Cable",
        [ItemComponent("item_wire", 45), ItemComponent("item_rubber", 30)],
        ItemComponent("item_cable", 100),
        true,
    ),

    recipe_modular_frame: AssemblerRecipe(
        "Modular Frame",
        [ItemComponent("item_reinforced_iron_plate", 3), ItemComponent("item_iron_rod", 12)],
        ItemComponent("item_modular_frame", 2),
    ),

    recipe_motor: AssemblerRecipe(
        "Motor",
        [ItemComponent("item_rotor", 10), ItemComponent("item_stator", 10)],
        ItemComponent("item_motor", 5),
    ),

    recipe_nobelisk: AssemblerRecipe(
        "Nobelisk",
        [ItemComponent("item_steel_pipe", 20), ItemComponent("item_black_powder", 20)],
        ItemComponent("item_nobelisk", 10),
    ),

    recipe_oc_supercomputer: AssemblerRecipe(
        "OC Supercomputer",
        [ItemComponent("item_radio_control_unit", 9), ItemComponent("item_cooling_system", 9)],
        ItemComponent("item_supercomputer", 3),
        true,
    ),

    recipe_plutonium_fuel_unit: AssemblerRecipe(
        "Plutonium Fuel Unit",
        [ItemComponent("item_encased_plutonium_cell", 10), ItemComponent("item_pressure_conversion_cube", 0.5)],
        ItemComponent("item_plutonium_fuel_rod", 0.5),
        true,
    ),

    recipe_pressure_conversion_cube: AssemblerRecipe(
        "Pressure Conversion Cube",
        [ItemComponent("item_fused_modular_frame", 1), ItemComponent("item_radio_control_unit", 2)],
        ItemComponent("item_pressure_conversion_cube", 1),
    ),

    recipe_pulse_nobelisk: AssemblerRecipe(
        "Pulse Nobelisk",
        [ItemComponent("item_nobelisk", 5), ItemComponent("item_crystal_oscillator", 1)],
        ItemComponent("item_pulse_nobelisk", 5),
    ),

    recipe_quickwire_cable: AssemblerRecipe(
        "Quickwire Cable",
        [ItemComponent("item_quickwire", 7.5), ItemComponent("item_rubber", 5)],
        ItemComponent("item_cable", 27.5),
        true,
    ),

    recipe_quickwire_stator: AssemblerRecipe(
        "Quickwire Stator",
        [ItemComponent("item_steel_pipe", 16), ItemComponent("item_quickwire", 60)],
        ItemComponent("item_stator", 8),
        true,
    ),

    recipe_reinforced_iron_plate: AssemblerRecipe(
        "Reinforced Iron Plates",
        [ItemComponent("item_iron_plate", 30), ItemComponent("item_screw", 60)],
        ItemComponent("item_reinforced_iron_plate", 5),
    ),

    recipe_rifle_ammo: AssemblerRecipe(
        "Rifle Ammo",
        [ItemComponent("item_copper_sheet", 15), ItemComponent("item_smokeless_powder", 10)],
        ItemComponent("item_rifle_ammo", 75),
    ),

    recipe_rotor: AssemblerRecipe(
        "Rotor",
        [ItemComponent("item_iron_rod", 20), ItemComponent("item_screw", 100)],
        ItemComponent("item_rotor", 4),
    ),

    recipe_rubber_concrete: AssemblerRecipe(
        "Rubber Concrete",
        [ItemComponent("item_limestone", 50), ItemComponent("item_rubber", 10)],
        ItemComponent("item_concrete", 45),
        true,
    ),

    recipe_shatter_rebar: AssemblerRecipe(
        "Shatter Rebar",
        [ItemComponent("item_iron_rebar", 10), ItemComponent("item_quartz_crystal", 15)],
        ItemComponent("item_shatter_rebar", 5),
    ),

    recipe_silicon_circuit_board: AssemblerRecipe(
        "Silicon Circuit Board",
        [ItemComponent("item_copper_sheet", 27.5), ItemComponent("item_silica", 27.5)],
        ItemComponent("item_circuit_board", 12.5),
        true,
    ),

    recipe_smart_plating: AssemblerRecipe(
        "Smart Plating",
        [ItemComponent("item_reinforced_iron_plate", 2), ItemComponent("item_rotor", 2)],
        ItemComponent("item_smart_plating", 2),
    ),

    recipe_stator: AssemblerRecipe(
        "Stator",
        [ItemComponent("item_steel_pipe", 15), ItemComponent("item_wire", 40)],
        ItemComponent("item_stator", 5),
    ),

    recipe_steel_coated_plate: AssemblerRecipe(
        "Steel Coated Plate",
        [ItemComponent("item_steel_ingot", 7.5), ItemComponent("item_plastic", 5)],
        ItemComponent("item_iron_plate", 45),
        true,
    ),

    recipe_steel_rotor: AssemblerRecipe(
        "Steel Rotor",
        [ItemComponent("item_steel_pipe", 10), ItemComponent("item_wire", 30)],
        ItemComponent("item_rotor", 5),
        true,
    ),

    recipe_steeled_frame: AssemblerRecipe(
        "Steeled Frame",
        [ItemComponent("item_reinforced_iron_plate", 2), ItemComponent("item_steel_pipe", 10)],
        ItemComponent("item_modular_frame", 3),
        true,
    ),

    recipe_stitched_iron_plate: AssemblerRecipe(
        "Stitched Iron Plate",
        [ItemComponent("item_iron_plate", 18.75), ItemComponent("item_wire", 37.5)],
        ItemComponent("item_reinforced_iron_plate", 5.6),
        true,
    ),

    recipe_stun_rebar: AssemblerRecipe(
        "Stun Rebar",
        [ItemComponent("item_iron_rebar", 10), ItemComponent("item_quickwire", 50)],
        ItemComponent("item_stun_rebar", 10),
    ),

    recipe_versatile_framework: AssemblerRecipe(
        "Versatile Framework",
        [ItemComponent("item_modular_frame", 2.5), ItemComponent("item_steel_beam", 30)],
        ItemComponent("item_versatile_framework", 5),
    ),
};

