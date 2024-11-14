import { useState } from "react"

export default function Felvetel() {

    const [manufacturer, setManufacturer] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [processor, setProcessor] = useState<string>('');
    const [ram, setRam] = useState<number | null>(null);
    const [storage, setStorage] = useState<number | null>(null);
    const [screenResolution, setScreenResolution] = useState<string>('');
    const [screenType, setScreenType] = useState<string>('');
    const [operatingSystem, setOperatingSystem] = useState<string>('');
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
            ram: ram,
            storage: storage,
            screen_resolution: screenResolution,
            screen_type: screenType,
            operating_system: operatingSystem
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
                <input
                    type="text"
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                />
            </div>
            <div>
                <label>Model:</label>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />
            </div>
            <div>
                <label>Processor:</label>
                <input
                    type="text"
                    value={processor}
                    onChange={(e) => setProcessor(e.target.value)}
                />
            </div>
            <div>
                <label>RAM (GB):</label>
                <input
                    type="number"
                    value={ram ?? ''}
                    onChange={(e) => setRam(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Storage (GB):</label>
                <input
                    type="number"
                    value={storage ?? ''}
                    onChange={(e) => setStorage(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Screen Resolution:</label>
                <input
                    type="text"
                    value={screenResolution}
                    onChange={(e) => setScreenResolution(e.target.value)}
                />
            </div>
            <div>
                <label>Screen Type:</label>
                <input
                    type="text"
                    value={screenType}
                    onChange={(e) => setScreenType(e.target.value)}
                />
            </div>
            <div>
                <label>Operating System:</label>
                <input
                    type="text"
                    value={operatingSystem}
                    onChange={(e) => setOperatingSystem(e.target.value)}
                />
            </div>
            <input type="submit" value={"Submit"} onClick={(e) => handleSubmit(e)} />
        </form>

        {error && <p>Hiba történt: {error}</p>}
        {success && <p>Sikeres adatfelvétel</p>}
    </>
}