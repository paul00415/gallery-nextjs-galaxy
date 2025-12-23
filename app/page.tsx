import ImageCarousel from '../components/ImageCarousel';
import ImageList from '../components/ImageList';

const demoCarouselImages = [
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    alt: 'Mountain',
    title: 'Mountain111',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Lake',
    title: 'Lake111',
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    alt: 'Forest',
    title: 'Forest',
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    alt: 'City',
    title: 'City',
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    alt: 'Desert',
    title: 'Desert',
  },
];

const demoItems = [
  {
    id: 1,
    poster: 'Galaxy',
    title: 'Sunset Painting',
    date: '2025.09.18',
    image: '/carousel/1.png',
    desc: 'A beautiful sunset over the mountains.',
  },
  {
    id: 2,
    poster: 'Galaxy',
    title: 'Abstract Lines',
    date: '2025.04.11',
    image: '/carousel/1.png',
    desc: 'An abstract piece with vibrant colors and dynamic lines.',
  },
  {
    id: 3,
    poster: 'Galaxy',
    title: 'Portrait Study',
    date: '2025.08.17',
    image: '/carousel/1.png',
    desc: 'A detailed portrait study capturing human emotion.',
  },
  {
    id: 4,
    poster: 'Galaxy',
    title: 'Modern Landscape',
    date: '2025.01.23',
    image: '/carousel/1.png',
    desc: 'A modern take on traditional landscape painting.',
  },
  {
    id: 5,
    poster: 'Galaxy',
    title: 'Minimal Print',
    date: '2025.07.18',
    image: '/carousel/1.png',
    desc: 'A minimalist print focusing on form and color.',
  },
  {
    id: 6,
    poster: 'Galaxy',
    title: 'Ocean View',
    date: '2025.03.15',
    image: '/carousel/1.png',
    desc: 'A calming view of the ocean at dawn.',
  },
];

export default function Gallery() {
  return (
    <div className="w-full flex flex-col gap-4 overflow-x-hidden">
      <section className="px-4 sm:px-6 md:px-8 lg:px-10">
        <ImageCarousel
          images={demoCarouselImages}
          mode="scroll"
          scrollDuration={35000}
          direction="right"
        />
      </section>

      <section className="px-4 sm:px-6 md:px-8 lg:px-10">
        <ImageList items={demoItems} />
      </section>
    </div>
  );
}
