import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default function App() {
  const [findImage, setFindImage] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = findImage => {
    setFindImage(findImage);
    setPage(1);
  };

  const onLoad = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery findImage={findImage} onLoad={onLoad} page={page} />

      <ToastContainer />
    </>
  );
}
