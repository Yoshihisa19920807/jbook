import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState, useRef } from 'react';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  };

  const ref = useRef<any>();

  const getObjectDimensions = () => {
    if (ref.current) {
      const { width: width, height: height } = ref.current?.state;
      return {
        width,
        height,
      };
    } else {
      return {
        width: 0,
        height: 0,
      };
    }
  };

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
      setObjectDimensions(getObjectDimensions());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const [objectDimensions, setObjectDimensions] = useState(
    getObjectDimensions()
  );

  const resizableProps: ResizableBoxProps =
    direction === 'vertical'
      ? {
          minConstraints: [Infinity, windowDimensions.height * 0.1],
          // maxConstraints={[Infinity, window.innerHeight * 0.9]}
          maxConstraints: [Infinity, windowDimensions.height * 0.9],
          height:
            0 < objectDimensions.height &&
            objectDimensions.height < windowDimensions.height
              ? objectDimensions.height * 0.5
              : windowDimensions.height * 0.5,
          width: Infinity,
          resizeHandles: ['s'],
        }
      : {
          className: 'resize-horizontal',
          minConstraints: [windowDimensions.width * 0.2, Infinity],
          // maxConstraints={[Infinity, window.innerHeight * 0.9]}
          maxConstraints: [windowDimensions.width * 0.75, Infinity],
          height: Infinity,
          width:
            0 < objectDimensions.width &&
            objectDimensions.width < windowDimensions.width
              ? objectDimensions.width * 0.75
              : windowDimensions.width * 0.75,
          resizeHandles: ['e'],
        };

  // スプレッド記法でresizablePropsを受け取れる
  return (
    <ResizableBox {...resizableProps} ref={ref}>
      {children}
    </ResizableBox>
  );
};
export default Resizable;
