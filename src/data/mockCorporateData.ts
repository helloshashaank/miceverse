import { CorporateClient, CorporatePerson, TripAgreement, PaymentRecord, PaymentReminderLog } from '../types/mice';

export const INITIAL_CORPORATES: CorporateClient[] = [
  {
    id: 'corp-tata-telecom',
    companyName: 'Tata Telecommunications Limited',
    legalEntityName: 'Tata Communications & Enterprise Global Network Ltd.',
    industry: 'Telecommunications & Cloud Infrastructure',
    gstin: '27AAACT2809A1ZT',
    pan: 'AAACT2809A',
    headOfficeCity: 'Mumbai, Maharashtra',
    travelDeskLeadName: 'Rajesh Verma',
    travelDeskEmail: 'rajesh.verma@tatatelecom.com',
    travelDeskPhone: '+91 98201 44520',
    contractType: 'master_services_agreement',
    creditTerms: 'advance_milestone',
    lifetimeSpend: 48200000,
    activeTripsCount: 1,
    totalDelegatesTravelled: 420,
    status: 'active',
    notes: 'Premium corporate enterprise account with mandatory 4-star+ accommodation policy and direct charter approvals.'
  },
  {
    id: 'corp-mahindra-farm',
    companyName: 'Mahindra & Mahindra Farm Equipment',
    legalEntityName: 'Mahindra & Mahindra Ltd. (Agri & Machinery Division)',
    industry: 'Automotive & Agricultural Machinery',
    gstin: '27AABCM8812B1Z8',
    pan: 'AABCM8812B',
    headOfficeCity: 'Mumbai, Maharashtra',
    travelDeskLeadName: 'Anand Kulkarni',
    travelDeskEmail: 'kulkarni.anand@mahindra.com',
    travelDeskPhone: '+91 98200 99401',
    contractType: 'master_services_agreement',
    creditTerms: '30_days_net',
    lifetimeSpend: 64500000,
    activeTripsCount: 1,
    totalDelegatesTravelled: 580,
    status: 'active',
    notes: 'Annual Pan-India top dealer incentive host. Requires fast-track immigration and group chartered sea catamarans.'
  },
  {
    id: 'corp-rotary-3011',
    companyName: 'Rotary International District 3011',
    legalEntityName: 'Rotary International District 3011 Association',
    industry: 'Civic, Humanitarian & Global Fellowship',
    gstin: '07AAAAR9910C1Z2',
    pan: 'AAAAR9910C',
    headOfficeCity: 'New Delhi',
    travelDeskLeadName: 'Rtn. Sudhir Mathur',
    travelDeskEmail: 'governor@rotary3011.org',
    travelDeskPhone: '+91 98110 33918',
    contractType: 'project_based',
    creditTerms: 'advance_milestone',
    lifetimeSpend: 29000000,
    activeTripsCount: 1,
    totalDelegatesTravelled: 650,
    status: 'active',
    notes: 'Biennial district conference. Prioritizes Aerocity plenary halls, exhibition booths, and simultaneous translation.'
  },
  {
    id: 'corp-reliance-retail',
    companyName: 'Reliance Retail Ventures',
    legalEntityName: 'Reliance Retail Ventures Limited',
    industry: 'Retail, Consumer Electronics & FMCG',
    gstin: '24AAACR1289P1ZS',
    pan: 'AAACR1289P',
    headOfficeCity: 'Ahmedabad / Mumbai',
    travelDeskLeadName: 'Priya Nambiar',
    travelDeskEmail: 'priya.nambiar@relretail.com',
    travelDeskPhone: '+91 99201 88402',
    contractType: 'retainer',
    creditTerms: '30_days_net',
    lifetimeSpend: 31000000,
    activeTripsCount: 0,
    totalDelegatesTravelled: 310,
    status: 'active',
    notes: 'Retail vendor summits and national store managers conclaves.'
  }
];

export const INITIAL_CORPORATE_PERSONS: CorporatePerson[] = [
  {
    id: 'cp-1',
    corporateId: 'corp-tata-telecom',
    fullName: 'Vikramaditya Rathore',
    designation: 'VP Enterprise Sales',
    department: 'Commercial Enterprise',
    email: 'v.rathore@tatatelecom.com',
    phone: '+91 98201 44520',
    vipGrade: 'c_suite',
    passportNumber: 'Z6104892',
    passportExpiry: '2031-08-15',
    aadhaarMasked: '**** 8821',
    dietaryPreference: 'Non-Vegetarian',
    frequentFlyerNo: 'AI-881920',
    homeCity: 'Mumbai',
    isKycComplete: true,
    assignedTripIds: ['mice-jaisalmer-2027']
  },
  {
    id: 'cp-2',
    corporateId: 'corp-tata-telecom',
    fullName: 'Dr. Shalini Mukerjee',
    designation: 'Chief Technology Architect',
    department: 'Cloud & AI Innovation',
    email: 'shalini.m@tatatelecom.com',
    phone: '+91 98110 33918',
    vipGrade: 'vp_director',
    passportNumber: 'M8812903',
    passportExpiry: '2029-04-10',
    aadhaarMasked: '**** 4590',
    dietaryPreference: 'Vegetarian',
    frequentFlyerNo: '6E-449102',
    homeCity: 'Bengaluru',
    isKycComplete: true,
    assignedTripIds: ['mice-jaisalmer-2027']
  },
  {
    id: 'cp-3',
    corporateId: 'corp-tata-telecom',
    fullName: 'Arjun Somani',
    designation: 'Managing Director, North Partner',
    department: 'Channel Alliances',
    email: 'asomani@northzone.partner.com',
    phone: '+91 98991 76201',
    vipGrade: 'vp_director',
    aadhaarMasked: '**** 1134',
    dietaryPreference: 'Jain',
    homeCity: 'Delhi',
    isKycComplete: true,
    assignedTripIds: ['mice-jaisalmer-2027']
  },
  {
    id: 'cp-4',
    corporateId: 'corp-mahindra-farm',
    fullName: 'Gurpreet Singh Dhillon',
    designation: 'Managing Partner (Punjab Region)',
    department: 'Premier Dealership Network',
    email: 'gurpreet@dhillontractors.com',
    phone: '+91 98140 12890',
    vipGrade: 'delegate',
    passportNumber: 'Z6104892',
    passportExpiry: '2031-05-12',
    dietaryPreference: 'Vegetarian',
    homeCity: 'Ludhiana',
    isKycComplete: true,
    assignedTripIds: ['mice-phuket-krabi-2027']
  },
  {
    id: 'cp-5',
    corporateId: 'corp-mahindra-farm',
    fullName: 'Pradeep Patel',
    designation: 'Proprietor (Gujarat Central)',
    department: 'Premier Dealership Network',
    email: 'pradeep@patelagri.in',
    phone: '+91 98250 99401',
    vipGrade: 'delegate',
    passportNumber: 'M8812903',
    passportExpiry: '2029-11-20',
    dietaryPreference: 'Jain',
    homeCity: 'Ahmedabad',
    isKycComplete: true,
    assignedTripIds: ['mice-phuket-krabi-2027']
  },
  {
    id: 'cp-6',
    corporateId: 'corp-rotary-3011',
    fullName: 'Rtn. Anil Khosla',
    designation: 'Past District Governor (PHF+8)',
    department: 'Council of Governors',
    email: 'akhosla@rotarydelhisouth.org',
    phone: '+91 98100 78201',
    vipGrade: 'c_suite',
    aadhaarMasked: '**** 4491',
    dietaryPreference: 'Vegetarian',
    homeCity: 'New Delhi',
    isKycComplete: true,
    assignedTripIds: ['mice-rotary-delhi-2027']
  }
];

export const INITIAL_AGREEMENTS: TripAgreement[] = [
  {
    id: 'mou-jaisalmer-2027',
    eventId: 'mice-jaisalmer-2027',
    eventTitle: 'Desert Crown: Apex Leadership Summit',
    corporateClientId: 'corp-tata-telecom',
    corporateClientName: 'Tata Telecommunications Limited',
    title: 'Turnkey MICE Event Operations Memorandum of Understanding (MoU)',
    agreementType: 'mou',
    version: '1.2-Executed',
    status: 'signed',
    effectiveDate: '2026-11-15',
    executionDate: '2026-12-18',
    scopeOfWorkSummary: 'Comprehensive end-to-end turnkey MICE operations encompassing charter Boeing 737 airlift from DEL/BOM to JSA, palace accommodations at Suryagarh Jaisalmer, exclusive buy-out of Sam Sand Dunes Private Camp, 4K LED staging AV, gourmet banquets, and onsite paramedic cover for 200 pax.',
    paymentTermsSummary: 'Commercial payment tranches: 40% initial commitment deposit upon MoU validation, 40% room block lock-in at D-30 cut-off, and 20% post-event final reconciliation within 7 banking days.',
    cancellationClause: 'Written notice >= 45 days: 90% refund of stage/AV funds, air charter subject to airline carrier forfeiture policy. 15-44 days: 50% cancellation surcharge. < 15 days: 100% of contracted room and airlift value.',
    forceMajeureClause: 'Neither agency nor client shall be deemed in breach by reason of acts of God, aviation civil airspace closures, extreme meteorological dust storms, or state-mandated security directives.',
    clauses: [
      {
        id: 'c-1',
        title: 'Section 1. Flight Charter Block & Ground Fleet',
        content: 'MICE Agency guarantees dedicated SpiceJet Boeing 737-800 charter airlift accommodating up to 189 passengers with priority baggage tagging, dedicated DEL T3 check-in counters, and airside escorts.'
      },
      {
        id: 'c-2',
        title: 'Section 2. Hotel Buy-Out & Attrition Safeguard',
        content: 'Total 110 rooms blocked across Suryagarh Palace. Client may release up to 5% of unassigned inventory without financial penalty prior to 15 January 2027.'
      },
      {
        id: 'c-3',
        title: 'Section 3. Confidentiality & KYC Data Protection',
        content: 'All identity tokens, Aadhaar digests, and executive manifests collected in MICEverse shall be protected via hardware-accelerated AES-256 encryption compliant with India DPDP Act 2023.'
      }
    ],
    agencySignatory: {
      name: 'Shailesh Nair',
      title: 'Managing Director, MICEverse Global',
      signedAt: '2026-12-18 11:00 IST'
    },
    clientSignatory: {
      name: 'Rajesh Verma',
      title: 'VP Operations & Infrastructure',
      email: 'rajesh.verma@tatatelecom.com',
      signedAt: '2026-12-18 14:30 IST',
      ipAddress: '103.24.188.12',
      verificationHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
    },
    acknowledgedInPortal: true,
    acknowledgedAt: '2026-12-18 14:30 IST'
  },
  {
    id: 'mou-phuket-krabi-2027',
    eventId: 'mice-phuket-krabi-2027',
    eventTitle: 'Andaman Odyssey: Top Dealer Incentive Trip',
    corporateClientId: 'corp-mahindra-farm',
    corporateClientName: 'Mahindra & Mahindra Farm Equipment',
    title: 'International Incentive Trip Operations Agreement & Legal MoU',
    agreementType: 'mou',
    version: '1.0-AwaitingSign',
    status: 'acknowledged',
    effectiveDate: '2026-12-01',
    scopeOfWorkSummary: '4 Nights / 5 Days luxury dealer incentive for 200 pax across Phuket and Krabi, including Thai Airways international group flights, JW Marriott Phuket and Rayavadee Krabi resort stays, private catamarans to Phi Phi Leh, and The Grotto Awards Gala.',
    paymentTermsSummary: '50% initial international booking tranche upon PNR creation, 35% boat charters and resort cut-off, 15% final forex reconciliation.',
    cancellationClause: 'International group airfares non-refundable once ticketed. Resort cancellations subject to 60-day high-season policy.',
    forceMajeureClause: 'Includes marine monsoon weather advisories and sovereign immigration entry restrictions.',
    clauses: [
      {
        id: 'c-pk-1',
        title: 'Section 1. International Group Transit & Customs',
        content: 'Includes Thai Royal VIP immigration express lane fast-track and group electronic visa-on-arrival coordination.'
      },
      {
        id: 'c-pk-2',
        title: 'Section 2. Marine Safety & Catamaran Charters',
        content: 'All vessels certified with twin outboards, certified marine guides, life vests, and $50,000/pax international medical insurance cover.'
      }
    ],
    agencySignatory: {
      name: 'Shailesh Nair',
      title: 'Managing Director, MICEverse Global',
      signedAt: '2026-12-01 10:00 IST'
    },
    clientSignatory: {
      name: 'Anand Kulkarni',
      title: 'Head Dealer Sales & Commercial Alliances',
      email: 'kulkarni.anand@mahindra.com'
    },
    acknowledgedInPortal: true,
    acknowledgedAt: '2027-01-08 16:45 IST'
  },
  {
    id: 'mou-rotary-delhi-2027',
    eventId: 'mice-rotary-delhi-2027',
    eventTitle: 'Rotary International District 3011 Annual Conference',
    corporateClientId: 'corp-rotary-3011',
    corporateClientName: 'Rotary International District 3011',
    title: 'Civic Convention Management & Facility Buy-out MoU',
    agreementType: 'trip_contract',
    version: '2.0-Signed',
    status: 'signed',
    effectiveDate: '2026-10-15',
    executionDate: '2026-11-04',
    scopeOfWorkSummary: 'Convention operations for 400 Rotarians at New Delhi Aerocity, encompassing Peacock Plenary Hall, Novotel/Pullman hotel twin accommodations, 10 electric coach shuttles, and instant RFID badge printing.',
    paymentTermsSummary: '40% advance upon facility block, 40% on AV staging production, 20% on banquet count reconciliation.',
    cancellationClause: 'Standard convention center buy-out policy with 30-day notice window.',
    forceMajeureClause: 'Covers regional civil advisories, aviation strikes, and venue disruptions.',
    clauses: [
      {
        id: 'c-del-1',
        title: 'Section 1. Convention Arena Buy-out',
        content: 'Exclusivity of Peacock Ballroom and Grand Foyer between 14-16 April 2027 with 24x7 security perimeter.'
      }
    ],
    agencySignatory: {
      name: 'Shailesh Nair',
      title: 'Managing Director, MICEverse Global',
      signedAt: '2026-10-15 09:30 IST'
    },
    clientSignatory: {
      name: 'Rtn. Sudhir Mathur',
      title: 'District Governor, Rotary District 3011',
      email: 'governor@rotary3011.org',
      signedAt: '2026-11-04 11:15 IST',
      ipAddress: '122.161.44.8',
      verificationHash: 'SHA256:4a38c2912440e0c8b28f8045952f444857b28d6896d92ec21b6d1947a16b92a0'
    },
    acknowledgedInPortal: true,
    acknowledgedAt: '2026-11-04 11:15 IST'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    eventId: 'mice-jaisalmer-2027',
    milestoneId: 'm-1',
    milestoneName: 'Contract Execution & Flight Charter Lock-in',
    amount: 5920000,
    currency: 'INR',
    paymentMethod: 'rtgs_neft',
    transactionReference: 'HDFCR5202612180092144',
    paymentDate: '2026-12-18',
    recordedBy: 'Accounts Desk (Anita Rao)',
    receiptNumber: 'REC-2026-8812',
    status: 'completed',
    notes: 'Initial 40% commitment deposit credited via HDFC Treasury account.'
  },
  {
    id: 'pay-2',
    eventId: 'mice-jaisalmer-2027',
    milestoneId: 'm-2',
    milestoneName: 'Hotel Room Block & Catering Attrition Cut-off',
    amount: 3000000,
    currency: 'INR',
    paymentMethod: 'rtgs_neft',
    transactionReference: 'HDFCR5202701150033102',
    paymentDate: '2027-01-15',
    recordedBy: 'Accounts Desk (Anita Rao)',
    receiptNumber: 'REC-2027-1049',
    status: 'completed',
    notes: 'Partial payment tranche received (₹30,00,000 of ₹59,20,000 due). Balance ₹29,20,000 scheduled.'
  },
  {
    id: 'pay-3',
    eventId: 'mice-phuket-krabi-2027',
    milestoneId: 'm-pk-1',
    milestoneName: 'Airlines Group PNR Issuance & Visa Deposit',
    amount: 13800000,
    currency: 'INR',
    paymentMethod: 'bank_transfer',
    transactionReference: 'AXISR202701100098192',
    paymentDate: '2027-01-10',
    recordedBy: 'Finance Lead (Karan Shah)',
    receiptNumber: 'REC-2027-1102',
    status: 'completed',
    notes: '50% Thai Airways block and initial island speedboat charter deposit.'
  },
  {
    id: 'pay-4',
    eventId: 'mice-rotary-delhi-2027',
    milestoneId: 'm-del-1',
    milestoneName: 'Convention Hall & Hotel Atrium Deposit',
    amount: 7360000,
    currency: 'INR',
    paymentMethod: 'rtgs_neft',
    transactionReference: 'ICICIR202611040019201',
    paymentDate: '2026-11-04',
    recordedBy: 'Accounts Desk (Anita Rao)',
    receiptNumber: 'REC-2026-9021',
    status: 'completed',
    notes: 'Full advance deposit for Aerocity Peacock Ballroom and Pullman room blocks.'
  }
];

export const INITIAL_REMINDERS: PaymentReminderLog[] = [
  {
    id: 'rem-1',
    eventId: 'mice-jaisalmer-2027',
    milestoneId: 'm-2',
    channel: 'both',
    recipientName: 'Rajesh Verma',
    recipientEmail: 'rajesh.verma@tatatelecom.com',
    recipientPhone: '+91 98201 44520',
    sentAt: '2027-01-20 10:30 IST',
    amountDue: 2920000,
    dueDate: '2027-01-25',
    status: 'delivered'
  }
];
