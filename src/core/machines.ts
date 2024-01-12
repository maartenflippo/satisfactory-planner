export type MachineId = "miner_mk1"
    | "smelter";

export type Machine = {
    /**
     * The human-friendly name of the machine.
     */
    name: string,

    /**
     * The url to the machine image.
     */
    image_url: string,

    /**
     * The MW required to run the machine at 100%.
     */
    get base_power_consumption(): number;

    /**
     * The MW produced when running at 100%.
     */
    get base_power_production(): number;
};

function machine(name: string, base_power_consumption: number, base_power_production: number, image_name: string = ""): Machine {
    const image_url = image_name === "" ? "" : `/images/machines/${image_name}_64.png`;

    return { name, image_url, base_power_production, base_power_consumption };
}

/**
 * The machines available to build the production lines.
 */
export const machines: Record<MachineId, Machine> = {
    "miner_mk1": machine("Miner Mk.1", 5, 0, "miner-mk-1"),
    "smelter": machine("Smelter", 4, 0, "smelter"),
};
