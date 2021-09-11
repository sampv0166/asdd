import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Button, Card, Carousel, Image, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCategory, getCategory } from '../../actions/categoryActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import debounce from 'lodash.debounce';
import checkPermission from './checkpermission';
import { deleteSlider, getSlider } from '../../actions/sliderActions';

const SliderScreen = ({ history }) => {
  const [inputValue, setInputValue] = useState('');
  const sliderList = useSelector((state) => state.sliderList);
  const { loading, slidersError, sliders } = sliderList;

  const sliderDelete = useSelector((state) => state.sliderDelete);
  const { loading: loadingDelete, error: errorDelete } = sliderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSlider());
  }, [dispatch]);

  const deleteSliderHandler = async (id) => {
    let formdata = new FormData();
    formdata.set('delete', id);
    if (window.confirm('Are you sure')) {
      dispatch(deleteSlider(id));
    }
  };

  return (
    <>
      {loading || loadingDelete ? (
        <Loader />
      ) : slidersError || errorDelete ? (
        <Message variant="danger">{slidersError || errorDelete}</Message>
      ) : (
        <div>
          <span className="nav-text">TOP SLIDERS</span>
          <Card>
            <Card.Body>
              <div>
                <Carousel pause="hover" className="bg-light">
                  {sliders &&
                    sliders.top &&
                    sliders.top.map((item, i) => (
                      <Carousel.Item key={item._id} style={{ height: '200px' }}>
                        <Image
                          src={item.fullurl}
                          alt=""
                          fluid
                          style={{
                            top: '0',
                            left: '0',
                            minWidth: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>
            </Card.Body>
          </Card>
          <span className="nav-text">BOTTOM SLIDERS</span>
          <Card className="my-4">
            <Card.Body>
              <div>
                <Carousel pause="hover" className="bg-light">
                  {sliders &&
                    sliders.bottom &&
                    sliders.bottom.map((item, i) => (
                      <Carousel.Item key={item._id} style={{ height: '200px' }}>
                        <Image
                          src={item.fullurl}
                          alt=""
                          fluid
                          style={{
                            top: '0',
                            left: '0',
                            minWidth: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default SliderScreen;
