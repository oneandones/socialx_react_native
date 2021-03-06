import { StyleSheet } from 'react-native';
import { Fonts, Sizes } from '../../environment/theme';

const styles: any = {
	container: {
		flex: 1,
		paddingVertical: Sizes.smartVerticalScale(10),
	},
	title: {
		...Fonts.centuryGothicBold,
		fontSize: Sizes.smartHorizontalScale(20),
		marginBottom: Sizes.smartVerticalScale(10),
		marginLeft: Sizes.smartHorizontalScale(16),
	},
};

export default StyleSheet.create(styles);
