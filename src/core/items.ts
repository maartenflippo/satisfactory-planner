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

    | CreateItemId<"reinforced_iron_plate">
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
    const image_url = image_name === "" ? "" : `/images/items/${image_name}_64.png`;

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

    item_silica: item("Silica", "silica", 1),
    item_quartz_crystal: item("Quartz Crystal", "quartz-crystal", 1),

    item_biomass: item("Biomass", "biomass", 1),

    item_plastic: item("Plastic", "plastic", 1),
    item_rubber: item("Rubber", "rubber", 1),

    item_concrete: item("Concrete", "concrete", 1),

    item_quickwire: item("Quickwire", "quickwire", 2),

    item_steel_ingot: item("Steel Ingot", "steel-ingot", 1),
    item_steel_beam: item("Steel Beam", "steel-beam", 2),
    item_steel_pipe: item("Steel Pipe", "steel-pipe", 2),

    item_empty_canister: item("Empty Canister", "empty-canister", 2),
    item_empty_fluid_tank: item("Empty Fluid Tank", "empty-fluid-tank", 2),

    item_reinforced_iron_plate: item("Reinforced Iron Plate", "reinforced-iron-plate", 4),

    item_aluminum_scrap: item("Aluminum Scrap", "aluminum-scrap", 4),
    item_aluminum_ingot: item("Aluminum Ingot", "aluminum-ingot", 5),
    item_aluminum_casing: item("Aluminum Casing", "aluminum-casing", 6),
};
