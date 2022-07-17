export interface Flavor {
    id: number;
    name: string;
    description: string;
};

export interface Flavors {
    flavors: Flavor[];
};

export interface Screen {
    id: number;
    name: string;
    location: string;
};

export interface Screens {
    screens: Screen[];
};

export interface ScreenView {
    id: number;
    name: string;
    flavor_id: string;
};

export interface ScreenViews {
    screen_views: ScreenView[];
};

export interface Location {
    id: number;
    name: string;
    address: string;
};

export interface Locations {
    locations: Location[];
};