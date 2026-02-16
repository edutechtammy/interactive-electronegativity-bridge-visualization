import { motion } from 'framer-motion';
import { MetalElement } from '../types';
import { OXYGEN_EN } from '../data';
import './PeriodicTableSegment.css';

interface PeriodicTableSegmentProps {
    metals: MetalElement[];
    onMetalSelect: (metal: MetalElement) => void;
    selectedMetal: MetalElement | null;
}

const PeriodicTableSegment = ({ metals, onMetalSelect, selectedMetal }: PeriodicTableSegmentProps) => {
    return (
        <div className="periodic-table-segment">
            <div className="table-header">
                <h3>Select a Metal Cation</h3>
                <p className="hint">Click on any metal to begin</p>
            </div>

            <div className="elements-grid">
                <div className="metal-section">
                    <h4>Metal Cations</h4>
                    <div className="metal-grid">
                        {metals.map((metal, index) => (
                            <motion.button
                                key={metal.symbol}
                                className={`element-card metal ${selectedMetal?.symbol === metal.symbol ? 'selected' : ''}`}
                                style={{
                                    '--metal-color': metal.color,
                                    borderColor: metal.color
                                } as React.CSSProperties}
                                onClick={() => onMetalSelect(metal)}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="element-symbol">{metal.symbol}</div>
                                <div className="element-charge">{metal.oxidationState}</div>
                                <div className="element-name">{metal.name}</div>
                                <div className="element-en">
                                    <span className="en-label">EN:</span>
                                    <span className="en-value">{metal.electronegativity}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="comparison-arrow">
                    <div className="arrow-line"></div>
                    <div className="arrow-text">vs</div>
                </div>

                <div className="oxygen-section">
                    <h4>Bonded to Oxygen</h4>
                    <motion.div
                        className="element-card oxygen"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="element-symbol">O</div>
                        <div className="element-charge">2-</div>
                        <div className="element-name">Oxygen</div>
                        <div className="element-en">
                            <span className="en-label">EN:</span>
                            <span className="en-value">{OXYGEN_EN}</span>
                        </div>
                    </motion.div>
                    <p className="oxygen-note">
                        in M-OH<sub>2</sub> complexes
                    </p>
                </div>
            </div>

            <div className="table-footer">
                <p>
                    💡 <strong>Remember:</strong> Electronegativity measures an atom's ability to attract electrons.
                </p>
            </div>
        </div>
    );
};

export default PeriodicTableSegment;
