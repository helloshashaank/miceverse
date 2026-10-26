import { MiceEvent } from '../types/mice';

export const INITIAL_MICE_EVENTS: MiceEvent[] = [
  {
    id: 'mice-jaisalmer-2027',
    name: 'Desert Crown: Apex Leadership Summit',
    clientName: 'Tata Telecommunications & Enterprise Group',
    clientContact: 'Rajesh Verma (VP Operations)',
    destination: 'Jaisalmer, Rajasthan, India',
    paxCount: 200,
    startDate: '2027-02-08',
    endDate: '2027-02-10',
    durationNights: 2,
    budgetTotal: 14800000, // INR 1.48 Crore
    budgetPerPax: 74000,
    currency: 'INR',
    status: 'in_progress',
    heroImage: '/src/assets/images/jaisalmer_palace_1793044681321.jpg',
    description: 'High-level executive leadership conclave featuring royal desert arrivals, strategic roadmap keynotes at Fort Haveli, sunset dune safaris, and a royal Rajasthani banquet with drone light show.',
    executiveSummary: 'This signature turnkey MICE proposal delivers an unprecedented royal desert leadership retreat for 200 senior leaders of Tata Telecommunications. Spanning chartered commercial airlift directly into Jaisalmer Civil Enclave, complete heritage buy-out of Suryagarh Palace, and private sand dunes banqueting with drone light spectacles.',
    proposalVersion: 'v3.2-Final',
    proposalTemplate: 'royal_heritage',
    paymentMilestones: [
      { id: 'm-1', milestone: 'Contract Execution & Flight Charter Lock-in', percentage: 40, dueDate: '15 Dec 2026', amount: 5920000, status: 'paid' },
      { id: 'm-2', milestone: 'Hotel Room Block & Catering Attrition Cut-off', percentage: 40, dueDate: '15 Jan 2027', amount: 5920000, status: 'paid' },
      { id: 'm-3', milestone: 'Onsite AV Staging, Production & Final Reconciliation', percentage: 20, dueDate: '15 Feb 2027', amount: 2960000, status: 'due' }
    ],
    clientSignOff: {
      clientSignerName: 'Rajesh Verma',
      clientSignerDesignation: 'VP Operations & Infrastructure',
      signedAt: '2026-12-18 14:30 IST',
      isSigned: true,
      digitalSealRef: 'TATA-TELE-SEAL-88492'
    },
    
    inclusions: [
      'Chartered Boeing 737 round-trip airlift (Delhi/Mumbai to Jaisalmer Airport)',
      'Luxury AC Volvo multi-axle coaches for all ground transfers',
      '2 Nights luxury heritage stay at Suryagarh Jaisalmer (Palace Suites & Luxury Pavilions)',
      'Royal Welcome with Dhol, Thali, Safa Turban tying, and Royal Guard salute',
      'Exclusive buy-out of Sam Sand Dunes Private Camp for Stargazing Gala',
      'All gourmet meals: Royal Marwari Thali, Continental Buffets, Gala Open Bar (Selected Spirits)',
      'Complete AV production: 4K LED Curved Stage, JBL VerTec Line Array, Stage Lighting & Mics',
      'Comprehensive Group Travel Insurance & Onsite Medical Paramedic Team',
      'Customized RFID delegate smart wristbands and souvenir desert kits'
    ],
    exclusions: [
      'Personal hotel laundry, telephone calls, and room mini-bar consumption',
      'Individual spa therapies and private Ayurvedic sessions outside scheduled vouchers',
      'Airfare difference for delegates requesting dates outside 08-10 February',
      'Alcohol beyond pre-approved 4-hour gala open-bar license',
      'Excess luggage penalties exceeding 25kg checked-in + 7kg hand baggage allowance'
    ],

    hotelOptions: [
      {
        id: 'hotel-surya-1',
        name: 'Suryagarh Royal Palace Resort',
        category: '5-Star Luxury Heritage',
        location: 'Kahala Phata, Sam Road, Jaisalmer',
        roomTypes: ['Palace Room (King)', 'Heritage Suite', 'Pavilion Luxury Tent'],
        costPerNightPerPax: 28500,
        totalRoomsBlocked: 110,
        rating: 4.9,
        amenities: ['Heated Pool', 'Desert Spa', 'Royal Courtyards', 'Private Helipad', 'Conference Haveli'],
        selected: true
      },
      {
        id: 'hotel-marriott-jsa',
        name: 'Jaisalmer Marriott Resort & Spa',
        category: '5-Star Luxury',
        location: 'Jaisalmer-Sam Road',
        roomTypes: ['Deluxe Desert View', 'Executive Suite'],
        costPerNightPerPax: 22000,
        totalRoomsBlocked: 90,
        rating: 4.8,
        amenities: ['Grand Ballroom', 'Multi-Cuisine Dining', 'Oasis Pool', 'High-Speed Wi-Fi'],
        selected: false
      }
    ],

    travelOptions: [
      {
        id: 'travel-charter-1',
        type: 'flight_charter',
        operator: 'SpiceJet MICE Charter Boeing 737-800',
        route: 'DEL (T3) ➔ JSA (Jaisalmer Civil Enclave)',
        departureTime: '08 Feb, 07:30 AM',
        arrivalTime: '08 Feb, 09:15 AM',
        capacity: 189,
        costPerPax: 24500,
        includedLuggage: '25kg Check-in + 7kg Cabin',
        selected: true
      },
      {
        id: 'travel-coach-1',
        type: 'luxury_coach',
        operator: 'Apex Royal Fleet (5x BharatBenz 45-Seaters)',
        route: 'Jaisalmer Airport ➔ Suryagarh Palace & Sam Dunes',
        departureTime: 'Continuous Shuttle & Event Convoys',
        arrivalTime: 'On-Demand Transfer',
        capacity: 225,
        costPerPax: 4200,
        includedLuggage: 'Luggage Van with Armed Escort',
        selected: true
      }
    ],

    itinerary: [
      {
        id: 'itin-j-1',
        dayNumber: 1,
        date: '08 Feb 2027',
        time: '07:30 - 09:15',
        title: 'Charter Airlift to Jaisalmer',
        description: 'Private charter flight from Delhi Terminal 3 with dedicated check-in counter and onboard breakfast.',
        location: 'DEL T3 Gate 41',
        type: 'transfer',
        dressCode: 'Smart Casual'
      },
      {
        id: 'itin-j-2',
        dayNumber: 1,
        date: '08 Feb 2027',
        time: '10:00 - 11:30',
        title: 'Royal Arrival & Turban Welcome',
        description: 'Rajasthani folk welcome with Kalbelia dancers, garland ceremony, safa tying, and fast-track express room check-in.',
        location: 'Suryagarh Grand Courtyard',
        type: 'activity',
        dressCode: 'Smart Casual'
      },
      {
        id: 'itin-j-3',
        dayNumber: 1,
        date: '08 Feb 2027',
        time: '14:30 - 18:00',
        title: 'Strategy Plenary: Navigating The Horizon 2030',
        description: 'Keynotes by CEO, interactive product roadmap showcase, and panel discussions.',
        location: 'Megh Malhar Grand Ballroom',
        type: 'conference',
        dressCode: 'Business Formal',
        speakerOrLead: 'Rajesh Verma & Executive Leadership'
      },
      {
        id: 'itin-j-4',
        dayNumber: 1,
        date: '08 Feb 2027',
        time: '19:30 - 23:00',
        title: 'Desert Mirage: Imperial Welcome Dinner',
        description: 'Dinner under the stars with Manganiyar musicians, tandoori live counters, and networking lounge.',
        location: 'Bawdi Stepwell Courtyard',
        type: 'gala',
        dressCode: 'Royal Ethnic / Indo-Western'
      },
      {
        id: 'itin-j-5',
        dayNumber: 2,
        date: '09 Feb 2027',
        time: '08:30 - 12:30',
        title: 'Breakout Masterclasses & Innovation Hub',
        description: 'Parallel syndicate sessions on Cloud Scalability, AI Enterprise adoption, and Partner Ecosystems.',
        location: 'Courtyard Syndicate Rooms A, B & C',
        type: 'conference',
        dressCode: 'Smart Business'
      },
      {
        id: 'itin-j-6',
        dayNumber: 2,
        date: '09 Feb 2027',
        time: '15:30 - 23:30',
        title: 'Sam Sand Dunes Expedition & Desert Gala',
        description: 'Luxury 4x4 Dune Bashing, sunset camel caravan, followed by Grand Awards Night with laser projection and fireworks.',
        location: 'Sam Private Desert Pavilion',
        type: 'gala',
        dressCode: 'Desert Chic & Warm Layers'
      },
      {
        id: 'itin-j-7',
        dayNumber: 3,
        date: '10 Feb 2027',
        time: '10:00 - 12:00',
        title: 'Closing Valedictory & Airport Departure',
        description: 'Summary resolutions, distribution of mementoes, and chartered coach convoy to JSA Airport.',
        location: 'Suryagarh Main Portico',
        type: 'transfer',
        dressCode: 'Travel Comfort'
      }
    ],

    attendees: [
      {
        id: 'att-j-1',
        name: 'Vikramaditya Rathore',
        email: 'v.rathore@tatatelecom.com',
        phone: '+91 98201 44520',
        organization: 'Tata Telecommunications',
        designation: 'VP Enterprise Sales',
        city: 'Mumbai',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Suite 204 (Single)',
        flightStatus: 'Charter SpiceJet Seat 04A',
        dietaryPreference: 'Non-Vegetarian',
        docStatus: 'verified',
        passportOrIdNumber: 'Aadhaar: **** 8821',
        checkedIn: true
      },
      {
        id: 'att-j-2',
        name: 'Dr. Shalini Mukerjee',
        email: 'shalini.m@tatatelecom.com',
        phone: '+91 98110 33918',
        organization: 'Tata Telecommunications',
        designation: 'Chief Technology Architect',
        city: 'Bengaluru',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Pavilion Tent 12 (Single)',
        flightStatus: 'Charter SpiceJet Seat 02C',
        dietaryPreference: 'Vegetarian',
        docStatus: 'verified',
        passportOrIdNumber: 'Aadhaar: **** 4590',
        checkedIn: true
      },
      {
        id: 'att-j-3',
        name: 'Arjun Somani',
        email: 'asomani@northzone.partner.com',
        phone: '+91 98991 76201',
        organization: 'NorthZone Enterprise Systems',
        designation: 'Managing Director',
        city: 'Delhi',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Palace Room 318 (Twin)',
        flightStatus: 'Charter SpiceJet Seat 12D',
        dietaryPreference: 'Jain',
        docStatus: 'verified',
        passportOrIdNumber: 'Aadhaar: **** 1134',
        checkedIn: false
      },
      {
        id: 'att-j-4',
        name: 'Meera Chidambaram',
        email: 'meera.c@chennai-infra.org',
        phone: '+91 94440 88219',
        organization: 'Southern Grid Infra',
        designation: 'Director Operations',
        city: 'Chennai',
        rsvpStatus: 'pending',
        roomAllocation: 'Unassigned',
        flightStatus: 'Flight DEL Conecting Pending',
        dietaryPreference: 'Vegetarian',
        docStatus: 'missing',
        checkedIn: false
      },
      {
        id: 'att-j-5',
        name: 'Rohan Mehra',
        email: 'rmehra@cloudsolutions.in',
        phone: '+91 98199 55410',
        organization: 'CloudEdge Network',
        designation: 'VP Alliances',
        city: 'Gurugram',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Palace Room 319 (Twin)',
        flightStatus: 'Charter SpiceJet Seat 14B',
        dietaryPreference: 'Non-Vegetarian',
        docStatus: 'verified',
        passportOrIdNumber: 'Aadhaar: **** 9021',
        checkedIn: false
      },
      {
        id: 'att-j-6',
        name: 'Sunita Aggarwal',
        email: 's.aggarwal@apextelecom.net',
        phone: '+91 97112 00192',
        organization: 'Apex Solutions',
        designation: 'Senior Principal',
        city: 'Pune',
        rsvpStatus: 'waitlist',
        roomAllocation: 'Unassigned',
        flightStatus: 'Commercial Waitlist',
        dietaryPreference: 'Vegan',
        docStatus: 'pending_review',
        checkedIn: false
      }
    ],

    notifications: [
      {
        id: 'notif-j-1',
        title: 'Charter Flight Gate Update (T3 Delhi)',
        message: 'Charter SpiceJet Flight SG-9901 boarding initiated at Gate 41. Luggage tags dispatched to your digital pass.',
        targetAudience: 'all',
        channels: ['push', 'sms', 'whatsapp'],
        sentAt: '08 Feb 2027, 06:45 AM',
        deliveredCount: 198,
        openRate: '96%'
      },
      {
        id: 'notif-j-2',
        title: 'Sam Dunes Evening Gala: Warm Clothing Advisory',
        message: 'Desert temperature drops to 8°C after 8:00 PM tonight. Shawls & jackets recommended for the open-air pavilion.',
        targetAudience: 'all',
        channels: ['push', 'whatsapp'],
        sentAt: '09 Feb 2027, 02:00 PM',
        deliveredCount: 194,
        openRate: '92%'
      }
    ],

    venueZones: [
      {
        id: 'v-j-1',
        name: 'Megh Malhar Plenary Ballroom',
        type: 'hall',
        capacity: 250,
        currentOccupancy: 195,
        currentAgenda: 'Keynote Session & Digital Transformation Vision',
        coords: { x: 32, y: 40 },
        wifiSsid: 'ApexConclave_Ultra5G',
        avSetup: '4K Dual LED Wall, Shure Wireless Mics, Crestron Control'
      },
      {
        id: 'v-j-2',
        name: 'Bawdi Stepwell Courtyard',
        type: 'dining',
        capacity: 220,
        currentOccupancy: 0,
        currentAgenda: 'Setup for Royal Cultural Banquet',
        coords: { x: 68, y: 35 },
        wifiSsid: 'ApexConclave_Courtyard',
        avSetup: 'Heritage Amber Uplighters, Folk Acoustic Microphones'
      },
      {
        id: 'v-j-3',
        name: 'Syndicate Haveli A (Breakouts)',
        type: 'breakout',
        capacity: 45,
        currentOccupancy: 28,
        currentAgenda: 'AI Enterprise Roadmap Workshop',
        coords: { x: 22, y: 72 },
        wifiSsid: 'ApexConclave_SyndicateA',
        avSetup: '85" Interactive Touch Display, Logitech Rally Bar'
      },
      {
        id: 'v-j-4',
        name: 'VIP Executive Majlis',
        type: 'lounge',
        capacity: 20,
        currentOccupancy: 8,
        currentAgenda: 'Board of Directors High Tea',
        coords: { x: 78, y: 75 },
        wifiSsid: 'Apex_VIP_Private',
        avSetup: 'Private Teleconference Node'
      }
    ],

    budgetForecast: {
      baseCostPerPax: 74000,
      flightEstimate: 4900000,
      hotelEstimate: 5700000,
      fnbEstimate: 2100000,
      avAndGalaEstimate: 1400000,
      contingencyBufferPercent: 5.0,
      currencyDriftPercent: 0,
      predictedPaxVariance: 2.5
    }
  },

  {
    id: 'mice-phuket-krabi-2027',
    name: 'Andaman Odyssey: Top Dealer Incentive Trip',
    clientName: 'Mahindra & Mahindra Farm Equipment Division',
    clientContact: 'Anand Kulkarni (Head Dealer Sales)',
    destination: 'Phuket & Krabi, Thailand',
    paxCount: 200,
    startDate: '2027-03-18',
    endDate: '2027-03-22',
    durationNights: 4,
    budgetTotal: 27600000, // INR 2.76 Crore
    budgetPerPax: 138000,
    currency: 'INR',
    status: 'proposal_sent',
    heroImage: '/src/assets/images/phuket_krabi_coastal_1793044681189.jpg',
    description: '4 Nights / 5 Days high-octane luxury incentive trip honoring India’s premier 200 tractor and machinery dealerships across Phuket’s Mai Khao coast and Krabi’s limestone ocean archipelago.',
    executiveSummary: 'An exhilarating reward itinerary for Mahindra Top Dealers, integrating beachfront 5-star hospitality across JW Marriott Phuket and Rayavadee Krabi. Highlights include private island catamarans through Phi Phi Leh, VIP fast-track airport customs, and the Champions Awards Gala inside The Grotto limestone ocean cave.',
    proposalVersion: 'v2.8-Commercial',
    proposalTemplate: 'coastal_luxury',
    paymentMilestones: [
      { id: 'm-pk-1', milestone: 'Airlines Group PNR Issuance & Visa Deposit', percentage: 50, dueDate: '10 Jan 2027', amount: 13800000, status: 'paid' },
      { id: 'm-pk-2', milestone: 'Private Speedboat Charters & Hotel Rooms Cut-off', percentage: 35, dueDate: '15 Feb 2027', amount: 9660000, status: 'due' },
      { id: 'm-pk-3', milestone: 'Foreign Exchange Settlement & Event Gala Reconciliation', percentage: 15, dueDate: '25 Mar 2027', amount: 4140000, status: 'pending' }
    ],
    clientSignOff: {
      clientSignerName: 'Anand Kulkarni',
      clientSignerDesignation: 'Head Dealer Sales & Commercial Alliances',
      isSigned: false
    },
    
    inclusions: [
      'Roundtrip International flights on Thai Airways (Delhi/Mumbai to Phuket HKT with group check-in)',
      '2 Nights at JW Marriott Phuket Resort & Spa (Deluxe Ocean Facing Rooms)',
      '2 Nights at Rayavadee Luxury Resort Krabi (Surrounded by limestone cliffs & Phra Nang Beach)',
      'Private High-Speed Ocean Catamaran charter to Phi Phi Leh & Maya Bay with snorkel gear',
      'Exclusive Thai Government Fast-Track Immigration VIP lane assistance at Phuket Airport',
      'Thailand Group Visa on Arrival coordination & electronic KYC handling',
      'Andaman Sunset Awards Gala with beach fireworks, Thai fire acrobats, and luxury open bar',
      'Island transfer via high-speed twin-engine private speedboats with life vests & safety escorts',
      'All meals: Authentic Thai Royal banquets, Indian chefs flown in for specialized Jain/Veg buffets',
      'International Travel Medical & Baggage Protection Insurance (Coverage up to $50,000/pax)'
    ],
    exclusions: [
      'Passport renewal charges or government express visa stamping surcharges if passport validity < 6 months',
      'Individual motorized water sports (Jet ski, parasailing) outside safety waiver itinerary',
      'Personal bar tabs and room incidentals charged to private room folios',
      'Single room occupancy supplement (Rs. 32,000 per pax for private villa)',
      'Gratuities and tips to private boat captains and drivers'
    ],

    hotelOptions: [
      {
        id: 'hotel-jw-phuket',
        name: 'JW Marriott Phuket Resort & Spa',
        category: '5-Star Luxury Beachfront',
        location: 'Mai Khao Beach, Phuket',
        roomTypes: ['Deluxe Garden Terrace', 'Ocean Facing King / Twin'],
        costPerNightPerPax: 19800,
        totalRoomsBlocked: 105,
        rating: 4.9,
        amenities: ['Private Beach', '3 Lagoon Pools', 'Mandara Spa', 'Grand Lotus Ballroom'],
        selected: true
      },
      {
        id: 'hotel-rayavadee-krabi',
        name: 'Rayavadee Premier Resort & Pavilions',
        category: '5-Star Ultra Luxury Ecological',
        location: 'Railay Peninsula, Krabi',
        roomTypes: ['Deluxe Pavilion', 'Hydro Pool Pavilion'],
        costPerNightPerPax: 26500,
        totalRoomsBlocked: 100,
        rating: 4.9,
        amenities: ['Limestone Cliff Grotto Dining', 'Private Speedboat Pier', 'Free-form Pool'],
        selected: true
      }
    ],

    travelOptions: [
      {
        id: 'travel-thai-airways',
        type: 'commercial_flight',
        operator: 'Thai Airways International Group Block (Boeing 777)',
        route: 'BOM / DEL ➔ BKK ➔ HKT (Phuket International)',
        departureTime: '18 Mar, 01:20 AM',
        arrivalTime: '18 Mar, 09:30 AM',
        capacity: 200,
        costPerPax: 46000,
        includedLuggage: '30kg Checked + 7kg Cabin',
        selected: true
      },
      {
        id: 'travel-catamaran',
        type: 'speed_boat',
        operator: 'Blue Andaman Catamarans & Private Speed Fleet',
        route: 'Phuket Ao Po Grand Marina ➔ Krabi Railay Beach Pier',
        departureTime: '20 Mar, 09:00 AM',
        arrivalTime: '20 Mar, 11:30 AM',
        capacity: 220,
        costPerPax: 9500,
        includedLuggage: 'Waterproof Baggage Transfers',
        selected: true
      }
    ],

    itinerary: [
      {
        id: 'itin-pk-1',
        dayNumber: 1,
        date: '18 Mar 2027',
        time: '09:30 - 12:30',
        title: 'VIP Phuket Fast-Track Arrival',
        description: 'Immigration fast-track, orchid garland reception, transfer to JW Marriott Mai Khao.',
        location: 'Phuket International Airport (HKT)',
        type: 'transfer',
        dressCode: 'Tropical Casual'
      },
      {
        id: 'itin-pk-2',
        dayNumber: 1,
        date: '18 Mar 2027',
        time: '18:30 - 22:30',
        title: 'Sawasdee Sunset Welcome Fiesta',
        description: 'Beachside barbecue with authentic Thai street culinary stalls and live island band.',
        location: 'Mai Khao Beachfront Lawn',
        type: 'dining',
        dressCode: 'Linen Whites / Tropical Floral'
      },
      {
        id: 'itin-pk-3',
        dayNumber: 2,
        date: '19 Mar 2027',
        time: '08:30 - 16:30',
        title: 'Phi Phi Archipelago Private Catamaran Expedition',
        description: 'Cruising through emerald waters, Maya Bay sightseeing, snorkeling with marine guides, onboard buffet.',
        location: 'Ao Po Grand Marina Departure',
        type: 'activity',
        dressCode: 'Swimwear, Sunhat & Deck Shoes'
      },
      {
        id: 'itin-pk-4',
        dayNumber: 3,
        date: '20 Mar 2027',
        time: '09:30 - 13:00',
        title: 'Scenic Speedboat Transfer to Krabi',
        description: 'Dramatic passage past Phang Nga Bay karst towers, docking at Railay Peninsula.',
        location: 'Rayavadee Krabi Pier',
        type: 'transfer',
        dressCode: 'Resort Wear'
      },
      {
        id: 'itin-pk-5',
        dayNumber: 3,
        date: '20 Mar 2027',
        time: '18:30 - 23:30',
        title: 'The Grotto: Annual Champions Awards Gala',
        description: 'Awards presentation in a dramatic ancient limestone cave overlooking Phra Nang Beach, followed by beach fire performance.',
        location: 'The Grotto at Rayavadee',
        type: 'gala',
        dressCode: 'Cocktail Glamour',
        speakerOrLead: 'Anand Kulkarni & President Farm Equipment'
      },
      {
        id: 'itin-pk-6',
        dayNumber: 4,
        date: '21 Mar 2027',
        time: '10:00 - 13:00',
        title: 'Dealer Synergy & Future Strategy Forum',
        description: 'Interactive presentation of next-generation electric agri-machinery and customer financing apps.',
        location: 'Rayavadee Cliff Pavilion',
        type: 'conference',
        dressCode: 'Business Casual'
      },
      {
        id: 'itin-pk-7',
        dayNumber: 5,
        date: '22 Mar 2027',
        time: '11:00 - 17:00',
        title: 'Farewell Luncheon & Airport Transfers',
        description: 'Private coach convoy to Krabi Airport (KBV) for onward connection to Bangkok & India.',
        location: 'Krabi International Airport',
        type: 'transfer',
        dressCode: 'Comfort Travel'
      }
    ],

    attendees: [
      {
        id: 'att-pk-1',
        name: 'Gurpreet Singh Dhillon',
        email: 'gurpreet@dhillontractors.com',
        phone: '+91 98140 12890',
        organization: 'Dhillon Agro Machinery',
        designation: 'Managing Partner (Punjab Region)',
        city: 'Ludhiana',
        rsvpStatus: 'confirmed',
        roomAllocation: 'JW Ocean Room 412 (Twin)',
        flightStatus: 'Thai Airways TG-318 Confirmed',
        dietaryPreference: 'Vegetarian',
        docStatus: 'verified',
        passportOrIdNumber: 'Passport: Z6104892 (Exp 2031)',
        visaStatus: 'Thai eVisa Issued',
        checkedIn: false
      },
      {
        id: 'att-pk-2',
        name: 'Pradeep Patel',
        email: 'pradeep@patelagri.in',
        phone: '+91 98250 99401',
        organization: 'Patel Motors & Tractors',
        designation: 'Proprietor (Gujarat Central)',
        city: 'Ahmedabad',
        rsvpStatus: 'confirmed',
        roomAllocation: 'JW Ocean Room 414 (Twin)',
        flightStatus: 'Thai Airways TG-318 Confirmed',
        dietaryPreference: 'Jain',
        docStatus: 'verified',
        passportOrIdNumber: 'Passport: M8812903 (Exp 2029)',
        visaStatus: 'Thai eVisa Issued',
        checkedIn: false
      },
      {
        id: 'att-pk-3',
        name: 'Suresh Reddy',
        email: 'suresh@andhra-equip.com',
        phone: '+91 98480 34112',
        organization: 'Deccan Agri Harvesters',
        designation: 'CEO',
        city: 'Vijayawada',
        rsvpStatus: 'pending',
        roomAllocation: 'Pending Allocation',
        flightStatus: 'Waitlist Flight BOM-HKT',
        dietaryPreference: 'Non-Vegetarian',
        docStatus: 'pending_review',
        passportOrIdNumber: 'Passport: S1940124 (Reviewing Expiry)',
        checkedIn: false
      },
      {
        id: 'att-pk-4',
        name: 'Kavita Sundaram',
        email: 'kavita@mahindrafarm.com',
        phone: '+91 99001 22891',
        organization: 'Mahindra Corporate Secretariat',
        designation: 'Lead Protocol Officer',
        city: 'Mumbai',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Rayavadee Pavilion 08 (Single)',
        flightStatus: 'Thai Airways Business Class TG-318',
        dietaryPreference: 'Vegan',
        docStatus: 'verified',
        passportOrIdNumber: 'Passport: N4419082 (Diplomatic/Official)',
        visaStatus: 'Official APEC Business Card',
        checkedIn: true
      }
    ],

    notifications: [
      {
        id: 'notif-pk-1',
        title: 'Mandatory Passport Upload Deadline (72h)',
        message: 'Kindly submit your passport scanned copy (min 6 months validity) to confirm Thai eVisa clearance.',
        targetAudience: 'pending_docs',
        channels: ['push', 'sms', 'whatsapp'],
        sentAt: '24 Feb 2027, 11:00 AM',
        deliveredCount: 42,
        openRate: '88%'
      }
    ],

    venueZones: [
      {
        id: 'v-pk-1',
        name: 'The Grotto Limestone Cave',
        type: 'gala',
        capacity: 220,
        currentOccupancy: 0,
        currentAgenda: 'Setup for Champions Trophy Presentation',
        coords: { x: 50, y: 55 },
        wifiSsid: 'Rayavadee_Grotto5G',
        avSetup: 'Submersible Beach Stage Audio, Waterproof LED Spots'
      },
      {
        id: 'v-pk-2',
        name: 'Mai Khao Ocean Pavilion',
        type: 'dining',
        capacity: 250,
        currentOccupancy: 180,
        currentAgenda: 'Seafood & Indian Fusion Dinner',
        coords: { x: 25, y: 35 },
        wifiSsid: 'JW_Ocean_WiFi',
        avSetup: 'Wireless PA & Acoustic Microphones'
      },
      {
        id: 'v-pk-3',
        name: 'Railay Cliff Plenary Hall',
        type: 'hall',
        capacity: 240,
        currentOccupancy: 0,
        currentAgenda: 'Synergy Summit Keynote Preparation',
        coords: { x: 70, y: 45 },
        wifiSsid: 'Rayavadee_Conference',
        avSetup: 'Laser Projection 12,000 Lumens, Surround Sound'
      }
    ],

    budgetForecast: {
      baseCostPerPax: 138000,
      flightEstimate: 9200000,
      hotelEstimate: 10400000,
      fnbEstimate: 4200000,
      avAndGalaEstimate: 2600000,
      contingencyBufferPercent: 7.5,
      currencyDriftPercent: 4.2, // THB to INR foreign exchange drift buffer
      predictedPaxVariance: 4.0
    }
  },

  {
    id: 'mice-rotary-delhi-2027',
    name: 'Rotary International District 3011 Annual Conference',
    clientName: 'Rotary International District 3011 Council',
    clientContact: 'Rtn. Sudhir Mathur (District Governor)',
    destination: 'Aerocity, New Delhi, India',
    paxCount: 400,
    startDate: '2027-04-14',
    endDate: '2027-04-16',
    durationNights: 2,
    budgetTotal: 18400000, // INR 1.84 Crore
    budgetPerPax: 46000,
    currency: 'INR',
    status: 'contracted',
    heroImage: '/src/assets/images/delhi_convention_1793044681027.jpg',
    description: 'Premier biennial civic leadership and humanitarian fellowship convention hosting 400 Rotarians, club presidents, governors, and international delegates at Aerocity’s largest convention arena.',
    executiveSummary: 'Turnkey conference management for 400 Rotarians at New Delhi Aerocity. Includes plenary buy-out of Peacock Grand Ballroom, dual hotel twin-sharing inventory across Pullman and Novotel, 10-coach electric shuttle logistics from IGI Airport, and digital badge RFID instant kiosks.',
    proposalVersion: 'v4.0-Executed',
    proposalTemplate: 'metro_executive',
    paymentMilestones: [
      { id: 'm-del-1', milestone: 'Convention Hall & Hotel Atrium Deposit', percentage: 40, dueDate: '01 Nov 2026', amount: 7360000, status: 'paid' },
      { id: 'm-del-2', milestone: 'AV Staging, LED Video Walls & Stage Trusses', percentage: 40, dueDate: '15 Jan 2027', amount: 7360000, status: 'paid' },
      { id: 'm-del-3', milestone: 'Onsite Banquets, F&B Minimum Guarantee & Badging', percentage: 20, dueDate: '20 Apr 2027', amount: 3680000, status: 'due' }
    ],
    clientSignOff: {
      clientSignerName: 'Rtn. Sudhir Mathur',
      clientSignerDesignation: 'District Governor, Rotary District 3011',
      signedAt: '2026-11-04 11:15 IST',
      isSigned: true,
      digitalSealRef: 'ROTARY-3011-SEAL-1002'
    },
    
    inclusions: [
      'Full convention facility buy-out at Grand Ballroom Aerocity (Capacity 600 pax with staging)',
      '2 Nights 5-Star accommodations at Pullman & Novotel Aerocity (Twin sharing for delegates, Single suites for Governors)',
      'Plenary AV package: Triple 30x10ft LED Video Walls, multi-camera live broadcast, wireless interpretation headsets',
      'Presidential Fellowship Gala Banquet with 8 live international culinary stations',
      '10x 45-Seater Electric luxury shuttle coaches running continuous loops between Aerocity hotels & IGI T3',
      'High-speed encrypted digital registration kiosks with instant RFID badge printing',
      'Complete conference stationery, commemorative District 3011 brass pin, and eco-friendly delegate satchel',
      'Dedicated Exhibition Hall with 35 Humanitarian Project booths and charity silent auction podium'
    ],
    exclusions: [
      'Spouses and accompanying minors not registered under District Guest Pass',
      'Early hotel check-in prior to 11:00 AM without advance day charge',
      'Private car rentals and sightseeing excursions outside Aerocity transit hub',
      'Alcoholic drinks beyond Presidential Fellowship dinner toast',
      'Personal hotel room laundry and telephone trunk calls'
    ],

    hotelOptions: [
      {
        id: 'hotel-pullman-delhi',
        name: 'Pullman New Delhi Aerocity',
        category: '5-Star Upscale International',
        location: 'Asset 2, Hospitality District, Aerocity, New Delhi',
        roomTypes: ['Deluxe King', 'Superior Twin Room', 'Executive Suite'],
        costPerNightPerPax: 14500,
        totalRoomsBlocked: 160,
        rating: 4.8,
        amenities: ['Grand Peacock Ballroom', 'Underground Metro Link', 'Spa & Pool', 'Direct Airport Access'],
        selected: true
      },
      {
        id: 'hotel-novotel-delhi',
        name: 'Novotel New Delhi Aerocity',
        category: '5-Star Business Premium',
        location: 'Adjacent to Pullman Aerocity',
        roomTypes: ['Superior King', 'Standard Twin'],
        costPerNightPerPax: 11500,
        totalRoomsBlocked: 120,
        rating: 4.7,
        amenities: ['Co-Working Atrium', 'Fitness Center', 'Quick Buffet Resto'],
        selected: true
      }
    ],

    travelOptions: [
      {
        id: 'travel-delhi-shuttle',
        type: 'luxury_coach',
        operator: 'Delhi Metro Express & EV Fleet (10x Green Transit Coaches)',
        route: 'IGI Airport T3 / T2 / New Delhi Rly Stn ➔ Aerocity Convention Center',
        departureTime: 'Every 15 minutes continuous loop',
        arrivalTime: '10 min transit',
        capacity: 450,
        costPerPax: 1800,
        includedLuggage: 'Luggage Porter Assistance at Aerocity Portal',
        selected: true
      },
      {
        id: 'travel-domestic-block',
        type: 'commercial_flight',
        operator: 'Air India / IndiGo National Group Block',
        route: 'Major Metros (BOM, BLR, CCU, HYD, MAA) ➔ DEL (Terminal 3)',
        departureTime: '14 Apr, Various morning arrivals',
        arrivalTime: '14 Apr, Before 12:00 PM',
        capacity: 250,
        costPerPax: 12500,
        includedLuggage: '15kg Check-in + 7kg Cabin',
        selected: true
      }
    ],

    itinerary: [
      {
        id: 'itin-del-1',
        dayNumber: 1,
        date: '14 Apr 2027',
        time: '10:00 - 13:00',
        title: 'RFID Registration & Fellowship Expo Opening',
        description: 'Instant badge printing at smart kiosks, inauguration of 35 humanitarian service project booths.',
        location: 'Aerocity Convention Grand Foyer',
        type: 'conference',
        dressCode: 'Rotary Blazer / Formal'
      },
      {
        id: 'itin-del-2',
        dayNumber: 1,
        date: '14 Apr 2027',
        time: '14:30 - 18:30',
        title: 'Plenary Session I: Rotary Connects The World',
        description: 'Keynotes by District Governor, presentation of community impact milestones and Polio eradication fund report.',
        location: 'Peacock Plenary Auditorium',
        type: 'conference',
        dressCode: 'Formal Business',
        speakerOrLead: 'Rtn. Sudhir Mathur & Guest Dignitaries'
      },
      {
        id: 'itin-del-3',
        dayNumber: 1,
        date: '14 Apr 2027',
        time: '19:30 - 23:00',
        title: 'Governors Grand Fellowship Banquet',
        description: 'Celebratory evening with symphony orchestra, induction of new Paul Harris Fellows, multi-cuisine gourmet spread.',
        location: 'Grand Ballroom & Courtyard',
        type: 'gala',
        dressCode: 'Black Tie / Formal Evening Wear'
      },
      {
        id: 'itin-del-4',
        dayNumber: 2,
        date: '15 Apr 2027',
        time: '09:00 - 12:30',
        title: 'Youth Leadership & Rotary Peace Fellowships',
        description: 'Panels featuring Rotaract leaders, environmental clean water initiatives, and global grant project pitches.',
        location: 'Peacock Plenary Auditorium',
        type: 'conference',
        dressCode: 'Business Smart'
      },
      {
        id: 'itin-del-5',
        dayNumber: 2,
        date: '15 Apr 2027',
        time: '14:00 - 17:30',
        title: 'District Council Legislative Session',
        description: 'Voting on regional resolutions, district finances review, and election of incoming District Governor.',
        location: 'Hall B (Delegate Voting Chamber)',
        type: 'conference',
        dressCode: 'Formal Business'
      },
      {
        id: 'itin-del-6',
        dayNumber: 2,
        date: '15 Apr 2027',
        time: '19:00 - 23:00',
        title: 'Rockin Fellowship & Musical Night',
        description: 'Unwind with musical performances by Bollywood brass ensemble, charity auction, and dinner dance.',
        location: 'Open Skies Aerocity Pavilion',
        type: 'gala',
        dressCode: 'Celebratory Festive'
      },
      {
        id: 'itin-del-7',
        dayNumber: 3,
        date: '16 Apr 2027',
        time: '09:30 - 12:00',
        title: 'Valedictory Assembly & Passing of The Collar',
        description: 'Awards for Best Club, passing of governor collar, and farewell fellowship luncheon.',
        location: 'Peacock Plenary Auditorium',
        type: 'conference',
        dressCode: 'Club Colors / Smart Casual'
      }
    ],

    attendees: [
      {
        id: 'att-del-1',
        name: 'Rtn. Anil Khosla',
        email: 'akhosla@rotarydelhisouth.org',
        phone: '+91 98100 78201',
        organization: 'Rotary Club of Delhi South',
        designation: 'Past District Governor (PHF+8)',
        city: 'New Delhi',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Pullman Executive Suite 601',
        flightStatus: 'Local Arrival via EV Shuttle',
        dietaryPreference: 'Vegetarian',
        docStatus: 'verified',
        passportOrIdNumber: 'Aadhaar: **** 4491',
        checkedIn: true
      },
      {
        id: 'att-del-2',
        name: 'Rtn. Sunita Nambiar',
        email: 'sunita@rotarybangalore.org',
        phone: '+91 98450 19283',
        organization: 'Rotary Club of Bangalore Midtown',
        designation: 'Club President',
        city: 'Bengaluru',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Novotel Superior 304 (Twin)',
        flightStatus: 'IndiGo 6E-201 Arr 14 Apr 08:30 AM',
        dietaryPreference: 'Non-Vegetarian',
        docStatus: 'verified',
        passportOrIdNumber: 'Aadhaar: **** 7120',
        checkedIn: true
      },
      {
        id: 'att-del-3',
        name: 'Rtn. Harish Chandra Bhasin',
        email: 'hbhasin@rotarychandigarh.org',
        phone: '+91 98150 67329',
        organization: 'Rotary Club of Chandigarh Central',
        designation: 'District Director Foundation',
        city: 'Chandigarh',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Pullman Deluxe 412 (Twin)',
        flightStatus: 'Vande Bharat Express Arr 14 Apr 09:10 AM',
        dietaryPreference: 'Vegetarian',
        docStatus: 'verified',
        passportOrIdNumber: 'Aadhaar: **** 9012',
        checkedIn: false
      },
      {
        id: 'att-del-4',
        name: 'Rtn. Tarun Sethi',
        email: 't.sethi@rotaryjaipur.org',
        phone: '+91 94140 22390',
        organization: 'Rotary Club of Jaipur Royal',
        designation: 'Assistant Governor Zone 4',
        city: 'Jaipur',
        rsvpStatus: 'pending',
        roomAllocation: 'Unassigned',
        flightStatus: 'Road Travel self-drive',
        dietaryPreference: 'Jain',
        docStatus: 'pending_review',
        checkedIn: false
      },
      {
        id: 'att-del-5',
        name: 'Rtn. Sarah Jenkins',
        email: 'sarah.j@rotary-uk.org',
        phone: '+44 7700 900142',
        organization: 'Rotary Club of London Westminster',
        designation: 'Global Grant Officer (UK)',
        city: 'London',
        rsvpStatus: 'confirmed',
        roomAllocation: 'Pullman Deluxe 520 (Single)',
        flightStatus: 'British Airways BA-143 Arr 13 Apr 23:45',
        dietaryPreference: 'Gluten-Free',
        docStatus: 'verified',
        passportOrIdNumber: 'Passport: 94810231 (UK)',
        visaStatus: 'Indian eTourist Visa Confirmed',
        checkedIn: true
      }
    ],

    notifications: [
      {
        id: 'notif-del-1',
        title: 'Digital Badge RFID Express Line Open',
        message: 'Kiosks 1 to 8 at Grand Foyer are ready. Present your digital QR pass from the mobile portal for 5-second check-in.',
        targetAudience: 'confirmed_only',
        channels: ['push', 'whatsapp'],
        sentAt: '14 Apr 2027, 09:30 AM',
        deliveredCount: 388,
        openRate: '94%'
      }
    ],

    venueZones: [
      {
        id: 'v-del-1',
        name: 'Peacock Plenary Grand Hall',
        type: 'hall',
        capacity: 500,
        currentOccupancy: 365,
        currentAgenda: 'Keynote & Community Impact Milestones',
        coords: { x: 45, y: 38 },
        wifiSsid: 'Rotary3011_ConventionUltra',
        avSetup: 'Triple 30x10ft LED Video Walls, Shure Axient Digital Mics'
      },
      {
        id: 'v-del-2',
        name: 'Exhibition & Service Project Arena',
        type: 'outdoor',
        capacity: 300,
        currentOccupancy: 140,
        currentAgenda: 'Humanitarian Stalls & Charity Auction Viewing',
        coords: { x: 20, y: 65 },
        wifiSsid: 'Rotary_Expo_Zone',
        avSetup: 'Directional Ceiling Speakers, Digital Stall Signage'
      },
      {
        id: 'v-del-3',
        name: 'Council Legislative Chamber (Hall B)',
        type: 'breakout',
        capacity: 120,
        currentOccupancy: 0,
        currentAgenda: 'Setup for Resolutions & Voting Session',
        coords: { x: 78, y: 35 },
        wifiSsid: 'Rotary_Legislative_Secure',
        avSetup: 'Electronic Voting Push-button Terminals'
      },
      {
        id: 'v-del-4',
        name: 'Governors Grand Ballroom',
        type: 'dining',
        capacity: 450,
        currentOccupancy: 0,
        currentAgenda: 'Gala Dinner & Musical Night Stage Staging',
        coords: { x: 65, y: 72 },
        wifiSsid: 'Pullman_Ballroom_Guest',
        avSetup: 'Moving Head Stage Trusses, Full Audio Rig'
      }
    ],

    budgetForecast: {
      baseCostPerPax: 46000,
      flightEstimate: 5000000,
      hotelEstimate: 7200000,
      fnbEstimate: 3600000,
      avAndGalaEstimate: 2600000,
      contingencyBufferPercent: 4.0,
      currencyDriftPercent: 0,
      predictedPaxVariance: 5.0
    }
  }
];
