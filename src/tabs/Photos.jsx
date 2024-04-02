import { getPhotos } from 'apiService/photos';
import { PhotosGallery, Text } from 'components';
import { Form } from 'components/Form/Form';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState();
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    if (!query) return
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const { photos, per_page, total_result } = await getPhotos(query, page);
        if (!photos.length) {
          setIsEmpty(true) return
        }
        setImages(prevImages => ([...prevImages, ...photos]));
        setIsVisible(page < Math.ceil(total_result / per_page));
    
      } catch (error) {
        setError(error)
      }
      finally {
        setIsLoading(false)
      }
    }; fetchData()
  }, [page, query])
  const onHandleSubmit = value => {
    setQuery(value);
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && <PhotosGallery images={ima} />}
      {!images.length && !isEmpty && <Text textAlign="center">Let`s begin search 🔎</Text>}
      {isLoading && <Loader />}
      {error && <Text textAlign="center">❌ Something went wrong - {error}</Text>}
      {isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
    </>
  );
};
