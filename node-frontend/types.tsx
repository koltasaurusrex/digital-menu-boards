export interface Flavor {
    id: number;
    name: string;
    description: string;
};

export interface Flavors {
    flavors: Flavor[];
};