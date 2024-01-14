type CreateItemId<Id extends string> = `item_${Id}`;

/**
 * All the ids for items supported by this application.
 */
export type ItemId = CreateItemId<"iron_ore">
    | CreateItemId<"coal_ore">
    | CreateItemId<"iron_ingot">
    | CreateItemId<"iron_plate">
    | CreateItemId<"iron_rod">
    | CreateItemId<"screw">
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
    item_coal_ore: item("Coal Ore", "coal"),
    item_iron_ingot: item("Iron Ingot", "iron-ingot", 1),
    item_iron_plate: item("Iron Plate", "iron-plate", 2),
    item_iron_rod: item("Iron Rod", "iron-rod", 2),
    item_screw: item("Screw", "screw", 3),
    item_reinforced_iron_plate: item("Reinforced Iron Plate", "reinforced-iron-plate", 4),
};
