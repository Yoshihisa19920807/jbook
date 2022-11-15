import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const onResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const resizableProps: ResizableBoxProps =
    direction === 'vertical'
      ? {
          minConstraints: [Infinity, windowDimensions.height * 0.1],
          // maxConstraints={[Infinity, window.innerHeight * 0.9]}
          maxConstraints: [Infinity, windowDimensions.height * 0.9],
          height: 300,
          width: Infinity,
          resizeHandles: ['s'],
        }
      : {
          className: 'resize-horizontal',
          minConstraints: [windowDimensions.width * 0.2, Infinity],
          // maxConstraints={[Infinity, window.innerHeight * 0.9]}
          maxConstraints: [windowDimensions.width * 0.75, Infinity],
          height: Infinity,
          width: windowDimensions.width * 0.75,
          resizeHandles: ['e'],
        };

  // const size = useWindowSize();
  console.log('windowDimensions');
  console.log(windowDimensions);
  console.log(windowDimensions.height * 0.9);
  // スプレッド記法でresizablePropsを受け取れる
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
export default Resizable;
