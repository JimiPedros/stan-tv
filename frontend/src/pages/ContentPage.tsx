import { useEffect, useState } from "react";
import { ContentFile } from "../shared/types";
import { useNavigate } from "react-router-dom";
import { usePrograms } from "../AppContext";

export function ContentPage() {
    const [file, setFile] = useState<ContentFile | null>(null);
    const [error, setError] = useState<boolean>(false);
    const { programs } = usePrograms();
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if (e.key === 'Backspace') {
                navigate('/');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [history]);


    useEffect(() => {
        const [type, programId] = location.pathname.slice(1).split('/')

        const currentProgram = programs.find(p => {
            return p.type === type && p.id === parseInt(programId)
        })

        if (currentProgram) {
            setFile(currentProgram)
        } else {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000${location.pathname}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        console.log('throw');
                        throw new Error(`Network response not ok ${response.status}`);
                    }

                    const data = await response.json();
                    setFile(data);
                } catch (error) {
                    console.error('There was a problem with the fetch operation:', error);
                    setError(true);
                }
            };

            fetchData();
        }
    }, []);

    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3 lg:py-8 flex">
                <div className="mx-auto max-w-2xl">
                    <p className="text-white-600 font-bold text-3xl mb-4 mt-8">
                        Oops! There was an error fetching that content.
                    </p>
                    <p className="text-white-600 text-lg mb-8">
                        Please try again or{' '}
                        <a href="/" className="text-blue-200 hover:underline">
                            look for something else
                        </a>
                        .
                    </p>
                </div>
            </div>
        );
    }

    if (!file) {
        return (
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3 lg:py-8 flex">
                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="mb-6 lg:mb-0">
                            <div className="h-132 w-122 mr-4 rounded animate-pulse bg-gray-200 aspect-w-7 aspect-h-10" />
                        </div>
                        <div>
                            <h2 className="animate-pulse rounded bg-gray-200 w-2/3 h-6 mb-4"></h2>
                            <p className="animate-pulse rounded bg-gray-200 w-1/2 h-4 mb-2"></p>
                            <p className="animate-pulse rounded bg-gray-200 w-5/6 h-4 mb-2"></p>
                            <p className="animate-pulse rounded bg-gray-200 w-4/6 h-4"></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3 lg:py-8 flex">
            <div className="mx-auto max-w-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="mb-6 lg:mb-0">
                        <img
                            src={file.image}
                            alt={file.title}
                            className="w-full h-auto max-w-md mx-auto lg:max-w-full lg:h-auto"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            {file.title}
                        </h2>
                        <p className="mt-6 text-md ">
                            {file.genre}, {file.year}
                        </p>
                        <p className="mt-6 text-lg leading-8">
                            {file.description}
                        </p>
                        <p className="mt-6 text-lg leading-8">
                            Audience rating {file.rating}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}