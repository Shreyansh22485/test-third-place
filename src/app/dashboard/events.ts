export type Event = {
  slug: string;             
  event_name: string;
  event_description: string;
  event_location: string;
  cover_photo_link: string;
  event_date: string;          
  event_price: number;
};

export const events: Event[] = [
  {
    slug: "secret-supper-stories",
    event_name: "Secret Supper & Stories",
    event_description:
      "Begin with an intimate dinner with your closest matches. Share a meal, let the night unfold through deep conversations that spark real connections and lasting memories.",
    event_location: "Bangalore",
    cover_photo_link: "/1.png",
    event_date: "2025-06-14",
    event_price: 4999,
  },
  {
    slug: "salsa-socials-soiree",
    event_name: "Salsa Socials Soirée",
    event_description:
      "Dance, mingle, and match over a fun salsa crash course and social mixer. No partner needed—just bring your energy and leave with stories (or maybe something more).",
    event_location: "Bangalore",
    cover_photo_link: "/2.png",
    event_date: "2025-06-28",
    event_price: 2000,
  },
  {
    slug: "drunk-bowling",
    event_name: "Drunk Bowling",
    event_description:
      "Strike out your social awkwardness at this boozy bowling night. Teams of strangers, themed rounds, and just the right amount of chaos—let the pins (and guards) fall.",
    event_location: "Bangalore",
    cover_photo_link: "/3.png",
    event_date: "2025-07-12",
    event_price: 3999,
  },
  {
    slug: "picnic-rave-under-the-stars",
    event_name: "Picnic Rave Under the Stars",
    event_description:
      "Glow sticks, laid-back house beats, and blanket lounges on a moonlit lawn. Share snacks, swap stories, and watch spontaneous friendships spark beneath the Bangalore night sky.",
    event_location: "Bangalore",
    cover_photo_link: "/4.png",
    event_date: "2025-07-26",
    event_price: 2999,
  },
];
