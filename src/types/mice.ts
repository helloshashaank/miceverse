export type EventStatus = 'draft' | 'proposal_sent' | 'contracted' | 'in_progress' | 'completed';

export type RsvpStatus = 'confirmed' | 'pending' | 'waitlist' | 'declined';

export type DocStatus = 'verified' | 'pending_review' | 'missing' | 'rejected';

export type ProposalTemplate = 'royal_heritage' | 'coastal_luxury' | 'metro_executive' | 'modern_minimal';

export interface PaymentMilestone {
  id: string;
  milestone: string;
  percentage: number;
  dueDate: string;
  amount: number;
  status: 'paid' | 'due' | 'pending';
}

export interface ClientSignOff {
  clientSignerName: string;
  clientSignerDesignation: string;
  signedAt?: string;
  isSigned: boolean;
  digitalSealRef?: string;
}

export interface HotelOption {
  id: string;
  name: string;
  category: string;
  location: string;
  roomTypes: string[];
  costPerNightPerPax: number;
  totalRoomsBlocked: number;
  rating: number;
  amenities: string[];
  selected?: boolean;
}

export interface TravelOption {
  id: string;
  type: 'flight_charter' | 'commercial_flight' | 'train_express' | 'luxury_coach' | 'speed_boat';
  operator: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  capacity: number;
  costPerPax: number;
  includedLuggage: string;
  selected?: boolean;
}

export interface ItineraryItem {
  id: string;
  dayNumber: number;
  date: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'transfer' | 'conference' | 'gala' | 'activity' | 'dining' | 'networking';
  dressCode?: string;
  speakerOrLead?: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  city: string;
  rsvpStatus: RsvpStatus;
  roomAllocation: string;
  flightStatus: string;
  dietaryPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Jain' | 'Vegan' | 'Gluten-Free';
  docStatus: DocStatus;
  passportOrIdNumber?: string;
  visaStatus?: string;
  checkedIn: boolean;
  notes?: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  targetAudience: 'all' | 'vip' | 'confirmed_only' | 'pending_docs' | 'bus_group';
  channels: ('push' | 'sms' | 'whatsapp')[];
  sentAt: string;
  deliveredCount: number;
  openRate: string;
}

export interface VenueZone {
  id: string;
  name: string;
  type: 'hall' | 'dining' | 'stage' | 'breakout' | 'outdoor' | 'lounge' | 'gala';
  capacity: number;
  currentOccupancy: number;
  currentAgenda: string;
  coords: { x: number; y: number }; // percentage coordinates on 2D map
  wifiSsid?: string;
  avSetup?: string;
}

// -------------------------------------------------------------
// B2B Corporate Agency & Client Management Extensions
// -------------------------------------------------------------

export interface CorporateClient {
  id: string;
  companyName: string;
  legalEntityName: string;
  industry: string;
  gstin: string;
  pan: string;
  headOfficeCity: string;
  travelDeskLeadName: string;
  travelDeskEmail: string;
  travelDeskPhone: string;
  contractType: 'master_services_agreement' | 'retainer' | 'project_based';
  creditTerms: '30_days_net' | 'advance_milestone' | 'immediate';
  lifetimeSpend: number;
  activeTripsCount: number;
  totalDelegatesTravelled: number;
  status: 'active' | 'under_review' | 'archived';
  notes?: string;
}

export interface CorporatePerson {
  id: string;
  corporateId: string;
  fullName: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  vipGrade: 'c_suite' | 'vp_director' | 'manager' | 'delegate';
  passportNumber?: string;
  passportExpiry?: string;
  aadhaarMasked?: string;
  dietaryPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Jain' | 'Vegan' | 'Gluten-Free';
  frequentFlyerNo?: string;
  homeCity: string;
  isKycComplete: boolean;
  assignedTripIds: string[];
}

export interface TripAgreementClause {
  id: string;
  title: string;
  content: string;
}

export interface TripAgreement {
  id: string;
  eventId: string;
  eventTitle: string;
  corporateClientId: string;
  corporateClientName: string;
  title: string;
  agreementType: 'mou' | 'msa' | 'trip_contract';
  version: string;
  status: 'draft' | 'pending_approval' | 'acknowledged' | 'signed';
  effectiveDate: string;
  executionDate?: string;
  scopeOfWorkSummary: string;
  paymentTermsSummary: string;
  cancellationClause: string;
  forceMajeureClause: string;
  clauses: TripAgreementClause[];
  agencySignatory: {
    name: string;
    title: string;
    signedAt: string;
  };
  clientSignatory?: {
    name: string;
    title: string;
    email: string;
    signedAt?: string;
    ipAddress?: string;
    verificationHash?: string;
  };
  acknowledgedInPortal: boolean;
  acknowledgedAt?: string;
}

export interface PaymentRecord {
  id: string;
  eventId: string;
  milestoneId: string;
  milestoneName: string;
  amount: number;
  currency: string;
  paymentMethod: 'rtgs_neft' | 'corporate_card' | 'bank_transfer' | 'cheque';
  transactionReference: string;
  paymentDate: string;
  recordedBy: string;
  receiptNumber: string;
  status: 'completed' | 'pending_clearance';
  notes?: string;
}

export interface PaymentReminderLog {
  id: string;
  eventId: string;
  milestoneId: string;
  channel: 'whatsapp' | 'email' | 'both';
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  sentAt: string;
  amountDue: number;
  dueDate: string;
  status: 'delivered' | 'read' | 'failed';
}

export interface MiceEvent {
  id: string;
  name: string;
  corporateClientId?: string;
  clientName: string;
  clientContact: string;
  destination: string;
  paxCount: number;
  startDate: string;
  endDate: string;
  durationNights: number;
  budgetTotal: number;
  budgetPerPax: number;
  currency: string;
  status: EventStatus;
  heroImage: string;
  description: string;
  executiveSummary?: string;
  proposalVersion?: string;
  proposalTemplate?: ProposalTemplate;
  paymentMilestones?: PaymentMilestone[];
  clientSignOff?: ClientSignOff;
  
  // Specific MICE dimensions
  inclusions: string[];
  exclusions: string[];
  hotelOptions: HotelOption[];
  travelOptions: TravelOption[];
  itinerary: ItineraryItem[];
  attendees: Attendee[];
  notifications: PushNotification[];
  venueZones: VenueZone[];

  // Predictive Budget parameters
  budgetForecast: {
    baseCostPerPax: number;
    flightEstimate: number;
    hotelEstimate: number;
    fnbEstimate: number;
    avAndGalaEstimate: number;
    contingencyBufferPercent: number;
    currencyDriftPercent: number;
    predictedPaxVariance: number; // e.g. +5% or -10%
  };
}
