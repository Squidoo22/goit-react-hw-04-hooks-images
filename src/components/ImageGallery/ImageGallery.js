import { useState, useEffect } from 'react';
import { getSearchedImage } from '../../services/pixabay-api';
import ImageGalleryItem from './ImageGalleryItem';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';
import s from './ImageGallery.module.css';

export default function ImageGallery({ findImage, onLoad, page }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!findImage) {
      return;
    }

    if (page === 1) {
      setImages([]);
    }

    setIsLoading(true);
    getSearchedImage(findImage, page)
      .then(
        res =>
          setImages(images => {
            return [...images, ...res.hits];
          }),
        setIsLoading(false),
      )
      .then(() => {
        if (page !== 1) {
          SmoothScrolling();
        }
      })
      .catch(error => setError(error), setIsLoading(false));
  }, [findImage, page]);

  const SmoothScrolling = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleClick = index => {
    setImageIndex(index);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (showModal) {
    return <Modal onClose={toggleModal} image={images[imageIndex]} />;
  }
  if (error) {
    return <div className={s.box}>{error.message}</div>;
  }
  if (images.length === 0 && !error) {
    return <div className={s.box}>Start your search</div>;
  }
  if (images.length > 0) {
    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map((image, index) => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              type={image.type}
              onClick={() => {
                handleClick(index);
              }}
            />
          ))}
        </ul>
        <Button onLoad={onLoad} />
      </>
    );
  }
}
