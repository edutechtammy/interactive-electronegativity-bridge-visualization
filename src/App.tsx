import ElectronegativityBridge from './components/ElectronegativityBridge';
import './App.css';

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>Interactive Electronegativity Bridge</h1>
                <p className="subtitle">
                    Connecting Gen Chem I: How Electronegativity Explains Acid-Base Behavior
                </p>
            </header>
            <main className="app-main">
                <ElectronegativityBridge />
            </main>
            <footer className="app-footer">
                <p>
                    💡 <strong>Key Concept:</strong> Higher electronegativity differences lead to
                    greater electron density shifts, weakening O-H bonds and releasing H⁺ ions.
                </p>
            </footer>
        </div>
    );
}

export default App;
