// COPIED TYPES FOR NOW!
export type GenericMediaItem = {
  id: string;
  url: string;
  alt: string;
  mediaType: "IMAGE" | "VIDEO";
  featured?: boolean;
  createdTime: Date;
};

export enum MeetupRsvpAttendanceStatusEnum {
  Coming = 1,
  Maybe = 2,
  Cannot = 3,
  // Other = 4,
}
export const getAttendanceStatusHumanMessage = (
  status: MeetupRsvpAttendanceStatusEnum
): string => {
  switch (status) {
    case MeetupRsvpAttendanceStatusEnum.Coming:
      return `I'm in`;
    case MeetupRsvpAttendanceStatusEnum.Maybe:
      return "Maybe";
    case MeetupRsvpAttendanceStatusEnum.Cannot:
      return `Can't go`;
    default:
      return "";
  }
};

// RSVP-ING
type UserRsvpInfo = Pick<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  any,
  "nickname" | "email" | "telegram" | "firstname" | "lastname" | "mobile"
>;

type MeetupRsvpResponseType = "YES" | "NO" | "MAYBE";

type RsvpType = {
  /** UUID of the RSVP response */
  responseId: string;
  /** User UUID who responded */
  userId: string;
  /** The response given by the user - if they are going or not! */
  response: MeetupRsvpResponseType;
  /** Timestamp of initial RSVP */
  responseTimestamp: string;
  /** Timestamp of updated RSVP when most recently changed */
  responseTimestampUpdated: string;
  /** Incremental number of times the user has edited their RSVP */
  changedTimes: number;
};
/** Type for people responding to meetup events */
export type MeetupRsvpResponse =
  /** Even though the user data can be looked up from the userID, this is what they share with the event in question */
  | Partial<UserRsvpInfo>
  /** Internal response mandatory data */
  | RsvpType;

export type MeetupUserRole = "ADMIN" | "HOST" | "COHOST" | "USER";

/** The model for users giving an rsvp to meetups */
export interface MeetupRsvpModel {
  /** The rsvp ID - needed for updating */
  rsvpId: string;
  /** The attendee user ID, or empty string. If empty string, the response is considered anonymous */
  attendeeUserId: string;
  /** The response (coming, maybe, not) given by the attendee */
  attendanceStatus: MeetupRsvpAttendanceStatusEnum;
  /** This can be used if given as the name, instead of the user's name */
  attendeeName: string;
  /** Their personal message, comment or request */
  attendeeAvatarColor: string;
  /** Their chosen avatar color in css format, eg. #ffee00 */
  comment: string;
}

export enum MeetupStatusEnum {
  /** Events in draft state are not public */
  Draft = "DRAFT",
  /** An normal, published event. Users can rsvp */
  Published = "PUBLISHED",
  /** Archived events - support for when we need it. Archived events can be un-deleted */
  Archived = "ARCHIVED",
  /** Soft deleted events do not appear in any normal API data feed. They only exist in the database. */
  SoftDeleted = "SOFTDELETED",
  /** @todo - Admin hard delete? */
  Deleted = "DELETED",
}
export type MeetupConfig = {
  /** 0=any number, 1=min one attendee required for the event to start */
  minAttendees: number;
  /** 0=any */
  maxAttendees: number;
  requiresMobileNumber?: boolean;
  requiresIdentityCard?: boolean;
  requiresEmailAddress?: boolean;
  requiresQRCodeEntry?: boolean;
  requiresVerifiedUser?: boolean;
  /** List of languages people will be speaking at the event. If empty array, lang will be any language spoken */
  eventLanguage?: string[];
  /** Allow meetup organisers to customise the RSVP join button when users join the event */
  rsvpButtonCtaType?: RsvpButtonCtaTypes;
};
// export const RsvpButtonCtas = {
//   JOIN: 'Join',
//   RSVP: 'RSVP',
//   GET_TICKET: 'Get Ticket',
//   COMING: 'Coming',
//   REPLY: 'Reply',
//   CONNECT: 'Connect',
//   ATTEND: 'Attend',
//   GOING: 'Going',
//   CONFIRM: 'Confirm',
//   REGISTER: 'Register'
// };
export type RsvpButtonCtaTypes =
  | "RSVP"
  | "JOIN"
  | "GET_TICKET"
  | "COMING"
  | "REPLY"
  | "CONNECT"
  | "ATTEND"
  | "GOING"
  | "CONFIRM"
  | "REGISTER"
  | "RESPOND";
export const RsvpButtonCtaDefault = "ATTEND" satisfies RsvpButtonCtaTypes;
export type MeetupRsvpCertainty = "DEFINITE" | "INDEFINITE";
export type MeetupPrivacy = 1 | 2 | 3;
export const MEETUP_CATEGORIES = {
  MEETUP: "MEETUP", // regular meetup with big group
  LIVEMUSIC: "LIVEMUSIC", // gigs, karaoke etc
  ENTERTAINMENT: "ENTERTAINMENT", // standup comedy, talks, film nights
  RESTAURANT: "RESTAURANT", // go for dinner
  COFFEE: "COFFEE", // share a coffee with people
  TRAVEL: "TRAVEL", // travel and outdoor
  SPORT: "SPORT", // beach volley, running etc
  LIFESTYLE: "LIFESTYLE", // e.g. yoga, dance
  ART: "ART", // art gallery, trip to museum, gallery open day etc
  HOBBIES: "HOBBIES", // photography walks etc
  HEALTH: "HEALTH", // health and wellbeing
  CULTURAL: "CULTURAL", // e.g. ICD BCN
  COMMUNITY: "COMMUNITY", // neighbourhood meetup, civic meetup, etc
  GAMES: "GAMES", // e.g. boardgame, gaming etc
  SKILLSWAP: "SKILLSWAP", // sharing skills e.g. language exchange
  EDUCATION: "EDUCATION", // science, education, learning etc
  NETWORKING: "NETWORKING", // e.g. job search etc
  PROFESSIONAL: "PROFESSIONAL", // tech talks etc
  BUSINESS: "BUSINESS",
  TECH: "TECH", // tech fair, IT, devs etc
  OUTDOOR: "OUTDOOR", // hiking etc
  PRIVATE: "PRIVATE", // private drinks on a terrace, etc
  OPENDAY: "OPENDAY", // e.g. co-working open days etc
  FESTIVAL: "FESTIVAL",
  PARENTAL: "PARENTAL", // parenting and family
  ANIMALS: "ANIMALS", // pets and animals etc
  OTHER: "OTHER",
} as const;
// type MeetupCategoryValue = typeof MEETUP_CATEGORIES[keyof typeof MEETUP_CATEGORIES];
export type MeetupCategoryName = keyof typeof MEETUP_CATEGORIES;
export type MeetupMode = "IN_PERSON" | "ONLINE" | "HYBRID";
// export type MeetupLanguage = "EN" | "CA" | "ES" | "PT" | "IT" | "FR";
export type MeetupLocation = {
  locationName: string;
  /** Street address */
  address1: string;
  /** locale address or neighbourhood */
  address2: string;
  /** postcode */
  postcode: string;
  /** town/city */
  town: string;
  /** Region or province */
  province: string;
  /** Country */
  country: string;
  /** Ex: Door 1 */
  notes: string;
  /** Full latitude, from Google */
  lat: number;
  /** Full longitude, from Google */
  lng: number;
  /** 1=show exact location,2=show radius,3=show city only,4=hide location */
  locationPrecision: 1 | 2 | 3 | number;
  /** Ex: a google maps URL to the meetup location */
  mapsLink: string;
};
export type MeetupPrice = {
  /** Like 1050 = €10,50. 0=Free. -1=TBC */
  priceCents: number;
  /** For INTL, like EUR, GBP, USD etc */
  currencyCode: "EUR" | "GBP";
  /** Like: es-ES, en-GB, en-US */
  locale: string;
  /** Payment before event or when arriving? */
  paymentScheme: "ON_RSVP" | "ON_ARRIVAL" | "AFTER_EVENT" | "NONE";
  /** Whether or not user credit can be used to pay for the event */
  canUseCredit: boolean;
};
export type MeetupWaitingList = {
  /** ID of the user on the list */
  userId: string;
  /** UTC time when the user joined the queue */
  joinedAt: string;
};
export type MeetupPromoModifier = {
  code: string;
  /** Ex: "50% off with this code" */
  description: string;
  /** 0.5 would be 50% off */
  modifier?: number;
  /** @todo - Type of action applied to the event when the code is entered by the user */
  action?: "EARLY_RSVP" | string;
  /** If false, code will be in-active */
  active: boolean;
  /** Optional UTC timestamp of when the code expires */
  codeExpiryTime?: string;
};

type HostRoleType = "ORGANISER" | "CO_ORGANISER" | "COMMUNITY_MANAGER";
export type MeetupHostList = {
  /** ID of the user on the list */
  userId: string;
  /** The role that this person has for the event */
  hostRole: HostRoleType | string;
  isOrganiser?: boolean;
};

export interface MeetupItem {
  /** Meetup ID */
  meetupId: string;
  /** Auto-generated short UUID for this meetup */
  shortId: string;
  /** The ID of the group which created this meetup */
  groupId: string;
  /** The UUID of the meetup which this meetup was cloned from, or empty string */
  clonedId?: string;
  /** Meetup settings */
  eventConfig: MeetupConfig;
  /** Status and visibility */
  status: MeetupStatusEnum;
  /** 1=location/address public, 2=location only visible to people going, 3=location hidden */
  privacy: MeetupPrivacy;
  /** The type of response a user can give for the event: Definite=yes/no, Indefinite=yes/no/maybe */
  rsvpType: MeetupRsvpCertainty;
  /** Sets a limit on the number of tickets a person can obtain (per their user) */
  maxTicketsPerPerson: number;
  /** Main title */
  title: string;
  /** Main subtitle */
  subtitle: string;
  /** Main description - supports HTML */
  description: string;
  /** Special notes about how to find the event once there */
  directions: string;
  /** Main category */
  category: MeetupCategoryName;
  /** List of tag-like subcategories */
  subcategory: string[];
  /** In-person, Online or Hybrid event */
  mode: MeetupMode;
  /** Full UTC timestamp */
  startTime: Date;
  /** Full UTC timestamp */
  endTime: Date;
  /** Before this date, RSVP-ing to the event will not be permitted */
  rsvpOpensAt?: Date;
  /** After this date, RSVP-ing to the event will not be permitted */
  rsvpClosesAt?: Date;
  /** Meetup location @type MeetupLocation */
  location: MeetupLocation;
  /** The datetime from which the meetup location will be disclosed to the user */
  locationDisclosureAt: Date;
  /** Price in cents. @todo - entry fee? */
  price: MeetupPrice;
  /** List of event promo codes */
  promoCodes: MeetupPromoModifier[];
  /** @todo - give away vouchers during the event? */
  vouchers: unknown;

  /** If true, the person who RSVP'd will need to re-confirm their attendance */
  requiresUserCheckin: boolean;
  /** People who have rsvp'd to this meetup */
  rsvps: MeetupRsvpModel[];
  /** List of user IDs who are on the waiting list */
  waitingList?: MeetupWaitingList[];
  /** Topics and event tags */
  tags: string[];
  /** List of event hosts/admins */
  hosts: MeetupHostList[];
  /** List of photos to promote the meetup. Featured photo will be one flagged, else first image */
  photos: GenericMediaItem[];
  // responses: Array<EventResponseModel>;
  // @todo - requires bizum before arrival?
}

export type MeetupGroupItem = {
  /** The group ID */
  groupId: string;
  /** Unique slug for the group, like my-amazing-meetup */
  slug: string;
  /** The user ID of the group creator */
  ownerId: string;
  /** The group display name */
  groupName: string;
  /** Will be like Spain, Barcelona or Poblenou, depending on what the group wants to show */
  groupLocation: string;
  /** @todo - Unique public API key for the group */
  apiKey: string;
  /** If the group has been verified by us as being a real human group */
  isVerified: boolean;
  /** Show/hide the group in a public listing */
  isPublic: boolean;
  /** UTC of when user signed up */
  signupDate: Date;
  /** UTC of user's last logged-in time */
  lastLogin: Date;
  /** List of meetup IDs related to this group */
  meetupIds: string[];
  /** Logo for the meetup group - main logo will be featured=true */
  logo: GenericMediaItem[];
  /** Profile photos for the group */
  profilePhoto: GenericMediaItem[];
  /** HTML about the group */
  about: string;
  /** If paid event refund link visited, a block of HTML about how it works for this group */
  refundPolicy: string;
  /** Social media info for the group */
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    telegram: string;
    tiktok: string;
    twitter: string;
    website: string;
    whatsapp: string;
    youtube: string;
    bizum: string;
  };
  /** Like Europe/Madrid */
  timezone: string;
  /** Tag-like list of topics and themes that the group is concerned with, such as: meetups, foreigners in BCN, english speaking, etc */
  topics: string[];
};

