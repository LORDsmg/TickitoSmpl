const seatLayout = [
  {
    category: "VIP",
    price: 500,
    rows: [
      {
        row: "A",
        seats: [
          { id: "A1", booked: false },
          { id: "A2", booked: false },
          { id: "A3", booked: true },
          { id: "A4", booked: false },
          { id: "A5", booked: false },
          { id: "A6", booked: false },
          { id: "A7", booked: true },
          { id: "A8", booked: false },
          { id: "A9", booked: false },
          { id: "A10", booked: false },
        ],
      },
      {
        row: "B",
        seats: [
          { id: "B1", booked: false },
          { id: "B2", booked: false },
          { id: "B3", booked: false },
          { id: "B4", booked: true },
          { id: "B5", booked: false },
          { id: "B6", booked: false },
          { id: "B7", booked: false },
          { id: "B8", booked: false },
          { id: "B9", booked: true },
          { id: "B10", booked: false },
        ],
      },
    ],
  },

  {
    category: "Premium",
    price: 350,
    rows: [
      {
        row: "C",
        seats: [
          { id: "C1", booked: false },
          { id: "C2", booked: false },
          { id: "C3", booked: false },
          { id: "C4", booked: false },
          { id: "C5", booked: true },
          { id: "C6", booked: false },
          { id: "C7", booked: false },
          { id: "C8", booked: false },
          { id: "C9", booked: false },
          { id: "C10", booked: false },
        ],
      },
      {
        row: "D",
        seats: [
          { id: "D1", booked: false },
          { id: "D2", booked: true },
          { id: "D3", booked: false },
          { id: "D4", booked: false },
          { id: "D5", booked: false },
          { id: "D6", booked: false },
          { id: "D7", booked: false },
          { id: "D8", booked: true },
          { id: "D9", booked: false },
          { id: "D10", booked: false },
        ],
      },
    ],
  },

  {
    category: "Regular",
    price: 250,
    rows: [
      {
        row: "E",
        seats: [
          { id: "E1", booked: false },
          { id: "E2", booked: false },
          { id: "E3", booked: false },
          { id: "E4", booked: false },
          { id: "E5", booked: false },
          { id: "E6", booked: true },
          { id: "E7", booked: false },
          { id: "E8", booked: false },
          { id: "E9", booked: false },
          { id: "E10", booked: false },
        ],
      },
      {
        row: "F",
        seats: [
          { id: "F1", booked: true },
          { id: "F2", booked: false },
          { id: "F3", booked: false },
          { id: "F4", booked: false },
          { id: "F5", booked: false },
          { id: "F6", booked: false },
          { id: "F7", booked: true },
          { id: "F8", booked: false },
          { id: "F9", booked: false },
          { id: "F10", booked: false },
        ],
      },
    ],
  },
];

export default seatLayout;