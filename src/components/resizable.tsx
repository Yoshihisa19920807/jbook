import './resizable.css';
import { ResizableBox } from 'react-resizable';
interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      resizeHandles={['s']}
      handleSize={[10, 10]}
    >
      {children}
    </ResizableBox>
  );
};
export default Resizable;
