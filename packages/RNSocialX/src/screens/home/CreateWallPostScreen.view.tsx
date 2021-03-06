import * as React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import {
	ButtonSizes,
	CloseButton,
	Header,
	MediaHorizontalScroller,
	PrimaryButton,
	SharePostInput,
} from '../../components';
import { Colors, Icons } from '../../environment/theme';
import { IDictionary } from '../../types';

import styles, { buttonWidth } from './CreateWallPostScreen.style';

interface ICreateWallPostScreenViewProps extends IDictionary {
	avatar: string;
	caption: string;
	media: string[];
	onChangeText: (value: string) => void;
	onAddMedia: () => void;
	onCreatePost: () => void;
	onClose: () => void;
}

export const CreateWallPostScreenView: React.SFC<ICreateWallPostScreenViewProps> = ({
	avatar,
	media,
	caption,
	onChangeText,
	onAddMedia,
	onCreatePost,
	onClose,
	dictionary,
}) => (
	<View style={styles.container}>
		<Header title={dictionary.screens.createPost.title} left={<CloseButton onClose={onClose} />} />
		<ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
			<SharePostInput
				avatar={avatar}
				placeholder={dictionary.components.inputs.caption}
				value={caption}
				onChangeText={onChangeText}
			/>
			<TouchableOpacity style={styles.addMediaButton} onPress={onAddMedia}>
				<Image source={Icons.iconNewPostAddMedia} style={styles.photoIcon} resizeMode="contain" />
				<Text style={styles.addMediaText}>{dictionary.components.buttons.media}</Text>
			</TouchableOpacity>
			{media.length > 0 && (
				<View style={styles.mediaContainer}>
					<MediaHorizontalScroller paths={media} />
				</View>
			)}
			<View style={styles.buttonContainer}>
				<PrimaryButton
					label={dictionary.components.buttons.createPost}
					size={ButtonSizes.Small}
					width={buttonWidth}
					onPress={onCreatePost}
					borderColor={Colors.transparent}
					disabled={caption.length === 0}
				/>
			</View>
		</ScrollView>
	</View>
);
