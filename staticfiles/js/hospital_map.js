// Variable Declarations
let map;
let marker;
let fullResults = [];

// Treatment Data
const treatmentData = {
  "eye surgery": [
    { state: "Delhi", city: "Dwarka", name: "Artemis Hospital", cost: "60,000" },
    { state: "Delhi", city: "New Delhi", name: "Max Smart Super Speciality Hospital", cost: "55,000" },
    { state: "Delhi", city: "New Delhi", name: "Fortis Flt. Lt. Rajan Dhall Hospital", cost: "40,000" },
    { state: "Maharashtra", city: "Mumbai", name: "Shroff Eye Hospital", cost: "65,000" },
    { state: "Maharashtra", city: "Pune", name: "National Institute of Ophthalmology", cost: "45,000" },
    { state: "Karnataka", city: "Bangalore", name: "Narayana Nethralaya", cost: "50,000" },
    { state: "Karnataka", city: "Bangalore", name: "Vasan Eye Care", cost: "35,000" },
    { state: "Tamil Nadu", city: "Chennai", name: "Sankara Nethralaya", cost: "55,000" },
    { state: "Tamil Nadu", city: "Madurai", name: "Aravind Eye Hospital", cost: "25,000" },
    { state: "West Bengal", city: "Kolkata", name: "Disha Eye Hospitals", cost: "30,000" },
    { state: "West Bengal", city: "Kolkata", name: "Netralayam", cost: "22,000" },
    { state: "Rajasthan", city: "Jaipur", name: "Dr. Agarwal's Eye Hospital", cost: "28,000" },
    { state: "Gujarat", city: "Ahmedabad", name: "Raghudeep Eye Hospital", cost: "32,000" },
    { state: "Punjab", city: "Ludhiana", name: "Grewal Eye Institute", cost: "20,000" },
    { state: "Haryana", city: "Gurgaon", name: "Spectra Eye Hospital", cost: "38,000" },
    { state: "Kerala", city: "Kochi", name: "Little Flower Hospital", cost: "18,000" },
    { state: "Telangana", city: "Hyderabad", name: "LV Prasad Eye Institute", cost: "48,000" },
    { state: "Andhra Pradesh", city: "Vijayawada", name: "Vasan Eye Care", cost: "15,000" },
    { state: "Assam", city: "Guwahati", name: "Sri Sankaradeva Nethralaya", cost: "20,000" },
    { state: "Bihar", city: "Patna", name: "Akash Eye Hospital", cost: "12,000" }
  ],
  "cardiology": [
    { state: "Delhi", city: "Dwarka", name: "Artemis Hospital", cost: "4,50,000" },
    { state: "Delhi", city: "New Delhi", name: "Max Smart Super Speciality Hospital", cost: "4,00,000" },
    { state: "Delhi", city: "New Delhi", name: "Fortis Flt. Lt. Rajan Dhall Hospital", cost: "3,50,000" },
    { state: "Maharashtra", city: "Mumbai", name: "Asian Heart Institute", cost: "5,00,000" },
    { state: "Maharashtra", city: "Pune", name: "Jehangir Hospital", cost: "3,80,000" },
    { state: "Karnataka", city: "Bangalore", name: "Narayana Hrudayalaya", cost: "3,60,000" },
    { state: "Karnataka", city: "Bangalore", name: "Fortis Hospital", cost: "3,20,000" },
    { state: "Tamil Nadu", city: "Chennai", name: "Apollo Hospital", cost: "4,20,000" },
    { state: "Tamil Nadu", city: "Madurai", name: "Meenakshi Mission Hospital", cost: "2,50,000" },
    { state: "West Bengal", city: "Kolkata", name: "Rabindranath Tagore International Institute of Cardiac Sciences", cost: "3,00,000" },
    { state: "West Bengal", city: "Kolkata", name: "BM Birla Heart Research Centre", cost: "2,70,000" },
    { state: "Rajasthan", city: "Jaipur", name: "Eternal Heart Care Centre", cost: "2,20,000" },
    { state: "Gujarat", city: "Ahmedabad", name: "U N Mehta Institute of Cardiology", cost: "2,30,000" },
    { state: "Punjab", city: "Amritsar", name: "Amandeep Hospital", cost: "1,80,000" },
    { state: "Haryana", city: "Gurgaon", name: "Medanta - The Medicity", cost: "4,10,000" },
    { state: "Kerala", city: "Kochi", name: "Amrita Institute of Medical Sciences", cost: "2,90,000" },
    { state: "Telangana", city: "Hyderabad", name: "Care Hospitals", cost: "3,10,000" },
    { state: "Andhra Pradesh", city: "Vijayawada", name: "Andhra Hospitals", cost: "1,40,000" },
    { state: "Assam", city: "Guwahati", name: "GNRC Institute of Medical Science", cost: "75,000" },
    { state: "Bihar", city: "Patna", name: "Ford Hospital & Research Centre", cost: "50,000" }
  ],
  "orthopedic": [
    { state: "Delhi", city: "New Delhi", name: "Fortis Flt. Lt. Rajan Dhall Hospital", cost: "2,20,000" },
    { state: "Delhi", city: "Dwarka", name: "Manipal Hospital", cost: "2,60,000" },
    { state: "Maharashtra", city: "Mumbai", name: "Kokilaben Dhirubhai Ambani Hospital", cost: "3,20,000" },
    { state: "Maharashtra", city: "Pune", name: "Ruby Hall Clinic", cost: "2,70,000" },
    { state: "Karnataka", city: "Bangalore", name: "Apollo Hospital", cost: "2,60,000" },
    { state: "Karnataka", city: "Bangalore", name: "Hosmat Hospital", cost: "2,10,000" },
    { state: "Tamil Nadu", city: "Chennai", name: "MIOT International", cost: "2,40,000" },
    { state: "Tamil Nadu", city: "Coimbatore", name: "Ganga Hospital", cost: "1,80,000" },
    { state: "West Bengal", city: "Kolkata", name: "AMRI Hospital", cost: "2,10,000" },
    { state: "West Bengal", city: "Kolkata", name: "Fortis Hospital", cost: "2,00,000" },
    { state: "Rajasthan", city: "Jaipur", name: "SMS Hospital", cost: "1,50,000" },
    { state: "Rajasthan", city: "Udaipur", name: "GBH American Hospital", cost: "1,20,000" },
    { state: "Gujarat", city: "Ahmedabad", name: "CIMS Hospital", cost: "2,50,000" },
    { state: "Gujarat", city: "Surat", name: "Kiran Hospital", cost: "1,90,000" },
    { state: "Punjab", city: "Ludhiana", name: "Dayanand Medical College", cost: "1,60,000" },
    { state: "Haryana", city: "Gurgaon", name: "Medanta - The Medicity", cost: "2,80,000" },
    { state: "Kerala", city: "Kochi", name: "Aster Medcity", cost: "1,90,000" },
    { state: "Telangana", city: "Hyderabad", name: "Yashoda Hospitals", cost: "2,20,000" },
    { state: "Andhra Pradesh", city: "Vijayawada", name: "Ramesh Hospitals", cost: "1,50,000" },
    { state: "Assam", city: "Guwahati", name: "Hayat Hospital", cost: "90,000" }
  ],
  "maternity": [
    { state: "Delhi", city: "New Delhi", name: "Cloudnine Hospital", cost: "90,000" },
    { state: "Delhi", city: "New Delhi", name: "Apollo Cradle", cost: "1,10,000" },
    { state: "Maharashtra", city: "Mumbai", name: "Hinduja Hospital", cost: "1,20,000" },
    { state: "Maharashtra", city: "Pune", name: "Columbia Asia Hospital", cost: "95,000" },
    { state: "Karnataka", city: "Bangalore", name: "Motherhood Hospital", cost: "80,000" },
    { state: "Karnataka", city: "Bangalore", name: "Cloudnine Hospital", cost: "1,00,000" },
    { state: "Tamil Nadu", city: "Chennai", name: "Apollo Women's Hospital", cost: "1,05,000" },
    { state: "Tamil Nadu", city: "Coimbatore", name: "Ganga Women's Hospital", cost: "75,000" },
    { state: "West Bengal", city: "Kolkata", name: "Bhagirathi Neotia Hospital", cost: "85,000" },
    { state: "West Bengal", city: "Kolkata", name: "Woodlands Hospital", cost: "1,00,000" },
    { state: "Rajasthan", city: "Jaipur", name: "CK Birla Hospitals", cost: "80,000" },
    { state: "Gujarat", city: "Ahmedabad", name: "Zydus Hospital", cost: "90,000" },
    { state: "Punjab", city: "Ludhiana", name: "SPS Hospitals", cost: "70,000" },
    { state: "Haryana", city: "Gurgaon", name: "Fortis Memorial Research Institute", cost: "1,20,000" },
    { state: "Kerala", city: "Kochi", name: "Aster Medcity", cost: "85,000" },
    { state: "Telangana", city: "Hyderabad", name: "Fernandez Hospital", cost: "95,000" },
    { state: "Andhra Pradesh", city: "Vijayawada", name: "Rainbow Children's Hospital", cost: "80,000" },
    { state: "Assam", city: "Guwahati", name: "Nemcare Hospital", cost: "65,000" },
    { state: "Bihar", city: "Patna", name: "Paras HMRI Hospital", cost: "60,000" },
    { state: "Odisha", city: "Bhubaneswar", name: "Apollo Hospitals", cost: "90,000" }
  ],
  "dental": [
    { state: "Delhi", city: "New Delhi", name: "Clove Dental", cost: "15,000" },
    { state: "Delhi", city: "New Delhi", name: "Axiss Dental", cost: "12,000" },
    { state: "Maharashtra", city: "Mumbai", name: "32 Smiles Dental Clinic", cost: "13,000" },
    { state: "Maharashtra", city: "Pune", name: "Sabka Dentist", cost: "10,000" },
    { state: "Karnataka", city: "Bangalore", name: "Smile Dental Clinic", cost: "11,000" },
    { state: "Karnataka", city: "Bangalore", name: "Apollo White Dental", cost: "14,000" },
    { state: "Tamil Nadu", city: "Chennai", name: "Apollo White Dental", cost: "18,000" },
    { state: "Tamil Nadu", city: "Coimbatore", name: "Vasan Dental Care", cost: "9,000" },
    { state: "West Bengal", city: "Kolkata", name: "Mission Smile Dental Centre", cost: "10,000" },
    { state: "Rajasthan", city: "Jaipur", name: "Jaipur Dental Hospital", cost: "8,000" },
    { state: "Gujarat", city: "Ahmedabad", name: "Smile Dental Clinic", cost: "13,000" },
    { state: "Punjab", city: "Ludhiana", name: "Dr. Bhullar's Dental Clinic", cost: "7,000" },
    { state: "Haryana", city: "Gurgaon", name: "32 Dental Solutions", cost: "12,000" },
    { state: "Kerala", city: "Kochi", name: "Facets Dental Clinic", cost: "9,000" },
    { state: "Telangana", city: "Hyderabad", name: "FMS Dental Hospital", cost: "16,000" },
    { state: "Andhra Pradesh", city: "Vijayawada", name: "Vijay Multispeciality Dental Hospital", cost: "8,000" },
    { state: "Assam", city: "Guwahati", name: "Smile Care Dental Clinic", cost: "6,000" },
    { state: "Bihar", city: "Patna", name: "Patna Dental Clinic", cost: "7,500" },
    { state: "Odisha", city: "Bhubaneswar", name: "Kalinga Dental Clinic", cost: "8,500" },
    { state: "Chhattisgarh", city: "Raipur", name: "Raipur Dental Hospital", cost: "9,000" }
  ],
  "ent": [
    { state: "Delhi", city: "New Delhi", name: "Sir Ganga Ram Hospital", cost: "30,000" },
    { state: "Delhi", city: "New Delhi", name: "BLK Super Speciality Hospital", cost: "32,000" },
    { state: "Maharashtra", city: "Mumbai", name: "Nanavati Super Speciality Hospital", cost: "28,000" },
    { state: "Maharashtra", city: "Pune", name: "Sahyadri Hospital", cost: "25,000" },
    { state: "Karnataka", city: "Bangalore", name: "Manipal Hospital", cost: "28,000" },
    { state: "Karnataka", city: "Bangalore", name: "Apollo Hospital", cost: "27,000" },
    { state: "Tamil Nadu", city: "Chennai", name: "Apollo Hospital", cost: "30,000" },
    { state: "Tamil Nadu", city: "Coimbatore", name: "KG Hospital", cost: "22,000" },
    { state: "West Bengal", city: "Kolkata", name: "AMRI Hospital", cost: "25,000" },
    { state: "Rajasthan", city: "Jaipur", name: "Fortis Escorts Hospital", cost: "21,000" },
    { state: "Gujarat", city: "Ahmedabad", name: "Shalby Hospital", cost: "24,000" },
    { state: "Punjab", city: "Ludhiana", name: "Dayanand Medical College", cost: "18,000" },
    { state: "Haryana", city: "Gurgaon", name: "Medanta - The Medicity", cost: "29,000" },
    { state: "Kerala", city: "Kochi", name: "Aster Medcity", cost: "20,000" },
    { state: "Telangana", city: "Hyderabad", name: "Yashoda Hospitals", cost: "26,000" },
    { state: "Andhra Pradesh", city: "Vijayawada", name: "Ramesh Hospitals", cost: "19,000" },
    { state: "Assam", city: "Guwahati", name: "Nemcare Hospital", cost: "15,000" },
    { state: "Bihar", city: "Patna", name: "Paras HMRI Hospital", cost: "17,000" },
    { state: "Odisha", city: "Bhubaneswar", name: "KIMS Hospital", cost: "16,000" },
    { state: "Chhattisgarh", city: "Raipur", name: "Ramkrishna Care Hospital", cost: "18,000" }
  ],
  "neurology": [
    { state: "Delhi", city: "New Delhi", name: "AIIMS", cost: "2,50,000" },
    { state: "Delhi", city: "New Delhi", name: "Max Super Speciality Hospital", cost: "2,80,000" },
    { state: "Maharashtra", city: "Mumbai", name: "Jaslok Hospital", cost: "2,80,000" },
    { state: "Maharashtra", city: "Pune", name: "Ruby Hall Clinic", cost: "2,20,000" },
    { state: "Karnataka", city: "Bangalore", name: "NIMHANS", cost: "1,90,000" },
    { state: "Karnataka", city: "Bangalore", name: "Manipal Hospital", cost: "2,10,000" },
    { state: "Tamil Nadu", city: "Chennai", name: "Apollo Hospital", cost: "2,50,000" },
    { state: "Tamil Nadu", city: "Coimbatore", name: "Ganga Hospital", cost: "1,80,000" },
    { state: "West Bengal", city: "Kolkata", name: "AMRI Hospital", cost: "2,10,000" },
    { state: "Rajasthan", city: "Jaipur", name: "SMS Hospital", cost: "1,50,000" },
    { state: "Gujarat", city: "Ahmedabad", name: "CIMS Hospital", cost: "2,50,000" },
    { state: "Punjab", city: "Ludhiana", name: "Dayanand Medical College", cost: "1,60,000" },
    { state: "Haryana", city: "Gurgaon", name: "Medanta - The Medicity", cost: "2,80,000" },
    { state: "Kerala", city: "Kochi", name: "Aster Medcity", cost: "1,90,000" },
    { state: "Telangana", city: "Hyderabad", name: "Yashoda Hospitals", cost: "2,20,000" },
    { state: "Andhra Pradesh", city: "Vijayawada", name: "Ramesh Hospitals", cost: "1,50,000" },
    { state: "Assam", city: "Guwahati", name: "Hayat Hospital", cost: "90,000" },
    { state: "Bihar", city: "Patna", name: "Paras HMRI Hospital", cost: "1,10,000" },
    { state: "Odisha", city: "Bhubaneswar", name: "KIMS Hospital", cost: "1,30,000" },
    { state: "Chhattisgarh", city: "Raipur", name: "Ramkrishna Care Hospital", cost: "1,20,000" }
  ],
  "others (basic daily life treatment)": [
    { state: "Delhi", city: "New Delhi", name: "Apollo Clinic", cost: "2,000" },
    { state: "Delhi", city: "New Delhi", name: "Max Healthcare", cost: "2,500" },
    { state: "Maharashtra", city: "Mumbai", name: "Healthspring Family Clinic", cost: "2,500" },
    { state: "Maharashtra", city: "Pune", name: "Columbia Asia Clinic", cost: "2,200" },
    { state: "Karnataka", city: "Bangalore", name: "Columbia Asia Clinic", cost: "2,200" },
    { state: "Karnataka", city: "Bangalore", name: "Apollo Clinic", cost: "2,300" },
    { state: "Tamil Nadu", city: "Chennai", name: "Apollo Clinic", cost: "2,100" },
    { state: "West Bengal", city: "Kolkata", name: "Apollo Clinic", cost: "2,000" },
    { state: "Rajasthan", city: "Jaipur", name: "Fortis Escorts Hospital", cost: "2,300" },
    { state: "Gujarat", city: "Ahmedabad", name: "Apollo Clinic", cost: "2,100" },
    { state: "Punjab", city: "Ludhiana", name: "SPS Hospitals", cost: "2,400" },
    { state: "Haryana", city: "Gurgaon", name: "Medanta Clinic", cost: "2,600" },
    { state: "Kerala", city: "Kochi", name: "Aster Clinic", cost: "2,100" },
    { state: "Telangana", city: "Hyderabad", name: "Apollo Clinic", cost: "2,200" },
    { state: "Andhra Pradesh", city: "Vijayawada", name: "Ramesh Hospitals", cost: "2,000" },
    { state: "Assam", city: "Guwahati", name: "Nemcare Hospital", cost: "1,800" },
    { state: "Bihar", city: "Patna", name: "Paras HMRI Hospital", cost: "1,900" },
    { state: "Odisha", city: "Bhubaneswar", name: "Apollo Clinic", cost: "2,100" },
    { state: "Chhattisgarh", city: "Raipur", name: "Ramkrishna Care Hospital", cost: "2,000" },
    { state: "Jharkhand", city: "Ranchi", name: "Medanta Clinic", cost: "2,200" }
  ]
};


// Synonyms for city/state matching
const synonyms = {
  delhi: ["delhi", "new delhi", "dwarka"],
  mumbai: ["mumbai", "bombay", "maharashtra"],
  pune: ["pune", "maharashtra"],
  bangalore: ["bangalore", "bengaluru", "karnataka"],
  chennai: ["chennai", "madras", "tamil nadu", "tamilnadu"],
  coimbatore: ["coimbatore", "tamil nadu", "tamilnadu"],
  madurai: ["madurai", "tamil nadu", "tamilnadu"],
  kolkata: ["kolkata", "calcutta", "west bengal", "westbengal"],
  jaipur: ["jaipur", "rajasthan"],
  udaipur: ["udaipur", "rajasthan"],
  ahmedabad: ["ahmedabad", "gujarat"],
  surat: ["surat", "gujarat"],
  ludhiana: ["ludhiana", "punjab"],
  amritsar: ["amritsar", "punjab"],
  gurgaon: ["gurgaon", "gurugram", "haryana"],
  kochi: ["kochi", "cochin", "kerala"],
  hyderabad: ["hyderabad", "secunderabad", "telangana"],
  vijayawada: ["vijayawada", "andhra pradesh", "andhrapradesh"],
  guwahati: ["guwahati", "assam"],
  patna: ["patna", "bihar"],
  bhubaneswar: ["bhubaneswar", "odisha", "orissa"],
  raipur: ["raipur", "chhattisgarh"],
  ranchi: ["ranchi", "jharkhand"]
};
const cityCoordinates = {
  // Delhi and synonyms
  "delhi": [28.679079, 77.069710],
  "new delhi": [28.63576, 77.22445],
  "dwarka": [28.6083, 77.0405],
  // Mumbai and synonyms
  "mumbai": [19.0760, 72.8777],
  "bombay": [19.0760, 72.8777],
  "maharashtra": [19.663280, 75.300293],
  // Pune and synonyms
  "pune": [18.5204, 73.8567],
  // Bangalore and synonyms
  "bangalore": [12.9716, 77.5946],
  "bengaluru": [12.9716, 77.5946],
  "karnataka": [12.9716, 77.5946],
  // Chennai and synonyms
  "chennai": [13.0827, 80.2707],
  "madras": [13.0827, 80.2707],
  "tamil nadu": [11.059821, 78.387451],
  "tamilnadu": [11.059821, 78.387451],
  // Coimbatore
  "coimbatore": [11.0168, 76.9558],
  // Madurai
  "madurai": [9.9252, 78.1198],
  // Kolkata and synonyms
  "kolkata": [22.5726, 88.3639],
  "calcutta": [22.5726, 88.3639],
  "west bengal": [22.9868, 87.8550],
  "westbengal": [22.9868, 87.8550],
  // Jaipur
  "jaipur": [26.9124, 75.7873],
  // Udaipur
  "udaipur": [24.5854, 73.7125],
  // Ahmedabad and synonyms
  "ahmedabad": [23.0225, 72.5714],
  "gujarat": [22.309425, 72.136230],
  // Surat
  "surat": [21.1702, 72.8311],
  // Ludhiana
  "ludhiana": [30.900965, 75.857277],
  // Amritsar
  "amritsar": [31.6340, 74.8723],
  // Gurgaon and synonyms
  "gurgaon": [28.4595, 77.0266],
  "gurugram": [28.4595, 77.0266],
  "haryana": [29.065773, 76.040497],
  // Kochi and synonyms
  "kochi": [9.9312, 76.2673],
  "cochin": [9.9312, 76.2673],
  "kerala": [10.850516, 76.271080],
  // Hyderabad and synonyms
  "hyderabad": [17.3850, 78.4867],
  "secunderabad": [17.4399, 78.4983],
  "telangana": [17.123184, 79.208824],
  // Vijayawada and synonyms
  "vijayawada": [16.5062, 80.6480],
  "andhra pradesh": [15.9129, 79.7400],
  "andhrapradesh": [15.9129, 79.7400],
  // Guwahati and synonyms
  "guwahati": [26.1445, 91.7362],
  "assam": [26.2006, 92.9376],
  // Patna and synonyms
  "patna": [25.5941, 85.1376],
  "bihar": [25.0961, 85.3131],
  // Bhubaneswar and synonyms
  "bhubaneswar": [20.2961, 85.8245],
  "odisha": [20.9517, 85.0985],
  "orissa": [20.9517, 85.0985],
  // Raipur and synonyms
  "raipur": [21.2514, 81.6296],
  "chhattisgarh": [21.2787, 81.8661],
  // Ranchi and synonyms
  "ranchi": [23.3441, 85.3096],
  "jharkhand": [23.6102, 85.2799]
  // ...add more as needed
};




// =======================
// Main Logic
// =======================

// Helper: Calculate distance between two lat/lon points (Haversine formula)
function getDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Find nearest city in dataset to given coordinates
function findNearestCity(lat, lon, cityCoords) {
    let minDist = Infinity;
    let nearest = null;
    for (const [city, [clat, clon]] of Object.entries(cityCoords)) {
        const dist = getDistance(lat, lon, clat, clon);
        if (dist < minDist) {
            minDist = dist;
            nearest = city;
        }
    }
    return { city: nearest, distance: minDist };
}

document.addEventListener("DOMContentLoaded", function() {
  // Remove previous map if it exists (prevents "already initialized" error)
  const mapContainer = document.getElementById('map');
  if (mapContainer && mapContainer._leaflet_id) {
    mapContainer._leaflet_id = null;
  }

  // Initialize map only once
  map = L.map('map').setView([20.5937, 78.9629], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  document.getElementById("search-btn").addEventListener("click", () => {
    const address = document.getElementById("search-box").value;
    const treatment = document.getElementById("treatment").value.toLowerCase();

    if (treatmentData[treatment]) {
      showStaticTable(treatment, address);
      return;
    }

    document.getElementById("custom-table").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    if (!address) {
      alert("Please enter a location.");
      return;
    }

    geocodeAddress(address);
  });

  document.getElementById("search-btn").addEventListener("click", () => {
    const address = document.getElementById("search-box").value;
    const treatment = document.getElementById("treatment").value.toLowerCase();

    // Always update the map pin
    if (address) {
        geocodeAddress(address);
    }

    // Show static table if treatment is known
    if (treatmentData[treatment]) {
        showStaticTable(treatment, address);
        return;
    }

    document.getElementById("custom-table").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    if (!address) {
        alert("Please enter a location.");
        return;
    }

    // If treatment is not known, show dynamic hospital search (if you have it)
    // geocodeAddress(address); // Already called above
});

});

// =======================
// Geocoding with Nominatim
// =======================
function geocodeAddress(address) {
  const cityKey = address.trim().toLowerCase();
  if (cityCoordinates[cityKey]) {
    // Use static coordinates for known cities
    const [lat, lon] = cityCoordinates[cityKey];
    map.setView([lat, lon], 12);
    if (marker) {
      marker.setLatLng([lat, lon]);
    } else {
      marker = L.marker([lat, lon]).addTo(map);
    }
    marker.bindPopup(`Location: ${address}`).openPopup();
    return;
  }

  // Otherwise, use Nominatim as before, appending ", India" for clarity
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', India')}`)
    .then(response => response.json())
    .then(results => {
      if (results && results.length > 0) {
        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);
        map.setView([lat, lon], 12);

        if (marker) {
          marker.setLatLng([lat, lon]);
        } else {
          marker = L.marker([lat, lon]).addTo(map);
        }

        marker.bindPopup(`Location: ${address}`).openPopup();

        const tbody = document.querySelector("#hospital-table tbody");
        if (tbody) {
          tbody.innerHTML = "<tr><td colspan='2'>No hospital data for this search. Try a known treatment.</td></tr>";
        }
      } else {
        alert("Geocode failed: No results found. Try a more specific city or check spelling.");
      }
    })
    .catch(() => {
      alert("Geocode failed: Network error.");
    });
}

// =======================
// Static Table for Known Treatments
// =======================
function showStaticTable(treatment, locationFilter = "") {
  const tbody = document.getElementById("custom-body");
  const heading = document.getElementById("custom-heading");
  tbody.innerHTML = "";
  const filterLower = locationFilter.trim().toLowerCase();

  const terms = synonyms[filterLower] || [filterLower];
  const fullList = treatmentData[treatment] || [];

  const filtered = fullList.filter(h => {
    const city = h.city.toLowerCase();
    const state = h.state.toLowerCase();
    return terms.some(term => city.includes(term) || state.includes(term));
  });

  const displayList = (filtered.length ? filtered : fullList).sort((a, b) =>
    parseInt(b.cost.replace(/[^0-9]/g, '')) - parseInt(a.cost.replace(/[^0-9]/g, ''))
  );

  heading.textContent = `${treatment.charAt(0).toUpperCase() + treatment.slice(1)} Hospitals & Costs`;

  displayList.forEach((h, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${h.state}</td>
        <td>${h.city}</td>
        <td>${h.name}</td>
        <td>${h.cost}</td>
      </tr>
    `;
  });

  document.getElementById("custom-table").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");
}

// =======================
// Display Hospitals (for extension)
// =======================
function displayHospitals(hospitals, highlightBest = false) {
  const tbody = document.querySelector("#hospital-table tbody");
  if (!tbody) return;

  hospitals.forEach((place, index) => {
    const row = document.createElement("tr");
    const isBest = highlightBest && index === 0;
    row.className = isBest ? "best-hospital" : "";
    const bestLabel = isBest ? ' <span class="best-label">🌟 Best</span>' : "";

    row.innerHTML = `
      <td>${place.name || ""}${bestLabel}</td>
      <td>${place.vicinity || place.formatted_address || ""}</td>
    `;
    tbody.appendChild(row);
  });
}