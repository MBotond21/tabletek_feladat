import { useState } from "react"
import { parsePath } from "react-router-dom";

export default function Felvetel() {

    const [manufacturer, setManufacturer] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [processor, setProcessor] = useState<string>('');
    const [processorClockSpeed, setProcessorClockSpeed] = useState<number>(0);
    const [processorCores, setProcessorCores] = useState<number>(0);
    const [storage, setStorage] = useState<number>(0);
    const [screenSize, setScreenSize] = useState<number>(0);
    const [screenResolution, setScreenResolution] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const newTablet = {
            manufacturer: manufacturer,
            model: model,
            processor: processor,
            processorClockSpeed: processorClockSpeed,
            processorCores: processorCores,
            storage: storage,
            screenSize: screenSize,
            screenResolution: screenResolution,
            price: price
        }
        try {
            const response = await fetch('http://localhost:3000/tablets', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTablet)
            })
            if (!response.ok) {
                throw new Error(`Szerverhiba: ${response.status}`);
            }
            setSuccess(true);

        } catch (err) { setError(err.message) }
    }

    return <>
        <h2>Felvétel</h2>
        <form>
            <div>
                <label>Manufacturer:</label>
                <input value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
            </div>
            <div>
                <label>Model:</label>
                <input value={model} onChange={(e) => setModel(e.target.value)} />
            </div>
            <div>
                <label>Processor:</label>
                <input value={processor} onChange={(e) => setProcessor(e.target.value)} />
            </div>
            <div>
                <label>Processor Clock Speed (MHz):</label>
                <input type="number" value={processorClockSpeed} onChange={(e) => setProcessorClockSpeed(parseInt(e.target.value))} />
            </div>
            <div>
                <label>Processor Cores:</label>
                <input type="number" value={processorCores} onChange={(e) => setProcessorCores(parseInt(e.target.value))} />
            </div>
            <div>
                <label>Storage (GB):</label>
                <input type="number" value={storage} onChange={(e) => setStorage(parseInt(e.target.value))} />
            </div>
            <div>
                <label>Screen Size (inches):</label>
                <input type="number" value={screenSize} onChange={(e) => setScreenSize(parseInt(e.target.value))} />
            </div>
            <div>
                <label>Screen Resolution:</label>
                <input value={screenResolution} onChange={(e) => setScreenResolution(e.target.value)} />
            </div>
            <div>
                <label>Price in HUF:</label>
                <input type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
            </div>
            <button onClick={handleSubmit} className="btn">Submit</button>
        </form>

        {error && <p>Hiba történt: {error}</p>}
        {success && <p>Sikeres adatfelvétel</p>}
    </>
}