import { registerUniformComponent, ComponentProps, UniformSlot } from '@uniformdev/canvas-react';

export type VerticalContentScrollerProps = ComponentProps<{
  imageUrl?: string;
}>;

const VerticalContentScroller = ({ imageUrl }: VerticalContentScrollerProps) => {
  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrl})`,
  };
  return (
    <div className="vertical-content-scroller">
      <div className="vertical-content-scroller__inner">
        <div style={backgroundImageStyle} className="vertical-content-scroller__background-image"></div>
        <div className="vertical-content-scroller__content-container">
          <div className="vertical-content-scroller__content">
            <UniformSlot name="card" />
          </div>
        </div>
      </div>
    </div>
  );
};

registerUniformComponent({
  type: 'verticalContentScroller',
  component: VerticalContentScroller,
});

export default VerticalContentScroller;
