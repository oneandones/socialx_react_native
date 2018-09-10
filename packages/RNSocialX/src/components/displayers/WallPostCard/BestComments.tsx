import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors, Fonts, Sizes} from '../../../environment/theme';
import {ISimpleComment} from '../../../types';

interface IBestCommentsProps {
	numberOfComments: number;
	bestComments: ISimpleComment[];
	onUserPress: (userId: string) => void;
	onCommentPress: (start: boolean) => void;
}

export const BestComments: React.SFC<IBestCommentsProps> = ({
	numberOfComments,
	bestComments,
	onUserPress,
	onCommentPress,
}) => {
	if (numberOfComments > 0) {
		return (
			<View style={styles.bestCommentsContainer}>
				{bestComments.map((comment: ISimpleComment, index: number) => (
					<Text style={styles.commentContainer} numberOfLines={2} key={index}>
						<Text
							style={styles.commentUserName}
							onPress={() => onUserPress(comment.owner.userId)}
							suppressHighlighting={true}
						>
							{comment.owner.username + '  '}
						</Text>
						<Text onPress={() => onCommentPress(false)}>{comment.text}</Text>
					</Text>
				))}
			</View>
		);
	}

	return null;
};

const style: any = {
	bestCommentsContainer: {
		paddingHorizontal: Sizes.smartHorizontalScale(16),
	},
	commentContainer: {
		...Fonts.centuryGothic,
		fontSize: Sizes.smartHorizontalScale(15),
		color: Colors.postText,
		paddingBottom: Sizes.smartVerticalScale(5),
	},
	commentUserName: {
		...Fonts.centuryGothicBold,
		marginRight: Sizes.smartHorizontalScale(10),
	},
};

const styles = StyleSheet.create(style);