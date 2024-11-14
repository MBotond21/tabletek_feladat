import { useEffect, useState } from "react"
import { Kartya } from "../Kartya";
import { Tablet } from "../../tablet";

export default function Listazas() {

    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:3000/tablets")
            .then((response) => {
                if (response.status === 404) {
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

    if (errorServer) {
        return <p>{errorServer}</p>
    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>
    }

    return <>
        <h2>Tabletek listája</h2>
        <div className="box">
            {

                tablets.map((tablet) => (
                    <Kartya tablet={tablet} />
                )
                )
            }
        </div>
    </>
}