import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './ProtonReleaseVisualization.css';

interface ProtonReleaseVisualizationProps {
    difference: number;
    acidityDescription: string;
}

const ProtonReleaseVisualization = ({ difference, acidityDescription }: ProtonReleaseVisualizationProps) => {
    const [protonReleased, setProtonReleased] = useState(false);
    const [showAcidBehavior, setShowAcidBehavior] = useState(false);

    useEffect(() => {
        setProtonReleased(false);
        setShowAcidBehavior(false);

        const releaseTimer = setTimeout(() => setProtonReleased(true), 1500);
        const behaviorTimer = setTimeout(() => setShowAcidBehavior(true), 2500);

        return () => {
            clearTimeout(releaseTimer);
            clearTimeout(behaviorTimer);
        };
    }, [difference]);

    const acidityLevel = difference >= 2.0 ? 'strong' :
        difference >= 1.5 ? 'moderate' :
            difference >= 1.0 ? 'weak' : 'minimal';

    return (
        <div className="proton-release-visualization">
            <h3>Proton (H⁺) Release & Acidic Behavior</h3>

            <div className="release-container">
                <div className="molecule-section">
                    <div className="before-after">
                        <div className="state-box before">
                            <span className="state-label">Before</span>
                            <div className="molecule-display">
                                <span className="molecule-part metal">M<sup>n+</sup></span>
                                <span className="bond">—</span>
                                <span className="molecule-part oxygen">O</span>
                                <span className="bond weakened">—</span>
                                <span className="molecule-part hydrogen">H</span>
                            </div>
                            <div className="state-description">Weakened O-H bond</div>
                        </div>

                        <motion.div
                            className="transition-arrow"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                        >
                            →
                        </motion.div>

                        <div className="state-box after">
                            <span className="state-label">After</span>
                            <div className="molecule-display">
                                <span className="molecule-part metal">M<sup>n+</sup></span>
                                <span className="bond">—</span>
                                <span className="molecule-part oxygen">O</span>
                                <span className="molecule-part hydroxide">
                                    <sup>−</sup>
                                </span>
                            </div>
                            <div className="state-description">Hydroxide ion formed</div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {protonReleased && (
                            <motion.div
                                className="proton-release"
                                initial={{ opacity: 0, y: -20, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    y: 60,
                                    scale: 1,
                                    x: [0, 10, -10, 0]
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{
                                    duration: 1.5,
                                    x: {
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }
                                }}
                            >
                                <div className="proton-particle">
                                    H⁺
                                </div>
                                <motion.div
                                    className="release-label"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Proton Released!
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {showAcidBehavior && (
                        <motion.div
                            className="acidity-indicator"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div className={`acidity-card ${acidityLevel}`}>
                                <div className="acidity-icon">
                                    {acidityLevel === 'strong' && '⚡'}
                                    {acidityLevel === 'moderate' && '🔋'}
                                    {acidityLevel === 'weak' && '💫'}
                                    {acidityLevel === 'minimal' && '✨'}
                                </div>
                                <h4>Acidic Behavior</h4>
                                <div className="acidity-description">
                                    {acidityDescription}
                                </div>
                                <div className="acidity-meter">
                                    <div className="meter-label">Acidity Level:</div>
                                    <div className="meter-bar">
                                        <motion.div
                                            className={`meter-fill ${acidityLevel}`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(difference / 2.5) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                        />
                                    </div>
                                    <div className="meter-labels">
                                        <span>Weak</span>
                                        <span>Strong</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <motion.div
                className="chemical-equation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
            >
                <h4>Overall Process:</h4>
                <div className="equation-display">
                    <span className="equation-part">[M(H₂O)<sub>n</sub>]<sup>n+</sup></span>
                    <span className="equation-arrow">⇌</span>
                    <span className="equation-part">[M(OH)(H₂O)<sub>n-1</sub>]<sup>(n-1)+</sup></span>
                    <span className="equation-plus">+</span>
                    <span className="equation-part proton">H⁺</span>
                </div>
            </motion.div>

            <motion.div
                className="key-insight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
            >
                <div className="insight-box">
                    <h4>🔑 Key Insight</h4>
                    <p>
                        The greater the electronegativity difference, the more electron density
                        is pulled away from hydrogen, making the O-H bond weaker and H⁺ release
                        easier. This is why metal cations in water can act as acids!
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default ProtonReleaseVisualization;
