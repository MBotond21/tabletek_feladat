import { useEffect, useState } from "react"
import { Kartya } from "../Kartya";
import { Tablet } from "../../tablet";

export default function Torles() {

    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");

    const handleDelete = async (id: number) => {
        if(confirm("Biztosan törölni szeretnéd?")){
            try{
                const response = await fetch(`http://localhost:3000/tablets/${id}`, {
                    method: 'DELETE',
                })
                setTablets(tablets.filter( (o) => o.id !== id ))

            }catch(err) {}
        }
    }

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
                setTablets(data.data);
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
                    <Kartya tablet={tablet} btn={<button className='del' onClick={() => {handleDelete(tablet.id)}}>Törlés</button>} />
                )
                )
            }
        </div>
    </>
}