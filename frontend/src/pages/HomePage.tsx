import { useEffect } from "react";
import { usePrograms } from "../AppContext";
import Slider from "../components/Slider";

export function HomePage() {
    const { programs, setPrograms } = usePrograms();


    const shouldRequest = !programs.find(p => p.type === 'movie')
        || !programs.find(p => p.type === 'series')
        || programs.length === 0;

    useEffect(() => {
        if (shouldRequest) {
            const fetchData = async () => {
                const url = 'http://localhost:3000/';

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

            fetchData();
        }
    }, [programs, setPrograms]);

    if (programs.length === 0) {
        return <Slider files={new Array(6).fill(null)} />
    }

    return <Slider files={programs} />;
}