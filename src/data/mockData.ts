// ============================================================
// VIRASAT CONNECT GLOBAL — Comprehensive Cultural Heritage Dataset
// ============================================================

export interface CulturalHeritageItem {
  id: string;
  title: string;
  localName?: string;
  country: string;
  region: 'Asia' | 'Africa' | 'Europe' | 'North America' | 'South America' | 'Oceania' | 'Antarctica';
  subregion: string;
  category: 
    | 'Monuments & Architecture'
    | 'Temples & Sacred Sites'
    | 'Festivals & Celebrations'
    | 'Music & Dance'
    | 'Traditional Arts & Crafts'
    | 'Food & Culinary Traditions'
    | 'Clothing & Textiles'
    | 'Indigenous & Living Heritage'
    | 'Languages & Literature'
    | 'Archaeological Wonders';
  period: string;
  yearEstablished?: string;
  description: string;
  significance: string;
  culturalStories: string;
  architecturalStyle?: string;
  materialsUsed?: string[];
  imageUrl: string;
  galleryImages: string[];
  isUnesco: boolean;
  unescoYear?: number;
  latitude: number;
  longitude: number;
  tags: string[];
  audioGuideUrl?: string;
  audioTranscript?: string;
  sources: { name: string; url?: string; license: string }[];
  timeline: { year: string; event: string }[];
  curatorNotes?: string;
}

export interface CountryProfile {
  code: string;
  name: string;
  nativeName: string;
  region: 'Asia' | 'Africa' | 'Europe' | 'North America' | 'South America' | 'Oceania' | 'Antarctica';
  capital: string;
  flag: string;
  languages: string[];
  culturalSummary: string;
  keyTraditions: string[];
  historicalHighlights: string[];
  unescoSitesCount: number;
  imageUrl: string;
}

export interface QuizQuestionItem {
  id: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
  type: 'multiple-choice' | 'true-false' | 'image-id' | 'match';
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  source: string;
  points: number;
}

export interface ArtisanProductItem {
  id: string;
  title: string;
  artisanName: string;
  artisanCommunity: string;
  country: string;
  category: 'Textiles' | 'Pottery' | 'Woodwork' | 'Jewelry' | 'Metalwork' | 'Painting' | 'Weaving';
  price: number;
  currency: string;
  imageUrl: string;
  description: string;
  technique: string;
  materials: string[];
  isAuthenticHandmade: boolean;
  culturalBackground: string;
  rating: number;
  stock: number;
}

export interface CulturalEventItem {
  id: string;
  title: string;
  country: string;
  cityOrRegion: string;
  type: 'Festival' | 'Ritual' | 'Exhibition' | 'Workshop' | 'Heritage Day';
  dateRange: string;
  description: string;
  significance: string;
  imageUrl: string;
  isOnline: boolean;
}

// ------------------------------------------------------------
// DATASETS
// ------------------------------------------------------------

export const HERITAGE_ITEMS: CulturalHeritageItem[] = [
  {
    id: 'taj-mahal',
    title: 'Taj Mahal',
    localName: 'ताज महल / تاج محل',
    country: 'India',
    region: 'Asia',
    subregion: 'South Asia',
    category: 'Monuments & Architecture',
    period: 'Mughal Era (1632–1653 CE)',
    yearEstablished: '1632 CE',
    description: 'An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife Mumtaz Mahal.',
    significance: 'Universally admired masterpiece of Mughal architectural synthesis, combining Indian, Persian, and Islamic artistic traditions into an ethereal monument of symmetry.',
    culturalStories: 'Legend tells of thousands of master artisans summoned from across the Islamic world, Venice, and Central Asia to inlay semi-precious stones (pietra dura / parchin kari) into translucent Makrana marble.',
    architecturalStyle: 'Mughal (Persian, Timurid, and Indian synthesis)',
    materialsUsed: ['Makrana White Marble', 'Red Sandstone', 'Lapis Lazuli', 'Turquoise', 'Carnelian', 'Jade'],
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 1983,
    latitude: 27.1751,
    longitude: 78.0421,
    tags: ['Mughal', 'Symmetry', 'Pietra Dura', 'Wonder of the World', 'Islamic Art'],
    audioTranscript: 'Welcome to the Taj Mahal. Notice the optical illusions engineered by master architect Ustad Ahmad Lahori: the minarets are tilted slightly outward to protect the central dome in case of earthquake.',
    sources: [
      { name: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/252', license: 'CC-BY-SA 3.0 IGO' },
      { name: 'Archaeological Survey of India', license: 'Government Open Data' }
    ],
    timeline: [
      { year: '1631', event: 'Death of Empress Mumtaz Mahal in Burhanpur.' },
      { year: '1632', event: 'Construction commences on the banks of the Yamuna River.' },
      { year: '1648', event: 'Main mausoleum structure completed.' },
      { year: '1653', event: 'Complex, gardens, and gateway fully finished.' },
      { year: '1983', event: 'Inscribed as a UNESCO World Heritage Site.' }
    ],
    curatorNotes: 'Conserved under Archaeological Survey of India protocols. Respectful footwear or shoe covers required inside inner sanctum.'
  },
  {
    id: 'pyramids-giza',
    title: 'Pyramids of Giza & Great Sphinx',
    localName: 'أهرامات الجيزة',
    country: 'Egypt',
    region: 'Africa',
    subregion: 'North Africa',
    category: 'Archaeological Wonders',
    period: 'Old Kingdom, Fourth Dynasty (c. 2580–2560 BCE)',
    yearEstablished: 'c. 2560 BCE',
    description: 'The monumental burial complex of Pharaohs Khufu, Khafre, and Menkaure on the Giza Plateau, guarded by the Great Sphinx. The Great Pyramid is the only surviving wonder of the ancient world.',
    significance: 'Triumph of ancient geometry, engineering, astronomy, and workforce organization, standing as the tallest man-made structure on Earth for more than 3,800 years.',
    culturalStories: 'Built not by slaves as later myths asserted, but by organized rotational civic builders who lived in dedicated worker villages with state rations and medical care.',
    architecturalStyle: 'Ancient Egyptian Monumental Stone Masonry',
    materialsUsed: ['Nummulitic Limestone', 'Tura Fine White Limestone Casing', 'Aswan Pink Granite'],
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 1979,
    latitude: 29.9792,
    longitude: 31.1342,
    tags: ['Pharaohs', 'Ancient Egypt', 'Khufu', 'Sphinx', 'Astronomical Alignment'],
    audioTranscript: 'Standing before the Great Pyramid of Khufu, you are looking at approximately 2.3 million stone blocks, each weighing on average 2.5 tons, aligned precisely to true north.',
    sources: [
      { name: 'Ministry of Tourism and Antiquities, Egypt', license: 'Public Educational Use' },
      { name: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/86', license: 'UNESCO Guidelines' }
    ],
    timeline: [
      { year: 'c. 2580 BCE', event: 'Accession of Khufu; construction begins.' },
      { year: 'c. 2560 BCE', event: 'Great Pyramid finished with polished white limestone casing.' },
      { year: 'c. 2520 BCE', event: 'Khafre completes second pyramid and the Great Sphinx.' },
      { year: '1979 CE', event: 'Inscribed on the UNESCO World Heritage List.' }
    ]
  },
  {
    id: 'machu-picchu',
    title: 'Historic Sanctuary of Machu Picchu',
    localName: 'Machu Pikchu (Quechua)',
    country: 'Peru',
    region: 'South America',
    subregion: 'Andes',
    category: 'Archaeological Wonders',
    period: 'Inca Empire (c. 1450–1572 CE)',
    yearEstablished: 'c. 1450 CE',
    description: 'An Inca citadel situated on an 8,000-foot mountain ridge in the Cusco Region. Built without mortar using ashlar masonry, harmonizing seamlessly with the cloud forest landscape.',
    significance: 'Supreme manifestation of Inca spatial planning, agricultural terracing, watershed engineering, and sacred mountain worship (Apus).',
    culturalStories: 'Believed to have served as an estate for the Inca Emperor Pachacuti and a religious pilgrimage sanctuary aligned with celestial solar solstices.',
    architecturalStyle: 'Classical Inca Ashlar (Dry-stone interlocking granite)',
    materialsUsed: ['Polished Granite', 'Vegetative Thatch (original)', 'Mountain Stone'],
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 1983,
    latitude: -13.1631,
    longitude: -72.5450,
    tags: ['Inca', 'Andean', 'Pachacuti', 'Quechua', 'Intihuatana', 'Terraces'],
    audioTranscript: 'Observe the Intihuatana stone, or the "hitching post of the sun". During the equinoxes, the sun stands directly above the pillar, casting no shadow at all.',
    sources: [
      { name: 'Instituto Nacional de Cultura del Perú', license: 'Educational Public License' },
      { name: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/274', license: 'UNESCO Guidelines' }
    ],
    timeline: [
      { year: '1450', event: 'Construction ordered under Inca Emperor Pachacuti.' },
      { year: '1572', event: 'Citadel abandoned following Spanish conquest of the Neo-Inca State.' },
      { year: '1911', event: 'Hiram Bingham brings international scientific attention to the site.' },
      { year: '1983', event: 'Designated a UNESCO Mixed Cultural and Natural Heritage Site.' }
    ]
  },
  {
    id: 'great-wall-china',
    title: 'The Great Wall of China',
    localName: '万里长城 (Wànlǐ Chángchéng)',
    country: 'China',
    region: 'Asia',
    subregion: 'East Asia',
    category: 'Monuments & Architecture',
    period: '7th Century BCE to Ming Dynasty (1368–1644 CE)',
    yearEstablished: 'c. 221 BCE (first unified under Qin)',
    description: 'A series of fortification systems built across the historical northern borders of ancient Chinese states and Imperial China as protection against nomadic steppe incursions.',
    significance: 'Spanning over 21,000 kilometers in total historical segments, it represents one of the greatest defensive military architectures and collective civil works in human history.',
    culturalStories: 'The poignant folktale of Meng Jiangnü, whose grief and tears for her husband who died during the wall construction allegedly caused a portion of the wall to collapse.',
    architecturalStyle: 'Chinese Military Fortification and Bastion Architecture',
    materialsUsed: ['Rammed Earth', 'Cut Granite', 'Kiln-fired Bricks', 'Sticky Rice Lime Mortar'],
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1549893072-4bc678117f45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 1987,
    latitude: 40.4319,
    longitude: 116.5704,
    tags: ['Ming Dynasty', 'Qin Shi Huang', 'Beacon Towers', 'Fortress', 'Silk Road'],
    audioTranscript: 'Notice how the Ming sections use sticky rice soup mixed with slaked lime for mortar—a bio-composite recipe so resilient that vegetation cannot grow through the joints.',
    sources: [
      { name: 'National Cultural Heritage Administration of China', license: 'Public Educational Data' },
      { name: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/438', license: 'UNESCO Guidelines' }
    ],
    timeline: [
      { year: '221 BCE', event: 'Emperor Qin Shi Huang connects pre-existing regional walls.' },
      { year: '1368 CE', event: 'Ming Dynasty begins stone-and-brick reconstruction.' },
      { year: '1987 CE', event: 'Listed as UNESCO World Heritage Site.' }
    ]
  },
  {
    id: 'colosseum-rome',
    title: 'The Colosseum (Flavian Amphitheatre)',
    localName: 'Colosseo / Anfiteatro Flavio',
    country: 'Italy',
    region: 'Europe',
    subregion: 'Southern Europe',
    category: 'Monuments & Architecture',
    period: 'Roman Empire (70–80 CE)',
    yearEstablished: '80 CE',
    description: 'The largest amphitheatre ever built, capable of seating 50,000 to 80,000 spectators, used for gladiatorial contests, public spectacles, and dramatic mythological reenactments.',
    significance: 'Icon of classical Roman engineering mastery, introducing superimposed arcade orders (Doric, Ionic, Corinthian), barrel vaults, and sophisticated subterranean staging (hypogeum).',
    culturalStories: 'The inaugural games staged by Emperor Titus in 80 CE lasted 100 days, during which the arena floor was even temporarily flooded to stage mock naval battles (naumachiae).',
    architecturalStyle: 'Imperial Roman Concrete and Vaulted Stone Architecture',
    materialsUsed: ['Travertine Limestone', 'Tuff Rock', 'Roman Pozzolanic Concrete', 'Brick'],
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 1980,
    latitude: 41.8902,
    longitude: 12.4922,
    tags: ['Rome', 'Gladiators', 'Flavian', 'Classical Antiquity', 'Roman Concrete'],
    audioTranscript: 'Below the wooden arena floor lay the Hypogeum: a multi-level subterranean labyrinth of cages, pulleys, and counterweight elevators that raised wild animals straight into the spectacle.',
    sources: [
      { name: 'Parco Archeologico del Colosseo', license: 'Ministry of Culture Italy Open Data' },
      { name: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/91', license: 'UNESCO Guidelines' }
    ],
    timeline: [
      { year: '70 CE', event: 'Construction initiated by Emperor Vespasian.' },
      { year: '80 CE', event: 'Inaugurated by Emperor Titus with 100 days of games.' },
      { year: '1980 CE', event: 'Historic Centre of Rome inscribed on UNESCO List.' }
    ]
  },
  {
    id: 'lalibela-churches',
    title: 'Rock-Hewn Churches of Lalibela',
    localName: 'የላሊበላ አብያተ ክርስቲያናት',
    country: 'Ethiopia',
    region: 'Africa',
    subregion: 'East Africa',
    category: 'Temples & Sacred Sites',
    period: 'Zagwe Dynasty (12th–13th Century CE)',
    yearEstablished: 'c. 1200 CE',
    description: 'Eleven medieval monolithic cave churches carved directly downward into red volcanic basalt rock in northern Ethiopia, forming an extraordinary spiritual landscape regarded as a "New Jerusalem".',
    significance: 'Living spiritual marvel and pinnacle of subterranean monolithic excavation, where worship has continued uninterrupted in Ge\'ez liturgy for over 800 years.',
    culturalStories: 'Tradition holds that King Gebre Mesqel Lalibela oversaw the excavation with the divine assistance of angels, who continued chiseling the stone throughout the nights.',
    architecturalStyle: 'Monolithic Aksumite and Zagwe Rock Architecture',
    materialsUsed: ['Living Volcanic Tuff / Basalt Rock'],
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 1978,
    latitude: 12.0319,
    longitude: 39.0411,
    tags: ['Ethiopian Orthodox', 'Monolithic', 'Bete Giyorgis', 'Ge\'ez', 'Pilgrimage'],
    audioTranscript: 'Bete Giyorgis (Church of St. George) was carved 12 meters deep into the bedrock in the shape of an equal-armed Greek cross, with drainage channels engineered to prevent flooding.',
    sources: [
      { name: 'Authority for Research and Conservation of Cultural Heritage, Ethiopia', license: 'Institutional Record' },
      { name: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/18', license: 'UNESCO Guidelines' }
    ],
    timeline: [
      { year: '1187 CE', event: 'Fall of Jerusalem to Saladin prompts King Lalibela to construct a pilgrimage sanctuary.' },
      { year: 'c. 1220 CE', event: 'Completion of 11 monolithic and semi-monolithic churches.' },
      { year: '1978 CE', event: 'Among the very first 12 sites ever inscribed on the UNESCO World Heritage List.' }
    ]
  },
  {
    id: 'japanese-tea-ceremony',
    title: 'Chadō — Japanese Tea Ceremony',
    localName: '茶道 (The Way of Tea)',
    country: 'Japan',
    region: 'Asia',
    subregion: 'East Asia',
    category: 'Indigenous & Living Heritage',
    period: 'Zen Buddhism influence codified in 16th Century CE by Sen no Rikyū',
    yearEstablished: '16th Century CE',
    description: 'A choreographic ritual of preparing and serving powdered green tea (matcha) with traditional sweets, embodying harmony, respect, purity, and tranquility (wa, kei, sei, jaku).',
    significance: 'Intangible cultural heritage synthesizing Japanese architecture (chashitsu), seasonal floral arrangements (chabana), calligraphy, ceramics (raku ware), and Zen mindfulness.',
    culturalStories: 'Sen no Rikyū introduced the concept of "Ichigo ichie" (一期一会, "one time, one meeting"), reminding participants that every gathering is unique and can never be recreated.',
    architecturalStyle: 'Sōan (rustic thatched teahouse)',
    materialsUsed: ['Bamboo Chasen (Whisk)', 'Matcha (Stone-ground Tencha)', 'Raku-ware Ceramic Bowls', 'Tatami Mats'],
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545048702-79362596CDC9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 2009,
    latitude: 35.0116,
    longitude: 135.7681,
    tags: ['Matcha', 'Zen', 'Wabi-sabi', 'Sen no Rikyu', 'Intangible Heritage'],
    audioTranscript: 'Step through the nijiriguchi, the small crawling entrance to the tea room. It was designed so even samurai lords had to leave their swords outside and kneel equally before the host.',
    sources: [
      { name: 'Urasenke & Omotesenke Traditions of Kyoto', license: 'Cultural Reference' },
      { name: 'Agency for Cultural Affairs, Japan', license: 'Open Cultural Metadata' }
    ],
    timeline: [
      { year: '1191 CE', event: 'Monk Eisai brings Zen and Rinzai tea cultivation methods to Japan.' },
      { year: '1580s CE', event: 'Sen no Rikyū perfects the wabi-style tea ceremony.' },
      { year: '2009 CE', event: 'Associated traditions recognized under UNESCO Intangible Cultural Heritage frameworks.' }
    ]
  },
  {
    id: 'kente-cloth-weaving',
    title: 'Ashanti Kente Cloth Weaving',
    localName: 'Nwentoma / Kente',
    country: 'Ghana',
    region: 'Africa',
    subregion: 'West Africa',
    category: 'Clothing & Textiles',
    period: 'Ashanti Empire (17th Century to present)',
    yearEstablished: 'c. 1650 CE',
    description: 'An intricately woven silk and cotton fabric made of interlaced cloth strips, native to the Akan people (specifically Ashanti and Ewe). Each geometric motif and colour carries profound philosophical meaning.',
    significance: 'Celebrated royal regalia symbolizing Pan-African resilience, lineage prestige, civic leadership, and democratic proverbs woven in vivid colour.',
    culturalStories: 'Legend recounts two brothers from Bonwire who learned weaving by observing the intricate web-spinning patterns of the trickster spider Ananse in the forest.',
    architecturalStyle: 'Traditional Narrow-strip Strip-loom Weaving',
    materialsUsed: ['Raw Silk Threads', 'Dyed Cotton', 'Rayon', 'Traditional Wooden Hand Loom'],
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    latitude: 6.6885,
    longitude: -1.6244,
    tags: ['Ashanti', 'Akan', 'Bonwire', 'Royal Weaving', 'Symbolism', 'Textiles'],
    audioTranscript: 'Gold represents royalty, wealth, and spiritual purity. Green symbolizes renewal and growth. Black represents maturity, intense spiritual energy, and ancestral heritage.',
    sources: [
      { name: 'National Commission on Culture, Ghana', license: 'Heritage Archive' },
      { name: 'Smithsonian Center for Folklife and Cultural Heritage', license: 'Educational Use' }
    ],
    timeline: [
      { year: 'c. 1650 CE', event: 'Development of royal kente weaving under the first Asantehene, Osei Tutu I.' },
      { year: '1957 CE', event: 'Kwame Nkrumah wears Kente at independence declaration, elevating it to Pan-African identity.' }
    ]
  },
  {
    id: 'aboriginal-rock-art-kakadu',
    title: 'Kakadu Indigenous Rock Art & Living Heritage',
    localName: 'Garrig Gunak Barlu / Kakadu',
    country: 'Australia',
    region: 'Oceania',
    subregion: 'Australasia',
    category: 'Indigenous & Living Heritage',
    period: 'Continuous tradition spanning over 50,000 to 65,000 years',
    yearEstablished: 'c. 65,000 BP',
    description: 'One of the world\'s greatest concentrations of rock art sites, created by Bininj/Mungguy Indigenous Australians. Depicts ancestral creation beings, extinct megafauna, and "X-ray" anatomical painting.',
    significance: 'Continuous cultural custody by the oldest surviving living civilization on planet Earth, intertwining the Dreamtime creation cosmologies with environmental management.',
    culturalStories: 'The rock shelter at Burrungkuy (Nourlangie) features Namarrgon, the Lightning Man, who carries stone axes on his head and knees to strike thunderclouds during the monsoon.',
    architecturalStyle: 'Natural Sandstone Escarpment Rock Shelters',
    materialsUsed: ['Natural Ochre Pigments (Red, Yellow)', 'White Clay (Pipeclay)', 'Charcoal', 'Bloodwood Resin Binder'],
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 1981,
    latitude: -12.8275,
    longitude: 132.8462,
    tags: ['Dreamtime', 'Bininj', 'Ochre', 'Lightning Man', 'Oldest Living Culture'],
    audioTranscript: 'Please walk respectfully through Ubirr and Nourlangie. Many paintings were made not merely as decorative art, but as visual encyclopedias for kinship laws and seasonal navigation.',
    sources: [
      { name: 'Kakadu National Park Board of Management', license: 'Traditional Custodians Protocol' },
      { name: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/en/list/147', license: 'UNESCO Guidelines' }
    ],
    timeline: [
      { year: '65,000 BP', event: 'Earliest human occupation confirmed at Madjedbebe rock shelter.' },
      { year: '20,000 BP', event: 'Paintings of extinct thylacine (Tasmanian tiger) and Genyornis megafauna recorded.' },
      { year: '1981 CE', event: 'Kakadu recognized as a UNESCO World Heritage Site for both cultural and natural criteria.' }
    ]
  },
  {
    id: 'scott-discovery-hut-antarctica',
    title: 'Historic Discovery Hut & Heroic Age Expedition Heritage',
    localName: 'Discovery Hut, Hut Point',
    country: 'Antarctica (Antarctic Treaty System)',
    region: 'Antarctica',
    subregion: 'Ross Island',
    category: 'Archaeological Wonders',
    period: 'Heroic Era of Antarctic Exploration (1902–1917 CE)',
    yearEstablished: '1902 CE',
    description: 'A historic prefabricated wooden hut erected in February 1902 by Captain Robert Falcon Scott during the British National Antarctic Discovery Expedition on the Ross Sea.',
    significance: 'Rare testament to early 20th-century extreme human resilience, scientific inquiry, meteorological pioneering, and the shared international heritage of Antarctica.',
    culturalStories: 'Frozen in time by polar winds and aridity, the hut retains original seal blubber stoves, vintage biscuit tins, expedition sledges, and handwritten crew inscriptions preserved inside.',
    architecturalStyle: 'Australian Prefabricated Outstation Timber Bungalow',
    materialsUsed: ['Jarrah Timber', 'Scots Pine', 'Felt Insulation', 'Corrugated Iron'],
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548695607-9c73430ba065?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: false,
    latitude: -77.8464,
    longitude: 166.6433,
    tags: ['Heroic Age', 'Scott', 'Shackleton', 'Antarctic Treaty', 'Historic Site No. 18'],
    audioTranscript: 'Under Antarctic Treaty recommendation, Discovery Hut is protected as Antarctic Specially Protected Area No. 158 and Historic Site and Monument No. 18.',
    sources: [
      { name: 'Antarctic Heritage Trust (New Zealand & UK)', license: 'Polar Heritage Protocol' },
      { name: 'Secretariat of the Antarctic Treaty', license: 'Public International Law Archive' }
    ],
    timeline: [
      { year: '1902', event: 'Discovery Hut erected on Hut Point Peninsula.' },
      { year: '1908', event: 'Ernest Shackleton utilizes the hut during the Nimrod Expedition.' },
      { year: '1972', event: 'Designated an Antarctic Historic Site and Monument under the Antarctic Treaty.' }
    ]
  },
  {
    id: 'dia-de-los-muertos',
    title: 'Día de los Muertos (Day of the Dead)',
    localName: 'Día de Muertos',
    country: 'Mexico',
    region: 'North America',
    subregion: 'Mesoamerica',
    category: 'Festivals & Celebrations',
    period: 'Pre-Hispanic Indigenous Nahua/Maya tradition fused with All Souls Day',
    yearEstablished: 'Ancient Mesoamerican roots (c. 1000 BCE)',
    description: 'A joyful multi-day celebration held each November where families welcome back the souls of deceased relatives with vibrant ofrendas (altars), marigolds (cempasúchil), and music.',
    significance: 'UNESCO Masterpiece of Oral and Intangible Heritage that reframes death not as tragic termination, but as a celebratory, recurring phase of the cosmic cycle of existence.',
    culturalStories: 'The intoxicating fragrance of cempasúchil flowers and burning copal incense is believed to guide returning spirits from Mictlán (the underworld) safely home.',
    architecturalStyle: 'Family and Community Multi-tiered Ofrenda Altars',
    materialsUsed: ['Cempasúchil (Mexican Marigold)', 'Pan de Muerto', 'Sugar Skulls (Calaveras)', 'Papel Picado', 'Copal Resin'],
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1572945753563-804956783604?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 2008,
    latitude: 19.4326,
    longitude: -99.1332,
    tags: ['Ofrenda', 'Cempasúchil', 'Calaveras', 'Nahuatl', 'Mictlan', 'Intangible Heritage'],
    audioTranscript: 'The altar contains the four sacred elements: Earth (represented by seasonal fruits and pan de muerto), Wind (fluttering tissue paper papel picado), Water (to quench thirsty souls), and Fire (votive candles).',
    sources: [
      { name: 'Instituto Nacional de Antropología e Historia (INAH)', license: 'Open Government Data Mexico' },
      { name: 'UNESCO Intangible Cultural Heritage List', license: 'UNESCO Guidelines' }
    ],
    timeline: [
      { year: 'Pre-Hispanic', event: 'Nahua month of Miccailhuitontli dedicated to the Lady of the Dead (Mictecacihuatl).' },
      { year: '16th Century', event: 'Synthesis with Catholic All Saints\' and All Souls\' Days.' },
      { year: '2008', event: 'Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.' }
    ]
  },
  {
    id: 'flamenco-andalusia',
    title: 'Flamenco — Song, Dance, and Guitar of Andalusia',
    localName: 'El Flamenco',
    country: 'Spain',
    region: 'Europe',
    subregion: 'Southern Europe',
    category: 'Music & Dance',
    period: 'Developed in 18th Century CE Andalusia',
    yearEstablished: '18th Century CE',
    description: 'A passionate, expressive artistic artform combining cante (vocal singing), baile (rhythmic percussive dance), and toque (guitar accompaniment), born of multicultural cross-pollination.',
    significance: 'Masterpiece of emotive improvisation born from the historical confluence of Romani (Gitano), Andalusian, Sephardic Jewish, Moorish, and Byzantine musical strains.',
    culturalStories: 'The concept of "Duende": the mysterious, ineffable emotional power and authenticity that overcomes an artist when performing from the deepest core of vulnerability.',
    architecturalStyle: 'Tablao Flamenco and Traditional Peñas',
    materialsUsed: ['Cypress & Spruce Flamenco Guitar', 'Castanets (Castañuelas)', 'Nail-heeled Dance Shoes', 'Cajón Drum'],
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80'
    ],
    isUnesco: true,
    unescoYear: 2010,
    latitude: 37.3891,
    longitude: -5.9845,
    tags: ['Andalusia', 'Gitano', 'Duende', 'Cante Jondo', 'Seville', 'Intangible Heritage'],
    audioTranscript: 'Listen closely to the compás (rhythmic cycle) driven by the palmas (handclapping) and the zapateado (footwork). It is a dialogue between singer and dancer where neither leads completely.',
    sources: [
      { name: 'Instituto Andaluz del Flamenco', license: 'Regional Cultural Registry' },
      { name: 'UNESCO Intangible Cultural Heritage', url: 'https://ich.unesco.org/en/RL/flamenco-00363', license: 'UNESCO Guidelines' }
    ],
    timeline: [
      { year: '1770s CE', event: 'First documented mentions of flamenco in literary and musical chronicles.' },
      { year: '1860–1910', event: 'The "Golden Age of Flamenco" in the Cafés Cantantes of Seville and Madrid.' },
      { year: '2010', event: 'Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.' }
    ]
  }
];

export const COUNTRIES: CountryProfile[] = [
  {
    code: 'IN',
    name: 'India',
    nativeName: 'भारत',
    region: 'Asia',
    capital: 'New Delhi',
    flag: '🇮🇳',
    languages: ['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', '22 Scheduled Languages'],
    culturalSummary: 'Cradle of multiple ancient philosophies, world religions, classical dance forms (Bharatanatyam, Kathak), Ayurveda, and kaleidoscopic regional textile traditions.',
    keyTraditions: ['Diwali', 'Holi', 'Classical Carnatic & Hindustani Music', 'Yoga', 'Handloom Weaving'],
    historicalHighlights: ['Indus Valley Civilization', 'Maurya & Gupta Golden Ages', 'Mughal Architecture', 'Chola Maritime Empire'],
    unescoSitesCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80'
  },
  {
    code: 'EG',
    name: 'Egypt',
    nativeName: 'مصر',
    region: 'Africa',
    capital: 'Cairo',
    flag: '🇪🇬',
    languages: ['Arabic'],
    culturalSummary: 'One of history\'s foundational civilizations along the Nile River, leaving monumental architecture, hieroglyphic literature, and rich Islamic and Coptic heritage.',
    keyTraditions: ['Ramadan Lanterns (Fanous)', 'Tanoura Dance', 'Coptic Chants', 'Traditional Perfumery'],
    historicalHighlights: ['Old, Middle & New Kingdoms', 'Alexandrian Library', 'Fatimid & Mamluk Cairo', 'Suez Canal'],
    unescoSitesCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80'
  },
  {
    code: 'PE',
    name: 'Peru',
    nativeName: 'Perú',
    region: 'South America',
    capital: 'Lima',
    flag: '🇵🇪',
    languages: ['Spanish', 'Quechua', 'Aymara'],
    culturalSummary: 'Epicenter of pre-Columbian South American civilizations—from Caral and Nazca to the Inca Empire—celebrated today for Andean textiles, gastronomy, and music.',
    keyTraditions: ['Inti Raymi', 'Marinera Dance', 'Backstrap Weaving', 'Ceviche Heritage'],
    historicalHighlights: ['Caral-Supe (Oldest in Americas)', 'Chavin & Paracas', 'Inca Tawantinsuyu', 'Vice-royalty of Peru'],
    unescoSitesCount: 13,
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80'
  },
  {
    code: 'JP',
    name: 'Japan',
    nativeName: '日本',
    region: 'Asia',
    capital: 'Tokyo',
    flag: '🇯🇵',
    languages: ['Japanese'],
    culturalSummary: 'Deep aesthetic philosophy balancing reverence for nature (Shinto, Zen) with craftsmanship (monozukuri), traditional performing arts (Kabuki, Noh), and seasonal living.',
    keyTraditions: ['Tea Ceremony (Chado)', 'Ikebana', 'Matsuri Festivals', 'Washi Papermaking'],
    historicalHighlights: ['Jomon Pottery', 'Nara & Heian Classical Periods', 'Edo Shogunate', 'Meiji Restoration'],
    unescoSitesCount: 25,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
  },
  {
    code: 'GH',
    name: 'Ghana',
    nativeName: 'Ghana',
    region: 'Africa',
    capital: 'Accra',
    flag: '🇬🇭',
    languages: ['English', 'Akan (Twi)', 'Ewe', 'Ga', 'Dagbani'],
    culturalSummary: 'The historic "Gold Coast", heartland of the Ashanti Empire renowned for its vibrant Kente weaving, Adinkra symbology, highlife music, and community chieftaincy systems.',
    keyTraditions: ['Akwasidae Festival', 'Adinkra Cloth Stamping', 'Talking Drums', 'Highlife Music'],
    historicalHighlights: ['Ancient Ghana Empire Heritage', 'Ashanti Kingdom of Kumasi', 'Transatlantic Forts & Castles', 'First Sub-Saharan Independent Nation (1957)'],
    unescoSitesCount: 2,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
  },
  {
    code: 'IT',
    name: 'Italy',
    nativeName: 'Italia',
    region: 'Europe',
    capital: 'Rome',
    flag: '🇮🇹',
    languages: ['Italian'],
    culturalSummary: 'Birthplace of the Roman Empire and the European Renaissance, boasting the highest number of UNESCO World Heritage Sites globally alongside renowned culinary arts.',
    keyTraditions: ['Opera Lyric Singing', 'Carnival of Venice', 'Tuscan Viticulture', 'Violin Making in Cremona'],
    historicalHighlights: ['Etruscan Civilization', 'Roman Republic & Empire', 'Florentine Renaissance', 'Risorgimento'],
    unescoSitesCount: 60,
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'
  },
  {
    code: 'MX',
    name: 'Mexico',
    nativeName: 'México',
    region: 'North America',
    capital: 'Mexico City',
    flag: '🇲🇽',
    languages: ['Spanish', '68 Recognized Indigenous National Languages (Nahuatl, Maya, Zapotec)'],
    culturalSummary: 'Rich tapestry of Mesoamerican civilizations (Olmec, Maya, Zapotec, Aztec) intertwining with Iberian colonial arts, world-renowned gastronomy, and living indigenous crafts.',
    keyTraditions: ['Día de Muertos', 'Mariachi Music', 'Talavera Pottery', 'Traditional Nixtamal Cuisine'],
    historicalHighlights: ['Teotihuacan', 'Classic Maya Kingdoms', 'Tenochtitlan Aztec Capital', 'Independence & Muralism'],
    unescoSitesCount: 35,
    imageUrl: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=800&q=80'
  },
  {
    code: 'AU',
    name: 'Australia',
    nativeName: 'Australia',
    region: 'Oceania',
    capital: 'Canberra',
    flag: '🇦🇺',
    languages: ['English', 'Over 250 Indigenous Australian Languages and Dialects'],
    culturalSummary: 'Custodian to the world\'s oldest continuous living cultures—Aboriginal and Torres Strait Islander peoples—with profound ecological knowledge, songlines, and art.',
    keyTraditions: ['Corroboree & Songlines', 'Didgeridoo (Yidaki)', 'Ochre Rock & Bark Painting', 'Fire-stick Farming Heritage'],
    historicalHighlights: ['65,000+ years of First Nations custody', 'Mungo Man discoveries', 'Rock art traditions', 'Post-1788 modern multicultural democracy'],
    unescoSitesCount: 20,
    imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80'
  }
];

export const QUIZ_QUESTIONS: QuizQuestionItem[] = [
  {
    id: 'q1',
    difficulty: 'Beginner',
    category: 'Monuments & Architecture',
    type: 'multiple-choice',
    question: 'In which Indian city is the iconic white marble Taj Mahal situated?',
    options: ['Jaipur', 'Agra', 'Delhi', 'Varanasi'],
    correctAnswer: 'Agra',
    explanation: 'The Taj Mahal is located in Agra, Uttar Pradesh, on the southern bank of the Yamuna River, commissioned by Mughal Emperor Shah Jahan.',
    source: 'Archaeological Survey of India',
    points: 10
  },
  {
    id: 'q2',
    difficulty: 'Beginner',
    category: 'Archaeological Wonders',
    type: 'multiple-choice',
    question: 'The Pyramids of Giza were built along which vital river in Egypt?',
    options: ['Congo River', 'Tigris River', 'Nile River', 'Euphrates River'],
    correctAnswer: 'Nile River',
    explanation: 'Ancient Egyptian civilization flourished along the Nile, which provided annual fertile silt and stone transportation routes for monument construction.',
    source: 'Ministry of Antiquities, Egypt',
    points: 10
  },
  {
    id: 'q3',
    difficulty: 'Intermediate',
    category: 'Indigenous & Living Heritage',
    type: 'multiple-choice',
    question: 'What is the Japanese aesthetic concept of finding beauty in imperfection and impermanence called?',
    options: ['Ikebana', 'Wabi-Sabi', 'Kaizen', 'Bonsai'],
    correctAnswer: 'Wabi-Sabi',
    explanation: 'Wabi-sabi (侘寂) represents the traditional Japanese view centered on the acceptance of transience and imperfection, fundamental to the Way of Tea.',
    source: 'Agency for Cultural Affairs, Japan',
    points: 15
  },
  {
    id: 'q4',
    difficulty: 'Intermediate',
    category: 'Clothing & Textiles',
    type: 'multiple-choice',
    question: 'The royal Kente cloth with its symbolic geometric patterns originated among which African people?',
    options: ['Yoruba (Nigeria)', 'Ashanti and Ewe (Ghana)', 'Zulu (South Africa)', 'Maasai (Kenya)'],
    correctAnswer: 'Ashanti and Ewe (Ghana)',
    explanation: 'Kente cloth was developed as royal regalia in the Ashanti Kingdom in present-day Ghana, with Bonwire serving as the primary historic weaving village.',
    source: 'National Museum of Ghana',
    points: 15
  },
  {
    id: 'q5',
    difficulty: 'Advanced',
    category: 'Archaeological Wonders',
    type: 'multiple-choice',
    question: 'Which method was used by the Inca to construct the walls of Machu Picchu without any mortar?',
    options: ['Baked mud bricks', 'Ashlar masonry (precision dry-stone interlocking)', 'Cast lime concrete', 'Carved monolithic caves'],
    correctAnswer: 'Ashlar masonry (precision dry-stone interlocking)',
    explanation: 'Inca architects perfected ashlar masonry where blocks of granite were shaped to fit together so precisely that not even a knife blade can pass between them.',
    source: 'UNESCO World Heritage Dossier 274',
    points: 20
  },
  {
    id: 'q6',
    difficulty: 'Expert',
    category: 'Archaeological Wonders',
    type: 'multiple-choice',
    question: 'Under the Antarctic Treaty System, what is Captain Scott\'s 1902 Discovery Hut classified as?',
    options: ['A working polar research lab', 'Antarctic Historic Site and Monument No. 18', 'A private maritime concession', 'A biological sanctuary'],
    correctAnswer: 'Antarctic Historic Site and Monument No. 18',
    explanation: 'Discovery Hut is preserved as Historic Site and Monument No. 18 and Antarctic Specially Protected Area No. 158 under international treaty protocols.',
    source: 'Secretariat of the Antarctic Treaty',
    points: 25
  }
];

export const ARTISAN_PRODUCTS: ArtisanProductItem[] = [
  {
    id: 'prod-1',
    title: 'Authentic Handwoven Asante Kente Stole',
    artisanName: 'Kofi Mensah',
    artisanCommunity: 'Bonwire Weavers Collective',
    country: 'Ghana',
    category: 'Textiles',
    price: 145,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    description: 'Masterfully woven strip by strip on traditional narrow wooden looms using premium silk and combed cotton. Pattern symbolizes "Nyame Nti" (By God\'s Grace).',
    technique: 'Traditional Ashanti narrow strip-loom double weaving',
    materials: ['Natural Silk', 'Combed Cotton Threads'],
    isAuthenticHandmade: true,
    culturalBackground: 'Woven in the heritage craft village of Bonwire, carrying ancestral certification from the local craft guild.',
    rating: 4.9,
    stock: 8
  },
  {
    id: 'prod-2',
    title: 'Parchin Kari Marble Floral Coaster Set',
    artisanName: 'Rashid Khan',
    artisanCommunity: 'Agra Inlay Guild (7th Generation)',
    country: 'India',
    category: 'Woodwork',
    price: 85,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=600&q=80',
    description: 'Translucent white Makrana marble precision-inlaid with genuine lapis lazuli, malachite, and carnelian using identical techniques found at the Taj Mahal.',
    technique: 'Pietra Dura / Parchin Kari semi-precious stone inlay',
    materials: ['Makrana Marble', 'Lapis Lazuli', 'Malachite', 'Carnelian'],
    isAuthenticHandmade: true,
    culturalBackground: 'Crafted by descendants of the royal artisans who worked on the imperial Mughal palaces in Agra.',
    rating: 5.0,
    stock: 12
  },
  {
    id: 'prod-3',
    title: 'Traditional Handcrafted Raku Matcha Bowl (Chawan)',
    artisanName: 'Kenji Takahashi',
    artisanCommunity: 'Kyoto Ceramic Heritage Kiln',
    country: 'Japan',
    category: 'Pottery',
    price: 195,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
    description: 'Formed by hand without a potter\'s wheel, wood-fired and pulled red-hot from the kiln to cool rapidly in pine shavings, creating individual crackle patterns.',
    technique: 'Hand-molded Kuro-Raku reduction firing',
    materials: ['Kyoto Natural Clay', 'Black Iron-stone Glaze'],
    isAuthenticHandmade: true,
    culturalBackground: 'Made in accordance with 400-year-old Way of Tea requirements for optimal temperature retention and ergonomic palm cradling.',
    rating: 4.9,
    stock: 5
  },
  {
    id: 'prod-4',
    title: 'Natural Dye Baby Alpaca Andean Chullo Hat',
    artisanName: 'Mama Rosa Quispe',
    artisanCommunity: 'Chinchero Weavers Cooperative',
    country: 'Peru',
    category: 'Weaving',
    price: 68,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    description: 'Spun from pure baby alpaca fleece, naturally colored with cochineal bugs (red), q\'olle flowers (yellow), and yanali bark, featuring earflaps for highland warmth.',
    technique: 'Backstrap loom hand-spinning and circular knitting',
    materials: ['100% Baby Alpaca Wool', 'Wild Botanical Botanical Dyes'],
    isAuthenticHandmade: true,
    culturalBackground: 'Woven in the Sacred Valley of the Incas using ancestral patterns passed maternally for centuries.',
    rating: 4.8,
    stock: 15
  }
];

export const CULTURAL_EVENTS: CulturalEventItem[] = [
  {
    id: 'event-1',
    title: 'Día de los Muertos Celebrations',
    country: 'Mexico',
    cityOrRegion: 'Oaxaca & Mexico City',
    type: 'Festival',
    dateRange: 'Nov 1 – Nov 2, 2026',
    description: 'Ancestral remembrance filled with illuminated candlelit cemeteries, marigold carpets, traditional comparsas (parades), and ofrendas.',
    significance: 'Celebration of love and memory spanning generations between the living and the spirit world.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  },
  {
    id: 'event-2',
    title: 'International Heritage Week & Museum Symposium',
    country: 'Worldwide',
    cityOrRegion: 'Global Virtual Hub',
    type: 'Exhibition',
    dateRange: 'May 18 – May 24, 2026',
    description: 'Virtual tours, live restoration laboratory feeds, and live interactive lectures with master curators and indigenous elders.',
    significance: 'Promoting global accessibility and equitable preservation of endangered languages and monuments.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    isOnline: true
  },
  {
    id: 'event-3',
    title: 'Kyoto Gion Matsuri Grand Procession',
    country: 'Japan',
    cityOrRegion: 'Kyoto',
    type: 'Ritual',
    dateRange: 'July 1 – July 31, 2026',
    description: 'A month-long festival originating in 869 CE featuring massive multistory wooden floats (Yamaboko) decorated with historic tapestries from across the Silk Road.',
    significance: 'Purification ceremony to appease disease deities, embodying community pride and centuries-old crafts.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    isOnline: false
  }
];

export const DAILY_FACTS = [
  {
    id: 'f1',
    title: 'Optical Marvel of the Taj',
    content: 'The four minarets framing the Taj Mahal are deliberately slanted outward by a few degrees. This ensures that in the event of an earthquake, they will fall away from the central dome.',
    country: 'India',
    category: 'Architecture'
  },
  {
    id: 'f2',
    title: 'Antarctica\'s Time Capsule',
    content: 'Inside Robert Falcon Scott\'s 1902 Discovery Hut, canned provisions, wool sweaters, and seal blubber from the Heroic Age remain preserved in sub-zero dry air for over a century.',
    country: 'Antarctica',
    category: 'Expedition Heritage'
  },
  {
    id: 'f3',
    title: 'Earthquake-Proof Inca Masonry',
    content: 'When an earthquake hits Peru, the stones of Machu Picchu dance and vibrate in place, then fall back together into their original interlocking positions without mortar.',
    country: 'Peru',
    category: 'Indigenous Engineering'
  },
  {
    id: 'f4',
    title: 'Sticky Rice Mortar',
    content: 'Scientists confirmed that Ming Dynasty builders of the Great Wall mixed boiled sticky rice with slaked lime, creating a chemical bond that resists weathering better than modern cement.',
    country: 'China',
    category: 'Ancient Innovation'
  }
];

