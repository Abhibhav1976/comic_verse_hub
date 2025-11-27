// ComicVerse Hub - Comics Data
// 12 diverse comic book entries for the catalog

const comics = [
  {
    id: 1,
    slug: 'shadow-dawn-rising',
    title: 'Shadow Dawn: Rising',
    publisher: 'Dark Horse',
    price: 12.99,
    releaseDate: '2024-11-01',
    genre: 'Superhero',
    characters: ['Shadow Knight', 'Dawn Striker', 'The Veil', 'Captain Radiance'],
    cover: './images/placeholders/comic-1.svg',
    synopsis: 'When the sun sets on Meridian City, a new hero emerges from the shadows. Shadow Knight must unite with unlikely allies to stop an ancient evil that threatens to plunge the world into eternal darkness.',
    creators: {
      writer: 'Marcus Chen',
      artist: 'Sofia Rodriguez',
      colorist: 'James Wilson'
    }
  },
  {
    id: 2,
    slug: 'neon-ghost-volume-1',
    title: 'Neon Ghost: Volume 1',
    publisher: 'Image',
    price: 9.99,
    releaseDate: '2024-10-15',
    genre: 'Sci-Fi',
    characters: ['Kai Tanaka', 'Echo-7', 'Dr. Vex'],
    cover: './images/placeholders/comic-2.svg',
    synopsis: 'In a cyberpunk Tokyo where memories can be stolen, a hacker known only as Neon Ghost hunts for the truth about their past. Each clue leads deeper into a conspiracy that could rewrite reality itself.',
    creators: {
      writer: 'Yuki Nakamura',
      artist: 'Alex Park',
      colorist: 'Maria Santos'
    }
  },
  {
    id: 3,
    slug: 'crimson-heir',
    title: 'The Crimson Heir',
    publisher: 'Marvel',
    price: 14.99,
    releaseDate: '2024-09-22',
    genre: 'Fantasy',
    characters: ['Princess Scarlet', 'Lord Ashford', 'Ember the Phoenix'],
    cover: './images/placeholders/comic-3.svg',
    synopsis: 'Born with the power to command fire, Princess Scarlet must claim her throne in a kingdom torn by civil war. But the crown comes with a curse that has destroyed every ruler before her.',
    creators: {
      writer: 'Rebecca Stone',
      artist: 'David Kim',
      colorist: 'Elena Vasquez'
    }
  },
  {
    id: 4,
    slug: 'deadzone-chronicles',
    title: 'Deadzone Chronicles',
    publisher: 'DC',
    price: 11.99,
    releaseDate: '2024-11-08',
    genre: 'Horror',
    characters: ['Marcus Reed', 'The Infected', 'Dr. Sarah Chen'],
    cover: './images/placeholders/comic-4.svg',
    synopsis: 'Twenty years after the outbreak, survivors discover that the infected aren\'t mindless monsters—they\'re evolving. Marcus Reed leads a desperate mission into the Deadzone to find a cure before it\'s too late.',
    creators: {
      writer: 'Thomas Blake',
      artist: 'Jennifer Wu',
      colorist: 'Robert Chang'
    }
  },
  {
    id: 5,
    slug: 'stellar-vanguard',
    title: 'Stellar Vanguard',
    publisher: 'Boom Studios',
    price: 13.99,
    releaseDate: '2024-08-30',
    genre: 'Sci-Fi',
    characters: ['Captain Nova', 'Zyx', 'Lieutenant Torres', 'ARIA'],
    cover: './images/placeholders/comic-5.svg',
    synopsis: 'Humanity\'s first deep space colony ship encounters an alien artifact that defies the laws of physics. Captain Nova and her crew must decide: study it, or destroy it before it falls into the wrong hands.',
    creators: {
      writer: 'Amanda Foster',
      artist: 'Carlos Mendez',
      colorist: 'Kenji Sato'
    }
  },
  {
    id: 6,
    slug: 'midnight-society',
    title: 'Midnight Society #1',
    publisher: 'IDW',
    price: 8.99,
    releaseDate: '2024-10-01',
    genre: 'Crime',
    characters: ['Detective Kane', 'The Gentleman', 'Ruby Fontaine'],
    cover: './images/placeholders/comic-6.svg',
    synopsis: 'In 1920s Chicago, Detective Kane infiltrates an exclusive underground club where the city\'s elite gather. But beneath the jazz and champagne lies a criminal empire that will stop at nothing to protect its secrets.',
    creators: {
      writer: 'Victoria Monroe',
      artist: 'Frank DelGado',
      colorist: 'Lisa Chen'
    }
  },
  {
    id: 7,
    slug: 'primal-fury',
    title: 'Primal Fury',
    publisher: 'Image',
    price: 15.99,
    releaseDate: '2024-09-10',
    genre: 'Adventure',
    characters: ['Rex Hunter', 'Dr. Amara Singh', 'Titan'],
    cover: './images/placeholders/comic-7.svg',
    synopsis: 'When dinosaurs return to Earth through a rift in time, humanity faces extinction. A former soldier and a brilliant scientist must venture into the prehistoric jungle to close the rift—if they can survive.',
    creators: {
      writer: 'Jake Morrison',
      artist: 'Lina Petrova',
      colorist: 'Marco Rossi'
    }
  },
  {
    id: 8,
    slug: 'quantum-knights',
    title: 'Quantum Knights',
    publisher: 'Marvel',
    price: 16.99,
    releaseDate: '2024-11-15',
    genre: 'Superhero',
    characters: ['Quantum', 'Pulse', 'Nexus', 'Phase'],
    cover: './images/placeholders/comic-8.svg',
    synopsis: 'Four scientists gain incredible powers after a quantum experiment goes wrong. Now they must master their abilities and work together to stop a multiversal threat that could collapse all realities into one.',
    creators: {
      writer: 'Dr. Stephen Hayes',
      artist: 'Michelle O\'Connor',
      colorist: 'Andre Baptiste'
    }
  },
  {
    id: 9,
    slug: 'whispers-dark',
    title: 'Whispers in the Dark',
    publisher: 'DC',
    price: 10.99,
    releaseDate: '2024-10-20',
    genre: 'Horror',
    characters: ['Emily Hart', 'The Whisperer', 'Father Michaels'],
    cover: './images/placeholders/comic-9.svg',
    synopsis: 'After moving into an old Victorian mansion, Emily begins hearing voices in the walls. As she unravels the house\'s dark history, she realizes the whispers aren\'t just echoes of the past—they\'re warnings.',
    creators: {
      writer: 'Patricia Blackwood',
      artist: 'Giovanni Russo',
      colorist: 'Sarah Martinez'
    }
  },
  {
    id: 10,
    slug: 'cosmic-ronin',
    title: 'Cosmic Ronin',
    publisher: 'Dark Horse',
    price: 12.99,
    releaseDate: '2024-09-05',
    genre: 'Sci-Fi',
    characters: ['Takeshi Kurosawa', 'Android Yuki', 'Lord Vega'],
    cover: './images/placeholders/comic-10.svg',
    synopsis: 'A disgraced samurai wanders the galaxy as a bounty hunter, seeking redemption for a crime he didn\'t commit. When he\'s hired to protect a mysterious android, he\'s drawn into a war that will decide the fate of the cosmos.',
    creators: {
      writer: 'Hiroshi Yamada',
      artist: 'Ana Delgado',
      colorist: 'Tom Richards'
    }
  },
  {
    id: 11,
    slug: 'emerald-throne',
    title: 'The Emerald Throne',
    publisher: 'Boom Studios',
    price: 19.99,
    releaseDate: '2024-11-20',
    genre: 'Fantasy',
    characters: ['Queen Lyra', 'Mordain the Sorcerer', 'Sir Gareth', 'Faewyn'],
    cover: './images/placeholders/comic-11.svg',
    synopsis: 'In a realm where magic is fading, Queen Lyra must find the legendary Emerald Throne to restore balance. But the throne is guarded by an ancient dragon, and claiming it may cost her everything she loves.',
    creators: {
      writer: 'Elizabeth Crane',
      artist: 'Magnus Thorson',
      colorist: 'Nina Patel'
    }
  },
  {
    id: 12,
    slug: 'iron-protocol',
    title: 'Iron Protocol',
    publisher: 'IDW',
    price: 11.99,
    releaseDate: '2024-08-15',
    genre: 'Crime',
    characters: ['Agent Steele', 'The Architect', 'Maya Cross'],
    cover: './images/placeholders/comic-12.svg',
    synopsis: 'When a top-secret government program is leaked, Agent Steele must race against time to stop a terrorist organization from using it to bring the world to its knees. Trust no one. Question everything.',
    creators: {
      writer: 'Michael Grant',
      artist: 'Olivia Zhang',
      colorist: 'Derek Johnson'
    }
  }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = comics;
}