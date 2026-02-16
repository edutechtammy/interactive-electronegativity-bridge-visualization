import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MetalElement, VisualizationStage } from '../types';
import { METAL_ELEMENTS, OXYGEN_EN, getAcidityDescription } from '../data';
import PeriodicTableSegment from './PeriodicTableSegment.tsx';
import ElectronegativityComparison from './ElectronegativityComparison.tsx';
import ElectronFlowAnimation from './ElectronFlowAnimation.tsx';
import ProtonReleaseVisualization from './ProtonReleaseVisualization.tsx';
import './ElectronegativityBridge.css';

const ElectronegativityBridge = () => {
    const [selectedMetal, setSelectedMetal] = useState<MetalElement | null>(null);
    const [stage, setStage] = useState<VisualizationStage>('select');
    const [showAllStages, setShowAllStages] = useState(false);

    const handleMetalSelect = (metal: MetalElement) => {
        setSelectedMetal(metal);
        setStage('en-values');
        setShowAllStages(false);
    };

    const handleReset = () => {
        setSelectedMetal(null);
        setStage('select');
        setShowAllStages(false);
    };

    const handleNextStage = () => {
        if (stage === 'en-values') {
            setStage('electron-flow');
        } else if (stage === 'electron-flow') {
            setStage('proton-release');
        }
    };

    const handleShowAll = () => {
        setStage('en-values');
        setShowAllStages(true);
    };

    const enDifference = selectedMetal ? OXYGEN_EN - selectedMetal.electronegativity : 0;

    return (
        <div className="electronegativity-bridge">
            <div className="instruction-panel">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="instruction-content"
                >
                    {stage === 'select' && (
                        <>
                            <h2>Step 1: Select a Metal Cation</h2>
                            <p>Click on any metal to explore how its electronegativity affects acid-base behavior when bonded to oxygen.</p>
                        </>
                    )}
                    {stage === 'en-values' && !showAllStages && (
                        <>
                            <h2>Step 2: Electronegativity Comparison</h2>
                            <p>Compare the electronegativity values and see the difference (Δ). Higher Δ means stronger electron pulling.</p>
                        </>
                    )}
                    {stage === 'electron-flow' && !showAllStages && (
                        <>
                            <h2>Step 3: Electron Density Flow</h2>
                            <p>Watch how electrons are pulled from H toward O due to the electronegativity difference.</p>
                        </>
                    )}
                    {stage === 'proton-release' && (
                        <>
                            <h2>Step 4: Proton (H⁺) Release</h2>
                            <p>The electron shift weakens the O-H bond, causing H⁺ release and creating acidic behavior.</p>
                        </>
                    )}
                    {showAllStages && (
                        <>
                            <h2>Complete Process Overview</h2>
                            <p>See all stages of how electronegativity leads to acidic behavior in one view.</p>
                        </>
                    )}
                </motion.div>
            </div>

            <div className="visualization-area">
                <AnimatePresence mode="wait">
                    {stage === 'select' && (
                        <motion.div
                            key="select"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PeriodicTableSegment
                                metals={METAL_ELEMENTS}
                                onMetalSelect={handleMetalSelect}
                                selectedMetal={selectedMetal}
                            />
                        </motion.div>
                    )}

                    {stage !== 'select' && selectedMetal && (
                        <motion.div
                            key="visualization"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="stages-container"
                        >
                            {(stage === 'en-values' || showAllStages) && (
                                <>
                                    <ElectronegativityComparison
                                        metal={selectedMetal}
                                        oxygenEN={OXYGEN_EN}
                                        difference={enDifference}
                                    />
                                    {stage === 'en-values' && !showAllStages && (
                                        <motion.div
                                            className="inline-navigation"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 3 }}
                                        >
                                            <div className="continue-prompt">
                                                <p>Now let's see what happens to the electrons...</p>
                                                <motion.div
                                                    className="arrow-down"
                                                    animate={{ y: [0, 10, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    ↓
                                                </motion.div>
                                            </div>
                                            <button onClick={handleNextStage} className="btn btn-primary btn-pulse">
                                                <span>Show Electron Flow Animation</span>
                                                <span className="arrow">→</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </>
                            )}

                            {(stage === 'electron-flow' || showAllStages) && (
                                <>
                                    <ElectronFlowAnimation
                                        difference={enDifference}
                                        metalColor={selectedMetal.color}
                                    />
                                    {stage === 'electron-flow' && !showAllStages && (
                                        <motion.div
                                            className="inline-navigation"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 2 }}
                                        >
                                            <div className="continue-prompt">
                                                <p>Next, see what happens when the bond breaks...</p>
                                                <motion.div
                                                    className="arrow-down"
                                                    animate={{ y: [0, 10, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    ↓
                                                </motion.div>
                                            </div>
                                            <button onClick={handleNextStage} className="btn btn-primary btn-pulse">
                                                <span>Show Proton Release</span>
                                                <span className="arrow">→</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </>
                            )}

                            {(stage === 'proton-release' || showAllStages) && (
                                <ProtonReleaseVisualization
                                    difference={enDifference}
                                    acidityDescription={getAcidityDescription(enDifference)}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {selectedMetal && (
                <div className="control-panel">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="controls"
                    >
                        <button onClick={handleReset} className="btn btn-secondary">
                            ← Choose Different Metal
                        </button>

                        {stage === 'en-values' && !showAllStages && (
                            <button onClick={handleShowAll} className="btn btn-accent">
                                Skip to Complete Process
                            </button>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ElectronegativityBridge;
