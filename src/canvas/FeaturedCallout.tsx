import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import {
  UniformSlot,
  registerUniformComponent,
  ComponentProps,
  UniformText,
  UniformRichText,
} from '@uniformdev/canvas-react';
import { getImageUrl } from '@/utils';
import { getTextClass } from '@/utils/styling';

export type Props = ComponentProps<{
  eyebrowText?: string;
  title: string;
  titleStyle: Types.HeadingStyles;
  description: string;
  image?: string | Types.CloudinaryImage;
}>;

export enum FeaturedCalloutVariant {
  ImageRight = 'imageRight',
  FullWidthImageLeft = 'fullWidthImageLeft',
}

const getFeaturedCalloutContentClass = (variantId?: string) => {
  switch (variantId) {
    case FeaturedCalloutVariant.ImageRight:
      return 'lg:order-1 justify-end';
    default:
      return '';
  }
};

const getFeaturedCalloutTextContentClass = (variantId?: string) => {
  switch (variantId) {
    case FeaturedCalloutVariant.ImageRight:
      return 'lg:justify-end';
    default:
      return '';
  }
};

const FeaturedCallout: FC<Props> = ({
  eyebrowText,
  titleStyle: TitleTag = 'h1',
  image,
  component: { variant } = {},
}) => {
  const imageUrl = getImageUrl(image);
  const stringClass = `${variant}`;
  let height = undefined;
  let width = undefined;
  let fill = false;

  if (stringClass === 'fullWidthImageLeft') {
    fill = true;
  } else {
    height = 482;
    width = 524;
  }
  return (
    <div>
      <div className={`hero flex flex-wrap lg:gap-10 lg:flex-nowrap text-secondary-content ${stringClass}`}>
        <div
          className={classNames(
            'flex items-center justify-start w-full lg:w-1/2',
            getFeaturedCalloutContentClass(variant),
            'image'
          )}
        >
          <div className="image__container">
            {Boolean(imageUrl) && <Image src={imageUrl} fill={fill} height={height} width={width} alt="Feature" />}
          </div>
        </div>

        <div
          className={classNames(
            'hero-content flex flex-wrap items-center w-full lg:w-1/2 p-0',
            getFeaturedCalloutTextContentClass(variant)
          )}
        >
          <div>
            <div className="flex flex-col w-full">
              {eyebrowText && (
                <UniformText
                  placeholder="Eyebrow text goes here"
                  parameterId="eyebrowText"
                  as="div"
                  className="text-sm font-bold tracking-wider uppercase text-primary my-3"
                />
              )}
              <UniformText
                placeholder="Title goes here"
                parameterId="title"
                isMultiline={true}
                as={TitleTag}
                className={classNames('font-bold', getTextClass(TitleTag))}
              />
              {/* <UniformText placeholder="Description goes here" parameterId="description" as="p" className="py-6" /> */}
              <UniformRichText placeholder="Description goes here" parameterId="content" className="py-6" />
            </div>
            <div className="w-full">
              <UniformSlot name="feature" />
            </div>
          </div>
        </div>
      </div>
      <div className="card-bottom__container">
        <UniformSlot name="card" />
      </div>
    </div>
  );
};

[undefined, FeaturedCalloutVariant.ImageRight, FeaturedCalloutVariant.FullWidthImageLeft].forEach(variantId => {
  registerUniformComponent({
    type: 'featuredCallout',
    component: FeaturedCallout,
    variantId,
  });
});

export default FeaturedCallout;
