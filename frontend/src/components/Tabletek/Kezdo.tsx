import { useEffect, useState } from "react"
import { Kartya } from "../Kartya";
import { Tablet } from "../../tablet";

export default function Kezdo() {

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

    const cheap3 = () => {
        return tablets.sort((a: Tablet, b: Tablet) => a.price - b.price).slice(0, 3);
    }

    const exp3 = () => {
        return tablets.sort((a: Tablet, b: Tablet) => b.price - a.price).slice(0, 3);
    }

    return <>
        <h2>Kezdolap</h2>
        <br />
        <h2>Legolcsóbb 3</h2>
        <div className="box">
            {

                cheap3().map((tablet) => (
                    <Kartya tablet={tablet} />
                )
                )
            }
        </div>
        <br />
        <h2>Legdrágább 3</h2>
        <div className="box">
            {

                exp3().map((tablet) => (
                    <Kartya tablet={tablet} />
                )
                )
            }
        </div>
    </>
}