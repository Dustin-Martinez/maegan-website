// lib/movieData.ts

export interface Movie {
  id: number;
  title: string;
  genre: string;
  src: string; 
  coverSrc: string; 
  description: string;
  year: string;
  director: string;
  cast: string[];
  rating: string;
  duration: string;
  tags: string[];
  type: 'movie' | 'tv-show';
}


const rawMovieDataFromJSON = {
  "movieDetails": {1: {
    id: 1,
    title: "BLACK PANTHER: LONG LIVE THE KING",
    genre: "Action/Sci-Fi",
    src: "/assets/BP.jpg",
    coverSrc: "/assets/BP.jpg",
    description: "After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king — and as Black Panther — gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk.",
    year: "2022",
    director: "Ryan Coogler",
    cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
    rating: "4.8/5",
    duration: "2h 14m",
    tags: ["Superhero", "Marvel", "Adventure"]
  },
  2: {
    id: 2,
    title: "SPIDER-MAN: NO WAY HOME",
    genre: "Sci-Fi/Action",
    src: "/assets/spider man main.jpg",
    coverSrc: "/assets/spider man main.jpg",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
    year: "2021",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
    rating: "4.7/5",
    duration: "2h 28m",
    tags: ["Multiverse", "Marvel", "Teen Hero"]
  },
  3: {
    id: 3,
    title: "SMILE",
    genre: "Horror/Mystery",
    src: "/assets/smile.png",
    coverSrc: "/assets/smile.png",
    description: "After witnessing a bizarre, traumatic incident involving a patient, Dr. Rose Cotter starts experiencing frightening occurrences that she can't explain. As an overwhelming terror begins taking over her life, Rose must confront her troubling past in order to survive and escape her horrifying new reality.",
    year: "2022",
    director: "Parker Finn",
    cast: ["Sosie Bacon", "Jessie T. Usher", "Kyle Gallner"],
    rating: "4.1/5",
    duration: "1h 55m",
    tags: ["Psychological", "Supernatural", "Thriller"]
  },
  4: {
    id: 4,
    title: "SHADOW BONE",
    genre: "Fantasy/Horror",
    src: "/assets/SB.jpg",
    coverSrc: "/assets/SB.jpg",
    description: "In a world where shadows come alive, a young warrior must journey to the forbidden lands to retrieve a mythical artifact that can save her village from eternal darkness.",
    year: "2023",
    director: "Akira Yoshida",
    cast: ["Anna Sawai", "Hiroyuki Sanada", "Rinko Kikuchi"],
    rating: "4.3/5",
    duration: "2h 5m",
    tags: ["Dark Fantasy", "Supernatural", "Adventure"]
  },
  5: {
    id: 5,
    title: "US",
    genre: "Horror",
    src: "/assets/us.jpg",
    coverSrc: "/assets/us.jpg",
    description: "A family's serene beach vacation turns to chaos when their doppelgängers appear and begin to terrorize them.",
    year: "2019",
    director: "Jordan Peele",
    cast: ["Lupita Nyong'o", "Winston Duke", "Elisabeth Moss"],
    rating: "4.2/5",
    duration: "1h 56m",
    tags: ["Psychological", "Thriller", "Doppelgänger"]
  },
  6: {
    id: 6,
    title: "AVENGERS: END GAME",
    genre: "Sci-Fi/Action",
    src: "/assets/avengers.jpg",
    coverSrc: "/assets/avengers.jpg",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    year: "2019",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    rating: "4.9/5",
    duration: "3h 1m",
    tags: ["Superhero", "Marvel", "Epic"]
  },
  7: {
    id: 7,
    title: "JOHN WICK 4",
    genre: "Action/Thriller",
    src: "/assets/johnwick.jpg",
    coverSrc: "/assets/johnwick.jpg",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    year: "2023",
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    rating: "4.6/5",
    duration: "2h 49m",
    tags: ["Action", "Assassin", "Revenge"]
  },
  8: {
    id: 8,
    title: "DUNE",
    genre: "Sci-Fi/Adventure",
    src: "/assets/dune.jpg",
    coverSrc: "/assets/dune.jpg",
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    year: "2021",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    rating: "4.5/5",
    duration: "2h 35m",
    tags: ["Space Opera", "Desert Planet", "Prophecy"]
  },
  9: {
    id: 9,
    title: "THE BATMAN",
    genre: "Action/Crime",
    src: "/assets/batman.jpg",
    coverSrc: "/assets/batman.jpg",
    description: "In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while pursuing a serial killer known as the Riddler.",
    year: "2022",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    rating: "4.4/5",
    duration: "2h 56m",
    tags: ["Dark Knight", "Detective", "Noir"]
  },
  10: {
    id: 10,
    title: "TOP GUN: MAVERICK",
    genre: "Action/Drama",
    src: "/assets/topgun.jpg",
    coverSrc: "/assets/topgun.jpg",
    description: "After more than thirty years of service as one of the Navy's top aviators, Pete \"Maverick\" Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
    year: "2022",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    rating: "4.7/5",
    duration: "2h 11m",
    tags: ["Aviation", "Legacy", "Military"]
  },
  11: {
    id: 11,
    title: "BLACK ADAM",
    genre: "Action/Fantasy",
    src: "/assets/blackadam.jpg",
    coverSrc: "/assets/blackadam.jpg",
    description: "Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
    year: "2022",
    director: "Jaume Collet-Serra",
    cast: ["Dwayne Johnson", "Aldis Hodge", "Noah Centineo"],
    rating: "4.0/5",
    duration: "2h 5m",
    tags: ["Antihero", "DC Comics", "Ancient Powers"]
  },
  12: {
    id: 12,
    title: "DOCTOR STRANGE 2",
    genre: "Fantasy/Action",
    src: "/assets/doctorstrange 2.jpg",
    coverSrc: "/assets/doctorstrange 2.jpg",
    description: "Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse, including an alternate version of himself, whose threat to humanity is too great for the combined forces of Strange, Wong, and Wanda Maximoff.",
    year: "2022",
    director: "Sam Raimi",
    cast: ["Benedict Cumberbatch", "Elizabeth Olsen", "Chiwetel Ejiofor"],
    rating: "4.3/5",
    duration: "2h 6m",
    tags: ["Multiverse", "Magic", "Marvel"]
  },
  13: {
    id: 13,
    title: "JURASSIC WORLD",
    genre: "Sci-Fi/Adventure",
    src: "/assets/jurassic world.jpg",
    coverSrc: "/assets/jurassic world.jpg",
    description: "Four years after the destruction of Isla Nublar, dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history's most fearsome creatures.",
    year: "2022",
    director: "Colin Trevorrow",
    cast: ["Chris Pratt", "Bryce Dallas Howard", "Laura Dern"],
    rating: "4.2/5",
    duration: "2h 27m",
    tags: ["Dinosaurs", "Adventure", "Genetics"]
  },
  14: {
    id: 14,
    title: "THE NORTHMAN",
    genre: "Action/Adventure",
    src: "/assets/northman.png",
    coverSrc: "/assets/northman.png",
    description: "From visionary director Robert Eggers comes THE NORTHMAN, an action-filled epic that follows a young Viking prince on his quest to avenge his father's murder.",
    year: "2022",
    director: "Robert Eggers",
    cast: ["Alexander Skarsgård", "Nicole Kidman", "Claes Bang"],
    rating: "4.4/5",
    duration: "2h 17m",
    tags: ["Viking", "Revenge", "Historical"]
  },
  15: {
    id: 15,
    title: "BULLET TRAIN",
    genre: "Action/Comedy",
    src: "/assets/bullettrain.jpg",
    coverSrc: "/assets/bullettrain.jpg",
    description: "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe.",
    year: "2022",
    director: "David Leitch",
    cast: ["Brad Pitt", "Joey King", "Aaron Taylor-Johnson"],
    rating: "4.1/5",
    duration: "2h 7m",
    tags: ["Comedy", "Assassins", "Train"]
  },
  16: {
    id: 16,
    title: "NOPE",
    genre: "Horror/Sci-Fi",
    src: "/assets/nope.jpg",
    coverSrc: "/assets/nope.jpg",
    description: "The residents of a lonely gulch in inland California bear witness to an uncanny and chilling discovery.",
    year: "2022",
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Keke Palmer", "Steven Yeun"],
    rating: "4.3/5",
    duration: "2h 10m",
    tags: ["UFO", "Mystery", "Western"]
  },
  17: {
    id: 17,
    title: "THE LOST CITY",
    genre: "Action/Comedy",
    src: "/assets/thelostcity.jpg",
    coverSrc: "/assets/thelostcity.jpg",
    description: "A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt that lands them both in a cutthroat jungle adventure.",
    year: "2022",
    director: "Aaron Nee, Adam Nee",
    cast: ["Sandra Bullock", "Channing Tatum", "Daniel Radcliffe"],
    rating: "4.0/5",
    duration: "1h 52m",
    tags: ["Adventure", "Romance", "Jungle"]
  },
  18: {
    id: 18,
    title: "AMSTERDAM",
    genre: "Drama/Comedy",
    src: "/assets/amsterdam.jpg",
    coverSrc: "/assets/amsterdam.jpg",
    description: "Three close friends find themselves at the center of one of the most shocking secret plots in American history.",
    year: "2022",
    director: "David O. Russell",
    cast: ["Christian Bale", "Margot Robbie", "John David Washington"],
    rating: "3.9/5",
    duration: "2h 14m",
    tags: ["Historical", "Mystery", "Friendship"]
  },
  19: {
    id: 19,
    title: "DEXTER SEASON 2",
    genre: "Thriller/Drama",
    src: "/assets/Dexter.png",
    coverSrc: "/assets/Dexter.png",
    description: "Dexter Morgan, a blood spatter analyst for the Miami Metro Police Department, leads a secret life as a serial killer who targets murderers who have escaped the justice system. In Season 2, his world begins to unravel as the Bay Harbor Butcher investigation intensifies.",
    year: "2007",
    director: "Various",
    cast: ["Michael C. Hall", "Jennifer Carpenter", "Julie Benz"],
    rating: "4.6/5",
    duration: "Season 2 (12 episodes)",
    tags: ["Crime", "Psychological", "Serial Killer"]
  },
  20: {
    id: 20,
    title: "THE WALKING DEAD",
    genre: "Horror",
    src: "/assets/TheWalkingDeadPoster.jpg",
    coverSrc: "/assets/TheWalkingDeadPoster.jpg",
    description: "Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive in a world overrun by the walking dead.",
    year: "2010",
    director: "Various",
    cast: ["Andrew Lincoln", "Norman Reedus", "Melissa McBride"],
    rating: "4.4/5",
    duration: "11 Seasons",
    tags: ["Zombie", "Apocalypse", "Drama"]
  },
  21: {
    id: 21,
    title: "PRISON BREAK",
    genre: "Action",
    src: "/assets/PB.jpg",
    coverSrc: "/assets/PB.jpg",
    description: "Structural engineer Michael Scofield devises an elaborate plan to help his brother Lincoln Burrows escape death row after he's wrongfully accused of murder.",
    year: "2005",
    director: "Various",
    cast: ["Wentworth Miller", "Dominic Purcell", "Sarah Wayne Callies"],
    rating: "4.5/5",
    duration: "5 Seasons",
    tags: ["Crime", "Drama", "Thriller"]
  },
  22: {
    id: 22,
    title: "THE WITCHER: BLOOD OF ELVES",
    genre: "Fantasy/Action",
    src: "/assets/TW.jfif",
    coverSrc: "/assets/TW.jfif",
    description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    year: "2019",
    director: "Various",
    cast: ["Henry Cavill", "Anya Chalotra", "Freya Allan"],
    rating: "4.4/5",
    duration: "3 Seasons",
    tags: ["Fantasy", "Monster Hunter", "Adventure"]
  },
  23: {
    id: 23,
    title: "STRANGER THINGS",
    genre: "Sci-Fi/Horror",
    src: "/assets/St.jpg",
    coverSrc: "/assets/St.jpg",
    description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    year: "2016",
    director: "The Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    rating: "4.7/5",
    duration: "4 Seasons",
    tags: ["Supernatural", "80s Nostalgia", "Mystery"]
  },
  24: {
    id: 24,
    title: "GAME OF THRONES",
    genre: "Fantasy/Drama",
    src: "/assets/GOT.jpg",
    coverSrc: "/assets/GOT.jpg",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    year: "2011",
    director: "Various",
    cast: ["Emilia Clarke", "Kit Harington", "Peter Dinklage"],
    rating: "4.8/5",
    duration: "8 Seasons",
    tags: ["Epic", "Political Intrigue", "Medieval"]
  },
  25: {
    id: 25,
    title: "BREAKING BAD",
    genre: "Drama/Crime",
    src: "/assets/breakingbad.jpg",
    coverSrc: "/assets/breakingbad.jpg",
    description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    year: "2008",
    director: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    rating: "4.9/5",
    duration: "5 Seasons",
    tags: ["Crime", "Drama", "Transformation"]
  },
  26: {
    id: 26,
    title: "PEAKY BLINDERS",
    genre: "Drama/Crime",
    src: "/assets/peakyblinders.jpg",
    coverSrc: "/assets/peakyblinders.jpg",
    description: "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
    year: "2013",
    director: "Various",
    cast: ["Cillian Murphy", "Helen McCrory", "Paul Anderson"],
    rating: "4.7/5",
    duration: "6 Seasons",
    tags: ["Gang", "Post-War", "Birmingham"]
  },
  27: {
    id: 27,
    title: "MONEY HEIST",
    genre: "Thriller/Crime",
    src: "/assets/moneyheist.jpg",
    coverSrc: "/assets/moneyheist.jpg",
    description: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    year: "2017",
    director: "Álex Pina",
    cast: ["Úrsula Corberó", "Álvaro Morte", "Itziar Ituño"],
    rating: "4.6/5",
    duration: "5 Seasons",
    tags: ["Heist", "Spanish", "Resistance"]
  },
  28: {
    id: 28,
    title: "THE MANDALORIAN",
    genre: "Sci-Fi/Action",
    src: "/assets/mandalorian.jpg",
    coverSrc: "/assets/mandalorian.jpg",
    description: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
    year: "2019",
    director: "Jon Favreau",
    cast: ["Pedro Pascal", "Gina Carano", "Carl Weathers"],
    rating: "4.8/5",
    duration: "3 Seasons",
    tags: ["Star Wars", "Bounty Hunter", "Space Western"]
  },
  29: {
    id: 29,
    title: "LUCIFER",
    genre: "Fantasy/Crime",
    src: "/assets/lucifer.jpg",
    coverSrc: "/assets/lucifer.jpg",
    description: "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals.",
    year: "2016",
    director: "Various",
    cast: ["Tom Ellis", "Lauren German", "Kevin Alejandro"],
    rating: "4.5/5",
    duration: "6 Seasons",
    tags: ["Supernatural", "Detective", "Comedy"]
  },
  30: {
    id: 30,
    title: "THE BOYS",
    genre: "Action/Sci-Fi",
    src: "/assets/theboys.jpg",
    coverSrc: "/assets/theboys.jpg",
    description: "A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.",
    year: "2019",
    director: "Eric Kripke",
    cast: ["Karl Urban", "Jack Quaid", "Antony Starr"],
    rating: "4.7/5",
    duration: "4 Seasons",
    tags: ["Anti-Superhero", "Dark Comedy", "Satire"]
  }
}
}

export const sampleComments = [
  {
    id: 1,
    movieId: 1,
    user: "MovieFan123",
    avatar: "/assets/user1.jpg",
    comment: "One of the best Marvel movies ever made! The tribute to Chadwick was beautiful.",
    rating: 5,
    date: "2023-01-15"
  },
  {
    id: 2,
    movieId: 1,
    user: "CinemaLover",
    avatar: "/assets/user2.jpg",
    comment: "The visuals and soundtrack were amazing, but the plot felt a bit rushed in places.",
    rating: 4,
    date: "2023-02-03"
  },
  {
    id: 3,
    movieId: 2,
    user: "SpideyFan",
    avatar: "/assets/user3.jpg",
    comment: "The multiverse concept was handled perfectly! Seeing all three Spider-Men together was a dream come true.",
    rating: 5,
    date: "2023-01-20"
  },
  {
    id: 4,
    movieId: 3,
    user: "HorrorBuff",
    avatar: "/assets/user4.jpg",
    comment: "This movie stayed with me for days after watching. The smiling faces are now permanently creepy to me!",
    rating: 4,
    date: "2023-03-10"
  },
  {
    id: 5,
    movieId: 6,
    user: "MarvelFanatic",
    avatar: "/assets/user5.jpg",
    comment: "Perfect conclusion to the Infinity Saga. I cried multiple times during this movie.",
    rating: 5,
    date: "2023-01-05"
  },
  {
    id: 6,
    movieId: 12,
    user: "FantasyLover",
    avatar: "/assets/user6.jpg",
    comment: "The first 6 seasons were perfect television. The final season was a bit rushed but still enjoyable.",
    rating: 4,
    date: "2023-02-18"
  },
  {
    id: 7,
    movieId: 7,
    user: "ActionJunkie",
    avatar: "/assets/user7.jpg",
    comment: "Keanu Reeves delivers another masterclass in action choreography. The staircase fight scene was incredible!",
    rating: 5,
    date: "2023-04-12"
  },
  {
    id: 8,
    movieId: 8,
    user: "SciFiExplorer",
    avatar: "/assets/user8.jpg",
    comment: "Villeneuve's vision of Dune is breathtaking. Can't wait for Part Two!",
    rating: 5,
    date: "2023-02-28"
  },
  {
    id: 9,
    movieId: 9,
    user: "BatmanFan",
    avatar: "/assets/user9.jpg",
    comment: "Robert Pattinson brings a fresh take to Batman. The detective work was fantastic.",
    rating: 4,
    date: "2023-03-22"
  },
  {
    id: 10,
    movieId: 10,
    user: "AviationLover",
    avatar: "/assets/user10.jpg",
    comment: "Tom Cruise proves he's still got it! The flight sequences were absolutely stunning.",
    rating: 5,
    date: "2023-05-15"
  },
  {
    id: 11,
    movieId: 13,
    user: "DinoFan",
    avatar: "/assets/user11.jpg",
    comment: "Great conclusion to the trilogy. The dinosaurs look more realistic than ever!",
    rating: 4,
    date: "2023-06-20"
  },
  {
    id: 12,
    movieId: 14,
    user: "HistoryBuff",
    avatar: "/assets/user12.jpg",
    comment: "Eggers creates another masterpiece. The Viking culture is portrayed authentically and brutally.",
    rating: 5,
    date: "2023-04-28"
  },
  {
    id: 13,
    movieId: 15,
    user: "ComedyLover",
    avatar: "/assets/user13.jpg",
    comment: "Brad Pitt is hilarious in this! The perfect mix of action and comedy.",
    rating: 4,
    date: "2023-08-10"
  },
  {
    id: 14,
    movieId: 16,
    user: "PeeleFan",
    avatar: "/assets/user14.jpg",
    comment: "Another brilliant film from Jordan Peele. The UFO mystery kept me on edge throughout.",
    rating: 4,
    date: "2023-07-25"
  },
  {
    id: 15,
    movieId: 19,
    user: "ThrillerFan",
    avatar: "/assets/user15.jpg",
    comment: "Michael C. Hall's performance is chilling and captivating. Season 2 is peak Dexter!",
    rating: 5,
    date: "2023-09-05"
  },
  {
    id: 16,
    movieId: 20,
    user: "ZombieSlayer",
    avatar: "/assets/user16.jpg",
    comment: "The early seasons were television gold. Rick's journey is unforgettable.",
    rating: 4,
    date: "2023-08-18"
  },
  {
    id: 17,
    movieId: 21,
    user: "EscapeFan",
    avatar: "/assets/user17.jpg",
    comment: "Wentworth Miller's performance is incredible. The first season is a masterpiece of tension.",
    rating: 5,
    date: "2023-07-03"
  },
  {
    id: 18,
    movieId: 22,
    user: "FantasyGamer",
    avatar: "/assets/user18.jpg",
    comment: "Henry Cavill IS Geralt. The monster fights are spectacular!",
    rating: 4,
    date: "2023-12-20"
  },
  {
    id: 19,
    movieId: 23,
    user: "80sKid",
    avatar: "/assets/user19.jpg",
    comment: "Perfect blend of nostalgia and horror. Eleven is such a compelling character!",
    rating: 5,
    date: "2023-11-12"
  },
  {
    id: 20,
    movieId: 24,
    user: "WesterosLord",
    avatar: "/assets/user20.jpg",
    comment: "The political intrigue and character development in the early seasons is unmatched.",
    rating: 5,
    date: "2023-10-08"
  },
  {
    id: 21,
    movieId: 25,
    user: "ChemistryTeacher",
    avatar: "/assets/user21.jpg",
    comment: "Bryan Cranston's transformation is phenomenal. Every episode is a masterclass in storytelling.",
    rating: 5,
    date: "2023-09-30"
  },
  {
    id: 22,
    movieId: 26,
    user: "BirminghamResident",
    avatar: "/assets/user22.jpg",
    comment: "Cillian Murphy's Tommy Shelby is iconic. The cinematography is absolutely stunning.",
    rating: 5,
    date: "2023-11-25"
  },
  {
    id: 23,
    movieId: 27,
    user: "HeistLover",
    avatar: "/assets/user23.jpg",
    comment: "¡Bella ciao! The Professor's plan is brilliant and the emotional moments hit hard.",
    rating: 4,
    date: "2023-12-05"
  },
  {
    id: 24,
    movieId: 28,
    user: "StarWarsNerd",
    avatar: "/assets/user24.jpg",
    comment: "This is the way! Pedro Pascal brings so much heart to the Mandalorian character.",
    rating: 5,
    date: "2023-12-12"
  },
  {
    id: 25,
    movieId: 29,
    user: "DevilFan",
    avatar: "/assets/user25.jpg",
    comment: "Tom Ellis is perfectly cast as Lucifer. The chemistry with Lauren German is fantastic!",
    rating: 4,
    date: "2023-11-18"
  },
  {
    id: 26,
    movieId: 30,
    user: "SuperheroSkeptic",
    avatar: "/assets/user26.jpg",
    comment: "Finally, a realistic take on what superheroes would be like in real life. Homelander is terrifying!",
    rating: 5,
    date: "2023-12-01"
  }
];

interface RawMovieDetailFromJSON {
  id: number | string;
  title: string;
  genre: string;
  src: string;
  coverSrc: string;
  description: string;
  year: string;
  director: string;
  cast: string[];
  rating: string;
  duration: string;
  tags: string[];
}

type RawMovieDetailsMap = { [key: string]: RawMovieDetailFromJSON };

const typedMovieDetails = rawMovieDataFromJSON.movieDetails as RawMovieDetailsMap;

export const allMoviesData: Movie[] = Object.values(typedMovieDetails).map(movie => {
  const numericId = Number(movie.id);
  return {
    ...movie,
    id: numericId,
    type: numericId >= 1 && numericId <= 18 ? 'movie' : 'tv-show'
  };
});

export const getMovieById = (id: number | string): Movie | undefined => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  if (isNaN(numericId)) return undefined;
  return allMoviesData.find(movie => movie.id === numericId);
};