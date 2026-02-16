import { MetalElement } from './types';

export const OXYGEN_EN = 3.4;

export const METAL_ELEMENTS: MetalElement[] = [
    {
        symbol: 'Ca',
        name: 'Calcium',
        electronegativity: 1.0,
        oxidationState: '2+',
        color: '#c0392b' // Dark red - strongest acid (highest Δ = 2.4)
    },
    {
        symbol: 'Mg',
        name: 'Magnesium',
        electronegativity: 1.3,
        oxidationState: '2+',
        color: '#e74c3c' // Red - strong acid (Δ = 2.1)
    },
    {
        symbol: 'Al',
        name: 'Aluminum',
        electronegativity: 1.6,
        oxidationState: '3+',
        color: '#e67e22' // Orange-red - moderate acid (Δ = 1.8)
    },
    {
        symbol: 'Zn',
        name: 'Zinc',
        electronegativity: 1.6,
        oxidationState: '2+',
        color: '#f39c12' // Orange - moderate acid (Δ = 1.8)
    },
    {
        symbol: 'Fe',
        name: 'Iron',
        electronegativity: 1.8,
        oxidationState: '3+',
        color: '#3498db' // Light blue - weak acid (Δ = 1.6)
    },
    {
        symbol: 'Cu',
        name: 'Copper',
        electronegativity: 1.9,
        oxidationState: '2+',
        color: '#2980b9' // Blue - weakest acid (lowest Δ = 1.5)
    }
];

export const getAcidityDescription = (difference: number): string => {
    if (difference >= 2.0) {
        return 'Strong electron-pulling → Strong acidic behavior';
    } else if (difference >= 1.5) {
        return 'Moderate electron-pulling → Moderate acidic behavior';
    } else if (difference >= 1.0) {
        return 'Weak electron-pulling → Weak acidic behavior';
    } else {
        return 'Minimal electron-pulling → Minimal acidic behavior';
    }
};
