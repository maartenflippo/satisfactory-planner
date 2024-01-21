type CreateItemId<Id extends string> = `item_${Id}`;

/**
 * All the ids for items supported by this application.
 */
export type ItemId = CreateItemId<"iron_ore">
    | CreateItemId<"coal">
    | CreateItemId<"copper_ore">
    | CreateItemId<"bauxite">
    | CreateItemId<"caterium_ore">
    | CreateItemId<"limestone">
    | CreateItemId<"raw_quartz">
    | CreateItemId<"sulfur">
    | CreateItemId<"uranium">
    | CreateItemId<"iron_ingot">
    | CreateItemId<"copper_ingot">
    | CreateItemId<"steel_ingot">
    | CreateItemId<"aluminum_scrap">
    | CreateItemId<"aluminum_ingot">
    | CreateItemId<"caterium_ingot">
    | CreateItemId<"iron_plate">
    | CreateItemId<"iron_rod">
    | CreateItemId<"screw">
    | CreateItemId<"wire">
    | CreateItemId<"copper_sheet">
    | CreateItemId<"copper_powder">
    | CreateItemId<"cable">
    | CreateItemId<"steel_beam">
    | CreateItemId<"steel_pipe">
    | CreateItemId<"empty_canister">
    | CreateItemId<"empty_fluid_tank">
    | CreateItemId<"silica">
    | CreateItemId<"quickwire">
    | CreateItemId<"quartz_crystal">
    | CreateItemId<"plastic">
    | CreateItemId<"rubber">
    | CreateItemId<"concrete">
    | CreateItemId<"wood">
    | CreateItemId<"biomass">
    | CreateItemId<"aluminum_casing">
    | CreateItemId<"ai_limiter">
    | CreateItemId<"alclad_aluminum_sheet">
    | CreateItemId<"adaptive_control_unit">
    | CreateItemId<"supercomputer">
    | CreateItemId<"assembly_director_system">
    | CreateItemId<"stator">
    | CreateItemId<"modular_frame">
    | CreateItemId<"rotor">
    | CreateItemId<"motor">
    | CreateItemId<"automated_wiring">
    | CreateItemId<"black_powder">
    | CreateItemId<"smokeless_powder">
    | CreateItemId<"circuit_board">
    | CreateItemId<"nobelisk">
    | CreateItemId<"cluster_nobelisk">
    | CreateItemId<"gas_nobelisk">
    | CreateItemId<"pulse_nobelisk">
    | CreateItemId<"compacted_coal">
    | CreateItemId<"crystal_oscillator">
    | CreateItemId<"computer">
    | CreateItemId<"electromagnetic_control_rod">
    | CreateItemId<"petroleum_coke">
    | CreateItemId<"high_speed_connector">
    | CreateItemId<"encased_industrial_beam">
    | CreateItemId<"mycelia">
    | CreateItemId<"fabric">
    | CreateItemId<"heat_sink">
    | CreateItemId<"rifle_ammo">
    | CreateItemId<"homing_rifle_ammo">
    | CreateItemId<"radio_control_unit">
    | CreateItemId<"cooling_system">
    | CreateItemId<"pressure_conversion_cube">
    | CreateItemId<"plutonium_pellet">
    | CreateItemId<"encased_plutonium_cell">
    | CreateItemId<"plutonium_fuel_rod">
    | CreateItemId<"fused_modular_frame">
    | CreateItemId<"iron_rebar">
    | CreateItemId<"shatter_rebar">
    | CreateItemId<"stun_rebar">
    | CreateItemId<"smart_plating">
    | CreateItemId<"versatile_framework">
    | CreateItemId<"reinforced_iron_plate">
    | CreateItemId<"heavy_modular_frame">
    | CreateItemId<"portable_miner">
    | CreateItemId<"beacon">
    | CreateItemId<"battery">
    | CreateItemId<"explosive_rebar">
    | CreateItemId<"gas_filter">
    | CreateItemId<"encased_uranium_cell">
    | CreateItemId<"iodine_infused_filter">
    | CreateItemId<"magnetic_field_generator">
    | CreateItemId<"modular_engine">
    | CreateItemId<"nuke_nobelisk">
    | CreateItemId<"turbo_motor">
    | CreateItemId<"thermal_propulsion_rocket">
    | CreateItemId<"packaged_nitrogen_gas">
    | CreateItemId<"turbo_rifle_ammo">
    | CreateItemId<"packaged_turbofuel">
    | CreateItemId<"uranium_fuel_rod">
    ;

export type Item = {
    /**
     * The human-friendly name of the item.
     */
    name: string,

    /**
     * The url to an image of the item.
     */
    image_url: string,

    /**
     * Used to sort the items by in the overview. The lower the number, the 
     * higher in the summary.
     */
    topographic_order: number,
};

function item(name: string, image_name: string = "", topographic_order: number = 0): Item {
    const file_name = image_name === "" ? name.replace(" ", "-").toLowerCase() : image_name;

    const image_url = `/satisfactory-planner/images/items/${file_name}_64.png`;

    return {
        name,
        image_url,
        topographic_order,
    };
}

/**
 * The items that can be used in recipes.
 */
export const items: Record<ItemId, Item> = {
    item_iron_ore: item("Iron Ore", "iron-ore"),
    item_coal: item("Coal Ore", "coal"),
    item_bauxite: item("Bauxite", "bauxite"),
    item_copper_ore: item("Copper Ore", "copper-ore"),
    item_sulfur: item("Sulfur", "sulfur"),
    item_uranium: item("Uranium", "uranium"),
    item_limestone: item("Limestone", "limestone"),
    item_raw_quartz: item("Raw Quartz", "raw-quartz"),
    item_caterium_ore: item("Caterium Ore", "caterium-ore"),
    item_wood: item("Wood", "wood"),

    item_iron_ingot: item("Iron Ingot", "iron-ingot", 1),
    item_copper_ingot: item("Copper Ingot", "copper-ingot", 1),
    item_caterium_ingot: item("Caterium Ingot", "caterium-ingot", 1),

    item_wire: item("Wire", "wire", 2),
    item_copper_sheet: item("Copper Sheet", "copper-sheet", 2),
    item_copper_powder: item("Copper Powder", "copper-powder", 2),
    item_cable: item("Cable", "cable", 3),

    item_iron_plate: item("Iron Plate", "iron-plate", 2),
    item_iron_rod: item("Iron Rod", "iron-rod", 2),
    item_screw: item("Screw", "screw", 3),
    item_reinforced_iron_plate: item("Reinforced Iron Plate", "reinforced-iron-plate", 4),
    item_rotor: item("Rotor", "rotor", 4),
    item_modular_frame: item("Modular Frame", "modular-frame", 4),
    item_stator: item("Stator", "stator", 4),
    item_motor: item("Motor", "motor", 5),
    item_heavy_modular_frame: item("Heavy Modular Frame", "heavy-modular-frame", 6),

    item_silica: item("Silica", "silica", 1),
    item_quartz_crystal: item("Quartz Crystal", "quartz-crystal", 1),
    item_crystal_oscillator: item("Crystal Oscillator", "crystal-oscillator", 5),

    item_mycelia: item("Mycelia", "mycelia"),
    item_biomass: item("Biomass", "biomass", 1),
    item_fabric: item("Fabric", "fabric", 2),

    item_plastic: item("Plastic", "plastic", 1),
    item_rubber: item("Rubber", "rubber", 1),

    item_concrete: item("Concrete", "concrete", 1),

    item_quickwire: item("Quickwire", "quickwire", 2),
    item_ai_limiter: item("AI Limiter", "ai-limiter", 3),

    item_circuit_board: item("Circuit Board", "circuit-board", 4),
    item_high_speed_connector: item("High-speed Connector", "high-speed-connector", 5),
    item_computer: item("Computer", "computer", 6),
    item_supercomputer: item("Supercomputer", "supercomputer", 7),

    item_radio_control_unit: item("Radio Control Unit", "radio-control-unit", 7),
    item_heat_sink: item("Heat Sink", "heat-sink", 7),
    item_cooling_system: item("Cooling System", "cooling-system", 7),
    item_electromagnetic_control_rod: item("Electromagnetic Control Rod", "electromagnetic-control-rod", 7),

    item_plutonium_pellet: item("Plutonium Pellet", "plutonium-pellet", 3),
    item_plutonium_fuel_rod: item("Plutonium Fuel Rod", "plutonium-fuel-rod", 4),
    item_encased_plutonium_cell: item("Encased Plutonium Cell", "plutonium-cell", 5),

    item_steel_ingot: item("Steel Ingot", "steel-ingot", 1),
    item_steel_beam: item("Steel Beam", "steel-beam", 2),
    item_steel_pipe: item("Steel Pipe", "steel-pipe", 2),
    item_encased_industrial_beam: item("Encased Industrial Beam", "encased-industrial-beam", 3),

    item_empty_canister: item("Empty Canister", "empty-canister", 2),
    item_empty_fluid_tank: item("Empty Fluid Tank", "empty-fluid-tank", 2),

    item_aluminum_scrap: item("Aluminum Scrap", "aluminum-scrap", 4),
    item_aluminum_ingot: item("Aluminum Ingot", "aluminum-ingot", 5),
    item_aluminum_casing: item("Aluminum Casing", "aluminum-casing", 6),
    item_alclad_aluminum_sheet: item("Alclad Aluminum Sheet", "alclad-aluminum-sheet", 6),

    item_fused_modular_frame: item("Fused Modular Frame", "fused-modular-frame", 7),
    item_pressure_conversion_cube: item("Pressure Conversion Cube", "pressure-conversion-cube", 7),

    item_iron_rebar: item("Iron Rebar", "iron-rebar", 3),
    item_shatter_rebar: item("Shatter Rebar", "shatter-rebar", 4),
    item_stun_rebar: item("Stun Rebar", "stun-rebar", 4),
    item_explosive_rebar: item("Explosive Rebar", "explosive-rebar", 5),

    item_black_powder: item("Black Powder", "black-powder", 1),
    item_smokeless_powder: item("Smokeless Powder", "smokeless-powder", 2),
    item_rifle_ammo: item("Rifle Ammo", "rifle-ammo", 3),
    item_homing_rifle_ammo: item("Homing Rifle Ammo", "homing-rifle-ammo", 4),
    item_turbo_rifle_ammo: item("Turbo Rifle Ammo", "turbo-rifle-ammo", 5),

    item_nobelisk: item("Nobelisk", "nobelisk", 3),
    item_gas_nobelisk: item("Gas Nobelisk", "gas-nobelisk", 4),
    item_pulse_nobelisk: item("Pulse Nobelisk", "pulse-nobelisk", 4),
    item_cluster_nobelisk: item("Cluster Nobelisk", "cluster-nobelisk", 4),
    item_nuke_nobelisk: item("Nuke Nobelisk", "nuke-nobelisk", 5),

    item_smart_plating: item("Smart Plating", "smart-plating", 7),
    item_versatile_framework: item("Versatile Framework", "versatile-framework", 7),
    item_adaptive_control_unit: item("Adaptive Control Unit", "adaptive-control-unit", 7),
    item_automated_wiring: item("Automated Wiring", "automated-wiring", 7),
    item_assembly_director_system: item("Assembly Director System", "assembly-director-system", 7),

    item_compacted_coal: item("Compacted Coal", "compacted-coal", 2),
    item_petroleum_coke: item("Petroleum Coke", "petroleum-coke", 3),

    item_beacon: item("Beacon", "beacon", 4),
    item_gas_filter: item("Gas Filter", "gas-filter", 4),
    item_iodine_infused_filter: item("Iodine Infused Filter", "iodine-infused-filter", 5),

    item_battery: item("Battery", "battery", 7),
    item_turbo_motor: item("Turbo Motor", "turbo-motor", 7),
    item_modular_engine: item("Modular Engine", "modular-engine", 7),
    item_portable_miner: item("Portable Miner", "portable-miner", 7),

    item_uranium_fuel_rod: item("Uranium Fuel Rod", "", 7),
    item_encased_uranium_cell: item("Encased Uranium Cell", "", 7),

    item_packaged_turbofuel: item("Packaged Turbofuel", "", 5),
    item_packaged_nitrogen_gas: item("Packaged Nitrogen Gas", "", 5),

    item_magnetic_field_generator: item("Magnetic Field Generator", "", 7),
    item_thermal_propulsion_rocket: item("Thermal Propulsion Rocket", "", 7),
};
