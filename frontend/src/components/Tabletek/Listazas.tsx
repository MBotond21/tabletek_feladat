import { useEffect, useState } from "react"

interface Tablet {
    id: number;
    manufacturer: string;
    model: string;
    processor: string;
    ram: number; // in GB
    storage: number; // in GB
    screenResolution: string; // e.g., "2560 x 1600"
    screenType: string; // e.g., "LCD", "OLED"
    operatingSystem: string; // e.g., "Android", "iPadOS"
  }

export default function Listazas() {

    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");
    
    useEffect(() => {
        fetch("http://localhost:3000/tablets")
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                    //throw new Error('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                    //throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json() 
            })
            .then((data) => {
                setTablets(data);
                setLoading(false);
                //console.log(data); 
            })
            .catch((error) => { 
                console.log(error.message) 
                setError(error.message);
            })
    }, [])

    if(errorServer){
        return <p>{errorServer}</p>
    }
    if(loading) { 
        return <p>Loading...</p>
    }
    if(error){
        return <p>Hiba történt: {error}.</p>
    }

    return <>
        <h2>Tabletek listája</h2>
        <ul>
            {tablets.map((tablet) => (
                    <li key={tablet.id}>
                        {tablet.manufacturer} {tablet.model} : RAM: {tablet.ram} GB, Storge: {tablet.storage}
                    </li>
                    )
                )
            }
        </ul>
    </>
}