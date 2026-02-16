# Quick Start Guide

## 🚀 Running the Application

### First Time Setup
```bash
# Navigate to project directory
cd interactive-electronegativity-bridge-visualization

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

## 📱 Using the Visualization

### Step-by-Step Tutorial

#### 1️⃣ Select a Metal
- Click on any metal cation card (Al³⁺, Mg²⁺, Fe³⁺, Zn²⁺, Cu²⁺, or Ca²⁺)
- Notice each metal has its own electronegativity (EN) value
- The oxygen atom (EN = 3.4) is shown for comparison

#### 2️⃣ View Electronegativity Comparison
- Watch the EN bars animate to show relative values
- See the difference calculation: Δ = O_EN - Metal_EN
- Larger Δ = stronger electron-pulling effect

#### 3️⃣ Watch Electron Flow Animation
- Observe electron particles flowing from H toward O
- Notice the O-H bond weakening
- Flow intensity reflects the EN difference

#### 4️⃣ See Proton Release
- Watch H⁺ release from the weakened O-H bond
- View the acidity meter showing relative strength
- Read the complete chemical equation

#### 5️⃣ Compare Different Metals
- Click "Choose Different Metal" to try another
- Compare acidity strengths between metals
- Explore the relationship between EN and acidity

### Navigation Tips

**Progressive View** (Default)
- Go through each stage one at a time
- Click "Next" buttons to advance
- Best for first-time learners

**Complete Process View**
- Click "Show Complete Process" button
- See all stages simultaneously
- Best for review or quick comparison

## 🎯 Learning Goals

### What Students Should Understand

1. **Electronegativity Scale**
   - EN measures electron-pulling ability
   - Oxygen has high EN (3.4)
   - Metals have lower EN values

2. **EN Difference Matters**
   - Larger Δ → stronger effect
   - Smaller Δ → weaker effect
   - Quantitative relationship to acidity

3. **Electron Density Flow**
   - Electrons pulled toward higher EN atom (O)
   - Electrons pulled away from H
   - O-H bond weakens as result

4. **Proton Release Mechanism**
   - Weakened O-H bond → easier H⁺ release
   - More H⁺ release → more acidic
   - Metal cations can act as acids!

5. **Comparative Analysis**
   - Al³⁺ vs Ca²⁺: Different EN differences
   - Fe³⁺ vs Mg²⁺: Different acidity strengths
   - Prediction: Can estimate acidity from EN values

## 🧪 Try These Experiments

### Experiment 1: Highest vs Lowest EN Difference
1. Select **Ca²⁺** (EN = 1.0) - highest Δ
2. Observe the strong electron flow and acidity
3. Reset and select **Cu²⁺** (EN = 1.9) - lowest Δ
4. Compare the difference in behavior

**Question**: Why is the difference in acidity so dramatic?

### Experiment 2: Similar EN Values
1. Try **Al³⁺** (EN = 1.6)
2. Try **Zn²⁺** (EN = 1.6)
3. Compare their acidic behavior

**Question**: Do they have the same acidity? Why or why not?

### Experiment 3: Trend Analysis
1. Go through metals from highest to lowest EN:
   - Cu²⁺ (1.9) → Fe³⁺ (1.8) → Al³⁺/Zn²⁺ (1.6) → Mg²⁺ (1.3) → Ca²⁺ (1.0)
2. Note the trend in acidity strength

**Question**: Can you predict acidity from EN alone?

## 💡 Discussion Questions

### For Individual Reflection
1. What happens to the O-H bond as EN difference increases?
2. Why doesn't the metal itself release a proton?
3. How does charge density relate to this process?
4. Can you think of real-world examples where this matters?

### For Group Discussion
1. Compare your predictions vs. observations
2. Discuss the role of water in this process
3. Connect to Lewis acid-base theory
4. Explore implications for environmental chemistry

## 📊 Key Data Reference

| Metal | EN | Δ (O - Metal) | Acidity Level |
|-------|-----|---------------|---------------|
| Ca²⁺  | 1.0 | 2.4 | Very Strong |
| Mg²⁺  | 1.3 | 2.1 | Strong |
| Al³⁺  | 1.6 | 1.8 | Moderate |
| Zn²⁺  | 1.6 | 1.8 | Moderate |
| Fe³⁺  | 1.8 | 1.6 | Moderate-Weak |
| Cu²⁺  | 1.9 | 1.5 | Weak |

## 🔧 Troubleshooting

### Development Server Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Build Errors
```bash
# Clean build cache
rm -rf dist
npm run build
```

## 🎓 Integration Ideas

### In Lectures
- Project during EN discussion
- Use as transition to acid-base chemistry
- Demonstrate before lab experiments

### As Homework
- Pre-lab preparation
- Post-lecture reinforcement
- Study guide for exams

### In Lab
- Reference during titrations
- Explain pH observations
- Connect theory to practice

## 📚 Related Concepts to Explore

After mastering this visualization:
- **pKa values** of metal aqua complexes
- **Coordination geometry** effects
- **Hard-soft acid-base** (HSAB) theory
- **Hydrolysis reactions** in detail
- **Buffer systems** with metal ions

## 🎨 Customization for Instructors

### Adding New Metals
Edit `src/data.ts`:
```typescript
{
  symbol: 'Ni',
  name: 'Nickel',
  electronegativity: 1.8,
  oxidationState: '2+',
  color: '#27ae60'
}
```

### Adjusting Acidity Descriptions
Modify `getAcidityDescription()` function in `src/data.ts`

### Changing Colors/Styles
Update CSS variables in `src/index.css`

---

**Need Help?** Check the main README.md for detailed documentation.

**Found a Bug?** Please report it in the repository issues.

**Have Suggestions?** Contributions welcome!
