import leftShape from '../public/h-bg-left.svg';
import rightShape from '../public/h-bg-right.svg';

const bgStyle = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    zIndex: 1,
  },
  bgChild = { flexBasis: '50%', height: '100vh', backgroundSize: 'cover' },
  bgLeft = {
    backgroundImage: `url(${leftShape.src})`,
    backgroundPosition: 'left',
  },
  bgRight = {
    backgroundImage: `url(${rightShape.src})`,
    backgroundPosition: 'right',
  };

export default function BgShape() {
  return (
    <div style={bgStyle}>
      <div style={{ ...bgChild, ...bgLeft }}></div>
      <div style={{ ...bgChild, ...bgRight }}></div>
    </div>
  );
}
