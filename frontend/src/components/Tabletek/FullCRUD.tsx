import { useState, useEffect } from 'react';
import { Tablet } from '../../tablet';
import { Kartya } from '../Kartya';

export default function FullCRUD() {
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [filteredTablets, setFilteredTablets] = useState<Tablet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Tablet; direction: string } | null>({key: 'dft' as keyof Tablet, direction: 'asc'});
    const [searchTerm, setSearchTerm] = useState('');

    const fetchTablets = (page: number) => {
        setLoading(true);
        setError(null);

        fetch(`http://localhost:3000/tablets?page=${page}&limit=4`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTablets(data.data);
                setFilteredTablets(data.data)
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (sortConfig) {
            sortTablets(sortConfig.key, sortConfig.direction as 'asc' | 'desc');
        }
    }, [sortConfig]);

    const handelDirectionChanged = (direction: string) => {
        const key = sortConfig!.key;

        setSortConfig({ key, direction });
    }

    const handelOrderChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.value as keyof Tablet
        const direction = sortConfig!.direction

        setSortConfig({key, direction});
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = tablets.filter(
            (tablet) =>
                tablet.manufacturer.toLowerCase().includes(term) ||
                tablet.model.toLowerCase().includes(term)
        );
        setFilteredTablets(filtered);
    };

    const sortTablets = (key: keyof Tablet, direction: 'asc' | 'desc') => {
        if(key == 'dft' as keyof Tablet){
            setFilteredTablets(tablets);
            setSortConfig({ key, direction });
            return;
        }
        const sortedTablets = [...filteredTablets].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredTablets(sortedTablets);
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        fetchTablets(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Full CRUD</h1>

            <form>
                <label>
                    Keresés:
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Márka vagy típus alapján..."
                    />
                </label>
            </form>

            <div className='box right'>
                <button className='btn' onClick={() => handelDirectionChanged('asc')}>&#8593;</button>
                <button className='btn' onClick={() => handelDirectionChanged('desc')}>&#8595;</button>
                <select name="sort" onChange={(e) => handelOrderChanged(e)}>
                    <option value="dft">Default</option>
                    <option value="price">Price</option>
                    <option value="processor_clock_speed">Clock Speed</option>
                    <option value="processor_cores">Cores</option>
                    <option value="storage">Storage</option>
                </select>
            </div>

            <div className="box">
                {

                    filteredTablets.map((tablet) => (
                        <Kartya tablet={tablet} btn={<button className='del' onClick={() => {handleDelete(tablet.id)}}>Törlés</button>}/>
                    )
                    )
                }
            </div>

            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='btn'
                >
                    Előző
                </button>
                <span>
                    Oldal {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='btn'
                >
                    Következő
                </button>
            </div>
        </div>
    );
};