// tslint:disable

export default {
	errors: {
		"data/accounts/LOGIN": "Username or password is incorrect",
		"data/accounts/CREATE_ACCOUNT": "Could not create your account",
		"data/notifications/MARK_NOTIFICATIONS_AS_READ":
			"Could not mark the notifications as read",
		"data/comments/CREATE_COMMENT": "Could not create the comment",
		"data/comments/REMOVE_COMMENT": "Could not delete the comment",
		"data/comments/LIKE_COMMENT": "Could not like the comment",
		"data/comments/UNLIKE_COMMENT": "Could not unlike the comment",
		"data/profiles/GET_CURRENT_PROFILE": "Could not get the profile",
		"data/profiles/UPDATE_PROFILE": "Could not update the profile",
		"data/profiles/GET_PROFILES_BY_POSTS": "Could not get multiple profiles",
		"data/profiles/GET_CURRENT_FRIENDS": "Could not get your friends",
		"data/profiles/ADD_FRIEND": "Could not add the user",
		"data/profiles/REMOVE_FRIEND": "Could not unfriend the user",
		"data/profiles/ACCEPT_FRIEND": "Could not accept the request",
		"data/profiles/REJECT_FRIEND": "Could not decline the request",
		"data/profiles/UNDO_REQUEST": "Could not undo the request",
		"data/posts/LOAD_MORE_POSTS": "Could not load global posts",
		"data/posts/LOAD_MORE_FRIENDS_POSTS": "Could not load friends posts",
		"data/posts/CREATE_POST": "Could not create the post",
		"data/posts/REMOVE_POST": "Could not delete the post",
		"data/posts/LIKE_POST": "Could not like the post",
		"data/posts/UNLIKE_POST": "Could not unlike the post"
	},
	screens: {
		launch: {
			name: "SocialX",
			description: "Social interaction with cryptocurrency rewards",
			rewards: "Get rewarded",
			login: "Login",
			register: "Sign up"
		},
		loading: {
			login: "Signing you in",
			nodes: "Syncing nodes",
			profiles: "Syncing profiles",
			posts: "Syncing posts"
		},
		login: {
			title: "Login",
			welcome: "Welcome back!",
			forgot: "Forgot your password",
			progress: "Signing you in",
			account: "Don't have an account?"
		},
		forgotPassword: {
			title: "Forgot password",
			instructions: "Enter your username to get a new password."
		},
		register: {
			title: "Register",
			progress: "Signing you up",
			accept: "Accept our",
			terms: "Terms and Conditions"
		},
		termsAndConditions: {
			title: 'Terms and conditions',
		},
		createPost: {
			title: "Create post"
		},
		userProfile: {
			title: "Profile",
			posts: "User doesn't have posts.",
			gallery: "User's photo gallery is empty."
		},
		myProfile: {
			title: "Profile",
			posts: "You don't have posts.",
			gallery: "Your photo gallery is empty.",
			analytics: "Profile analytics",
			wallet: "Wallet",
			settings: "Settings",
			nodes: "Nodes",
			logout: "Logout"
		},
		friends: {
			title: "Friends"
		},
		likes: {
			title: "Likes"
		},
		settings: {
			title: "Settings",
			progress: "Updating your profile",
			mining: {
				title: "Mining (Beta)",
				description:
					"Get rewarded for validating transactions within SocialX network"
			},
			share: {
				title: "Share data",
				description: "Share your data with advertise partners"
			}
		},
		search: {
			top: "Top",
			people: "People",
			tags: "Tags",
			places: "Places",
			soon: "Stay close, this feature is coming soon!"
		},
		feed: {
			global: "Share with the world what you think",
			friends: "Share with your friends what you think",
			empty: "Your feed is empty. Create your first post!"
		},
		notifications: {
			title: 'Activity',
			empty: "You don't have notifications!",
		},
		chat: {
			messages: {
				messages: "Messages",
				friends: "Friends",
				empty: "You don't have messages."
			}
		},
		wallet: {
			activity: {
				title: "Socialx wallet",
				heading: "Activity",
			}
		},
		bounties: {
			title: 'Bounty Management',
			claimed: 'Claimed',
			bounty: {
				title: 'Details',
				available: 'Available bounty',
				unavailable: 'Already claimed',
			},
		}
	},
	components: {
		buttons: {
			media: "Photo/Video",
			createPost: "Create post",
			video: {
				replay: "Watch again"
			},
			seeAllFriends: "See all friends",
			editProfile: "Edit profile",
			message: "Message",
			login: "Login",
			signUp: "Sign up",
			register: "Register",
			saveChanges: "Save changes",
			editNodes: "Edit nodes",
			delete: "Delete",
			cancel: "Cancel",
			send: "Send",
			view: "View",
			resetCode: "Send reset code",
			friends: "Friends",
			addFriend: "Add friend",
			undo: "Undo",
			viewAccount: 'View account',
			accept: "Accept",
			decline: "Decline",
		},
		inputs: {
			placeholder: {
				caption: "Write a caption",
				alias: "Username",
				password: "Password",
				confirm: "Confirm password",
				email: "Email",
				name: "Name",
				description: "Bio",
				comment: "Write a comment...",
				type: "Type something..."
			},
			email: {
				required: "Email is required",
				invalid: "Please enter a valid email address"
			},
			name: {
				required: "Your name is required",
				length: "Name must have at least 4 characters"
			},
			alias: {
				required: "Username is required",
				length: "Username must have at least 6 characters",
				bad: "Username must not contain \".\" or \"|\" "
			},
			password: {
				required: "Password is required",
				length: "Password must have at least 6 characters",
				mismatch: "Passwords do not match"
			},
			description: {
				required: "Bio is required",
				length: "Bio must be at least 10 characters"
			}
		},
		modals: {
			options: {
				gallery: "Pick from gallery",
				camera: "Open camera",
				remove: "Remove picture",
				copy: "Copy",
				delete: "Delete",
				block: "Block",
				report: "Report a problem",
				deletePost: "Delete post",
				viewProfile: "View profile",
				addMedia: "Add a photo/video",
				unfriend: "Unfriend"
			},
			report: {
				title: "Report a problem",
				subject: {
					placeholder: "Subject",
					required: "Subject is required"
				},
				description: {
					placeholder: "Description",
					required: "Description is required"
				}
			},
			generic: {
				delete: {
					title: "Delete conversation?",
					description: "This will permanently delete the conversation history."
				}
			},
			offline: "Offline. Waiting for connection...",
			activity: 'Please wait...',
		},
		displayers: {
			mediaInfo: {
				title: "Media Info",
				hash: "Hash",
				size: "Size",
				type: "Type",
				photo: "Photo",
				video: "Video"
			},
			wallPost: {
				other: "other",
				others: "others",
				liked: "Liked by",
				creating: "Posting...",
				more: "Read more",
				and: "And",
				like: "Like",
				unlike: "Unlike",
				warning: "This post may contain offensive material.",
				view: "View",
				comments: "comments"
			},
			search: {
				indicator: "Searching for",
				suggested: "Suggested",
				results: "No results found"
			},
			message: {
				delivered: "Delivered",
				seen: "Seen"
			},
			wallet: {
				socx: 'SOCX',
			},
			notification: {
				request: "sent you a friend request.",
				accepted: "accepted your friend request.",
				declined: "declined your friend request.",
			}
		}
	},
	"button.OK": "OK",
	"button.confirm": "Confirm",
	"button.back": "Back",
	"button.done": "Done",
	"button.cancel": "Cancel",
	"button.add": "Add",
	"button.yes": "Yes!",
	"button.no": "No",
	"button.edit": "Edit",
	"button.duplicate": "Duplicate",
	"button.send": "Send",
	"button.receive": "Receive",
	"button.continue": "Continue",
	"button.accept": "Accept",
	"button.decline": "Decline",
	"button.generate": "Generate account name",
	"button.next": "Next",
	"button.finalize": "Finalize",
	"button.export": "Export keys to the device",
	"text.and": "and",
	"text.with": "with",
	"text.others": "others",
	"text.at": "at",
	"text.more": "More",
	"text.user": "User",
	"app.error": "App error",
	"validation.error": "Validation error",
	"general.error.message": "Something went wrong.",
	"message.link.not.supported": "Unsupported link type",
	"message.media.not.supported":
		"Unsupported media type or type detection failed",
	"terms.and.conditions.screen.title": "Terms and Conditions",
	"reset.password.screen.title": "RESET PASSWORD",
	"reset.password.description":
		"In order to set a new password please verify your email and enter the reset code we have sent to you.",
	"reset.password.reset.code": "Reset code",
	"reset.password.new.password": "Password",
	"reset.password.confirm.password": "Confirm password",
	"reset.password.set.button": "Set new password",
	"reset.password.resetting": "Resetting your password..",
	"reset.password.code.required": "Reset code is required",
	"reset.password.password.required": "Password is required",
	"reset.password.confirm.password.required": "Confirm password is required",
	"reset.password.error.mismatch": "Your passwords don't match",
	"reset.password.success": "Your password has been successfully reset!",
	"reset.password.wrong.code": "Wrong reset code entered, please try again.",
	"intro.skip.label": "Skip",
	"intro.first.slide.title": "Decentralising your media",
	"intro.first.slide.description":
		"Have full ownership of your content and data at all times",
	"intro.second.slide.title": "Get rewarded for content",
	"intro.second.slide.description":
		"The Superlike feature allows you to receive SOCX tokens by publishing high-quality content",
	"intro.third.slide.title": "Your financial incentive",
	"intro.third.slide.description":
		"The days that firms make millions using your data are over",
	"events.list.item.all.day": "All Day",
	"events.list.item.start.at": "Start at",
	"referral.screen.title": "referral system",
	"referral.screen.referrals": "Total referrals",
	"referral.screen.socx": "SOCX earned through referrals",
	"referral.screen.share": "Share",
	"referral.screen.url": "Invite URL",
	"referral.screen.code": "Invite code",
	"referral.screen.invite": "Invite friends via social",
	"comments.screen.no.comments": "Be the first to comment here",
	"comments.screen.comment.card.view.more": "View ${args[0]} more replies",
	"comments.screen.sending.comment": "Submitting your comment",
	"photo.screen.title": "ADD MEDIA",
	"photo.screen.share.input.placeholder": "Write a caption...",
	"photo.screen.tag.friends.checkbox": "TAG FRIENDS",
	"photo.screen.location.checkbox": "ADD LOCATION",
	"photo.screen.location.small.label": "Add location",
	"photo.screen.create.post.error": "Something went wrong, try again",
	"photo.screen.media.uploading.title": "Uploading media files\n${args[0]}",
	"photo.screen.media.uploading.message": "Please wait..\n${args[0]} %",
	"photo.screen.creating.post.title": "Creating your post",
	"photo.screen.creating.post.message": "finalizing post..",
	"photo.screen.add.media": "Add more",
	"new.wall.post.screen.title": "SHARE",
	"new.wall.post.screen.input.placeholder": "Write a caption",
	"new.wall.post.screen.attach.media.button": "Attach Photo/Video",
	"new.wall.post.screen.create.button": "CREATE POST",
	"new.wall.post.screen.post.not.allowed.title": "Not allowed",
	"new.wall.post.screen.post.not.allowed.message":
		"Empty post are not allowed, please add one photo and/or message!",
	"new.wall.post.screen.menu.gallery": "Pick from gallery",
	"new.wall.post.screen.menu.photo": "Take a photo/video",
	"new.wall.post.screen.menu.title": "Add media file",
	"new.wall.post.screen.progress.message": "Creating your post",
	"nodes.screen.title": "Edit Nodes",
	"nodes.screen.description": "Add/Delete Nodes",
	"nodes.progress.message": "Updating nodes",
	"nodes.screen.input.placeholder": "Add a new node",
	"nodes.screen.current.text": "Current nodes",
	"nodes.screen.button.text": "Delete nodes",
	"modal.sms.code.title": "Verification Code",
	"modal.sms.code.type.code.message":
		"Please type the verification code sent to",
	"modal.sms.code.resend.button": "Resend Code",
	"user.avatar.button.label.own.user": "EDIT PROFILE",
	"user.avatar.button.label.other.user": "MESSAGE",
	"modal.tag.friends.title": "Tag Friends",
	"modal.tag.friends.search.box.placeholder": "Search",
	"toast.message.on.like.failed": "Like failed with exception",
	"socialx.account.title.card.contribution": "Contribution",
	"socialx.account.title.card.return": "Return",
	"socialx.account.screen.account": "Account",
	"socialx.account.screen.title": "socialx account",
	"maintenance.message": "App currently under maintenance, try again later!",
	"media.viewer.screen.title": "MEDIA",
	"media.viewer.screen.likes": "Likes",
	"media.viewer.screen.comments": "Comments",
	"media.viewer.screen.like.button": "Like",
	"media.viewer.screen.comment.button": "Comment",
	"wallet.account.title": "Wallet account",
	"wallet.account.input.placeholder": "Account name",
	"wallet.account.input.label": "Unique blockchain account name",
	"wallet.account.not.valid": "Account name is already being used",
	"wallet.keys.title": "Wallet keys",
	"wallet.keys.input.label":
		"These keys are very important. If you lose them, you will have no control over the funds inside the wallet.",
	"wallet.keys.creator.public": "Creator public key",
	"wallet.keys.creator.private": "Creator private key",
	"wallet.keys.owner.public": "Owner public key",
	"wallet.keys.owner.private": "Owner private key",
	"wallet.send.coins.title": "Send coins",
	"wallet.receive.coins.title": "Receive coins",
	"wallet.receive.coins.address": "Your wallet address:",
	"rewards.title": "Rewards",
	"rewards.date.buttons.daily": "Daily",
	"rewards.date.buttons.monthly": "Monthly",
	"rewards.overview.title": "Overview status",
	"rewards.overview.referrals.short": "REF",
	"rewards.overview.referrals.text": "Referrals",
	"rewards.overview.posts.short": "PST",
	"rewards.overview.posts.text": "Posts",
	"rewards.overview.bounties.short": "BNTS",
	"rewards.overview.bounties.text": "Bounties",
	"rewards.total.amount.text": "Total amount of SOCX:",
	"rewards.button.back": "Back to Wallet",
	"ad.management.overview.screen.title": "AD MANAGEMENT",
	"ad.management.overview.screen.ads.list.title": "All ads",
	"ad.management.overview.screen.account.performance": "Account Performance",
	"ad.management.overview.screen.account.performance.spent": "Spent",
	"ad.management.overview.screen.account.performance.people.reached":
		"People reached",
	"ad.management.overview.screen.account.performance.impressions":
		"Impressions",
	"ad.management.overview.screen.see.past.performance": "SEE PAST PERFORMANCE",
	"ad.management.screen.title": "Ad management",
	"ad.management.option.post": "Boost a post",
	"ad.management.option.video": "Get video views",
	"ad.management.option.traffic": "Drive traffic to your website",
	"ad.management.create": "Create ad",
	"ad.manage.countries.title": "Manage Countries",
	"ad.manage.countries.input.placeholder": "Search for a country",
	"ad.manage.countries.all.countries": "All countries",
	"new.ad.setup.post.screen.title": "Create Ad",
	"new.ad.setup.post.header.title": "Create a post",
	"new.ad.setup.post.header.headline.input.placeholder": "Headline",
	"new.ad.setup.post.header.description.input.placeholder": "Description",
	"new.ad.setup.post.headline.required": "You need to set a headline",
	"ad.management.title.one": "Ad",
	"ad.management.title.multiple": "Ads",
	"ad.management.budget.title": "Budget and schedule",
	"ad.management.budget.currency.text": "Currency",
	"ad.management.budget.currency.picker.select": "Select currency",
	"ad.management.budget.budget.text": "Budget",
	"ad.management.budget.budget.textinput.placeholder": "Enter Budget",
	"ad.management.budget.perday": "Per Day",
	"ad.management.budget.lifetime": "Lifetime",
	"ad.management.budget.schedule": "Schedule",
	"ad.management.budget.runadcontinuously": "Run ad continuously",
	"ad.management.budget.start.text": "Start",
	"ad.management.budget.start.datePicker": "Pick a start date",
	"ad.management.budget.stop.text": "Stop",
	"ad.management.budget.stop.datePicker": "Pick a stop date",
	"ad.management.budget.modal.confirm.title": "Save Ad",
	"ad.management.budget.modal.confirm.message":
		"When you save an ad, it will be placed on the Ad Management Home screen so that you can edit it.\n\nDo you want to save your ad?",
	"ad.management.budget.modal.confirm.confirm.label": "Save",
	"ad.management.budget.modal.confirm.cancel.label": "Discard",
	"new.ad.setup.audience.screen.title": "Create Ad",
	"new.ad.setup.audience.header.title": "Audience",
	"new.ad.setup.audience.gender.select": "Select Gender",
	"new.ad.setup.audience.gender.male": "Men",
	"new.ad.setup.audience.gender.female": "Women",
	"new.ad.setup.audience.gender.all": "All",
	"new.ad.setup.audience.age.range.select": "Select Age Range",
	"new.ad.setup.audience.countries.select": "Select Countries",
	"new.ad.setup.audience.manage.countries": "Manage countries",
	"new.ad.setup.audience.estimated.reach": "Estimated Reach:",
	"new.ad.setup.audience.estimated.reach.people": "People",
	"ad.statistics.title": "Payment",
	"ad.statistics.transactions.title": "Transactions",
	"ad.statistics.transactions.transaction": "Transaction",
	"ad.statistics.spent.title": "Spent till now",
	"ad.statistics.buttons.weekly": "Weekly",
	"ad.statistics.buttons.monthly": "Monthly",
	"ad.statistics.buttons.alltransactions": "See all Transactions",
	"ad.statistics.amount.text": "Total amount of SOCX",
	"ad.statistics.chart.currentweek.text": "CW",
	"ad.management.editad.title": "Ad Edit",
	"ad.management.editad.adpreview": "Ad Preview",
	"loading.login": "Signing you in",
	"loading.profile": "Syncing nodes and current profile",
	"loading.friends": "Syncing profiles and friends",
	"loading.posts.global": "Syncing global posts",
	"loading.posts.friends": "Syncing friends posts",
	"transaction.history.title": "Transaction History",
	"transaction.history.balance": "Balance",
	"transaction.history.button.account": "View account",
	"transaction.history.button.send": "Send",
	"transaction.history.button.convert": "Convert",
	"transaction.history.activity": "Activity"
};
