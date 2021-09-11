import { useLayoutEffect } from 'preact/hooks';
import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getSlider } from '../../actions/sliderActions';

const Sliders = () => {
  const sliderList = useSelector((state) => state.sliderList);
  const { loading, slidersError, sliders } = sliderList;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getSlider());
    console.log(sliders);
  }, [dispatch]);

  return (
    <div>
      <Carousel>
        {sliders &&
          sliders.top &&
          sliders.top.map((item, i) => {
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={item.fullurl}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>;
          })}
      </Carousel>
    </div>
  );
};

export default Sliders;
