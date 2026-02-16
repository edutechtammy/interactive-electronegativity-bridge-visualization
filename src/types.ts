export interface MetalElement {
    symbol: string;
    name: string;
    electronegativity: number;
    oxidationState: string;
    color: string;
}

export interface ComparisonData {
    metal: MetalElement;
    oxygen: {
        symbol: string;
        electronegativity: number;
    };
    difference: number;
}

export type VisualizationStage = 'select' | 'en-values' | 'electron-flow' | 'proton-release';
