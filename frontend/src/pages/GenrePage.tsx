import { useEffect } from "react";
import { usePrograms } from "../AppContext";
import Slider from "../components/Slider";
import { useLocation } from "react-router-dom";

interface GenrePageProps {
    filter: 'movie' | 'series';
}

export function GenrePage({ filter }: GenrePageProps) {
    const { programs, setPrograms } = usePrograms();
    const location = useLocation()

    const isGenreEmpty = programs.filter(p => p.type === filter).length === 0

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:3000/${filter ?? ''}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Network response not ok ${response.status}`);
                }

                const data = await response.json();

                setPrograms(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        if (isGenreEmpty) {
            fetchData();
        }
    }, [location.pathname, programs]);

    if (isGenreEmpty) {
        return <Slider files={new Array(6).fill(null)} />
    }

    return <Slider files={programs.filter(p => p.type === filter)} />;
}