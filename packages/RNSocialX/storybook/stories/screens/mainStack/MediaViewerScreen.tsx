import {boolean, number, withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import * as React from 'react';
import {Dimensions} from 'react-native';

import {DeviceOrientations} from '../../../../src/environment/consts';
import {MediaViewerScreenView} from '../../../../src/screens/mainStack/MediaViewerScreen.view';
import {MediaTypeImage} from '../../../../src/types';

const generateMediaObjects = (limit: number) =>
	new Array(limit).fill(0).map(() => ({
		url: `https://placeimg.com/${Math.round(Math.random() * 200 + 200)}/${Math.round(Math.random() * 150 + 200)}/any`,
		hash: 'q89235y7jfa' + Math.random(),
		type: MediaTypeImage,
		extension: 'jpg',
		size: Math.round(Math.random() * 9999999),
		numberOfLikes: Math.round(Math.random() * 100),
		numberOfComments: Math.round(Math.random() * 10),
	}));

storiesOf('Screens/mainStack', module)
	.addDecorator(withKnobs)
	.add('MediaViewerScreen', () => {
		const activeSlide = number('activeSlide', 0);
		const isInfoOverlayVisible = boolean('isInfoOverlayVisible', false);
		return (
			<MediaViewerScreenView
				getText={(text) => text}
				mediaObjects={generateMediaObjects(100)}
				startIndex={90}
				orientation={DeviceOrientations.Portrait}
				activeSlide={activeSlide}
				viewport={{
					width: Dimensions.get('window').width,
				}}
				slideChanged={(...args: any[]) => console.log('slideChanged', args)}
				isInfoOverlayVisible={isInfoOverlayVisible}
				showMediaInfoOverlay={(...args: any[]) => console.log('showMediaInfoOverlay', args)}
				closeMediaInfoOverlay={(...args: any[]) => console.log('closeMediaInfoOverlay', args)}
				carouselContainerOnLayout={(...args: any[]) => console.log('carouselContainerOnLayout', args)}
				onExitFullScreen={(...args: any[]) => console.log('onExitFullScreen', args)}
			/>
		);
	});