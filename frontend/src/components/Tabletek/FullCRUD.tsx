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
    const [sortConfig, setSortConfig] = useState<{ key: keyof Tablet; direction: string } | null>(null);
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

    const handelChanged = (e: HTMLInputElement) => {
        const temp = {
            key: sortConfig!.key,
            direction: e.value
        }

        setSortConfig(temp);
    }

    const sortTablets = (key: keyof Tablet, direction: 'asc' | 'desc') => {
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Full CRUD</h1>

            <div className='box right'>
                <button className='btn' onClick={() => console.log('asc')}>&#8593;</button>
                <button className='btn' onClick={() => console.log('desc')}>&#8595;</button>
                <select name="sort">
                    <option value="dft">Default</option>
                    <option value="prc">Price</option>
                    <option value="clck">Clock Speed</option>
                    <option value="crs">Cores</option>
                    <option value="strg">Storage</option>
                </select>
            </div>

            <div className="box">
                {

                    filteredTablets.map((tablet) => (
                        <Kartya tablet={tablet} />
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