// src/data/commentsData.ts
export interface Comment {
    id: number;
    movieId: number;
    user: string;
    avatar: string; // Path to user's avatar image
    comment: string;
    rating: number; // User's rating for the movie
    date: string;   // ISO date string e.g., "2023-10-27"
  }
  
  export const sampleComments: Comment[] = [
    {
      "id": 1,
      "movieId": 1,
      "user": "MovieFan123",
      "avatar": "/assets/avatars/user1.jpg", // Assuming avatars are in public/assets/avatars
      "comment": "One of the best Marvel movies ever made! The tribute to Chadwick was beautiful.",
      "rating": 5,
      "date": "2023-01-15"
    },
    {
      "id": 2,
      "movieId": 1,
      "user": "CinemaLover",
      "avatar": "/assets/avatars/user2.jpg",
      "comment": "The visuals and soundtrack were amazing, but the plot felt a bit rushed in places.",
      "rating": 4,
      "date": "2023-02-03"
    },
    {
      "id": 3,
      "movieId": 2,
      "user": "SpideyFan",
      "avatar": "/assets/avatars/user3.jpg",
      "comment": "The multiverse concept was handled perfectly! Seeing all three Spider-Men together was a dream come true.",
      "rating": 5,
      "date": "2023-01-20"
    },
    {
      "id": 4,
      "movieId": 3,
      "user": "HorrorBuff",
      "avatar": "/assets/avatars/user4.jpg",
      "comment": "This movie stayed with me for days after watching. The smiling faces are now permanently creepy to me!",
      "rating": 4,
      "date": "2023-03-10"
    },
    {
      "id": 5,
      "movieId": 6,
      "user": "MarvelFanatic",
      "avatar": "/assets/avatars/user5.jpg",
      "comment": "Perfect conclusion to the Infinity Saga. I cried multiple times during this movie.",
      "rating": 5,
      "date": "2023-01-05"
    },
    {
      "id": 6,
      "movieId": 12, // This ID was for Doctor Strange 2 in the movie list
      "user": "FantasyLover",
      "avatar": "/assets/avatars/user6.jpg",
      "comment": "Visually stunning, and the multiverse aspects were mind-bending!", // Comment adjusted for Dr. Strange
      "rating": 4,
      "date": "2023-02-18"
    },
    {
      "id": 7,
      "movieId": 7,
      "user": "ActionJunkie",
      "avatar": "/assets/avatars/user7.jpg",
      "comment": "Keanu Reeves delivers another masterclass in action choreography. The staircase fight scene was incredible!",
      "rating": 5,
      "date": "2023-04-12"
    },
    {
      "id": 8,
      "movieId": 8,
      "user": "SciFiExplorer",
      "avatar": "/assets/avatars/user8.jpg",
      "comment": "Villeneuve's vision of Dune is breathtaking. Can't wait for Part Two!",
      "rating": 5,
      "date": "2023-02-28"
    },
    {
      "id": 9,
      "movieId": 9,
      "user": "BatmanFan",
      "avatar": "/assets/avatars/user9.jpg",
      "comment": "Robert Pattinson brings a fresh take to Batman. The detective work was fantastic.",
      "rating": 4,
      "date": "2023-03-22"
    },
    {
      "id": 10,
      "movieId": 10,
      "user": "AviationLover",
      "avatar": "/assets/avatars/user10.jpg",
      "comment": "Tom Cruise proves he's still got it! The flight sequences were absolutely stunning.",
      "rating": 5,
      "date": "2023-05-15"
    },
    {
      "id": 11,
      "movieId": 13,
      "user": "DinoFan",
      "avatar": "/assets/avatars/user11.jpg",
      "comment": "Great conclusion to the trilogy. The dinosaurs look more realistic than ever!",
      "rating": 4,
      "date": "2023-06-20"
    },
    {
      "id": 12,
      "movieId": 14,
      "user": "HistoryBuff",
      "avatar": "/assets/avatars/user12.jpg",
      "comment": "Eggers creates another masterpiece. The Viking culture is portrayed authentically and brutally.",
      "rating": 5,
      "date": "2023-04-28"
    },
    {
      "id": 13,
      "movieId": 15,
      "user": "ComedyLover",
      "avatar": "/assets/avatars/user13.jpg",
      "comment": "Brad Pitt is hilarious in this! The perfect mix of action and comedy.",
      "rating": 4,
      "date": "2023-08-10"
    },
    {
      "id": 14,
      "movieId": 16,
      "user": "PeeleFan",
      "avatar": "/assets/avatars/user14.jpg",
      "comment": "Another brilliant film from Jordan Peele. The UFO mystery kept me on edge throughout.",
      "rating": 4,
      "date": "2023-07-25"
    },
    {
      "id": 15,
      "movieId": 19,
      "user": "ThrillerFan",
      "avatar": "/assets/avatars/user15.jpg",
      "comment": "Michael C. Hall's performance is chilling and captivating. Season 2 is peak Dexter!",
      "rating": 5,
      "date": "2023-09-05"
    },
    {
      "id": 16,
      "movieId": 20,
      "user": "ZombieSlayer",
      "avatar": "/assets/avatars/user16.jpg",
      "comment": "The early seasons were television gold. Rick's journey is unforgettable.",
      "rating": 4,
      "date": "2023-08-18"
    },
    {
      "id": 17,
      "movieId": 21,
      "user": "EscapeFan",
      "avatar": "/assets/avatars/user17.jpg",
      "comment": "Wentworth Miller's performance is incredible. The first season is a masterpiece of tension.",
      "rating": 5,
      "date": "2023-07-03"
    },
    {
      "id": 18,
      "movieId": 22,
      "user": "FantasyGamer",
      "avatar": "/assets/avatars/user18.jpg",
      "comment": "Henry Cavill IS Geralt. The monster fights are spectacular!",
      "rating": 4,
      "date": "2023-12-20"
    },
    {
      "id": 19,
      "movieId": 23,
      "user": "80sKid",
      "avatar": "/assets/avatars/user19.jpg",
      "comment": "Perfect blend of nostalgia and horror. Eleven is such a compelling character!",
      "rating": 5,
      "date": "2023-11-12"
    },
    {
      "id": 20,
      "movieId": 24,
      "user": "WesterosLord",
      "avatar": "/assets/avatars/user20.jpg",
      "comment": "The political intrigue and character development in the early seasons is unmatched.",
      "rating": 5,
      "date": "2023-10-08"
    },
    {
      "id": 21,
      "movieId": 25,
      "user": "ChemistryTeacher",
      "avatar": "/assets/avatars/user21.jpg",
      "comment": "Bryan Cranston's transformation is phenomenal. Every episode is a masterclass in storytelling.",
      "rating": 5,
      "date": "2023-09-30"
    },
    {
      "id": 22,
      "movieId": 26,
      "user": "BirminghamResident",
      "avatar": "/assets/avatars/user22.jpg",
      "comment": "Cillian Murphy's Tommy Shelby is iconic. The cinematography is absolutely stunning.",
      "rating": 5,
      "date": "2023-11-25"
    },
    {
      "id": 23,
      "movieId": 27,
      "user": "HeistLover",
      "avatar": "/assets/avatars/user23.jpg",
      "comment": "¡Bella ciao! The Professor's plan is brilliant and the emotional moments hit hard.",
      "rating": 4,
      "date": "2023-12-05"
    },
    {
      "id": 24,
      "movieId": 28,
      "user": "StarWarsNerd",
      "avatar": "/assets/avatars/user24.jpg",
      "comment": "This is the way! Pedro Pascal brings so much heart to the Mandalorian character.",
      "rating": 5,
      "date": "2023-12-12"
    },
    {
      "id": 25,
      "movieId": 29,
      "user": "DevilFan",
      "avatar": "/assets/avatars/user25.jpg",
      "comment": "Tom Ellis is perfectly cast as Lucifer. The chemistry with Lauren German is fantastic!",
      "rating": 4,
      "date": "2023-11-18"
    },
    {
      "id": 26,
      "movieId": 30,
      "user": "SuperheroSkeptic",
      "avatar": "/assets/avatars/user26.jpg",
      "comment": "Finally, a realistic take on what superheroes would be like in real life. Homelander is terrifying!",
      "rating": 5,
      "date": "2023-12-01"
    }
  ];