import { motion } from 'framer-motion';
import { MetalElement } from '../types';
import './ElectronegativityComparison.css';

interface ElectronegativityComparisonProps {
    metal: MetalElement;
    oxygenEN: number;
    difference: number;
}

const ElectronegativityComparison = ({ metal, oxygenEN, difference }: ElectronegativityComparisonProps) => {
    const maxEN = 4.0;
    const metalPercent = (metal.electronegativity / maxEN) * 100;
    const oxygenPercent = (oxygenEN / maxEN) * 100;

    return (
        <div className="electronegativity-comparison">
            <h3>Electronegativity Values</h3>

            <div className="comparison-container">
                <div className="en-item">
                    <div className="en-label-box" style={{ borderColor: metal.color }}>
                        <span className="element-symbol">{metal.symbol}</span>
                        <sup>{metal.oxidationState}</sup>
                    </div>
                    <div className="en-bar-container">
                        <motion.div
                            className="en-bar metal-bar"
                            style={{
                                width: `${metalPercent}%`,
                                backgroundColor: metal.color
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${metalPercent}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                        />
                        <motion.div
                            className="en-value-label"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            {metal.electronegativity}
                        </motion.div>
                    </div>
                </div>

                <div className="en-item">
                    <div className="en-label-box oxygen-box">
                        <span className="element-symbol">O</span>
                        <sup>2-</sup>
                    </div>
                    <div className="en-bar-container">
                        <motion.div
                            className="en-bar oxygen-bar"
                            style={{ width: `${oxygenPercent}%` }}
                            initial={{ width: 0 }}
                            animate={{ width: `${oxygenPercent}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                        <motion.div
                            className="en-value-label"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            {oxygenEN}
                        </motion.div>
                    </div>
                </div>
            </div>

            <motion.div
                className="difference-display"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
            >
                <div className="difference-card">
                    <div className="difference-label">Electronegativity Difference (Δ)</div>
                    <div className="difference-calculation">
                        {oxygenEN} - {metal.electronegativity} =
                        <motion.span
                            className="difference-value"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                delay: 2.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 10
                            }}
                        >
                            {difference.toFixed(1)}
                        </motion.span>
                    </div>
                    <div className="difference-meaning">
                        {difference >= 2.0 && '⚡ Very Large Difference - Strong Effect'}
                        {difference >= 1.5 && difference < 2.0 && '🔋 Large Difference - Moderate Effect'}
                        {difference >= 1.0 && difference < 1.5 && '💫 Medium Difference - Noticeable Effect'}
                        {difference < 1.0 && '✨ Small Difference - Weak Effect'}
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="explanation-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                <p>
                    <strong>What this means:</strong> Oxygen's higher electronegativity ({oxygenEN})
                    compared to {metal.symbol}{metal.oxidationState} ({metal.electronegativity}) means
                    oxygen will pull electron density away from the O-H bonds in the complex.
                </p>
            </motion.div>
        </div>
    );
};

export default ElectronegativityComparison;
