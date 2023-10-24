import { RefObject, useEffect, useRef, useState } from 'react';
import { ContentFile } from '../shared/types'
import { useNavigate } from 'react-router-dom';

export interface SliderProps {
  files: ContentFile[];
}

export default function Slider({ files }: SliderProps) {
  const imageContainerRef: RefObject<HTMLDivElement> = useRef(null);
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = imageContainerRef.current;

    if (container) {
      const step = container.clientWidth;
      if (direction === 'left') {
        container.scrollLeft -= step;
      } else {
        container.scrollLeft += step;
      }
    }
  };

  const navigateToMoviePage = (i: number) => {
    if (i !== null) {
      const focusedFile = files[i];
      if (focusedFile) {
        navigate(`/${focusedFile.type}/${focusedFile.id}`);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handleScroll('left');
          break;
        case 'ArrowRight':
          handleScroll('right');
          break;
        case 'Enter':
          focusedIndex && navigateToMoviePage(focusedIndex);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex, navigate, files]);

  return (
    <div>
      <div
        id="imageContainer"
        ref={imageContainerRef}
        className="flex overflow-x-auto space-x-4 md:space-x-6 lg:space-x-8 p-4"
        style={{
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap',
        }}
      >
        {files.map((file, index) => (
          <SliderItem
            file={file}
            index={index}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
          />
        ))}
      </div>
    </div>
  );
}

interface SliderItemProps {
  file: ContentFile | null;
  index: number;
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
}

export function SliderItem({
  file,
  index,
  setFocusedIndex,
}: SliderItemProps) {
  const handleFocus = () => {
    setFocusedIndex(index);
  };
  if (file === null) {
    return (
      <div key={index} className="relative inline-block" style={{ minWidth: '22rem' }}>
        <div>
          <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg focus-within:ring-4 focus-within:ring-indigo-500 focus-within:ring-offset-4 focus-within:ring-offset-black">
            <div className="animate-pulse bg-gray-200 h-132 w-122 rounded-lg aspect-w-7 aspect-h-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={file.id} className="relative inline-block" style={{ minWidth: '22rem' }}>
      <div>
        <div className={`aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg focus-within:ring-4 focus-within:ring-indigo-500 focus-within:ring-offset-4 focus-within:ring-offset-black`} onFocus={handleFocus}>
          <img
            src={file.image}
            alt=""
            className="pointer-events-none group-hover:opacity-75"
            height={'100px'}
          />
          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {file.title}</span>
          </button>
        </div>
        <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.title}</p>
      </div>
    </div>
  );
}