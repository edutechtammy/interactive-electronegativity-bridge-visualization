import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './ElectronFlowAnimation.css';

interface ElectronFlowAnimationProps {
    difference: number;
    metalColor: string;
}

const ElectronFlowAnimation = ({ difference, metalColor }: ElectronFlowAnimationProps) => {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        setIsAnimating(true);
    }, [difference]);

    // Calculate flow intensity based on EN difference
    const flowIntensity = Math.min(difference / 2.0, 1);
    const particleCount = Math.floor(3 + flowIntensity * 5);

    return (
        <div className="electron-flow-animation">
            <h3>Electron Density Flow</h3>

            <div className="molecule-container">
                {/* Metal-Oxygen-Hydrogen complex */}
                <div className="molecule-structure">
                    <motion.div
                        className="atom metal-atom"
                        style={{
                            borderColor: metalColor,
                            boxShadow: `0 0 20px ${metalColor}40`
                        }}
                        animate={{
                            boxShadow: [
                                `0 0 20px ${metalColor}40`,
                                `0 0 30px ${metalColor}60`,
                                `0 0 20px ${metalColor}40`
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="atom-label">M<sup>n+</sup></span>
                    </motion.div>

                    <div className="bond bond-mo">
                        <div className="bond-line"></div>
                    </div>

                    <motion.div
                        className="atom oxygen-atom"
                        animate={{
                            boxShadow: [
                                '0 0 25px rgba(231, 76, 60, 0.4)',
                                `0 0 40px rgba(231, 76, 60, ${0.4 + flowIntensity * 0.4})`,
                                '0 0 25px rgba(231, 76, 60, 0.4)'
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="atom-label">O</span>
                    </motion.div>

                    <motion.div
                        className="bond bond-oh"
                        animate={{
                            opacity: [1, 0.6, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="bond-line weakening"></div>
                        <motion.span
                            className="bond-status"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            Weakening
                        </motion.span>
                    </motion.div>

                    <motion.div
                        className="atom hydrogen-atom"
                        animate={{
                            x: [0, 2, 0],
                            boxShadow: [
                                '0 0 15px rgba(52, 152, 219, 0.3)',
                                '0 0 10px rgba(52, 152, 219, 0.2)',
                                '0 0 15px rgba(52, 152, 219, 0.3)'
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span className="atom-label">H</span>
                    </motion.div>
                </div>

                {/* Electron flow particles - H → O direction */}
                <div className="electron-flow">
                    {isAnimating && Array.from({ length: particleCount }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="electron-particle"
                            initial={{
                                x: 180,
                                y: 0,
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                x: 10,
                                y: Math.sin(i * 0.5) * 20,
                                opacity: [0, 1, 1, 0],
                                scale: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                                ease: "easeInOut"
                            }}
                        >
                            e⁻
                        </motion.div>
                    ))}
                </div>

                {/* Electron density gradient overlay */}
                <motion.div
                    className="density-gradient"
                    style={{
                        background: `linear-gradient(to left, 
              rgba(52, 152, 219, 0.2) 0%, 
              transparent 30%, 
              #e74c3c40 70%, 
              #e74c3c60 100%)`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: flowIntensity }}
                    transition={{ duration: 1.5 }}
                />
            </div>

            <motion.div
                className="flow-explanation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <div className="explanation-card">
                    <h4>What's Happening?</h4>
                    <div className="explanation-steps">
                        <motion.div
                            className="step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 }}
                        >
                            <span className="step-number">1</span>
                            <p>Metal cation (M^n+) pulls electron density through the M-O bond due to its high positive charge</p>
                        </motion.div>
                        <motion.div
                            className="step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 }}
                        >
                            <span className="step-number">2</span>
                            <p>Oxygen compensates by pulling electron density from the O-H bond (shown by e⁻ flow)</p>
                        </motion.div>
                        <motion.div
                            className="step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.8 }}
                        >
                            <span className="step-number">3</span>
                            <p>The O-H bond weakens as electrons shift toward oxygen, making H⁺ release more likely</p>
                        </motion.div>
                    </div>
                    <div className="intensity-indicator">
                        <span>Flow Intensity:</span>
                        <div className="intensity-bar">
                            <motion.div
                                className="intensity-fill"
                                initial={{ width: 0 }}
                                animate={{ width: `${flowIntensity * 100}%` }}
                                transition={{ duration: 1, delay: 2 }}
                            />
                        </div>
                        <span className="intensity-label">
                            {flowIntensity > 0.75 ? 'Very Strong' :
                                flowIntensity > 0.5 ? 'Strong' :
                                    flowIntensity > 0.25 ? 'Moderate' : 'Weak'}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ElectronFlowAnimation;
