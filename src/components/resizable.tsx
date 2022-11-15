import './resizable.css';
import { ResizableBox } from 'react-resizable';
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

  // const size = useWindowSize();
  console.log('windowDimensions');
  console.log(windowDimensions);
  console.log(windowDimensions.height * 0.9);
  return direction === 'vertical' ? (
    <ResizableBox
      minConstraints={[Infinity, windowDimensions.height * 0.1]}
      // maxConstraints={[Infinity, window.innerHeight * 0.9]}
      maxConstraints={[Infinity, windowDimensions.height * 0.9]}
      height={300}
      width={Infinity}
      resizeHandles={['s']}
      handleSize={[10, 10]}
    >
      {children}
    </ResizableBox>
  ) : (
    <ResizableBox
      height={Infinity}
      width={300}
      resizeHandles={['w']}
      handleSize={[10, 10]}
    >
      {children}
    </ResizableBox>
  );
};
export default Resizable;
